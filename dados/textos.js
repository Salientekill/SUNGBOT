// TOMEM CUIDADO, UMA VIRGULA, ATÉ UM ACENTO ERRADO PODE CAUSAR ERRO, SALVE ANTES DE ALTERAR PARA EVITAR PROBLEMAS E FICAR XINGANDO O LOTUS.

// ========================================
// 🚫 FILTRO UNIFICADO DE PALAVRAS PROIBIDAS
// ========================================
const PALAVRAS_FILTRO_UNIFICADO = [
"porra", "carai", "caralho", "buceta", "bct", "teu cu", "meu pau", 
"minha chibata", "pika", "seu cu", "sexo", "gozar", "gozei",
"gay", "cu", "pau", "rola", "vagina", "penis", "pinto", "piroca",
"ppk", "xana", "xoxota", "xereca", "puta", "vadia", "safada",
"arrombado", "viado", "bicha", "traveco", "transex", "puto",
"fdp", "filha da puta", "vai tomar no cu", "cuzao", "otario",
"babaca", "desgraçado", "vagabundo", "prostituta", "putaria"
];

const TEXTOS_GERAL = {

CHOICE_MENU_TIMEOUT_DEFAULT: "⏰ Tempo esgotado. Menu expirado automaticamente.",

MENSAGEM_DOS_ANTI_LINKS: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚫 𝐋𝐈𝐍𝐊 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎! 🚫
┃
┃ 🛡️ Proteção ativada!
┃ Banimento automático!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

MENSAGEM_DE_SO_USAR_EM_GRUPO: `╔════════════════════════════════╗
║ 🏠 𝐀𝐏𝐄𝐍𝐀𝐒 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎𝐒! 🏠
║
║ 📍 Este comando funciona
║ apenas em grupos! 
║
║ 💡 Me adicione em um grupo! 
╚════════════════════════════════╝`,

MENSAGEM_DE_SO_DONO_USAR_COMANDOS: `╭──────────────────────────────╮
│ 👑 𝐀𝐂𝐄𝐒𝐒𝐎 𝐑𝐄𝐒𝐓𝐑𝐈𝐓𝐎! 👑
│
│ ⚡ Comando exclusivo para
│ o proprietário do bot! 
│
│ 🔐 Apenas usuários 
│ autorizados podem usar!
╰──────────────────────────────╯`,

MENSAGEM_DE_SO_ADM_CONSEGUIR_USAR_X_COMANDO: `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🛡️ 𝐀𝐃𝐌𝐈𝐍𝐒 𝐀𝐏𝐄𝐍𝐀𝐒! 🛡️
┃
┃ ⚜️ Somente administradores 
┃ podem usar este comando! 
┃
┃ 📋 Peça para um admin
┃ te promover! 
┗━━━━━━━━━━━━━━━━━━━━━━━┛`,

MENSAGEM_DE_QUANDO_O_BOT_NAO_E_ADM: `╔══════════════════════════════════╗
║ 🤖 𝐁𝐎𝐓 𝐏𝐑𝐄𝐂𝐈𝐒𝐀 𝐒𝐄𝐑 𝐀𝐃𝐌! 🤖
║
║ ⚙️ Para executar este comando,
║ preciso ser administrador! 
║
║ 📝 Peça para um admin me
║ promover!
║
║ 🎯 Com admin posso proteger
║ melhor o grupo!
╚══════════════════════════════════╝`,

// O #prefixo# é padrão para mostrar o prefixo do bot.
MENSAGEM_DE_SO_QUANDO_MODO_BRINCADEIRA_FOR_ATIVO: `┌──────────────────────────┐
│ 🎮 𝐌𝐎𝐃𝐎 𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀! 🎮
│
│ 🎯 Este comando requer que
│ o modo brincadeira esteja 
│ ativado!
│
│ 💡 Use #prefixo#ativacoes
│ para ativar os jogos! 
│
│ 🎪 Diversão garantida!
└──────────────────────────┘`,

// ========================================
// 📋 MENSAGENS DO SISTEMA DE COMANDOS
// ========================================

COMMANDS_SYSTEM: {
// Erros gerais
ERROR_COMMAND_NO_NAME: "❌ Comando sem nome não pode ser registrado",
ERROR_LOAD_COMMANDS_ARRAY: "❌ loadCommands espera um array",
ERROR_COMMAND_EXECUTION: "❌ Erro ao executar o comando",
ERROR_INTERNAL: "❌ Erro interno do sistema",
ERROR_INVALID_TYPE: "❌ Tipo inválido fornecido",

// Permissões estilizadas
PERM_GROUPS_ONLY: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🏠 𝐀𝐏𝐄𝐍𝐀𝐒 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎𝐒! 🏠
┃
┃ 📍 Este comando funciona
┃ apenas em grupos!
┃
┃ 💡 Me adicione em um grupo!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_OWNER_ONLY: `╭─────────────────────────────────╮
│ 👑 𝐀𝐂𝐄𝐒𝐒𝐎 𝐑𝐄𝐒𝐓𝐑𝐈𝐓𝐎! 👑
│
│ ⚡ Comando exclusivo para
│ o proprietário do bot!
│
│ 🔐 Apenas usuários
│ autorizados podem usar!
╰─────────────────────────────────╯`,

PERM_ADMIN_ONLY: `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🛡️ 𝐀𝐃𝐌𝐈𝐍𝐒 𝐀𝐏𝐄𝐍𝐀𝐒! 🛡️
┃
┃ ⚜️ Somente administradores
┃ podem usar este comando!
┃
┃ 📋 Peça para um admin
┃ te promover!
┗━━━━━━━━━━━━━━━━━━━━━━━┛`,

PERM_BOT_ADMIN_ONLY: `╔══════════════════════════════════╗
║ 🤖 𝐁𝐎𝐓 𝐏𝐑𝐄𝐂𝐈𝐒𝐀 𝐒𝐄𝐑 𝐀𝐃𝐌! 🤖
║
║ ⚙️ Para executar este comando,
║ preciso ser administrador!
║
║ 📝 Peça para um admin me
║ promover!
║
║ 🎯 Com admin posso proteger
║ melhor o grupo!
╚══════════════════════════════════╝`,

PERM_CREATOR_ONLY: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👨‍💻 𝐂𝐑𝐈𝐀𝐃𝐎𝐑 𝐀𝐏𝐄𝐍𝐀𝐒! 👨‍💻
┃
┃ 🔥 Este comando é exclusivo
┃ para o criador do grupo!
┃
┃ 👑 Nível máximo necessário!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_NSFW_REQUIRED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔞 𝐌𝐎𝐃𝐎 𝐍𝐒𝐅𝐖! 🔞
┃
┃ ⚠️ Este comando requer
┃ modo NSFW ativado!
┃
┃ 🔐 Conteúdo adulto!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_PREMIUM_ONLY: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐀𝐏𝐄𝐍𝐀𝐒! 💎
┃
┃ ⭐ Este comando é exclusivo
┃ para usuários premium!
┃
┃ 🚀 Upgrade sua conta!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_GAME_MODE_REQUIRED: `┌──────────────────────────┐
│ 🎮 𝐌𝐎𝐃𝐎 𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀! 🎮
│
│ 🎯 Este comando requer que
│ o modo brincadeira esteja
│ ativado!
│
│ 💡 Use #prefix#ativacoes
│ para ativar os jogos!
│
│ 🎪 Diversão garantida!
└──────────────────────────┘`,

PERM_GOLD_MODE_REQUIRED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🏆 𝐌𝐎𝐃𝐎 𝐆𝐎𝐋𝐃! 🏆
┃
┃ ⚡ O modo gold precisa
┃ estar ativado!
┃
┃ 💰 Recursos premium!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_LEVELING_REQUIRED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📊 𝐌𝐎𝐃𝐎 𝐋𝐄𝐕𝐄𝐋𝐈𝐍𝐆! 📊
┃
┃ 📈 O modo leveling precisa
┃ estar ativado!
┃
┃ 🎮 Sistema de experiência!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

PERM_ADMIN_ONLY_GROUP: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔒 𝐆𝐑𝐔𝐏𝐎 𝐑𝐄𝐒𝐓𝐑𝐈𝐓𝐎! 🔒
┃
┃ 🛡️ Apenas administradores
┃ podem usar comandos
┃ neste grupo!
┃
┃ 📋 Configuração ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// Mensagens de bloqueio e banimento
USER_BANNED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚫 𝐔𝐒𝐔Á𝐑𝐈𝐎 𝐁𝐀𝐍𝐈𝐃𝐎! 🚫
┃
┃ ❌ Você foi banido de utilizar
┃ os comandos do bot!
┃
┃ 📞 Entre em contato com o
┃ proprietário para saber o motivo
┃
┃ 🛡️ Sistema de proteção ativo!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

COMMAND_BLOCKED_GLOBAL: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔒 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐁𝐋𝐎𝐐𝐔𝐄𝐀𝐃𝐎! 🔒
┃
┃ ⚠️ Este comando está bloqueado
┃ pelo dono e não pode ser
┃ utilizado em lugar nenhum!
┃
┃ 🛡️ Proteção global ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

COMMAND_BLOCKED_GROUP: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚫 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐁𝐋𝐎𝐐𝐔𝐄𝐀𝐃𝐎! 🚫
┃
┃ ⚠️ Este comando está bloqueado
┃ neste grupo!
┃
┃ 👥 Bloqueio específico do grupo
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// Argumentos e menções
ARG_MENTION_REQUIRED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👤 𝐌𝐄𝐍Ç𝐀̃𝐎 𝐍𝐄𝐂𝐄𝐒𝐒Á𝐑𝐈𝐀! 👤
┃
┃ 📝 Marque alguém ou responda
┃ a mensagem de alguém!
┃
┃ 💡 Exemplo: @usuario
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ARG_USAGE_FORMAT: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📋 𝐔𝐒𝐎 𝐂𝐎𝐑𝐑𝐄𝐓𝐎! 📋
┃
┃ 💡 Use: #prefix##comando# #uso#
┃
┃ ℹ️ Argumentos necessários!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ARG_INSUFFICIENT: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ❌ 𝐀𝐑𝐆𝐔𝐌𝐄𝐍𝐓𝐎𝐒! ❌
┃
┃ 📝 Argumentos insuficientes!
┃
┃ 💡 Use: #prefix##comando# #uso#
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// Cooldowns estilizados
COOLDOWN_ACTIVE: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⏱️ 𝐂𝐎𝐎𝐋𝐃𝐎𝐖𝐍 𝐀𝐓𝐈𝐕𝐎! ⏱️
┃
┃ 🚫 Comando "#comando#" em
┃ cooldown!
┃
┃ ⏰ Aguarde #tempo# para usar
┃ novamente!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

COOLDOWN_USER_LIMITED: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚫 𝐋𝐈𝐌𝐈𝐓𝐄 𝐀𝐓𝐈𝐍𝐆𝐈𝐃𝐎! 🚫
┃
┃ ⏱️ Você está limitado!
┃
┃ ⏰ Aguarde #tempo# para usar
┃ qualquer comando!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// Outras mensagens de cooldown (mantendo formato simples para logs/configuração)
COOLDOWN_NATIVE_EXISTS: "Este comando tem cooldown nativo ({TIME}) que não pode ser alterado.",
COOLDOWN_GLOBAL_SET: "Cooldown global definido: {TIME} para \"{COMMAND}\".",
COOLDOWN_GROUP_SET: "Cooldown do grupo definido: {TIME} para \"{COMMAND}\".",
COOLDOWN_GLOBAL_REMOVED: "Cooldown global removido para \"{COMMAND}\".",
COOLDOWN_GROUP_REMOVED: "Cooldown do grupo removido para \"{COMMAND}\".",
COOLDOWN_GLOBAL_NOT_EXISTS: "Não existe cooldown global para \"{COMMAND}\".",
COOLDOWN_GROUP_NOT_EXISTS: "Não existe cooldown do grupo para \"{COMMAND}\".",
COOLDOWN_NATIVE_CANNOT_REMOVE: "Este comando tem cooldown nativo que não pode ser removido.",
COOLDOWN_PERM_OWNER_GLOBAL: "Apenas o dono pode definir cooldowns globais.",
COOLDOWN_PERM_ADMIN_GROUP: "Apenas administradores podem definir cooldowns do grupo.",
COOLDOWN_PERM_OWNER_REMOVE_GLOBAL: "Apenas o dono pode remover cooldowns globais.",
COOLDOWN_PERM_ADMIN_REMOVE_GROUP: "Apenas administradores podem remover cooldowns do grupo.",
COOLDOWN_GLOBAL_EXISTS: "Este comando tem cooldown global ({TIME}) definido pelo dono."
},

// ========================================
// 💰 SISTEMA EMOJI GOLD
// ========================================

EMOJI_GOLD: {
// Mensagem de novo desafio
// #emojibot# = emoji do bot, #palavra# = palavra do desafio, #reward# = quantidade de gold, #prefix# = prefixo
NOVO_DESAFIO: `╭━━━━━━━━━━━━━━╮
┃ #emojibot# 𝐄𝐌𝐎𝐉𝐈 𝐆𝐎𝐋𝐃 #emojibot#
╰━━━━━━━━━━━━━━╯

🎯 *NOVO DESAFIO!*

📌 Emoji para: *#palavra#*
🏆 Prêmio: *#reward# Golds*
⚡ O primeiro a acertar, ganha!

💡 *#prefix#mencgold* para alertas`,

// Mensagem de novo desafio MODO NOTURNO
NOVO_DESAFIO_NOTURNO: `╭━━━━━━━━━━━━━━╮
┃ 🌙 𝐌𝐎𝐃𝐎 𝐍𝐎𝐓𝐔𝐑𝐍𝐎 🌙
╰━━━━━━━━━━━━━━╯

🎯 *DESAFIO INSÔNIA!*

📌 Emoji para: *#palavra#*
🏆 Prêmio: *#reward# Golds* (3x) 🌙
⚡ O primeiro a acertar, ganha!

💡 *#prefix#mencgold* para alertas`,

// Mensagem de novo desafio com MULTIPLICADOR GRUPAL
NOVO_DESAFIO_MULTI: `╭━━━━━━━━━━━━━━╮
┃ #emojibot# 𝐄𝐌𝐎𝐉𝐈 𝐆𝐎𝐋𝐃 #emojibot#
╰━━━━━━━━━━━━━━╯

🎯 *NOVO DESAFIO!*

📌 Emoji para: *#palavra#*
🏆 Prêmio: *#reward# Golds*
👥 Multiplicador grupal: *#multi#x*
⚡ O primeiro a acertar, ganha!

💡 *#prefix#mencgold* para alertas`,

// Mensagem EMOJI DO DIA
EMOJI_DO_DIA: `╭━━━━━━━━━━━━━━╮
┃ ⭐ 𝐄𝐌𝐎𝐉𝐈 𝐃𝐎 𝐃𝐈𝐀 ⭐
╰━━━━━━━━━━━━━━╯

🌟 *DESAFIO ESPECIAL!*

📌 Emoji para: *#palavra#*
💎 Prêmio ÚNICO: *#reward# Golds*
⚡ Apenas o PRIMEIRO acerta ganha!

🔥 Este é o emoji especial do dia!`,

// Mensagem de sucesso quando acerta
// #reward# = quantidade de gold, #points# = quantidade de pontos
ACERTOU: `┏━━━━━━━━━━━━━┓
┃ 🎉 𝐀𝐂𝐄𝐑𝐓𝐎𝐔! 🎉
┗━━━━━━━━━━━━━┛

✅ Resposta correta!
💰 *+#reward#* Golds
⭐ *+#points#* Pontos

🔥 Continue jogando!`,

// Mensagem de acerto COM COMBO
ACERTOU_COMBO: `┏━━━━━━━━━━━━━┓
┃ 🎉 𝐀𝐂𝐄𝐑𝐓𝐎𝐔! 🎉
┗━━━━━━━━━━━━━┛

✅ Resposta correta!
💰 *+#reward#* Golds
⭐ *+#points#* Pontos
🔥 Combo: *#streak#* | Multiplicador: *#multi#x*

🚀 Continue a sequência!`,

// Lista de quem perdeu combo quando outro acertou (aparece na mensagem de acerto)
COMBOS_PERDIDOS: `
💔 *Perderam o combo:* #lista_perdidos#`,

// Mensagem de conquista desbloqueada
CONQUISTA_DESBLOQUEADA: `┏━━━━━━━━━━━━━━━━┓
┃ 🏆 𝐂𝐎𝐍𝐐𝐔𝐈𝐒𝐓𝐀! 🏆
┗━━━━━━━━━━━━━━━━┛

#emoji# *#nome#*
✨ Desbloqueada!

💰 Recompensa: *+#gold#* Golds
🎉 Parabéns pelo feito!`,

// Mensagem do emoji do dia já foi ganho
EMOJI_DIA_JA_GANHO: `⭐ O Emoji do Dia de hoje já foi ganho por @#winner#!

💡 Volte amanhã para ter sua chance!`,

// Mensagens de erro (apenas para logs)
ERRORS: {
FILE_NOT_FOUND: '[EMOJIGOLD] Arquivo de emojis não encontrado',
INVALID_FORMAT: '[EMOJIGOLD] Formato de arquivo inválido',
READ_ERROR: '[EMOJIGOLD] Erro ao ler arquivo',
INIT_FAILED: '[EMOJIGOLD] Falha ao inicializar dados do grupo',
GENERATE_FAILED: '[EMOJIGOLD] Falha ao gerar emoji',
SEND_ERROR: '[EMOJIGOLD] Erro ao enviar',
PROCESSING_ERROR: '[EMOJIGOLD] Erro no processamento'
}
},

// ========================================
// 🛡️ MENSAGENS DOS SISTEMAS ANTI
// ========================================

ANTI_IMAGEM_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🖼️ 𝐈𝐌𝐀𝐆𝐄𝐍𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐀𝐒! 🖼️
┃
┃ 🚫 Imagens não são permitidas
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_VIDEO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🎥 𝐕Í𝐃𝐄𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 🎥
┃
┃ 🚫 Vídeos não são permitidos
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_AUDIO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔊 Á𝐔𝐃𝐈𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 🔊
┃
┃ 🚫 Áudios não são permitidos
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_STICKER_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🎭 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐀𝐒! 🎭
┃
┃ 🚫 Figurinhas não são permitidas
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_DOCUMENTO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📄 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 📄
┃
┃ 🚫 Documentos não são permitidos
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_CONTATO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👤 𝐂𝐎𝐍𝐓𝐀𝐓𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 👤
┃
┃ 🚫 Contatos não são permitidos
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_LOCALIZACAO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📍 𝐋𝐎𝐂𝐀𝐋𝐈𝐙𝐀Ç𝐀̃𝐎 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐀! 📍
┃
┃ 🚫 Localizações não são permitidas
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_CATALOGO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🛒 𝐂𝐀𝐓Á𝐋𝐎𝐆𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 🛒
┃
┃ 🚫 Catálogos não são permitidos
┃ neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_INTERATIVO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🎮 𝐈𝐍𝐓𝐄𝐑𝐀𝐓𝐈𝐕𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 🎮
┃
┃ 🚫 Mensagens interativas não
┃ são permitidas neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_PAGAMENTO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💳 𝐏𝐀𝐆𝐀𝐌𝐄𝐍𝐓𝐎𝐒 𝐏𝐑𝐎𝐈𝐁𝐈𝐃𝐎𝐒! 💳
┃
┃ 🚫 Solicitações de pagamento
┃ não são permitidas!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_MENCAO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📢 𝐌𝐔𝐈𝐓𝐀𝐒 𝐌𝐄𝐍Ç𝐎̃𝐄𝐒! 📢
┃
┃ 🚫 Muitas menções detectadas!
┃ Isso não é permitido!
┃
┃ 🛡️ Proteção contra spam!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_PALAVRAO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🤬 𝐏𝐀𝐋𝐀𝐕𝐑𝐀̃𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎! 🤬
┃
┃ 🚫 Palavras proibidas não são
┃ permitidas neste grupo!
┃
┃ 🛡️ Linguagem adequada!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_LINK_GRUPO_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔗 𝐋𝐈𝐍𝐊 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎! 🔗
┃
┃ 🚫 Links de grupos não são
┃ permitidos neste grupo!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_STATUS_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 📢 𝐌𝐄𝐍Ç𝐀̃𝐎 𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒! 📢
┃
┃ 🚫 Menções ao grupo em status
┃ não são permitidas!
┃
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_NOTAS_MSG: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💰 𝐍𝐎𝐓𝐀𝐒 𝐅𝐀𝐊𝐄𝐒! 💰
┃
┃ 🚫 Notas falsas não são
┃ permitidas neste grupo!
┃
┃ 🛡️ Proteção contra fraudes!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// ========================================
// 🛡️ MENSAGENS DO SISTEMA ANTI-ROUBO
// ========================================

ANTI_ROUBO_PROMOCAO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 𝐃𝐄 𝐒𝐄𝐆𝐔𝐑𝐀𝐍Ç𝐀 ⚠️
┃
┃ 🚫 Administrador rebaixado por
┃ promover sem permissão!
┃
┃ 👤 Admin: @#admin#
┃ 👥 Promovido(s): #promovidos#
┃
┃ 🔨 Todos foram rebaixados!
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_ROUBO_REBAIXAMENTO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 𝐃𝐄 𝐒𝐄𝐆𝐔𝐑𝐀𝐍Ç𝐀 ⚠️
┃
┃ 🚫 Administrador rebaixado por
┃ rebaixar sem permissão!
┃
┃ 👤 Admin: @#admin#
┃ 👥 Rebaixado(s): #rebaixados#
┃
┃ ⬆️ Admins foram promovidos
┃ novamente!
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_ROUBO_REMOCAO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 𝐃𝐄 𝐒𝐄𝐆𝐔𝐑𝐀𝐍Ç𝐀 ⚠️
┃
┃ 🚫 Administrador rebaixado por
┃ remover sem permissão!
┃
┃ 👤 Admin: @#admin#
┃ 👥 Removido(s): #removidos#
┃
┃ 📢 Admins removidos podem ser
┃ adicionados novamente pelo
┃ criador do grupo!
┃ 🛡️ Proteção ativa!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_ROUBO_BOT_REBAIXADO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚨 𝐀𝐋𝐄𝐑𝐓𝐀 𝐂𝐑Í𝐓𝐈𝐂𝐎! 🚨
┃
┃ ⚠️ Minha administração foi
┃ removida por: @#admin#
┃
┃ 🛡️ Sistema anti-roubo
┃ DESATIVADO!
┃
┃ ⚠️ CUIDADO! Isto pode ser uma
┃ tentativa de ataque ao grupo!
┃
┃ 👑 Apenas donos autorizados
┃ devem me promover novamente!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ANTI_ROUBO_BOT_REMOVIDO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚨 𝐀𝐋𝐄𝐑𝐓𝐀 𝐂𝐑Í𝐓𝐈𝐂𝐎! 🚨
┃
┃ 💥 FUI REMOVIDO DO GRUPO!
┃
┃ 📝 Grupo: #nomegrupo#
┃ 🆔 ID: #idgrupo#
┃
┃ 👤 Removido por: @#admin#
┃
┃ 🔄 Preciso ser adicionado
┃ novamente para continuar
┃ protegendo o grupo!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// ========================================
// 🚪 MENSAGENS DE ENTRADA E BANIMENTO
// ========================================

BEM_VINDO_PADRAO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🎉 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀)! 🎉
┃
┃ 👋 Olá @#usuario#!
┃ 🏠 Seja bem-vindo(a) ao
┃ grupo #nomegrupo#!
┃
┃ 📋 Leia as regras e
┃ divirta-se! ✨
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

DESPEDIDA_PADRAO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👋 𝐀𝐃𝐄𝐔𝐒! 👋
┃
┃ 😢 @#usuario# saiu do grupo
┃ #nomegrupo#
┃
┃ 🍃 Que a vida te leve
┃ a caminhos incríveis! ✨
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ENTRADA_E_BANIDO_LISTANEGRA: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⛔ 𝐋𝐈𝐒𝐓𝐀 𝐍𝐄𝐆𝐑𝐀! ⛔
┃
┃ @#usuario# foi removido(a)
┃ por estar na lista negra
┃ global!
┃
┃ 🛡️ Proteção automática!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ENTRADA_E_BANIDO_GRUPO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🚫 𝐋𝐈𝐒𝐓𝐀 𝐍𝐄𝐆𝐑𝐀! 🚫
┃
┃ @#usuario# foi removido(a)
┃ por estar na lista negra
┃ deste grupo!
┃
┃ 🛡️ Proteção automática!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

ENTRADA_E_BANIDO_ANTIFAKE: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ❌ 𝐀𝐍𝐓𝐈-𝐅𝐀𝐊𝐄! ❌
┃
┃ @#usuario# foi removido(a)
┃ por não ser um número
┃ brasileiro!
┃
┃ 🇧🇷 Apenas números BR são
┃ permitidos neste grupo!
┃
┃ 🛡️ Proteção automática!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// ========================================
// 👁️ MENSAGENS DO SISTEMA X9 
// ========================================

X9_MENSAGEM_DELETADA_TITULO: "⚠️ 𝐌𝐒𝐆 𝐃𝐄𝐋𝐄𝐓𝐀𝐃𝐀 ⚠️",

X9_MENSAGEM_EDITADA_TITULO: "🔄 𝐌𝐒𝐆 𝐄𝐃𝐈𝐓𝐀𝐃𝐀 🔄",

// ===== NOVOS TEXTOS PARA EVENTOS X9 =====

X9_PROMOCAO_TITULO: "👑 𝐏𝐑𝐎𝐌𝐎Ç𝐀̃𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀 👑",

X9_REBAIXAMENTO_TITULO: "⬇️ 𝐑𝐄𝐁𝐀𝐈𝐗𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎 ⬇️",

X9_LINK_RESET_TITULO: "🔗 𝐋𝐈𝐍𝐊 𝐑𝐄𝐃𝐄𝐅𝐈𝐍𝐈𝐃𝐎 🔗",

X9_MENSAGEM_FIXADA_TITULO: "📌 𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐅𝐈𝐗𝐀𝐃𝐀 📌",

X9_MENSAGEM_DESAFIXADA_TITULO: "📌 𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐃𝐄𝐒𝐀𝐅𝐈𝐗𝐀𝐃𝐀 📌",

X9_APROVACAO_REJEITADA_TITULO: "❌ 𝐒𝐎𝐋𝐈𝐂𝐈𝐓𝐀Ç𝐀̃𝐎 𝐑𝐄𝐉𝐄𝐈𝐓𝐀𝐃𝐀 ❌",

// ========================================
// 🎉 MENSAGENS DE EVENTOS ESPECIAIS
// ========================================

DONO_PROMOVIDO_AUTO: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝐏𝐑𝐎𝐌𝐎Ç𝐀̃𝐎 𝐀𝐔𝐓𝐎𝐌Á𝐓𝐈𝐂𝐀! 👑
┃
┃ 🎉 O dono @#dono# foi
┃ promovido automaticamente
┃ a administrador!
┃
┃ ⚡ Sistema de proteção
┃ ativado!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

MENSAGENS_DE_AGUARDE: [
"⏳ *Aguarde, estou processando...*",
"🔄 *Preparando sua solicitação...*",
"⚡ *Processando, só um momento!*",
"🎯 *Aguarde alguns segundos...*",
"🚀 *Preparando sua resposta!*",
"⭐ *Um momento, por favor...*",
"💫 *Estou trabalhando nisso!*",
"🔔 *Processando seu pedido...*",
"⏰ *Já está quase pronto!*",
"💪 *Trabalhando na sua solicitação!*",
"🌟 *Carregando... Aguarde!*",
"🔥 *Processamento em andamento!*",
"💯 *Quase lá, aguarde um pouco!*",
"🎮 *Loading... Por favor, aguarde!*",
"📢 *Sua solicitação está sendo processada!*",
"💧 *Enquanto isso, beba água! 😄*",
"🍀 *Aguarde, a resposta está chegando!*",
"⚖️ *Analisando sua solicitação...*",
"🏃‍♂️ *Indo buscar a informação!*",
"🎪 *Preparando algo especial para você!*",
"🔮 *Consultando a base de dados...*",
"🎯 *Focado na sua solicitação!*",
"⚡ *Rapidinho! Só um momento!*",
"🌈 *Processando com carinho!*",
"🎨 *Preparando uma resposta caprichada!*",
"🔍 *Buscando as melhores informações...*",
"💻 *Sistema trabalhando a todo vapor!*",
"🎲 *Calculando a resposta perfeita...*",
"🧠 *Pensando na melhor resposta!*",
"📊 *Analisando os dados...*",
"🎵 *Processando ao som da produtividade!*",
"🚀 *Turbinando os motores!*",
"⭐ *Alinhando as informações...*",
"🔧 *Ajustando os últimos detalhes!*",
"🎭 *Preparando o espetáculo da resposta!*",
"📱 *Sincronizando com o servidor...*",
"🌟 *Polindo a resposta para você!*",
"🎯 *Mirando na resposta certeira!*",
"⚡ *Energia máxima para processar!*",
"🔄 *Girando os algoritmos...*",
"💎 *Lapidando uma resposta valiosa!*",
"🎨 *Criando algo incrível!*",
"🚀 *Decolando em direção à resposta!*",
"⏳ *Cronômetro rodando, aguarde!*",
"🔥 *Aquecendo os processadores!*",
"💫 *Magia digital acontecendo!*",
"🎪 *Show da informação começando!*",
"⚡ *Raio veloz da resposta chegando!*",
"🌟 *Brilho da solução aparecendo!*",
"🎯 *Acertando em cheio sua necessidade!*",
"🔧 *Engrenagens funcionando perfeitamente!*"
],

// LINK DA IMAGEM DO COMANDO DE CASAL
LINK_COMANDO_CASAL: "https://i.ibb.co/zndm1Pc/K88c2-Bk-Qwlc-F.jpg",

// TEXTO DO COMANDO DE CASAL // O #porcentagem# vai puxar de 0 a 100.
TEXTO_COMANDO_CASAL: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💕 𝐂𝐀𝐒𝐀𝐋 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 💕
┃
┃ 🌟 Compatibilidade: #porcentagem#% ✨
┃ 💫 Chances de dar certo: 😏
┃
┃ 🔥 Que a paixão seja eterna! 💖
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// PALAVRAS QUE SÃO PROIBIDAS DO SIMIH FALAR (usando o filtro unificado).
COMANDO_BAN_MENSAGEM: `╔═══════════════════════╗
║ 🔨 𝐔𝐒𝐔Á𝐑𝐈𝐎 𝐑𝐄𝐌𝐎𝐕𝐈𝐃𝐎! 🔨
║
║ 👤 #usuario#
║ ⚖️ Foi removido(a) com 
║ sucesso por motivos justos 
║
║ 📋 Ação da moderação
╚═══════════════════════╝`,

COMANDO_PROMOVEU_MENSAGEM: `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👑 𝐍𝐎𝐕𝐎 𝐀𝐃𝐌𝐈𝐍! 👑
┃
┃ 🎉 #usuario# 
┃ ⬆️ Foi promovido(a) para 
┃ administrador! 
┃
┃ 🛡️ Use os poderes com
┃ sabedoria! 
┗━━━━━━━━━━━━━━━━━━━━━━━┛`,

COMANDO_REBAIXOU_MENSAGEM: `╭────────────────────────────────╮
│ ⬇️ 𝐑𝐄𝐁𝐀𝐈𝐗𝐀𝐌𝐄𝐍𝐓𝐎! ⬇️
│
│ 👤 #usuario# 
│ 📉 Foi rebaixado para
│ membro comum 
│
│ ⚖️ Decisão da administração 
╰────────────────────────────────╯`,

LIMITE_CARACTERES_MSG: `╔════════════════════════════════╗
║ ⚠️ 𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐋𝐎𝐍𝐆𝐀! ⚠️
║
║ 📏 Muitos caracteres enviados!
║ Contra as normas do grupo!
║
║ ✂️ Por precaução, irei remover.
║ 🛡️ Proteção ativada!
╚════════════════════════════════╝`,

MENSAGEM_GRUPO_ABRIU: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔓 𝐆𝐑𝐔𝐏𝐎 𝐀𝐁𝐄𝐑𝐓𝐎! 🔓
┃
┃ 🎉 Todos podem enviar
┃ mensagens agora! 
┃
┃ 💬 Conversem e se divirtam!
┃ 📋 Sigam as regras!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// ==== MENSAGENS COMPLETAS DOS EVENTOS X9 ====

X9_LINK_RESET_MSG: `🔗 *LINK REDEFINIDO*\n\nO admin @#admin# acabou de redefinir o link do grupo.`,

X9_PROMOCAO_MSG: `👑 *PROMOÇÃO DETECTADA*\n\n@#promovido# foi promovido(a) a administrador por @#admin#.`,

X9_REBAIXAMENTO_MSG: `⬇️ *REBAIXAMENTO DETECTADO*\n\n@#rebaixado# foi rebaixado(a) para membro comum por @#admin#.`,

X9_SOLICITACAO_REJEITADA_MSG: `❌ *SOLICITAÇÃO REJEITADA*\n\nO admin @#admin# rejeitou a entrada de @#usuario# no grupo.`,

MENSAGEM_GRUPO_FECHOU: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🔒 𝐆𝐑𝐔𝐏𝐎 𝐅𝐄𝐂𝐇𝐀𝐃𝐎! 🔒
┃
┃ 🛡️ Apenas administradores
┃ podem enviar mensagens!
┃
┃ ⏰ Aguardem a liberação! 🤐
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

// ========================================
// 🤖 SISTEMA DE PREFIXO
// ========================================

// URL da imagem para o comando de prefixo
PREFIXO_IMAGEM_URL: "http://sungbot.vip/api/media/get/358bd1e0-da02-4c8d-8d12-8cf09e275b56",

// URL de redirecionamento - #numerodono# será substituído pelo número do dono
PREFIXO_REDIRECT_URL: "https://wa.me/#numerodono#",

// Mensagem que aparece quando alguém digita "prefix" ou "prefixo"
// #emoji# = emoji do bot, #prefix# = prefixo atual, #nomebot# = nome do bot
PREFIXO_MENSAGEM: `╔┉✼┉══༺◈✼#emoji#✼◈༻══┉✼┉╗
║ *𝐀𝐑𝐈𝐒𝐄!* - *𝐌𝐞𝐮 𝐏𝐫𝐞𝐟𝐢𝐱𝐨:* [ #prefix# ]              ║
╚┉✼┉══༺◈✼#emoji#✼◈༻══┉✼┉╝`,

// Título que aparece no preview da mensagem
PREFIXO_PREVIEW_TITULO: "#nomebot#",

// Subtítulo que aparece no preview da mensagem
PREFIXO_PREVIEW_SUBTITULO: "O Caçador Mais Forte",

// ===== GARTIC - JOGO DE ADIVINHAÇÃO POR IMAGEM =====
GARTIC: {
  INICIO: '🎮 Gartic iniciado! Boa sorte!',
  ACERTOU: '🎉 @{usuario} ACERTOU!\n\n⚡ Tempo: {tempo}s\n🏆 Pontos: +{pontos}\n📊 Total: {total} pontos',
  QUASE: '🔥 @{usuario} QUASE LÁ! Continue tentando! 💪',
  TIMEOUT: '⏰ TEMPO ESGOTADO!\n\n📝 A resposta era: *{resposta}*',
  SKIP: '⏭️ RODADA PULADA!\n\n📝 A resposta era: *{resposta}*',
  FINALIZADO: '🏁 JOGO FINALIZADO!\n\nObrigado por jogar! 🎮',
  JA_EXISTE: '⚠️ Já existe um jogo Gartic ativo! Use #endgartic para finalizar.',
  NENHUM_ATIVO: '⚠️ Nenhum jogo Gartic ativo.'
},

// ========================================
// 💼 SISTEMA DE ALUGUEL
// ========================================
// Placeholders disponíveis: #nomegp#, #idgp#, #lermais#, #numerodono#, #usuario#

ALUGUEL: {
  // Mensagem enviada ao grupo quando faltam 24h para vencer
  QUASE_VENCIDO: `┏━━『 ⚠️ *AVISO* ⚠️ 』━━┓
┃
┃ 🕰️ *ALUGUEL PRESTES*
┃ *A VENCER*
┃
┃ ⏰ Grupo *#nomegp#*
┃ expira em 24h!
┃
┃ 📢 Renove agora para
┃ evitar interrupções!
┃
┃ 💎 Mantenha ativo!
┗━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Mensagem enviada ao grupo quando vence
  VENCIDO: `┏━━『 🚨 *ALERTA* 🚨 』━━┓#lermais#
┃
┃ ❌ *ALUGUEL VENCIDO*
┃
┃ ⏳ Grupo *#nomegp#*
┃ expirou!
┃
┃ 🚫 Bot será removido
┃ sem renovação.
┃
┃ 📞 Contate o dono!
┗━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Mensagem de despedida ao sair do grupo (2 dias após vencer)
  SAIDA: `╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👋 *DESPEDIDA* 👋
┃
┃ Olá, membros do grupo
┃ *#nomegp#*!
┃
┃ ⏰ O período de aluguel
┃ expirou e não foi renovado.
┃
┃ 😢 Infelizmente, preciso
┃ me despedir do grupo.
┃
┃ ✨ Foi um prazer servir
┃ vocês! Espero que tenham
┃ aproveitado meus recursos!
┃
┃ 💚 Caso queiram me ter
┃ de volta, entre em contato:
┃
┃ 📱 wa.me/#numerodono#
┃
┃ 🔄 Estou sempre disponível
┃ para retornar!
┃
┃ 🌟 Até logo e obrigado
┃ por tudo!
╰━━━━━━━━━━━━━━━━━━━━━━━╯`,

  // Aviso ao dono quando faltam 24h
  DONO_QUASE_VENCIDO: `┏━『 📊 *GESTÃO* 📊 』━┓
┃
┃ 🔔 *ALERTA VENCIMENTO*
┃
┃ 📝 *#nomegp#*
┃ 🆔 #idgp#
┃
┃ ⏰ Menos de 24h!
┃ 🚨 Ação urgente!
┃
┃ 💰 Preparar renovação!
┗━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Aviso ao dono quando vence
  DONO_VENCIDO: `┏━『 📊 *GESTÃO* 📊 』━┓
┃
┃ 📛 *ALUGUEL VENCIDO*
┃
┃ 📝 *#nomegp#*
┃ 🆔 #idgp#
┃
┃ ⌛ Aguardando...
┃ 🚫 Bot inativo!
┃
┃ 📞 Contatar cliente!
┗━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Aviso ao dono quando bot sai do grupo
  DONO_SAIDA: `┏━『 📊 *GESTÃO* 📊 』━┓
┃
┃ ❌ *BOT REMOVIDO*
┃
┃ 📝 *#nomegp#*
┃ 🆔 #idgp#
┃
┃ 🕛 Vencido há 2 dias
┃ 🤖 Removido do grupo
┃
┃ 📋 Atualizar lista!
┗━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Mensagem quando grupo não está registrado
  NAO_REGISTRADO: `┏━━『 🔒 *RESTRITO* 🔒 』━━┓
┃
┃ 👋 Olá, #usuario#!
┃
┃ ⚠️ Grupo não registrado
┃ no sistema de aluguel.
┃
┃ 🚫 Comandos bloqueados!
┃
┃ 📱 Contate o dono:
┃ wa.me/#numerodono#
┃
┃ ✨ Regularize para ter
┃ acesso às funções!
┃
┃ 💎 Vale a pena!
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`,

  // Mensagem quando grupo vencido tenta usar comando
  VENCIDO_CMD: `┏━━『 ⏰ *EXPIRADO* ⏰ 』━━┓
┃
┃ 👋 Olá, #usuario#!
┃
┃ 💔 Aluguel do grupo
┃ venceu!
┃
┃ 🚫 Serviços
┃ interrompidos.
┃
┃ 😢 Sentimos muito!
┃
┃ 🔄 Renove agora para
┃ ter todas as funções!
┃
┃ 📞 Contato:
┃ wa.me/#numerodono#
┃
┃ ⚡ Renovação rápida!
┃ 💎 Melhor bot!
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`
}

}

// FILTRO DE PALAVRAS PARA O SIMIH2 (agora usando o mesmo filtro unificado)
const FiltroSimih2 = PALAVRAS_FILTRO_UNIFICADO;

// ========================================
// 📤 EXPORTAÇÃO DO MÓDULO
// ========================================
// As mensagens de aluguel agora estão em TEXTOS_GERAL.ALUGUEL
// Mantendo exports antigos para retrocompatibilidade
module.exports = {
// Retrocompatibilidade - mensagens antigas de aluguel
QVcnd: TEXTOS_GERAL.ALUGUEL.QUASE_VENCIDO,
Vcnd: TEXTOS_GERAL.ALUGUEL.VENCIDO,
Saida: TEXTOS_GERAL.ALUGUEL.SAIDA,
ADnQVcnd: TEXTOS_GERAL.ALUGUEL.DONO_QUASE_VENCIDO,
ADnVcnd: TEXTOS_GERAL.ALUGUEL.DONO_VENCIDO,
ADnSd: TEXTOS_GERAL.ALUGUEL.DONO_SAIDA,
Vcndindex: TEXTOS_GERAL.ALUGUEL.VENCIDO_CMD,
NrgIndex: TEXTOS_GERAL.ALUGUEL.NAO_REGISTRADO,

// Exportações principais
TEXTOS_GERAL,
FiltroSimih2,
PALAVRAS_FILTRO_UNIFICADO
};