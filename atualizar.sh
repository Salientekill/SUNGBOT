#!/bin/bash

#===============================================================================
# SCRIPT DE ATUALIZAÇÃO ROBUSTO - SUNGBOT
# Versão: 2.0 - Sistema com proteção contra perda de dados
#===============================================================================

set -euo pipefail  # Modo strict: aborta em erros

# Cores para output
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
CYAN="\e[36m"
BLUE="\e[34m"
MAGENTA="\e[35m"
RESET="\e[0m"

# Variáveis globais
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="atualizar_${TIMESTAMP}.log"
BACKUP_DIR=".backup_atualizacao_${TIMESTAMP}"
DADOS_BACKUP="DADOS_backup_${TIMESTAMP}.zip"
DADOS_BACKUP_SEGURANCA="DADOS_SEGURANCA.zip"
REPO_URL="https://github.com/Salientekill/SUNGBOT.git"
INICIAR_BOT=true
ROLLBACK_AVAILABLE=false

#===============================================================================
# FUNÇÕES AUXILIARES
#===============================================================================

# Função de log
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

# Função de sucesso
success() {
    echo -e "${GREEN}✓ $@${RESET}"
    log "SUCCESS" "$@"
}

# Função de info
info() {
    echo -e "${CYAN}ℹ $@${RESET}"
    log "INFO" "$@"
}

# Função de aviso
warning() {
    echo -e "${YELLOW}⚠ $@${RESET}"
    log "WARNING" "$@"
}

# Função de erro
error() {
    echo -e "${RED}✗ ERRO: $@${RESET}"
    log "ERROR" "$@"
}

# Função de erro fatal com rollback
fatal_error() {
    error "$@"
    echo ""
    error "Ocorreu um erro crítico durante a atualização!"

    if [ "$ROLLBACK_AVAILABLE" = true ]; then
        warning "Iniciando processo de rollback para restaurar estado anterior..."
        rollback
    else
        error "Rollback não disponível. Por favor, restaure manualmente se necessário."
        info "Backup de segurança disponível em: $DADOS_BACKUP_SEGURANCA"
    fi

    exit 1
}

# Função de rollback
rollback() {
    info "═══════════════════════════════════════════════════════════"
    info "           INICIANDO ROLLBACK DE EMERGÊNCIA"
    info "═══════════════════════════════════════════════════════════"

    if [ -d "$BACKUP_DIR" ]; then
        info "Restaurando arquivos do backup de rollback..."

        # Remove arquivos novos que foram copiados
        find . -maxdepth 1 ! -name "$BACKUP_DIR" ! -name "$DADOS_BACKUP_SEGURANCA" \
            ! -name "$LOG_FILE" ! -name "." ! -name ".." -exec rm -rf {} \; 2>/dev/null || true

        # Restaura arquivos originais
        cp -r "$BACKUP_DIR"/* . 2>/dev/null || true
        cp -r "$BACKUP_DIR"/.[!.]* . 2>/dev/null || true

        success "Rollback concluído! Sistema restaurado ao estado anterior."

        # Remove diretório de backup após rollback bem-sucedido
        rm -rf "$BACKUP_DIR"
    else
        warning "Diretório de rollback não encontrado!"
        info "Tentando restaurar apenas os dados do backup de segurança..."

        if [ -f "$DADOS_BACKUP_SEGURANCA" ]; then
            if unzip -o "$DADOS_BACKUP_SEGURANCA" -d . >> "$LOG_FILE" 2>&1; then
                success "Dados restaurados do backup de segurança!"
            else
                error "Falha ao restaurar backup de segurança!"
            fi
        fi
    fi

    info "Verifique o log em: $LOG_FILE"
    exit 1
}

# Verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar espaço em disco (em MB)
check_disk_space() {
    local required_mb=$1
    local available_mb=$(df . | awk 'NR==2 {print int($4/1024)}')

    if [ $available_mb -lt $required_mb ]; then
        return 1
    fi
    return 0
}

# Calcular tamanho de diretório em MB
get_dir_size_mb() {
    du -sm "$1" 2>/dev/null | awk '{print $1}'
}

# Verificar integridade do ZIP
verify_zip_integrity() {
    local zip_file=$1

    if [ ! -f "$zip_file" ]; then
        return 1
    fi

    if ! unzip -t "$zip_file" >/dev/null 2>&1; then
        return 1
    fi

    return 0
}

#===============================================================================
# CABEÇALHO
#===============================================================================

clear
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${RESET}"
echo -e "${CYAN}║                                                           ║${RESET}"
echo -e "${CYAN}║          🤖 SCRIPT DE ATUALIZAÇÃO SUNGBOT v2.0 🤖         ║${RESET}"
echo -e "${CYAN}║                                                           ║${RESET}"
echo -e "${CYAN}║             Sistema Robusto Anti-Perda de Dados           ║${RESET}"
echo -e "${CYAN}║                                                           ║${RESET}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${RESET}"
echo ""

log "INFO" "═════════════════ INÍCIO DA ATUALIZAÇÃO ═════════════════"

# Verificar modo de execução
if [ "${1:-}" == "2" ]; then
    INICIAR_BOT=false
    info "Modo: Atualização sem inicialização automática"
else
    INICIAR_BOT=true
    info "Modo: Atualização com inicialização automática"
fi

info "Log sendo salvo em: $LOG_FILE"
echo ""

#===============================================================================
# ETAPA 1: VERIFICAÇÕES PRÉ-REQUISITOS
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 1: VERIFICAÇÕES DE PRÉ-REQUISITOS                  ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Verificar se está rodando como root ou usuário com permissões
if [ ! -w "." ]; then
    fatal_error "Sem permissões de escrita no diretório atual!"
fi
success "Permissões de escrita: OK"

# Verificar pacotes necessários
info "Verificando pacotes necessários..."
MISSING_PACKAGES=""

if ! command_exists zip; then
    MISSING_PACKAGES="${MISSING_PACKAGES} zip"
fi

if ! command_exists unzip; then
    MISSING_PACKAGES="${MISSING_PACKAGES} unzip"
fi

if ! command_exists git; then
    MISSING_PACKAGES="${MISSING_PACKAGES} git"
fi

if ! command_exists npm; then
    warning "npm não está instalado. Instalação/atualização de dependências pode falhar."
fi

if [ ! -z "$MISSING_PACKAGES" ]; then
    error "Pacotes faltando:$MISSING_PACKAGES"
    error "Por favor, instale os pacotes necessários:"
    error "  apt-get update && apt-get install -y$MISSING_PACKAGES"
    exit 1
fi
success "Todos os pacotes necessários estão instalados"

# Verificar se a pasta dados existe
if [ ! -d "dados" ]; then
    fatal_error "Pasta 'dados' não encontrada! Nada para fazer backup."
fi
success "Pasta 'dados' encontrada"

# Calcular tamanho da pasta dados
DADOS_SIZE=$(get_dir_size_mb "dados")
info "Tamanho da pasta dados: ${DADOS_SIZE}MB"

# Verificar espaço em disco (precisa de 3x o tamanho dos dados para segurança)
REQUIRED_SPACE=$((DADOS_SIZE * 3 + 100))
if ! check_disk_space $REQUIRED_SPACE; then
    fatal_error "Espaço em disco insuficiente! Necessário: ~${REQUIRED_SPACE}MB"
fi
success "Espaço em disco: OK"

# Verificar conectividade com GitHub
info "Verificando conectividade com GitHub..."
if git ls-remote "$REPO_URL" HEAD >/dev/null 2>&1; then
    success "Conectividade com GitHub: OK"
else
    fatal_error "Não foi possível conectar ao repositório do GitHub!"
fi

echo ""

#===============================================================================
# ETAPA 2: BACKUP TRIPLO DOS DADOS
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 2: BACKUP TRIPLO DOS DADOS (PROTEÇÃO MÁXIMA)      ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Criar diretório de backup para rollback
info "Criando backup de rollback completo..."
mkdir -p "$BACKUP_DIR"
cp -r * "$BACKUP_DIR/" 2>/dev/null || true
cp -r .[!.]* "$BACKUP_DIR/" 2>/dev/null || true
success "Backup de rollback criado: $BACKUP_DIR/"
ROLLBACK_AVAILABLE=true

# Backup 1: Backup principal com timestamp
info "Criando backup principal dos dados..."
if zip -r -q "$DADOS_BACKUP" dados >> "$LOG_FILE" 2>&1; then
    success "Backup principal criado: $DADOS_BACKUP"
else
    fatal_error "Falha ao criar backup principal dos dados!"
fi

# Verificar integridade do backup principal
info "Verificando integridade do backup principal..."
if verify_zip_integrity "$DADOS_BACKUP"; then
    success "Integridade do backup principal: OK"
else
    fatal_error "Backup principal está corrompido!"
fi

# Calcular checksum do backup
CHECKSUM_ORIGINAL=$(md5sum "$DADOS_BACKUP" | awk '{print $1}')
info "Checksum do backup: $CHECKSUM_ORIGINAL"

# Backup 2: Backup de segurança (sobrescreve o anterior se existir)
info "Criando backup de segurança..."
if zip -r -q "$DADOS_BACKUP_SEGURANCA" dados >> "$LOG_FILE" 2>&1; then
    success "Backup de segurança criado: $DADOS_BACKUP_SEGURANCA"
else
    warning "Falha ao criar backup de segurança (não crítico)"
fi

# Contar arquivos na pasta dados
TOTAL_FILES=$(find dados -type f 2>/dev/null | wc -l)
info "Total de arquivos no backup: $TOTAL_FILES"

echo ""

#===============================================================================
# ETAPA 3: LIMPEZA SEGURA DO DIRETÓRIO
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 3: LIMPEZA SEGURA DO DIRETÓRIO                     ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

info "Removendo arquivos e pastas antigas (mantendo backups)..."

# Lista de arquivos críticos a serem preservados
PRESERVE_FILES=("$DADOS_BACKUP" "$DADOS_BACKUP_SEGURANCA" "$BACKUP_DIR" "$LOG_FILE")

# Criar padrão de exclusão para find
FIND_EXCLUDE=""
for file in "${PRESERVE_FILES[@]}"; do
    FIND_EXCLUDE="$FIND_EXCLUDE ! -name '$file'"
done

# Remover apenas pastas e arquivos que não são críticos
eval "find . -maxdepth 1 $FIND_EXCLUDE ! -name '.' ! -name '..' -exec rm -rf {} \;" 2>/dev/null || true

success "Limpeza concluída (backups preservados)"

echo ""

#===============================================================================
# ETAPA 4: CLONAGEM DO REPOSITÓRIO
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 4: CLONAGEM DO REPOSITÓRIO ATUALIZADO              ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

info "Clonando repositório do SUNGBOT..."
if git clone --depth 1 "$REPO_URL" SUNGBOT >> "$LOG_FILE" 2>&1; then
    success "Repositório clonado com sucesso"
else
    fatal_error "Falha ao clonar repositório!"
fi

# Verificar se o clone foi bem-sucedido
if [ ! -d "SUNGBOT" ]; then
    fatal_error "Diretório SUNGBOT não foi criado!"
fi

# Contar arquivos clonados
CLONED_FILES=$(find SUNGBOT -type f 2>/dev/null | wc -l)
info "Arquivos clonados: $CLONED_FILES"

# Mover arquivos do repositório
info "Movendo arquivos do repositório..."
if mv SUNGBOT/* . 2>/dev/null; then
    success "Arquivos movidos"
fi

# Mover arquivos ocultos também
if mv SUNGBOT/.[!.]* . 2>/dev/null; then
    success "Arquivos ocultos movidos"
fi

# Remover diretório temporário
rm -rf SUNGBOT
success "Diretório temporário removido"

echo ""

#===============================================================================
# ETAPA 5: REMOÇÃO DA PASTA DADOS DO REPOSITÓRIO
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 5: PREPARAÇÃO PARA RESTAURAÇÃO DOS DADOS           ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

# CRÍTICO: Remover a pasta dados que veio do repositório
if [ -d "dados" ]; then
    warning "Pasta 'dados' do repositório detectada - removendo para evitar conflito..."
    rm -rf dados
    success "Pasta 'dados' do repositório removida"
fi

echo ""

#===============================================================================
# ETAPA 6: RESTAURAÇÃO DOS DADOS COM VALIDAÇÃO
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 6: RESTAURAÇÃO E VALIDAÇÃO DOS DADOS               ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

info "Extraindo backup dos dados..."
if unzip -o -q "$DADOS_BACKUP" -d . >> "$LOG_FILE" 2>&1; then
    success "Backup extraído com sucesso"
else
    fatal_error "Falha ao extrair backup dos dados!"
fi

# VALIDAÇÕES CRÍTICAS DA RESTAURAÇÃO
info "Validando restauração dos dados..."

# 1. Verificar se a pasta dados foi criada
if [ ! -d "dados" ]; then
    fatal_error "Pasta 'dados' não foi restaurada!"
fi
success "Pasta 'dados' restaurada"

# 2. Verificar se há arquivos dentro
RESTORED_FILES=$(find dados -type f 2>/dev/null | wc -l)
info "Arquivos restaurados: $RESTORED_FILES"

if [ $RESTORED_FILES -eq 0 ]; then
    fatal_error "Nenhum arquivo foi restaurado na pasta dados!"
fi

# 3. Comparar quantidade de arquivos
if [ $RESTORED_FILES -ne $TOTAL_FILES ]; then
    warning "Quantidade de arquivos restaurados ($RESTORED_FILES) difere do backup ($TOTAL_FILES)"
    warning "Isso pode indicar problema na restauração!"

    # Não é fatal, mas alerta o usuário
    echo ""
    warning "Deseja continuar mesmo assim? (pressione CTRL+C para cancelar em 10 segundos)"
    sleep 10
else
    success "Quantidade de arquivos: OK ($RESTORED_FILES/$TOTAL_FILES)"
fi

# 4. Verificar tamanho da pasta restaurada
RESTORED_SIZE=$(get_dir_size_mb "dados")
info "Tamanho da pasta restaurada: ${RESTORED_SIZE}MB (original: ${DADOS_SIZE}MB)"

if [ $RESTORED_SIZE -lt $((DADOS_SIZE - 5)) ]; then
    warning "Tamanho da pasta restaurada é significativamente menor que o original!"
    warning "Original: ${DADOS_SIZE}MB | Restaurado: ${RESTORED_SIZE}MB"
fi

success "Validação dos dados: CONCLUÍDA"

# Limpar backup temporário
info "Removendo backup temporário..."
rm -f "$DADOS_BACKUP"
success "Backup temporário removido"

info "Backup de segurança mantido em: $DADOS_BACKUP_SEGURANCA"

echo ""

#===============================================================================
# ETAPA 7: RECOMPILAÇÃO DE MÓDULOS NATIVOS
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 7: RECOMPILAÇÃO DE MÓDULOS NATIVOS                 ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

if command_exists npm && [ -f "package.json" ]; then
    info "Recompilando módulos nativos..."

    if npm rebuild >> "$LOG_FILE" 2>&1; then
        success "Módulos recompilados com sucesso"
    else
        warning "Alguns módulos podem não ter sido recompilados corretamente"
        warning "Verifique o log para mais detalhes: $LOG_FILE"
    fi
else
    warning "npm não disponível ou package.json não encontrado - pulando rebuild"
fi

echo ""

#===============================================================================
# ETAPA 8: LIMPEZA E FINALIZAÇÃO
#===============================================================================

info "╔═══════════════════════════════════════════════════════════╗"
info "║  ETAPA 8: LIMPEZA E FINALIZAÇÃO                           ║"
info "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Remover diretório de backup (rollback não é mais necessário)
if [ -d "$BACKUP_DIR" ]; then
    info "Removendo backup de rollback (não mais necessário)..."
    rm -rf "$BACKUP_DIR"
    success "Backup de rollback removido"
fi

# Manter backup de segurança
info "Backup de segurança mantido para referência futura"
info "  Localização: $DADOS_BACKUP_SEGURANCA"
info "  Para remover: rm $DADOS_BACKUP_SEGURANCA"

echo ""

#===============================================================================
# ETAPA 9: INICIALIZAÇÃO (OPCIONAL)
#===============================================================================

if [ "$INICIAR_BOT" = true ]; then
    info "╔═══════════════════════════════════════════════════════════╗"
    info "║  ETAPA 9: INICIALIZANDO BOT                               ║"
    info "╚═══════════════════════════════════════════════════════════╝"
    echo ""

    if [ -f "package.json" ] && command_exists npm; then
        info "Executando npm start..."
        log "INFO" "Iniciando bot via npm start"
        npm start
    else
        warning "package.json não encontrado ou npm não disponível"
        info "Inicie o bot manualmente"
    fi
else
    info "╔═══════════════════════════════════════════════════════════╗"
    info "║  ATUALIZAÇÃO CONCLUÍDA (SEM INICIALIZAÇÃO)                ║"
    info "╚═══════════════════════════════════════════════════════════╝"
    echo ""
fi

#===============================================================================
# RELATÓRIO FINAL
#===============================================================================

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${RESET}"
echo -e "${GREEN}║                                                           ║${RESET}"
echo -e "${GREEN}║          ✓ ATUALIZAÇÃO CONCLUÍDA COM SUCESSO! ✓           ║${RESET}"
echo -e "${GREEN}║                                                           ║${RESET}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${RESET}"
echo ""

success "RESUMO DA ATUALIZAÇÃO:"
echo ""
echo -e "  ${CYAN}→${RESET} Arquivos no backup original: ${GREEN}$TOTAL_FILES${RESET}"
echo -e "  ${CYAN}→${RESET} Arquivos restaurados: ${GREEN}$RESTORED_FILES${RESET}"
echo -e "  ${CYAN}→${RESET} Tamanho dos dados: ${GREEN}${RESTORED_SIZE}MB${RESET}"
echo -e "  ${CYAN}→${RESET} Backup de segurança: ${GREEN}$DADOS_BACKUP_SEGURANCA${RESET}"
echo -e "  ${CYAN}→${RESET} Log detalhado: ${GREEN}$LOG_FILE${RESET}"
echo ""

info "Para visualizar o log completo:"
echo -e "  ${YELLOW}cat $LOG_FILE${RESET}"
echo ""

info "Para remover os arquivos de backup e log após verificar que tudo está OK:"
echo -e "  ${YELLOW}rm $DADOS_BACKUP_SEGURANCA $LOG_FILE${RESET}"
echo ""

log "INFO" "═════════════════ ATUALIZAÇÃO CONCLUÍDA COM SUCESSO ═════════════════"

exit 0
