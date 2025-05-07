#!/bin/sh

cleanup_files() {
    rm -f *jpg *webp *opus *jpeg *.mp* *m4a *ga *.ogg *mp4 *mp3
}

start_node_script() {
    echo -e "\e[32mSUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js
}

start_node_script_with_code() {
    echo -e "\e[32mSUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js -code
}

start_node_script_with_code2() {
    echo -e "\e[32mSUNG BOT ESTÁ INICIANDO AGUARDE...\e[0m"
    NODE_NO_WARNINGS=1 node --trace-deprecation iniciar.js -code2
}

if echo "$*" | grep -q -- "-code2"; then
    if [ ! -f DADOS/SUNG-QR/creds.json ]; then
        echo -e "\e[32m - iniciado com código de emparelhamento...\e[0m"
        while : 
        do
            cleanup_files
            start_node_script_with_code2
            sleep 1
        done
    else
        while : 
        do
            cleanup_files
            start_node_script
            sleep 1
        done
    fi
elif echo "$*" | grep -q -- "-code"; then
    if [ ! -f DADOS/SUNG-QR/creds.json ]; then
        echo -e "\e[32m - iniciado com código de emparelhamento...\e[0m"
        while : 
        do
            cleanup_files
            start_node_script_with_code
            sleep 1
        done
    else
        while : 
        do
            cleanup_files
            start_node_script
            sleep 1
        done
    fi
else
    while : 
    do
        cleanup_files
        start_node_script
        sleep 1
    done
fi