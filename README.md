# SUNG BOT V7

<div align="center">
  <img src="https://i.ibb.co/Fq0ThVbF/IMG-20250505-WA1002.jpg" alt="SUNG BOT" width="300" />

  <p align="center">
    <a href="https://github.com/Salientekill/SUNGBOT.git"><img title="Author" src="https://img.shields.io/badge/Author-LotusDev-red.svg?style=for-the-badge&logo=github" /></a>
    <img src="https://img.shields.io/badge/NodeJS-22.0+-green.svg?style=for-the-badge&logo=nodejs" alt="NodeJS Version" />
    <img src="https://img.shields.io/badge/Versão-7.12-blue.svg?style=for-the-badge" alt="Versão" />
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

### 🧠 Memória (variáveis de ambiente)

O consumo de RAM do bot é uma **catraca**: o motor Rust (WASM) e o sharp não
devolvem ao sistema a memória de um pico — ela fica marcada até o bot reiniciar.
Use `!memoria` (dono) para ver em qual camada está o consumo antes de ajustar.

| Variável | Padrão | O que faz |
|---|---|---|
| `SUNG_HEAP_MB` | *(metade da cota)* | Teto do heap do V8. Sem isso o Node dimensiona o heap pela RAM do **host**, não pela cota do painel — num plano de 2 GB ele acha que pode usar ~4 GB, adia o GC e o bot fica lento com a RAM alta. O `start.sh` lê a cota do cgroup e passa metade ao V8; a outra metade é do motor Rust, do sharp e dos Buffers, que vivem fora do heap. Em VPS/PC sem cota, nada é imposto. |
| `SUNG_MEM_LIMITE_PCT` | `85` | Reinicia o bot ao passar dessa % da cota de memória, por 3 leituras seguidas (~15 min). `0` desliga. |
| `SUNG_HISTORICO` | *(mínimo)* | O bot pede o mínimo de histórico no pareamento, já que não usa histórico. `padrao` volta ao comportamento da lib. |
| `SUNG_CACHE_GRUPOS` | *(motor)* | Teto do cache de grupos do motor. |
| `SUNG_CACHE_MSG_RECENTES` | *(motor)* | Teto das mensagens recentes guardadas para reenvio. |
| `SUNG_CACHE_DISPOSITIVOS` | *(motor)* | Teto do cache de dispositivos. |
| `SUNG_CACHE_REGISTRO_DISPOSITIVOS` | *(motor)* | Teto do registro de dispositivos. |
| `SUNG_CACHE_LIDPN` | *(motor)* | Teto do mapeamento LID↔telefone. |
| `SUNG_CACHE_MSG_REENVIADAS` | *(motor)* | Teto das mensagens de grupo já reenviadas. |
| `SUNG_CACHE_RETRY` | *(motor)* | Teto dos contadores de retry. |

Os `SUNG_CACHE_*` **não têm padrão nosso**: sem eles o motor usa os próprios
limites. Defina só depois de ver as contagens no `!memoria` — um teto baixo
demais no cache de grupos vira mais consulta ao servidor e pode render 429.

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
