#!/bin/bash

# Diretório do bot — usado pra filtrar zumbis com segurança
BOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 🚫 Bloqueia Ctrl+Z neste shell (evita SIGTSTP virar zumbi em estado Tl)
trap '' SIGTSTP

cleanup_files() {
    rm -f *jpg *webp *opus *jpeg *.mp* *m4a *ga *.ogg *mp4 *mp3
}

# Mata processos node iniciar.js travados (estado T/t/Z) cujo cwd é o BOT_DIR.
# Preserva instâncias rodando normais e processos de outros bots (visu2, bot1, bot2).
cleanup_zombies() {
    local killed=0
    local pids
    pids=$(pgrep -f "node.*iniciar\.js" 2>/dev/null)
    [ -z "$pids" ] && return 0

    for pid in $pids; do
        # pular o próprio shell
        [ "$pid" = "$$" ] && continue
        [ "$pid" = "$PPID" ] && continue
        # precisa conseguir ler /proc do pid
        [ ! -r "/proc/$pid/cwd" ] && continue
        local cwd state
        cwd=$(readlink "/proc/$pid/cwd" 2>/dev/null)
        # só age em processos do BOT_DIR (filtro de segurança)
        [ "$cwd" != "$BOT_DIR" ] && continue
        # estado: 3º campo de /proc/<pid>/stat — T/t (stopped/traced) ou Z (zombie)
        state=$(awk '{print $3}' "/proc/$pid/stat" 2>/dev/null)
        case "$state" in
            T|t|Z)
                kill -9 "$pid" 2>/dev/null && killed=$((killed + 1))
                ;;
        esac
    done

    if [ "$killed" -gt 0 ]; then
        echo -e "\e[33m🧹 ${killed} processo(s) zumbi removido(s) de ${BOT_DIR}\e[0m"
    fi
}

start_node_script() {
    cleanup_zombies
    echo -e "\e[32m🚀 SUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    echo -e "\e[36m✨ Sistema de autenticação interativo ativado\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js
    return $?
}

# Ctrl+Z bloqueado via trap acima. Use Ctrl+C duplo para encerrar completamente.

# ===== SCRIPT SIMPLIFICADO =====
# Redis inicia automaticamente via iniciar.js

echo -e "\e[95m════════════════════════════════════════════════════════════════════════════════\e[0m"
echo -e "\e[96m                           🤖 SUNG BOT - INICIALIZAÇÃO                         \e[0m"
echo -e "\e[95m════════════════════════════════════════════════════════════════════════════════\e[0m"
echo -e "\e[93m🔧 SISTEMA DE AUTENTICAÇÃO INTELIGENTE ATIVADO\e[0m"
echo -e "\e[92m✅ QR Code e Código de Emparelhamento disponíveis\e[0m"
echo -e "\e[94m📱 Você escolherá o método durante a inicialização\e[0m"
echo -e "\e[95m════════════════════════════════════════════════════════════════════════════════\e[0m"

while :
do
    cleanup_files
    start_node_script
    EXIT_CODE=$?

    # Se o código de saída for 0 (Ctrl+C duplo), para tudo
    if [ $EXIT_CODE -eq 0 ]; then
        echo -e "\e[92m✅ Encerramento completo (Ctrl+C duplo). Parando o script.\e[0m"
        exit 0
    fi

    # Caso contrário (código 1 = Ctrl+C simples ou erro), reinicia
    sleep 3
done
