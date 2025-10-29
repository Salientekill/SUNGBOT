#!/bin/bash

# ╔═══════════════════════════════════════════════════════╗
# ║         RESET DE SESSÃO WHATSAPP - Dual Mode          ║
# ║              Redis + SQLite Support                   ║
# ╚═══════════════════════════════════════════════════════╝
#
# Este script limpa a sessão do bot baseado na configuração do settings.json
# Após executar, o bot pedirá para escanear QR code novamente.
#
# USO: bash reset.sh

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║      🔄 RESET DE SESSÃO WHATSAPP - Dual Mode          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# ===== FUNÇÕES AUXILIARES =====

# Detectar qual storage está configurado no dados/settings.json
detect_storage_mode() {
    if [ -f dados/settings.json ]; then
        STORAGE_MODE=$(grep '"storage"' dados/settings.json 2>/dev/null | sed 's/.*"storage".*:.*"\([^"]*\)".*/\1/' | tr '[:upper:]' '[:lower:]')

        if [ -z "$STORAGE_MODE" ]; then
            STORAGE_MODE="sqlite"
        fi
    else
        STORAGE_MODE="sqlite"
    fi

    echo "$STORAGE_MODE"
}

# Verificar se Redis está disponível
check_redis_available() {
    # Verificar se redis-cli existe
    if ! command -v redis-cli &>/dev/null; then
        return 1
    fi

    # Tentar Unix Socket
    if redis-cli -s /run/redis/redis-server.sock ping &>/dev/null 2>&1; then
        echo "socket:/run/redis/redis-server.sock"
        return 0
    fi

    # Tentar socket local
    if [ -f .redis/redis.sock ] && redis-cli -s .redis/redis.sock ping &>/dev/null 2>&1; then
        echo "socket:.redis/redis.sock"
        return 0
    fi

    # Tentar TCP
    if redis-cli ping &>/dev/null 2>&1; then
        echo "tcp"
        return 0
    fi

    return 1
}

# Obter BotId
get_bot_id() {
    if [ -f .bot-session-id ]; then
        cat .bot-session-id
    else
        echo ""
    fi
}

# ===== INÍCIO DO PROCESSO =====

STORAGE_MODE=$(detect_storage_mode)
echo "📊 Storage configurado: $STORAGE_MODE"
echo ""

# ===== VERIFICAR O QUE SERÁ DELETADO BASEADO NO STORAGE CONFIGURADO =====

if [ "$STORAGE_MODE" = "redis" ]; then
    # ===== MODO REDIS - PRECISA DE BOTID =====
    BOTID=$(get_bot_id)

    if [ -z "$BOTID" ]; then
        echo "⚠️  Arquivo .bot-session-id não encontrado!"
        echo ""
        read -p "Digite o BotId para resetar: " BOTID

        if [ -z "$BOTID" ]; then
            echo "❌ BotId não pode ser vazio!"
            exit 1
        fi
    else
        echo "🆔 BotId: $BOTID"
    fi

    echo ""
    echo "═══════════════════════════════════════════════════════"
    echo ""

    REDIS_CONNECTION=$(check_redis_available)
    REDIS_AVAILABLE=$?

    if [ $REDIS_AVAILABLE -ne 0 ]; then
        echo "❌ ERRO: Storage configurado como Redis mas Redis não está disponível!"
        echo ""
        echo "Verifique:"
        echo "  • Redis está rodando?"
        echo "  • Comando redis-cli está instalado?"
        echo ""
        exit 1
    fi

    # Contar chaves
    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        SOCKET_PATH="${REDIS_CONNECTION#socket:}"
        REDIS_KEYS_COUNT=$(redis-cli -s "$SOCKET_PATH" keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    else
        REDIS_KEYS_COUNT=$(redis-cli keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    fi

    echo "📊 Dados encontrados (Redis):"
    echo "   • Conexão: $REDIS_CONNECTION"
    echo "   • Chaves: $REDIS_KEYS_COUNT"
    echo ""

    if [ $REDIS_KEYS_COUNT -eq 0 ]; then
        echo "ℹ️  Nenhuma sessão encontrada no Redis para '$BOTID'!"
        exit 0
    fi

else
    # ===== MODO SQLITE - NÃO PRECISA DE BOTID =====
    echo "═══════════════════════════════════════════════════════"
    echo ""

    SQLITE_DB_PATH="dados/DB/SUNG-AUTH.db"

    if [ ! -f "$SQLITE_DB_PATH" ]; then
        echo "ℹ️  Nenhuma sessão encontrada no SQLite!"
        echo "   Arquivo esperado: $SQLITE_DB_PATH"
        exit 0
    fi

    SQLITE_SIZE=$(du -h "$SQLITE_DB_PATH" 2>/dev/null | cut -f1 || echo "?")

    echo "📊 Dados encontrados (SQLite):"
    echo "   • Arquivo: $SQLITE_DB_PATH"
    echo "   • Tamanho: $SQLITE_SIZE"
    echo ""
fi

echo "═══════════════════════════════════════════════════════"
echo ""
echo "⚠️  ATENÇÃO:"
echo ""
echo "   Esta ação irá:"
echo "   • Deletar TODAS as credenciais do WhatsApp"
echo "   • Deletar TODAS as chaves de criptografia"
echo "   • Deletar TODOS os dados de sessão"
echo ""
echo "   Após o reset:"
echo "   • O bot pedirá QR code ou código novamente"
echo "   • Será como uma nova instalação"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

read -p "🔴 Digite 'SIM' para confirmar o RESET: " confirma

if [ "$confirma" != "SIM" ]; then
    echo ""
    echo "❌ Reset cancelado!"
    echo ""
    exit 0
fi

echo ""
echo "🔄 Processando reset..."
echo ""

# Criar diretório de backup
mkdir -p ./backups 2>/dev/null || true

BACKUP_TIMESTAMP=$(date +%Y%m%d-%H%M%S 2>/dev/null || echo "backup")
ITEMS_DELETED=0

# ===== EXECUTAR LIMPEZA BASEADO NO STORAGE =====

if [ "$STORAGE_MODE" = "redis" ]; then
    echo "🗑️  Limpando Redis..."
    echo ""

    # Backup das chaves
    BACKUP_FILE="./backups/redis-keys-${BOTID}-${BACKUP_TIMESTAMP}.txt"

    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        SOCKET_PATH="${REDIS_CONNECTION#socket:}"
        redis-cli -s "$SOCKET_PATH" keys "sessions:${BOTID}:*" > "$BACKUP_FILE" 2>/dev/null

        # Deletar usando SCAN + UNLINK (mais seguro)
        redis-cli -s "$SOCKET_PATH" --scan --pattern "sessions:${BOTID}:*" 2>/dev/null | while read key; do
            redis-cli -s "$SOCKET_PATH" unlink "$key" &>/dev/null
            ITEMS_DELETED=$((ITEMS_DELETED + 1))
        done

        # Remover registro de bot ativo
        redis-cli -s "$SOCKET_PATH" del "active-bot:${BOTID}" &>/dev/null || true
    else
        redis-cli keys "sessions:${BOTID}:*" > "$BACKUP_FILE" 2>/dev/null

        # Deletar usando SCAN + UNLINK
        redis-cli --scan --pattern "sessions:${BOTID}:*" 2>/dev/null | while read key; do
            redis-cli unlink "$key" &>/dev/null
            ITEMS_DELETED=$((ITEMS_DELETED + 1))
        done

        # Remover registro de bot ativo
        redis-cli del "active-bot:${BOTID}" &>/dev/null || true
    fi

    echo "   ✅ Redis limpo"
    [ -f "$BACKUP_FILE" ] && echo "   📦 Backup: $BACKUP_FILE"

else
    echo "🗑️  Limpando SQLite..."
    echo ""

    # Backup do arquivo
    SQLITE_BACKUP="./backups/sqlite-${BOTID}-${BACKUP_TIMESTAMP}.db"
    cp "$SQLITE_DB_PATH" "$SQLITE_BACKUP" 2>/dev/null && echo "   📦 Backup: $SQLITE_BACKUP"

    # Deletar arquivo
    rm -f "$SQLITE_DB_PATH" 2>/dev/null

    if [ ! -f "$SQLITE_DB_PATH" ]; then
        echo "   ✅ SQLite limpo"
        ITEMS_DELETED=1
    else
        echo "   ⚠️  Erro ao deletar arquivo"
    fi
fi

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║             ✅ RESET CONCLUÍDO COM SUCESSO!           ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resumo:"
if [ "$STORAGE_MODE" = "redis" ]; then
    echo "   • BotId: $BOTID"
fi
echo "   • Storage: $STORAGE_MODE"
echo ""
echo "🔄 Próximos passos:"
echo ""
echo "   1. Inicie o bot: node iniciar.js"
echo "   2. Escaneie o QR code novamente"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
