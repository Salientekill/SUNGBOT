#!/bin/bash

# Diretório do bot — usado pra filtrar zumbis com segurança
BOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 🚫 Ctrl+Z desabilitado no NÍVEL DO TTY (não no nível do processo).
# Quando rodado via `npm start`, há 3 processos no foreground group: npm,
# bash start.sh, node. SIGTSTP do TTY suspende todos. Trap apenas no shell
# ou handler apenas no node não basta — o `npm` (pai) suspende mesmo assim.
# `stty -susp` REMOVE o caractere de suspensão do terminal: Ctrl+Z vira um
# byte qualquer e nunca gera SIGTSTP. Restauramos no exit (trap EXIT).
if [ -t 0 ]; then
    OLD_STTY=$(stty -g 2>/dev/null) || OLD_STTY=
    stty susp '' intr ^C 2>/dev/null
    trap 'stty susp \^Z 2>/dev/null; [ -n "$OLD_STTY" ] && stty "$OLD_STTY" 2>/dev/null' EXIT
fi
trap '' SIGTSTP  # defesa em profundidade — caso algum filho herde TTY com susp

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

}

start_node_script() {
    cleanup_zombies
    echo -e "\e[32m🚀 SUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    echo -e "\e[36m✨ Sistema de autenticação interativo ativado\e[0m"
    # node em foreground normal — Ctrl+C, SIGINT, SIGTERM funcionam como esperado.
    # SIGTSTP (Ctrl+Z) é interceptado dentro do iniciar.js via process.on('SIGTSTP')
    # e tratado como no-op, evitando suspensão e conflito 440.
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js
    return $?
} 2> >(grep -v -E "^.+: line [0-9]+: *[0-9]+ +(Killed|Terminated|Hangup)" >&2)

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

# ===== PREFLIGHT: módulo nativo x versão do Node do container =====
# O node_modules distribuído pode ter sido compilado numa versão de Node com ABI
# diferente da do container (ex.: build em Node 24 / NODE_MODULE_VERSION 137, mas o
# container roda Node 22 / 127). Aí o better-sqlite3 quebra no boot com
# "was compiled against a different Node.js version". Se ele não carregar, baixamos
# o binário certo PARA ESTE Node via prebuild-install (sem compilador). No-op quando
# já está compatível — só age quando há mismatch.
ensure_native_ok() {
    if node -e "require('better-sqlite3')" >/dev/null 2>&1; then
        return 0
    fi
    local abi; abi=$(node -e 'process.stdout.write(String(process.versions.modules))' 2>/dev/null)
    echo -e "\e[93m⚠️ better-sqlite3 incompatível com este Node (ABI ${abi}). Baixando o binário nativo correto...\e[0m"
    if ( cd "$BOT_DIR/node_modules/better-sqlite3" && npm run install ) >/dev/null 2>&1 \
       && node -e "require('better-sqlite3')" >/dev/null 2>&1; then
        echo -e "\e[92m✅ better-sqlite3 ajustado para este Node. Iniciando...\e[0m"
    else
        echo -e "\e[91m❌ Não deu para ajustar o better-sqlite3 automaticamente.\e[0m"
        # Versão lida do package.json: fixa no texto ela envelhece e passa a
        # mandar o dono DESCER de versão (estava em 12.9.0 com o projeto em
        # 12.11.1), o que ainda briga com o package-lock.
        local versao_bsq
        versao_bsq=$(node -p "require('$BOT_DIR/package.json').dependencies['better-sqlite3']" 2>/dev/null || echo '')
        echo -e "\e[91m   Rode no console do painel:  npm install better-sqlite3@${versao_bsq:-latest}\e[0m"
        echo -e "\e[91m   OU use a MESMA versão do Node do build (Node 24) no painel.\e[0m"
    fi
}
ensure_native_ok

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
    # [perf] reduzido de 3s p/ 1.5s — o restart é o vetor DOMINANTE de reconexão,
    # então esse sleep entra em toda reconexão. Os circuit-breakers (515/outdated/
    # conflito) já fazem exit 0 para parar loops, então 1.5s não causa storm de CPU.
    sleep 1.5
done
