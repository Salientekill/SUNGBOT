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

# ===== TETO DE HEAP DO V8 CONFORME A COTA DO CONTAINER =====
# O V8 dimensiona o heap pela RAM que ENXERGA — e dentro de um container o
# /proc/meminfo mostra a do HOST, não a cota do painel. Num plano de 2 GB
# rodando sobre um host de 64 GB, o Node conclui que pode usar ~4 GB: nunca
# sente pressão, adia o GC maior, os Buffers de mídia seguem vivos e a RSS sobe
# até o container sufocar. Pior: o GC que enfim roda é um mark-compact enorme,
# que PARA o bot — é daí que vem o "lento pra executar" junto com RAM alta.
#
# Aqui a cota real é lida do cgroup e repassada ao V8. Sem cota detectável
# (VPS, PC), nada é passado e o comportamento continua o de antes.
# Override manual: SUNG_HEAP_MB=900
detectar_cota_mb() {
    local bytes=""
    # cgroup v2
    if [ -r /sys/fs/cgroup/memory.max ]; then
        bytes=$(cat /sys/fs/cgroup/memory.max 2>/dev/null)
        [ "$bytes" = "max" ] && bytes=""
    fi
    # cgroup v1
    if [ -z "$bytes" ] && [ -r /sys/fs/cgroup/memory/memory.limit_in_bytes ]; then
        bytes=$(cat /sys/fs/cgroup/memory/memory.limit_in_bytes 2>/dev/null)
    fi
    case "$bytes" in ''|*[!0-9]*) return 1 ;; esac
    local mb=$((bytes / 1048576))
    # o cgroup v1 usa um sentinela gigante quando NÃO há limite; e cota mínima
    # abaixo disso não dá para rodar mesmo.
    [ "$mb" -lt 256 ] && return 1
    [ "$mb" -gt 65536 ] && return 1
    echo "$mb"
}

# ===== ARENAS DO MALLOC =====
# O glibc cria até 8 arenas de malloc POR NÚCLEO e praticamente não as devolve
# ao sistema. Num host grande — e o libvips/sharp abre threads — isso vira
# dezenas de MB parados que não aparecem no heap do V8 nem em `external`: caem
# na fatia "não atribuído" do !memoria, que na medição de 17/09 tinha 233 MB.
# Limitar a 2 é o ajuste padrão para Node em container. Só afeta alocação
# nativa; nada de lógica do bot muda.
export MALLOC_ARENA_MAX="${MALLOC_ARENA_MAX:-2}"

NODE_FLAGS=(--trace-deprecation)
if [ -n "$SUNG_HEAP_MB" ]; then
    NODE_FLAGS+=(--max-old-space-size="$SUNG_HEAP_MB")
    echo -e "\e[96m🧠 Heap do V8 fixado em ${SUNG_HEAP_MB} MB (SUNG_HEAP_MB)\e[0m"
elif COTA_MB=$(detectar_cota_mb); then
    # Metade da cota, MAS com teto absoluto. A outra metade é do motor Rust
    # (WASM ~200 MB), do glibc (~220 MB) e do binário do Node (~57 MB), que
    # vivem FORA do heap do V8 — entregar a cota inteira ao heap não adianta.
    #
    # O teto de 768 MB veio de medição, não de chute: o conjunto VIVO do heap
    # é ~460 MB (e cai para ~360 com o build leve), então 768 dá de 1,7x a 2x
    # de folga. Sem ele, numa cota de 2,3 GB o V8 ganhava 1177 MB e usava —
    # era isso que permitia o pico de 1,8 GB de RSS. Bound no heap é o que
    # limita o pico; a base se resolve no tamanho do código.
    HEAP_MB=$((COTA_MB / 2))
    [ "$HEAP_MB" -gt 768 ] && HEAP_MB=768
    [ "$HEAP_MB" -lt 384 ] && HEAP_MB=384
    NODE_FLAGS+=(--max-old-space-size="$HEAP_MB")
    echo -e "\e[96m🧠 Cota do container: ${COTA_MB} MB → heap do V8 limitado a ${HEAP_MB} MB\e[0m"
fi

start_node_script() {
    cleanup_zombies
    echo -e "\e[32m🚀 SUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    echo -e "\e[36m✨ Sistema de autenticação interativo ativado\e[0m"
    # node em foreground normal — Ctrl+C, SIGINT, SIGTERM funcionam como esperado.
    # SIGTSTP (Ctrl+Z) é interceptado dentro do iniciar.js via process.on('SIGTSTP')
    # e tratado como no-op, evitando suspensão e conflito 440.
    NODE_NO_WARNINGS=1 node "${NODE_FLAGS[@]}" iniciar.js
    return $?
} 2> >(grep -v -E "^.+: line [0-9]+: *[0-9]+ +(Killed|Terminated|Hangup)" >&2)

# Ctrl+Z bloqueado via trap acima. Use Ctrl+C duplo para encerrar completamente.

# ===== SCRIPT SIMPLIFICADO =====
# Sem serviço externo para subir: a sessão vive em dados/DB/SUNG-AUTH.db.

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
