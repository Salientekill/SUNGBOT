#!/bin/bash

# ╔═══════════════════════════════════════════════════════╗
# ║            RESET DE SESSÃO WHATSAPP                   ║
# ╚═══════════════════════════════════════════════════════╝
#
# Apaga a sessão do bot. Depois de rodar, o bot pede QR code (ou código de
# pareamento) de novo.
#
# A sessão vive num arquivo só: dados/DB/SUNG-AUTH.db, o store nativo da
# baileyrs. Houve um tempo em que ela podia viver no Redis, e este script
# tinha dois modos; o Redis saiu do bot em jun/2026 (ioredis removido no
# commit 522ae98b52) e o ramo ficou aqui sem ter como ser alcançado, porque
# dados/settings.json fixa "storage": "sqlite" e nenhum .js lê essa chave.
#
# USO: bash reset.sh

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║          🔄 RESET DE SESSÃO WHATSAPP                  ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# ===== FUNÇÕES AUXILIARES =====

# Obter BotId (prioriza dados/.bot-session-id que é o correto)
get_bot_id() {
    if [ -f dados/.bot-session-id ]; then
        cat dados/.bot-session-id
    elif [ -f .bot-session-id ]; then
        cat .bot-session-id
    else
        echo ""
    fi
}

# ===== INÍCIO DO PROCESSO =====

SQLITE_DB_PATH="dados/DB/SUNG-AUTH.db"

if [ ! -f "$SQLITE_DB_PATH" ]; then
    echo "ℹ️  Nenhuma sessão encontrada!"
    echo "   Arquivo esperado: $SQLITE_DB_PATH"
    exit 0
fi

SQLITE_SIZE=$(du -h "$SQLITE_DB_PATH" 2>/dev/null | cut -f1 || echo "?")

echo "📊 Dados encontrados:"
echo "   • Arquivo: $SQLITE_DB_PATH"
echo "   • Tamanho: $SQLITE_SIZE"
echo ""

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

echo "🗑️  Limpando a sessão..."
echo ""

# Obter BotId para backup (se existir)
BOTID=$(get_bot_id)
[ -z "$BOTID" ] && BOTID="session"

# Backup antes de apagar — é o que torna isto reversível
SQLITE_BACKUP="./backups/sqlite-${BOTID}-${BACKUP_TIMESTAMP}.db"
cp "$SQLITE_DB_PATH" "$SQLITE_BACKUP" 2>/dev/null && echo "   📦 Backup: $SQLITE_BACKUP"

# Deletar os 3 arquivos do SQLite (WAL mode)
ITEMS_DELETED=0
for ext in "" "-shm" "-wal"; do
    if [ -f "${SQLITE_DB_PATH}${ext}" ]; then
        rm -f "${SQLITE_DB_PATH}${ext}" 2>/dev/null
        [ ! -f "${SQLITE_DB_PATH}${ext}" ] && ITEMS_DELETED=$((ITEMS_DELETED + 1))
    fi
done

if [ $ITEMS_DELETED -gt 0 ]; then
    echo "   ✅ Sessão limpa ($ITEMS_DELETED arquivos deletados)"
else
    echo "   ⚠️  Nenhum arquivo foi deletado"
fi

BOTID=$(get_bot_id)
if [ -n "$BOTID" ]; then
    echo "   ℹ️  BotId mantido: $BOTID (arquivo dados/.bot-session-id preservado)"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║             ✅ RESET CONCLUÍDO COM SUCESSO!           ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resumo:"
echo "   • Sessão: $SQLITE_DB_PATH"
echo ""
echo "🔄 Próximos passos:"
echo ""
echo "   1. Inicie o bot: node iniciar.js"
echo "   2. Escaneie o QR code novamente"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
