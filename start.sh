#!/bin/sh

cleanup_files() {
    rm -f *jpg *webp *opus *jpeg *.mp* *m4a *ga *.ogg *mp4 *mp3
}

start_node_script() {
    echo -e "\e[32m🚀 SUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    echo -e "\e[36m✨ Sistema de autenticação interativo ativado\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js
    return $?
}

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
