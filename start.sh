#!/bin/sh

cleanup_files() {
    rm -f *jpg *webp *opus *jpeg *.mp* *m4a *ga *.ogg *mp4 *mp3
}

start_node_script() {
    echo -e "\e[32m🚀 SUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    echo -e "\e[36m✨ Sistema de autenticação interativo ativado\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js
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

    # Aguarda 3 segundos antes de reiniciar (em caso de erro)
    echo -e "\e[93m⏳ Aguardando 3 segundos antes de reiniciar...\e[0m"
    sleep 3

    echo -e "\e[94m🔄 Reiniciando o bot...\e[0m"
done
