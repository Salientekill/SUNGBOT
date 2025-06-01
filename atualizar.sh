#!/bin/bash

# Mensagens de log coloridas
GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
CYAN="\e[36m"
RESET="\e[0m"

# Desenhar título
echo -e "${CYAN}╔════════════════════════════════════════════════╗${RESET}"
echo -e "${CYAN}║             SCRIPT DE ATUALIZAÇÃO              ║${RESET}"
echo -e "${CYAN}╚════════════════════════════════════════════════╝${RESET}"
echo ""

# Verificar modo de execução
if [ "$1" == "2" ]; then
    MODO="modo sem inicialização"
    INICIAR_BOT=false
    echo -e "${YELLOW}Executando em ${MODO}${RESET}"
else
    MODO="modo com inicialização automática"
    INICIAR_BOT=true
    echo -e "${YELLOW}Executando em ${MODO}${RESET}"
fi

echo ""

# Verificar se os pacotes necessários estão instalados
echo -e "${GREEN}Verificando pacotes necessários...${RESET}"
if [ ! -x "$(command -v zip)" ] || [ ! -x "$(command -v git)" ]; then
    echo -e "${RED}Pacotes zip e/ou git não estão instalados.${RESET}"
    echo -e "${RED}Por favor, instale-os antes de prosseguir.${RESET}"
    echo -e "${RED}Para instalar, execute:${RESET}"
    echo -e "${RED}apt install zip git${RESET}"
    exit 1
fi

# Compactar a pasta DADOS
echo -e "${GREEN}Compactando a pasta DADOS${RESET}"
zip -r DADOS.zip dados

# Verificar se o arquivo DADOS.zip foi criado com sucesso
if [ -f "DADOS.zip" ]; then
    echo -e "${GREEN}Arquivo DADOS.zip criado com sucesso${RESET}"
    echo -e "${GREEN}Removendo todas as pastas, exceto o arquivo compactado${RESET}"
    find . -maxdepth 1 ! -name "DADOS.zip" -type d -exec rm -rf {} \;
    
    # Clonar o repositório do SUNG BOT e executar o start.sh
    echo -e "${GREEN}Clonando o repositório do SUNG BOT${RESET}"
    git clone https://github.com/Salientekill/SUNGBOT.git && \
    mv SUNGBOT/* . && \
    rm -rf SUNGBOT && \
    echo -e "${GREEN}Extraindo o arquivo DADOS.zip${RESET}" && \
    unzip -o DADOS.zip -d . && \
    echo -e "${GREEN}Removendo o arquivo DADOS.zip${RESET}" && \
    rm DADOS.zip
    
    # Recompilar módulos nativos para o servidor atual
    echo -e "${GREEN}Recompilando módulos nativos (npm rebuild)${RESET}"
    npm rebuild
    
    # Verificar se o rebuild foi bem-sucedido
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Módulos recompilados com sucesso${RESET}"
    else
        echo -e "${YELLOW}Aviso: Alguns módulos podem não ter sido recompilados corretamente${RESET}"
    fi
    
    # Iniciar o bot apenas se estiver no modo de inicialização
    if [ "$INICIAR_BOT" = true ]; then
        echo -e "${GREEN}Executando o npm start${RESET}" && \
        npm start
    else
        echo -e "${YELLOW}Atualização concluída sem iniciar o bot${RESET}"
    fi
    
    echo -e "${GREEN}Script concluído com sucesso${RESET}"
else
    echo -e "${RED}Falha ao criar o arquivo ZIP. O script será encerrado.${RESET}"
    exit 1
fi