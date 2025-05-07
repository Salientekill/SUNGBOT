

// TOMEM CUIDADO, UMA VIRGULA, ATÉ UM ACENTO ERRADO PODE CAUSAR ERRO, SALVE ANTES DE ALTERAR PARA EVITAR PROBLEMAS E FICAR XINGANDO O JOSIVAL.

const TEXTOS_GERAL =  {
  
MENSAGEM_DOS_ANTI_LINKS: "*🚫 LINK DETECTADO, BANIDO 🚫*",

MENSAGEM_DE_SO_USAR_EM_GRUPO: `*Este comando só deve ser utilizado em Grupos.*`,

MENSAGEM_DE_SO_DONO_USAR_COMANDOS: `*Este comando é apenas para o meu dono utilizar...*`,

MENSAGEM_DE_SO_ADM_CONSEGUIR_USAR_X_COMANDO: `*Só Administradores do grupo podem utilizar este comando..*`,

MENSAGEM_DE_QUANDO_O_BOT_NAO_E_ADM: `*O Bot precisa ser Administrador do grupo para utilizar este comando...*`,

// O #prefixo# é padrão para mostrar o prefixo do bot.

MENSAGEM_DE_SO_QUANDO_MODO_BRINCADEIRA_FOR_ATIVO: `*Este comando so pode ser utilizado com o comando #prefixo#modobrincadeira ativado, para desativar só basta usar o comando novamente.*`,

MENSAGENS_DE_AGUARDE: ["*[ ! ] Aguarde amigo, estou fazendo...*", "Vai beber uma água, ja estou terminando de enviar..", "㋡ Opa, calma ae, tô enviando já!!", "❬❗❭ Aguarde 5 segundos", "☬ Seu pedido é uma ordem companheiro(a), Enviando...", "ههههه𓅂 Oi filho de Deus, calma ae, tô terminando de fazer..", "Oi princesa, já estou preparando pra enviar, Aguarde..", "Salve mano, só aguarde um pouquinho que já estou enviando!!", "Aquieta o coração amigo, já estou enviando!", "Espere sentado que estou enviando!", "Pisa no freio aí amigo, tô enfiando já, ops enviando rsrs!", "Foi daqui que pediram comando? Ta chegando...", "Oq vc ñ pede chorando, que eu não faço sorrindo, enviando já!", "Em 365 dias úteis termino o comando kkkk meme, to enviando!", "Não precisa gritar, já ouvi e tô enviando seu pedido!", "Aproveita que tô terminando aqui e beba água, hidrate-se!", "Seu pedido é uma ordem, terminando patrão!", "Manda quem pode, obedece quem tem juízo. Já tô enviando...", "Jaja está na mão amigo, aguarde um instante!", "Quem espera, sempre alcança","Tô enviando já amigão!"],

// LINK DA IMAGEM DO COMANDO DE CASAL
LINK_COMANDO_CASAL: "https://i.ibb.co/zndm1Pc/K88c2-Bk-Qwlc-F.jpg",

// TEXTO DO COMANDO DE CASAL // O #porcentagem# vai puxar de 0 a 100.
TEXTO_COMANDO_CASAL: `🌟 Casal do grupo com ॐ #porcentagem# ✨ de chance pra da certo 😏:`,

// PALAVRAS QUE SÃO PROIBIDAS DO SIMIH FALAR.
PALAVRAS_PROIBIDA_DE_O_SIMI_FALAR: ["porra", "carai", "caralho", "buceta", "bct", "teu cu","meu pau", "minha chibata", "pika", "seu cu", "sexo", "gozar", "gozei"],

COMANDO_BAN_MENSAGEM: `#usuario# *Foi [ REMOVIDO(A) COM SUCESSO ] - (Por motivos justos.) -*`,

COMANDO_PROMOVEU_MENSAGEM:`#usuario# *Foi promovido(a) para adm com sucesso.*`,

COMANDO_REBAIXOU_MENSAGEM: `#usuario# *Foi Rebaixado para [ MEMBRO COMUM ] com sucesso.*`,

LIMITE_CARACTERES_MSG: 'Muitas Caracteres enviadas, isto é contra as normas do grupo, por precaução, eu irei remover.',

LISTA_NEGRA_GLOBAL_MENSAGEM: '*Olha quem deu as cara por aqui, sente o poder do ban*',

MENSAGEM_GRUPO_ABRIU: "*GRUPO ABERTO COM SUCESSO*",

MENSAGEM_GRUPO_FECHOU: "*GRUPO FECHADO COM SUCESSO*"

}

// FILTRO DE PALAVRAS PARA O SIMIH2

const FiltroSimih2 = [ "gay", "cu", "buceta", "bct", "pau", "rola", "vagina", "penis" ]

// #nomegp# é o nome do grupo, #idgp# é o nome do grupo, #lermais# é aquele ler mais, #numerodono e o numero do dono

// MSG DE QUASE VENCIDO
const QVcnd = `┏━━『 ⚠️ *AVISO IMPORTANTE* ⚠️ 』━━┓
┃
┃ 🕰️ *ALUGUEL PRESTES A VENCER*
┃
┃ O aluguel do grupo *#nomegp#* 
┃ expirará em menos de 24 horas!
┃
┃ 📢 Não deixe para última hora!
┃ Renove agora para evitar interrupções.
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE VENCIDO 
const Vcnd = `┏━━『 🚨 *ALERTA* 🚨 』━━┓#lermais#
┃
┃ ❌ *ALUGUEL VENCIDO* ❌
┃
┃ O aluguel do grupo *#nomegp#*
┃ expirou e o bot está inativo.
┃
┃ ⏳ O bot será removido em breve
┃ caso não haja renovação.
┃
┗━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE SAÍDA 
const Saida = `┏━━『 ⏳ *TEMPO ESGOTADO* ⏳ 』━━┓
┃
┃ 😔 *REMOVENDO O BOT DO GRUPO*
┃
┃ Passaram-se 2 dias desde o 
┃ vencimento do aluguel do grupo
┃ *#nomegp#*
┃
┃ 📞 Para renovar, contate o dono:
┃ wa.me/#numerodono#
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE AVISO AO DONO DE QUASE VENCIDO 
const ADnQVcnd = `┏━『 📊 *GESTÃO DE ALUGUÉIS* 📊 』━┓
┃
┃ 🔔 *ALERTA DE VENCIMENTO*
┃
┃ Grupo: *#nomegp#*
┃ ID: #idgp#
┃
┃ ⏰ Menos de 24h para expiração!
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE AVISO AO DONO DE VENCIDO 
const ADnVcnd = `┏━『 📊 *GESTÃO DE ALUGUÉIS* 📊 』━┓
┃
┃ 📛 *ALUGUEL VENCIDO*
┃
┃ Grupo: *#nomegp#*
┃ ID: #idgp#
┃
┃ ⌛ Aguardando renovação...
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE AVISO AO DONO DE SAÍDA 
const ADnSd = `┏━『 📊 *GESTÃO DE ALUGUÉIS* 📊 』━┓
┃
┃ ❌ *BOT REMOVIDO*
┃
┃ Grupo: *#nomegp#*
┃ ID: #idgp#
┃
┃ 🕛 Vencido há 2 dias sem renovação
┃ O bot foi removido automaticamente
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE NÃO REGISTRADO AO TENTAR USAR CMD 
const NrgIndex = `┏━━『 🔒 *ACESSO RESTRITO* 🔒 』━━┓
┃
┃ Olá, #usuario#!
┃
┃ Este grupo não está registrado
┃ no sistema de aluguel.
┃
┃ 📱 Entre em contato com o dono:
┃ wa.me/#numerodono#
┃
┃ ✨ Regularize agora para acessar
┃ todas as funcionalidades!
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`; 
 
// MSG DE VENCIDO AO TENTA USAR CMD 
const Vcndindex = `┏━━『 ⏰ *ALUGUEL EXPIRADO* ⏰ 』━━┓
┃
┃ Olá, #usuario#!
┃
┃ O aluguel deste grupo venceu.
┃ Seus serviços foram interrompidos.
┃
┃ 🔄 Renove agora mesmo para
┃ continuar aproveitando todas
┃ as funcionalidades.
┃
┃ 📞 Contato para renovação:
┃ wa.me/#numerodono#
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`;

module.exports = { QVcnd, Vcnd, Saida, ADnQVcnd, ADnVcnd, ADnSd, Vcndindex, NrgIndex, TEXTOS_GERAL, FiltroSimih2 }