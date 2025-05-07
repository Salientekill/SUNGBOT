#!/bin/bash

# Mensagens de log coloridas
GREEN="\e[32m"
RED="\e[31m"
RESET="\e[0m"

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
    rm DADOS.zip && \
    echo -e "${GREEN}Executando o start.sh${RESET}" && \
    npm start && \
    echo -e "${GREEN}Script concluído com sucesso${RESET}"
else
    echo -e "${RED}Falha ao criar o arquivo ZIP. O script será encerrado.${RESET}"
fi
