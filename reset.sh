#!/bin/bash

# ╔═══════════════════════════════════════════════════════╗
# ║         RESET DE SESSÃO WHATSAPP - Dual Mode          ║
# ║              Redis + SQLite Support                   ║
# ╚═══════════════════════════════════════════════════════╝
#
# Este script limpa a sessão do bot tanto no Redis quanto no SQLite.
# Detecta automaticamente qual storage está sendo usado.
# Após executar, o bot pedirá para escanear QR code novamente.
#
# USO: ./reset.sh

set -e

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║      🔄 RESET DE SESSÃO WHATSAPP - Dual Mode          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# ===== FUNÇÕES AUXILIARES =====

# Detectar qual storage está configurado no package.json
detect_storage_mode() {
    if [ -f package.json ]; then
        STORAGE_MODE=$(cat package.json | grep -A 5 '"config"' | grep '"storage"' | sed 's/.*"storage".*"\([^"]*\)".*/\1/' | tr '[:upper:]' '[:lower:]')

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

# ===== DETECÇÃO AUTOMÁTICA DO MODO =====
STORAGE_MODE=$(detect_storage_mode)
REDIS_CONNECTION=$(check_redis_available)
REDIS_AVAILABLE=$?

echo "📊 Detecção de Storage:"
echo "   • Configurado: $STORAGE_MODE"

if [ $REDIS_AVAILABLE -eq 0 ]; then
    echo "   • Redis: ✅ Disponível ($REDIS_CONNECTION)"
else
    echo "   • Redis: ❌ Indisponível"
fi

# Pegar BotId
BOTID=$(get_bot_id)

if [ -z "$BOTID" ]; then
    echo ""
    echo "⚠️  Arquivo .bot-session-id não encontrado!"
    echo ""

    # Se Redis está disponível, listar sessões
    if [ $REDIS_AVAILABLE -eq 0 ]; then
        echo "Opções:"
        echo "  1. Listar sessões Redis disponíveis"
        echo "  2. Listar sessões SQLite disponíveis"
        echo "  3. Digitar BotId manualmente"
        echo "  4. Sair"
        echo ""
        read -p "Escolha (1/2/3/4): " opcao

        case $opcao in
            1)
                echo ""
                echo "📋 Sessões Redis encontradas:"
                if [[ "$REDIS_CONNECTION" == socket:* ]]; then
                    SOCKET_PATH="${REDIS_CONNECTION#socket:}"
                    redis-cli -s "$SOCKET_PATH" keys "sessions:*:creds" | sed 's/sessions://g' | sed 's/:creds//g'
                else
                    redis-cli keys "sessions:*:creds" | sed 's/sessions://g' | sed 's/:creds//g'
                fi
                echo ""
                read -p "Digite o botId para resetar: " BOTID
                ;;
            2)
                echo ""
                echo "📋 Sessões SQLite encontradas:"
                ls -1 dados/DB/*-auth.db 2>/dev/null | sed 's/dados\/DB\///g' | sed 's/-auth.db//g' || echo "   (nenhuma sessão encontrada)"
                echo ""
                read -p "Digite o botId para resetar: " BOTID
                ;;
            3)
                read -p "Digite o botId: " BOTID
                ;;
            *)
                echo "Saindo..."
                exit 0
                ;;
        esac

        if [ -z "$BOTID" ]; then
            echo "❌ BotId não pode ser vazio!"
            exit 1
        fi
    else
        # Apenas SQLite disponível
        echo "📋 Sessões SQLite disponíveis:"
        ls -1 dados/DB/*-auth.db 2>/dev/null | sed 's/dados\/DB\///g' | sed 's/-auth.db//g' || echo "   (nenhuma sessão encontrada)"
        echo ""
        read -p "Digite o botId para resetar: " BOTID

        if [ -z "$BOTID" ]; then
            echo "❌ BotId não pode ser vazio!"
            exit 1
        fi
    fi
else
    echo "   • BotId: $BOTID"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

# ===== VERIFICAR O QUE SERÁ DELETADO =====

REDIS_KEYS_COUNT=0
SQLITE_FILE_EXISTS=0

# Verificar Redis
if [ $REDIS_AVAILABLE -eq 0 ]; then
    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        SOCKET_PATH="${REDIS_CONNECTION#socket:}"
        REDIS_KEYS_COUNT=$(redis-cli -s "$SOCKET_PATH" keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    else
        REDIS_KEYS_COUNT=$(redis-cli keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    fi
fi

# Verificar SQLite
SQLITE_DB_PATH="dados/DB/${BOTID}-auth.db"
if [ -f "$SQLITE_DB_PATH" ]; then
    SQLITE_FILE_EXISTS=1
fi

echo "📊 Status da sessão '$BOTID':"
echo ""

if [ $REDIS_KEYS_COUNT -gt 0 ]; then
    echo "   Redis:"
    echo "   • Chaves encontradas: $REDIS_KEYS_COUNT"
    echo "   • Será limpo: ✅ SIM"
else
    echo "   Redis:"
    echo "   • Chaves encontradas: 0"
    echo "   • Será limpo: ⏭️  NÃO (nada para limpar)"
fi

echo ""

if [ $SQLITE_FILE_EXISTS -eq 1 ]; then
    SQLITE_SIZE=$(du -h "$SQLITE_DB_PATH" | cut -f1)
    echo "   SQLite:"
    echo "   • Arquivo: $SQLITE_DB_PATH"
    echo "   • Tamanho: $SQLITE_SIZE"
    echo "   • Será deletado: ✅ SIM"
else
    echo "   SQLite:"
    echo "   • Arquivo: Não encontrado"
    echo "   • Será deletado: ⏭️  NÃO (nada para deletar)"
fi

echo ""

# Se não há nada para limpar
if [ $REDIS_KEYS_COUNT -eq 0 ] && [ $SQLITE_FILE_EXISTS -eq 0 ]; then
    echo "ℹ️  Nenhuma sessão encontrada para '$BOTID'!"
    echo ""
    echo "Possíveis motivos:"
    echo "  • Bot nunca foi iniciado com este BotId"
    echo "  • Sessão já foi resetada anteriormente"
    echo "  • BotId incorreto ou digitado errado"
    echo ""
    exit 0
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
echo "   • Contatos/grupos terão que sincronizar novamente"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

read -p "🔴 Confirma o RESET da sessão '$BOTID'? (Digite 'SIM' para confirmar): " confirma

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
mkdir -p ./backups

BACKUP_TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ITEMS_DELETED=0

# ===== LIMPAR REDIS =====
if [ $REDIS_KEYS_COUNT -gt 0 ]; then
    echo "1️⃣  Limpando Redis..."
    echo ""

    # Backup das chaves
    BACKUP_FILE="./backups/redis-keys-${BOTID}-${BACKUP_TIMESTAMP}.txt"

    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        SOCKET_PATH="${REDIS_CONNECTION#socket:}"
        redis-cli -s "$SOCKET_PATH" keys "sessions:${BOTID}:*" > "$BACKUP_FILE"

        # Script Lua para deletar rápido
        LUA_SCRIPT='
local pattern = ARGV[1]
local cursor = "0"
local deleted = 0
repeat
    local result = redis.call("SCAN", cursor, "MATCH", pattern, "COUNT", 1000)
    cursor = result[1]
    local keys = result[2]
    if #keys > 0 then
        deleted = deleted + redis.call("UNLINK", unpack(keys))
    end
until cursor == "0"
return deleted
'

        DELETED=$(redis-cli -s "$SOCKET_PATH" --eval <(echo "$LUA_SCRIPT") , "sessions:${BOTID}:*" 2>/dev/null || echo "0")
    else
        redis-cli keys "sessions:${BOTID}:*" > "$BACKUP_FILE"

        # Script Lua para deletar rápido
        LUA_SCRIPT='
local pattern = ARGV[1]
local cursor = "0"
local deleted = 0
repeat
    local result = redis.call("SCAN", cursor, "MATCH", pattern, "COUNT", 1000)
    cursor = result[1]
    local keys = result[2]
    if #keys > 0 then
        deleted = deleted + redis.call("UNLINK", unpack(keys))
    end
until cursor == "0"
return deleted
'

        DELETED=$(redis-cli --eval <(echo "$LUA_SCRIPT") , "sessions:${BOTID}:*" 2>/dev/null || echo "0")
    fi

    if [ -z "$DELETED" ] || [ "$DELETED" = "(nil)" ]; then
        DELETED=0
    fi

    echo "   ✅ Redis limpo: $DELETED chaves deletadas"
    echo "   📦 Backup: $BACKUP_FILE"

    # Remover registro de bot ativo
    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        redis-cli -s "$SOCKET_PATH" del "active-bot:${BOTID}" &>/dev/null || true
    else
        redis-cli del "active-bot:${BOTID}" &>/dev/null || true
    fi

    ITEMS_DELETED=$((ITEMS_DELETED + DELETED))
    echo ""
fi

# ===== LIMPAR SQLITE =====
if [ $SQLITE_FILE_EXISTS -eq 1 ]; then
    echo "2️⃣  Limpando SQLite..."
    echo ""

    # Backup do arquivo
    SQLITE_BACKUP="./backups/sqlite-${BOTID}-${BACKUP_TIMESTAMP}.db"
    cp "$SQLITE_DB_PATH" "$SQLITE_BACKUP" 2>/dev/null || true

    # Deletar arquivo
    rm -f "$SQLITE_DB_PATH"

    if [ ! -f "$SQLITE_DB_PATH" ]; then
        echo "   ✅ SQLite limpo: arquivo deletado"
        echo "   📦 Backup: $SQLITE_BACKUP"
        ITEMS_DELETED=$((ITEMS_DELETED + 1))
    else
        echo "   ⚠️  Erro ao deletar arquivo SQLite"
    fi

    echo ""
fi

# ===== VERIFICAÇÃO FINAL =====
echo "3️⃣  Verificando limpeza..."
echo ""

# Verificar Redis
if [ $REDIS_AVAILABLE -eq 0 ]; then
    if [[ "$REDIS_CONNECTION" == socket:* ]]; then
        SOCKET_PATH="${REDIS_CONNECTION#socket:}"
        REMAINING_REDIS=$(redis-cli -s "$SOCKET_PATH" keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    else
        REMAINING_REDIS=$(redis-cli keys "sessions:${BOTID}:*" 2>/dev/null | wc -l)
    fi

    if [ "$REMAINING_REDIS" -eq 0 ]; then
        echo "   ✅ Redis: todas as chaves removidas"
    else
        echo "   ⚠️  Redis: ainda restam $REMAINING_REDIS chaves"
    fi
fi

# Verificar SQLite
if [ -f "$SQLITE_DB_PATH" ]; then
    echo "   ⚠️  SQLite: arquivo ainda existe"
else
    echo "   ✅ SQLite: arquivo removido"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║             ✅ RESET CONCLUÍDO COM SUCESSO!           ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resumo:"
echo "   • BotId: $BOTID"
echo "   • Storage usado: $STORAGE_MODE"
echo "   • Itens removidos: $ITEMS_DELETED"
echo "   • Backups: ./backups/*${BACKUP_TIMESTAMP}*"
echo ""
echo "🔄 Próximos passos:"
echo ""
echo "   1. Inicie o bot novamente:"
echo "      node iniciar.js"
echo ""
echo "   2. O bot pedirá para escanear QR code ou código"
echo ""
echo "   3. Autentique novamente com o WhatsApp"
echo ""
echo "   4. Aguarde sincronização de contatos/grupos"
echo ""
echo "💡 Dica:"
echo "   • O botId permanece o mesmo: $BOTID"
echo "   • Apenas a sessão WhatsApp foi resetada"
echo "   • Para mudar o botId também, delete: .bot-session-id"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
