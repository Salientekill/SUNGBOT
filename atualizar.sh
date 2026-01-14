#!/bin/bash

# Script de Atualização SUNGBOT v2.0
set -euo pipefail
shopt -s extglob  # Habilita !(pattern) para exclusão

# Cores
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
CYAN="\e[36m"
RESET="\e[0m"

# Variáveis
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="atualizar_${TIMESTAMP}.log"
BACKUP_DIR=".backup_${TIMESTAMP}"
DADOS_BACKUP="dados_backup_${TIMESTAMP}.zip"
DADOS_BACKUP_SEG="DADOS_SEGURANCA.zip"
REPO_URL="https://github.com/Salientekill/SUNGBOT.git"
INICIAR_BOT=true
ROLLBACK_OK=false

# Funções de log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

ok() {
    echo -e "${GREEN}✓${RESET} $*"
    log "✓ $*"
}

info() {
    echo -e "${CYAN}•${RESET} $*"
    log "• $*"
}

warn() {
    echo -e "${YELLOW}!${RESET} $*"
    log "! $*"
}

erro() {
    echo -e "${RED}✗${RESET} $*"
    log "✗ $*"
}

fatal() {
    erro "$*"
    if [ "$ROLLBACK_OK" = true ] && [ -d "$BACKUP_DIR" ]; then
        warn "Restaurando estado anterior..."
        rm -rf !(${BACKUP_DIR}|${DADOS_BACKUP_SEG}|${LOG_FILE}) 2>/dev/null || true
        cp -r "$BACKUP_DIR"/* . 2>/dev/null || true
        cp -r "$BACKUP_DIR"/.[!.]* . 2>/dev/null || true
        rm -rf "$BACKUP_DIR"
        ok "Rollback concluído"
    fi
    erro "Log: $LOG_FILE"
    exit 1
}

# Início
clear
echo -e "${CYAN}=== SUNGBOT - Atualização v2.0 ===${RESET}\n"

[ "${1:-}" == "2" ] && INICIAR_BOT=false

log "===== INÍCIO DA ATUALIZAÇÃO ====="

# 1. Verificações
info "Verificando pré-requisitos..."

[ ! -w "." ] && fatal "Sem permissão de escrita"

for cmd in zip unzip git; do
    command -v $cmd >/dev/null 2>&1 || fatal "Pacote '$cmd' não instalado"
done

[ ! -d "dados" ] && fatal "Pasta 'dados' não encontrada"

DADOS_SIZE=$(du -sm "dados" 2>/dev/null | awk '{print $1}')
REQUIRED=$((DADOS_SIZE * 3 + 100))
AVAILABLE=$(df . | awk 'NR==2 {print int($4/1024)}')

[ $AVAILABLE -lt $REQUIRED ] && fatal "Espaço insuficiente (precisa ~${REQUIRED}MB)"

git ls-remote "$REPO_URL" HEAD >/dev/null 2>&1 || fatal "Sem conexão com GitHub"

ok "Pré-requisitos OK"

# 2. Backup
info "Criando backups..."

mkdir -p "$BACKUP_DIR"
# Copiar tudo EXCETO o próprio backup, logs e arquivos temporários
shopt -s dotglob  # Incluir arquivos ocultos
for item in *; do
    [[ "$item" == "$BACKUP_DIR" ]] && continue
    [[ "$item" == "$LOG_FILE" ]] && continue
    [[ "$item" == "$DADOS_BACKUP_SEG" ]] && continue
    [[ "$item" == ".git" ]] && continue
    [[ "$item" == ".npm" ]] && continue
    cp -r "$item" "$BACKUP_DIR/" 2>/dev/null || true
done
shopt -u dotglob
ROLLBACK_OK=true

zip -r -q -y "$DADOS_BACKUP" dados -x '*.sock' -x '*.pid' >> "$LOG_FILE" 2>&1 || fatal "Falha no backup principal"
unzip -t "$DADOS_BACKUP" >/dev/null 2>&1 || fatal "Backup corrompido"

zip -r -q -y "$DADOS_BACKUP_SEG" dados -x '*.sock' -x '*.pid' >> "$LOG_FILE" 2>&1 || warn "Backup de segurança falhou"

TOTAL_FILES=$(find dados -type f 2>/dev/null | wc -l)

ok "Backups criados ($TOTAL_FILES arquivos, ${DADOS_SIZE}MB)"

# 3. Limpeza
info "Limpando diretório..."

find . -maxdepth 1 ! -name "$BACKUP_DIR" ! -name "$DADOS_BACKUP_SEG" \
    ! -name "$DADOS_BACKUP" ! -name "$LOG_FILE" ! -name "." ! -name ".." \
    -exec rm -rf {} \; 2>/dev/null || true

ok "Limpeza concluída"

# 4. Clone
info "Clonando repositório..."

git clone --depth 1 "$REPO_URL" SUNGBOT >> "$LOG_FILE" 2>&1 || fatal "Falha no clone"

[ ! -d "SUNGBOT" ] && fatal "Clone falhou"

mv SUNGBOT/* . 2>/dev/null || true
mv SUNGBOT/.[!.]* . 2>/dev/null || true
rm -rf SUNGBOT

ok "Repositório atualizado"

# 5. Restauração
info "Restaurando dados..."

# Extrai backup por cima da pasta dados do GitHub
# Arquivos antigos sobrescrevem, arquivos novos do GitHub são mantidos
unzip -o -q "$DADOS_BACKUP" -d . >> "$LOG_FILE" 2>&1 || fatal "Falha na restauração"

[ ! -d "dados" ] && fatal "Dados não restaurados"

RESTORED_FILES=$(find dados -type f 2>/dev/null | wc -l)

[ $RESTORED_FILES -eq 0 ] && fatal "Nenhum arquivo restaurado"

if [ $RESTORED_FILES -ne $TOTAL_FILES ]; then
    warn "Arquivos: $RESTORED_FILES/$TOTAL_FILES (diferença detectada)"
else
    ok "Dados restaurados ($RESTORED_FILES arquivos)"
fi

rm -f "$DADOS_BACKUP"

# 6. Rebuild
if command -v npm >/dev/null 2>&1 && [ -f "package.json" ]; then
    info "Recompilando módulos..."
    npm rebuild >> "$LOG_FILE" 2>&1 && ok "Módulos recompilados" || warn "Rebuild com avisos"
fi

# 7. Limpeza final
info "Limpeza final..."

[ -d "$BACKUP_DIR" ] && rm -rf "$BACKUP_DIR"
[ -f "$DADOS_BACKUP_SEG" ] && rm -f "$DADOS_BACKUP_SEG"
[ -f "$DADOS_BACKUP" ] && rm -f "$DADOS_BACKUP"

# Remover pastas desnecessárias para economizar espaço
[ -d ".git" ] && rm -rf .git && info ".git removido"
[ -d ".npm" ] && rm -rf .npm && info ".npm removido"

# Remover todos os logs de atualização
find . -maxdepth 1 -name "atualizar_*.log" -delete 2>/dev/null && info "Logs removidos"

ok "Limpeza final concluída"

# 8. Finalização
echo ""
ok "Atualização concluída!"
echo ""

log "===== ATUALIZAÇÃO CONCLUÍDA ====="

# 9. Iniciar
if [ "$INICIAR_BOT" = true ]; then
    info "Iniciando bot..."
    [ -f "package.json" ] && npm start || warn "Inicie manualmente"
else
    info "Para iniciar: npm start"
fi

exit 0
