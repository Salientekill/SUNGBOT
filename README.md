# SUNG BOT V5

<div align="center">
  <img src="https://i.ibb.co/Fq0ThVbF/IMG-20250505-WA1002.jpg" alt="SUNG BOT" width="300" />

  <p align="center">
    <a href="https://github.com/Salientekill/SUNGBOT.git"><img title="Author" src="https://img.shields.io/badge/Author-LotusDev-red.svg?style=for-the-badge&logo=github" /></a>
    <img src="https://img.shields.io/badge/NodeJS-22.0+-green.svg?style=for-the-badge&logo=nodejs" alt="NodeJS Version" />
    <img src="https://img.shields.io/badge/Versão-5.22-blue.svg?style=for-the-badge" alt="Versão" />
  </p>

  > 🚨 **ATENÇÃO: BOT PAGO** 🚨
</div>

Este é um bot privado para WhatsApp com recursos premium. Para ativar o SUNG BOT, é necessária uma chave de acesso. Se você deseja adquirir a chave de ativação, entre no grupo oficial e entre em contato com Lotus.

## 📥 Download

<div align="center">
  <a href="https://github.com/Salientekill/SUNGBOT/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/Download-ZIP-brightgreen?style=for-the-badge" alt="Download ZIP"/>
  </a>
</div>

Ou utilize o Git para clonar o repositório:

```bash
git clone https://github.com/Salientekill/SUNGBOT.git
```

### ⚠️ Aviso Importante de Compatibilidade

**O SUNG BOT não é mais compatível com o Termux** devido à implementação de banco de dados SQLite (`better-sqlite3`), que requer bibliotecas nativas difíceis de compilar no ambiente Android. Recomendamos o uso em:

- **VPS/Servidor Linux**: Para operação 24/7
- **PC com Windows/Linux/Mac**: Para uso pessoal
- **Serviços de hospedagem na nuvem**:
  - [BronxysHost](https://dash.bronxyshost.com) (Parceiro Oficial)

### 🖥️ Requisitos de Sistema

- **Node.js:** v22 ou superior
- **RAM:** Mínimo 512MB (recomendado 1GB+)
- **SQLite:** Bibliotecas de desenvolvimento

### 📋 Processo de Instalação

<details>
<summary>🖱️ Clique para ver instruções detalhadas de instalação</summary>

#### Windows:
1. Instale o [Node.js](https://nodejs.org/)
2. Instale [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
3. Execute no diretório do bot:
   ```bash
   # O bot já vem com os módulos incluídos, apenas execute:
   npm start
   ```

#### Linux (Ubuntu/Debian):
```bash
# Instalar dependências do sistema
sudo apt update
sudo apt install -y nodejs build-essential python3

# Iniciar o bot
cd SUNGBOT
npm start
```

#### Hospedagem BronxysHost (Recomendado):
1. Crie uma conta em [dash.bronxyshost.com](https://dash.bronxyshost.com)
2. Escolha o plano de hospedagem compatível com bots
3. Faça upload dos arquivos do bot
4. Inicie o serviço a partir do painel de controle
</details>

## 🚀 Iniciando o Bot

O bot já vem com todos os módulos necessários incluídos, não sendo necessário instalar dependências adicionais.

```bash
# Para iniciar o bot usando QR Code:
bash start.sh

# Para iniciar o bot usando código de emparelhamento:
bash start.sh -code
```

## 🤝 Suporte e Comunidade

Para suporte durante instalação, configuração ou compra de chave, fale com Lotus diretamente ou entre no grupo oficial:

<div align="center">

<a href="https://wa.me/5521972202744">
<img src="https://img.shields.io/badge/Lotus%20(direto)-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Contato direto" />
</a>
&nbsp;
<a href="https://chat.whatsapp.com/GTXYQ9ipObnKfHU1jMPLII">
<img src="https://img.shields.io/badge/Grupo%20Oficial-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Grupo Oficial" />
</a>

</div>

- 📱 **Direto:** [wa.me/+5521972202744](https://wa.me/5521972202744)
- 👥 **Grupo:** [chat.whatsapp.com/GTXYQ9ipObnKfHU1jMPLII](https://chat.whatsapp.com/GTXYQ9ipObnKfHU1jMPLII)

## ✨ Funcionalidades

<div align="center">

### 🛡️ Proteção e Moderação

| Função | Descrição |
|--------|-----------|
| 🔗 **Anti Link** | Bloqueia links indesejados automaticamente |
| 🚫 **Anti Fake** | Remove números falsos/estrangeiros |
| 👤 **Anti Contato** | Previne envio de contatos |
| 📛 **Anti Marcações** | Evita marcações em massa |
| 🔒 **Gestão de Grupo** | Sistemas de abertura/fechamento automático |

### 🎮 Diversão e Interação

| Função | Descrição |
|--------|-----------|
| 📌 **Marca Todos** | Notificações para todos os membros |
| 🎲 **Brincadeiras** | Jogos e interações divertidas |
| 💳 **Sistema Gold** | Economia virtual no grupo |
| 🎯 **Níveis e XP** | Sistema de progressão por atividade |
| 🎵 **Mídia e Downloads** | YouTube, Spotify, TikTok, Instagram |

</div>

## 📊 Recursos em Destaque

- **⏱️ Sistema Anti-Inatividade**: Remove membros inativos automaticamente
- **🎭 Figurinhas**: Crie stickers normais e animados facilmente
- **🤖 Respostas Automáticas**: Configure respostas personalizadas
- **📊 Estatísticas**: Acompanhe dados de atividade do grupo
- **🔄 Mensagens Programadas**: Agende mensagens para envio automático

## 🧩 Exemplos de Comandos

```
!menu        - Exibe o menu principal de comandos
!sticker     - Cria uma figurinha a partir de imagem/vídeo
!play        - Baixa e envia músicas do YouTube
!tiktok      - Baixa vídeos do TikTok sem marca d'água
!gold        - Verifica seu saldo de gold no grupo
!level       - Mostra seu nível e experiência
!ban         - Remove um membro do grupo
```



## 📋 Configuração Necessária

Para configuração avançada, consulte os arquivos:
- `dados/settings.json` - Configurações básicas
- `dados/nescessario.json` - Chaves de API e configurações sensíveis
- `dados/org/json/configsgold.js` - Configuração do sistema gold
- `dados/org/json/configleveling.js` - Configuração do sistema leveling

## 📜 Licença e Informações

Este é um software proprietário. Todos os direitos reservados.
Desenvolvido por Lotus - © 2025-2026

---

<div align="center">
  <p>
    <sub>
      Feito Por: Lotus Dev </>
    </sub>
  </p>
  
  <p>
    <img src="https://visitor-badge.laobi.icu/badge?page_id=Salientekill.SUNGBOT" alt="Visualizações" />
    <a href="https://github.com/Salientekill/SUNGBOT/issues"><img src="https://img.shields.io/github/issues/Salientekill/SUNGBOT" alt="Issues"></a>
  </p>
</div>
