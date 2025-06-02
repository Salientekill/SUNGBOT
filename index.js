/*============≠≠==========≠≠=============\\

NÃO PASSE O BOT PARA NINGUÉM, MUITOS VÃO FINGIR SER AMIGO. 

MUITOS DESEJAM COMPRAR PARA REVENDER E DIZER QUE FEZ.. 

EU ALEATORY NÃO FIZ TUDO, ASSUMO ISSO, PRECISEI DE AJUDA

PRA ISSO TENHO AMIGOS, PRA EVOLUIR JUNTO, ENTÃO.. 

NÃO JOGUE O ESFORÇO QUE TIVE, APESAR DE NÃO SER TANTO A 
VISTA DE QUEM JÁ CONHECE O BASTANTE DA ÁREA.. 

//=======================================*/

const { downloadContentFromMessage, relayWAMessage, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, getLastMessageInChat, BufferJSON } = require('@whiskeysockets/baileys');

//_-_-_-__-_-_-_-_-_-MODULOS/FUNÇÕES-_-_-_-_-_-__-_-_-_-_-\\

const { prepareStatement, executarTransacao, fs, axios, crypto, util, P, linkfy, request, cheerio, ms, ffmpeg, qrterminal, exec, spawn, execSync, moment, color, time, hora, date, getBuffer, convertSticker, recognize, fetchJson, fetchText, getBase64, response, upload, wait, getExtension, generateMessageID, getGroupAdmins, getMembros, getRandom, banner2, banner3, temporizador, kyun, simih, botoff, colors, comand, rg_aluguel, fetch, AsyncLock, menu, anotacao, menudono, adms, menulogos, efeitos, menuprem, brincadeiras, infodono, configbot, cmd_termux, alteradores, tabela, conselhob, palavrasc, nescessario, setting, logoslink, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2, sendImageAsSticker2, daily, anotar, enviarfiguUrl, getFileBuffer, DLT_FL, sleep, ANT_LTR_MD_EMJ, recolherLNK, SIMI_OFC, uploadX, path, atualizarOuAdicionarDB, removerRegistroDB, buscarRegistroDB, puxarGrupo, getGroupSettings, puxarTodosGrupos, BANCOP, Database, lermais } = require('./consts-func.js');

const { removeDataByPattern } = require('./outros/sticker/stickerType.js');

//_-_-_-_-_-_-_-_-_-_-_-_-(INFOS)_-_-_-_-_-_-_-_-_-_-_-_-_-_-_--\\

var { TOKEN_GPT, cmdpremium, dono1, dono2, dono3, dono4, dono5, dono6 } = require("./dados/nescessario.json");

const Links_P = require("./dados/links.json");

var { fundo1, fundo2, imgnazista, imggay, imgcorno, imggostosa, imggostoso, imgfeio, imgvesgo, imgbebado, imggado, matarcmd, beijocmd, abracocmd, chutecmd, tapacmd, rnkgay, rnkgado, rnkcorno, rnkgostoso, rnkgostosa, rnknazista, rnkhetero, rnkgolpista, rnkotaku, rnkpau, casamentocmd } = require("./dados/links.json");

var { NomeDoBot, NickDono, prefix } = require("./dados/settings.json");

const { TEXTOS_GERAL } = require("./dados/textos.js");

const Api = require("./req.js");

let sharp = require('sharp')

let keySung = "KeyDoLotusEsdeath2025";
const acessAPI = new Api(keySung);
const FormData = require('form-data');

//====================≠≠===============\\
 
const SNET = "@s.whatsapp.net";

const MSG_ANTPV2 = [];

const BLC_ANTCL = [];

let OSINF_K = [];

let numerodono_ofc = setting.numerodono.replace(new RegExp("[()+-/ +/]", "gi"), "");

let nmrdn_dono2 = setting.numerodono.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET;

let numerodono;

process.on('uncaughtException', function (err) {
console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
console.error(err.stack)})

function apenasNumeros(variavel) {
var regex = /^[0-9]+$/;
if (variavel.match(regex)) {
return true;
} else {
return false }}

function removeSecondSpace(str) {
if(str[1] === ' ') {
return str[1] === ' ' && str[2] === ' ' ? str[0] + str.slice(3) : str[0] + str.slice(2)}
return str }

const diacriticsRegex = /[\u0300-\u036f]/g;
function RmvSimbolosLmn(a) {
return a.toLowerCase().normalize('NFD').replace(diacriticsRegex, "")}
const { JSDOM } = require("jsdom");
const { set } = require('lodash');

async function webp_mp4(imageBuffer) {

let formData = new FormData();
formData.append("new-image-url", "");
formData.append("new-image", imageBuffer, "image.webp");

let response = await fetch("https://ezgif.com/webp-to-mp4", {
method: "POST",
body: formData,
});

let html = await response.text();

let { document } = new JSDOM(html).window;

let formData2 = new FormData();
let formValues = {};

for (let input of document.querySelectorAll("form input[name]")) {
formValues[input.name] = input.value;
formData2.append(input.name, input.value);
}

let response2 = await fetch("https://ezgif.com/webp-to-mp4/" + formValues.file, {method: "POST", body: formData2 });

let html2 = await response2.text();

let { document: document2 } = new JSDOM(html2).window;

return new URL(document2.querySelector("div#output > p.outfile > video > source").src, response2.url).toString();
}

function calculateTimeDifference(startTimestamp, endTimestamp) {
const DifInMili = endTimestamp - startTimestamp
const TTmin = Math.floor(DifInMili / (1000 * 60))
const totalHours = Math.floor(TTmin / 60)
const totalDays = Math.floor(totalHours / 24);
const hours = totalHours % 24;
const minutes = TTmin % 60;
const seconds = Math.floor((DifInMili / 1000) % 60)
return `${totalDays} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos` }

const webp = require("node-webpmux");
async function imageToWebp(media) { const tmpFileOut = Math.floor(Math.random() * 10000)+'.webp'; const tmpFileIn = Math.floor(Math.random() * 10000)+'.jpg'; fs.writeFileSync(tmpFileIn, media); await new Promise((resolve, reject) => { ffmpeg(tmpFileIn).on("end", () => resolve(true)).addOutputOptions(["-vcodec","libwebp","-vf","scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-5:-5:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat("webp").save(tmpFileOut)}); const buff = fs.readFileSync(tmpFileOut); fs.unlinkSync(tmpFileOut); fs.unlinkSync(tmpFileIn); return buff}
async function videoToWebp (media) { const tmpFileOut = Math.floor(Math.random() * 10000)+'.webp'; const tmpFileIn = Math.floor(Math.random() * 10000)+'.mp4'; fs.writeFileSync(tmpFileIn, media); await new Promise((resolve, reject) => { ffmpeg(tmpFileIn).on("end", () => resolve(true)).addOutputOptions(["-vcodec","libwebp","-vf","scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse", "-loop", "0","-ss","00:00:00","-t","00:00:05","-preset","default","-an","-vsync","0"]).toFormat("webp").save(tmpFileOut)}); const buff = fs.readFileSync(tmpFileOut); fs.unlinkSync(tmpFileOut);fs.unlinkSync(tmpFileIn);return buff; }
async function writeExifImg (media, metadata) { let wMedia = await imageToWebp(media); const tmpFileOut = Math.floor(Math.random() * 10000)+'.webp'; const tmpFileIn = Math.floor(Math.random() * 10000)+'.webp';fs.writeFileSync(tmpFileIn, wMedia); if (metadata.packname || metadata.author) { const img = new webp.Image(); const json = { "sticker-pack-id": `@Kauan_dev`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }; const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]); const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");const exif = Buffer.concat([exifAttr, jsonBuff]);exif.writeUIntLE(jsonBuff.length, 14, 4);await img.load(tmpFileIn);fs.unlinkSync(tmpFileIn); img.exif = exif;await img.save(tmpFileOut);return tmpFileOut}}
async function writeExifVid (media, metadata) { let wMedia = await videoToWebp(media); const tmpFileOut = Math.floor(Math.random() * 10000)+'.webp'; const tmpFileIn = Math.floor(Math.random() * 10000)+'.webp'; fs.writeFileSync(tmpFileIn, wMedia); if (metadata.packname || metadata.author) { const img = new webp.Image(); const json = { "sticker-pack-id": "com.marsvard.stickermakerforwhatsapp.stickercontentprovider 1594741845", "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp&referrer=utm_source%3Dopenwa%26utm_medium%3Dstickerapi%26utm_term%3D6247", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857" }; const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]); const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8"); const exif = Buffer.concat([exifAttr, jsonBuff]); exif.writeUIntLE(jsonBuff.length, 14, 4); await img.load(tmpFileIn); fs.unlinkSync(tmpFileIn); img.exif = exif; await img.save(tmpFileOut); return tmpFileOut}}
async function writeExif (media, metadata) { let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : ""; const tmpFileOut = Math.floor(Math.random() * 10000)+'.webp'; const tmpFileIn = Math.floor(Math.random() * 10000)+'.webp' ; fs.writeFileSync(tmpFileIn, wMedia); if (metadata.packname || metadata.author) { const img = new webp.Image(); const json = { "sticker-pack-id": "com.marsvard.stickermakerforwhatsapp.stickercontentprovider 1594741845", "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp&referrer=utm_source%3Dopenwa%26utm_medium%3Dstickerapi%26utm_term%3D6247", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}; const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]); const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8"); const exif = Buffer.concat([exifAttr, jsonBuff]); exif.writeUIntLE(jsonBuff.length, 14, 4); await img.load(tmpFileIn); fs.unlinkSync(tmpFileIn); img.exif = exif; await img.save(tmpFileOut); return tmpFileOut}}

async function writeExifWebp(media, metadata) {
let webp = require("node-webpmux");
let Crypto = require("crypto");
let { tmpdir } = require("os");
let tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
let tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}_converted.webp`)
fs.writeFileSync(tmpFileIn, media)
if (metadata.packname || metadata.author) {
let img = new webp.Image();
let json = {
"sticker-pack-id": `SUNG BOT`,
"sticker-pack-name": metadata.packname,
"sticker-pack-publisher": metadata.author,
"emojis": metadata.categories ? metadata.categories : [""]}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
let exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
await img.load(tmpFileIn)
fs.unlinkSync(tmpFileIn)
img.exif = exif;
await img.save(tmpFileOut)
return fs.readFileSync(tmpFileOut)}}

const { handleCommand } = require('./outros/funcoes/commandsManager')


// ABAIXO: INÍCIO DE CONEXÃO

const startAle = async(upsert, conn, qrcode) => {

try {

for (const info of upsert?.messages || []) {

const from = info.key.remoteJid;

//console.log(info);

const isGroup = from.endsWith('@g.us');

async function AddGM_P(gpid) {
if (!gpid || typeof gpid !== 'string' || !gpid.endsWith('@g.us')) {
return null }
try {
const timeout = new Promise((_, reject) => 
setTimeout(() => reject(new Error('Timeout na API')), 7000));
const fetchMetadata = conn.groupMetadata(gpid)
const grupodb = await Promise.race([fetchMetadata, timeout]).catch(error => {
console.error(`Erro ao obter metadados do grupo ${gpid}:`, error.message);
return null })
if (!grupodb || !grupodb.id) {
return null }
setTimeout(() => {
const dadosParaSalvar = {
id: grupodb.id,
desc: grupodb.desc || '',
announce: grupodb.announce ? 1 : 0,
restrict: grupodb.restrict ? 1 : 0,
subject: grupodb.subject || '',
participants: JSON.stringify(grupodb.participants || []),
isCommunity: grupodb.isCommunity !== undefined ? (grupodb.isCommunity ? 1 : 0) : 0,
isCommunityAnnounce: grupodb.isCommunityAnnounce !== undefined ? (grupodb.isCommunityAnnounce ? 1 : 0) : 0,
joinApprovalMode: grupodb.joinApprovalMode !== undefined ? (grupodb.joinApprovalMode ? 1 : 0) : 0,
memberAddMode: grupodb.memberAddMode !== undefined ? (grupodb.memberAddMode ? 1 : 0) : 0 }
atualizarOuAdicionarDB('DadosGP', dadosParaSalvar, 'id', grupodb.id).catch(error => {
console.error(`Erro ao armazenar metadados do grupo ${from}:`, error)})}, 0)
return grupodb;
} catch (error) {
console.error(`Erro em AddGM_P para grupo ${from}:`, error);
return null }}

async function getGroupMetadata(isGroup, conn, from) {
if (!isGroup) {
return "" }
try {
return await puxarGrupo(conn, from) || await AddGM_P(from);
} catch (error) {
console.error(`Erro ao obter metadados para ${from}:`, error);
return "" }}

groupMetadata = isGroup ? await getGroupMetadata(true, conn, from) : "";

const groupName = isGroup ? groupMetadata?.subject || "" : "";

const groupName_RG = isGroup ? groupMetadata?.subject || "" : "";

const sender = isGroup ? (info.key.participant?.includes(':') ? info.key.participant.split(':')[0] + SNET : info.key.participant) : info.key.remoteJid;

const sender2 = sender ? sender.split("@")[0] : null

let sender69 = from?.includes('@g.us') ? info.key.participant?.includes(':') ? info.key.participant.split(':')[0] + SNET : info.key.participant : info.key?.remoteJid;

const data_IDGP = [{
name: groupName_RG,
groupId: from, 
x9: false,
antiimg: 0,
antivideo: 0,
antiaudio: 0,
antisticker: 0,
antidoc: 0,
antictt: 0,
antiloc: 0,
antilinkgp: 0,
antilinkhard: 0,
anticatalogo: 0,
antiinteractive: 0,
sistemgold: 0,
antifake: false,
sistemGold: false, 
visuUnica: false, 
registrarFIGUS: false, 
autotranscrever: false,
soadm: false,
rg_aluguel: false,
nsfw: false,
advertencias: [],
listanegra: [], 
advertir: [], 
prefixos: ["!"], 
comandosB: [],
advertir2: [], 
legenda_estrangeiro: "0", 
legenda_listanegra: "Eita, estava na lista negra, sinto muito, terei que remover.",
legenda_documento: "0", 
legenda_video: "0",
legenda_imagem: "0", 
legenda_audio: "0",
legenda_sticker: "0",
legenda_contato: "0",
legenda_localizacao: "0",
legenda_catalogo: "0",
legenda_interativo: "0",
multiprefix: false, 
recolherlinkgp: false,
forca_ofc: [{acertos: 0, erros: 0, palavra: [], escreveu: [], palavra_ofc: 0, dica: 0, tema: 0}],
Chances: [{ id: sender, ChanceG: null, ChanceAp: null, ChanceR: [], Vinganca: null, cassino: 0, quiz: [{errou: 0, acertou: 0, numero: 0}], roletadasorte: false, Cachaca: 1, Escudo: [] }], 
ausentes: [], 
forca_inc: false, 
comandos_gold: [],
antipalavrao: {
modo: 0,
palavras: []},
limitec: {
quantidade: 4000 },
wellcome: [{
bemvindo1: false,
legendabv: "Olá #numerodele#, seja bem vindo (a)",
legendasaiu: 0 }, {
bemvindo2: false,
legendabv: "Olá #numerodele#, seja bem vindo (a)",
legendasaiu: 0 }],
simi1: false,
simi2: false,
autosticker: false, 
autoresposta: false,
jogos: false, 
bangp: false }];

function initializeConfigGroupsTable() {
try {
const tableExists = BANCOP.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='config_groups'").get();
if (!tableExists) {
BANCOP.exec(`
CREATE TABLE IF NOT EXISTS config_groups (
groupId TEXT PRIMARY KEY,
groupName TEXT,
settings TEXT,
lastUpdated INTEGER )`);
console.log('Tabela config_groups inicializada com sucesso')}
} catch (err) {
console.error('Erro ao criar tabela config_groups:', err.message)}}

initializeConfigGroupsTable()

function updateGroupSettings(groupId, groupName, settings) {
try {
const currentTime = Date.now();
const settingsJson = JSON.stringify(settings);
const selectStmt = BANCOP.prepare('SELECT * FROM config_groups WHERE groupId = ?');
const row = selectStmt.get(groupId)
if (row) {
const updateStmt = BANCOP.prepare('UPDATE config_groups SET groupName = ?, settings = ?, lastUpdated = ? WHERE groupId = ?');
const result = updateStmt.run(groupName, settingsJson, currentTime, groupId);
return result.changes;
} else {
const insertStmt = BANCOP.prepare('INSERT INTO config_groups (groupId, groupName, settings, lastUpdated) VALUES (?, ?, ?, ?)');
const result = insertStmt.run(groupId, groupName, settingsJson, currentTime);
return result.lastInsertRowid }
} catch (err) {
console.error(`Erro ao atualizar configurações para o grupo ${groupId}:`, err.message);
return null }}

const existingSettings = await getGroupSettings(from);

if(isGroup) {
if(!existingSettings) {
await updateGroupSettings(from, groupName_RG, data_IDGP)}}

var dataGp = isGroup ? await getGroupSettings(from) : undefined;
if(isGroup && !dataGp) {
dataGp = data_IDGP
await updateGroupSettings(from, groupName_RG, dataGp)}

const VR_JSON_GLOBAL = existingSettings ? true : false;

async function bufferImg(imageUrl) {
const fileName = 'imagem.jpg';
const headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36', }
axios.get(imageUrl, { responseType: 'arraybuffer', headers }).then(async(response) => {
fs.writeFileSync(fileName, response.data);
conn.sendMessage(from, {image: {url: fileName}}, {quoted: info})}).catch((err) => {
return reply("Erro!!")})}

const baileys = require('@whiskeysockets/baileys');
const type = baileys.getContentType(info.message);
const content = JSON.stringify(info.message);
const pushname = info.pushName ? info.pushName : ''

if(nescessario.visualizarmsg) {
conn.readMessages([info.key])
} else if(from != "status@broadcast" && !from.includes("status")) {}

const botNumber = conn.user.id.split(':')[0]+SNET;

let isTableSetupDone = false, sqlStatements = null, optionsBuffer = {};

function setupOptionsTable() {
if (isTableSetupDone && sqlStatements) return sqlStatements;
BANCOP.exec(`CREATE TABLE IF NOT EXISTS options_buffer (key TEXT PRIMARY KEY, comandos TEXT NOT NULL, message_key TEXT NOT NULL, timestamp INTEGER NOT NULL, menus TEXT, history TEXT)`);
sqlStatements = {
getAll: BANCOP.prepare('SELECT * FROM options_buffer'),
insertOrUpdate: BANCOP.prepare('INSERT OR REPLACE INTO options_buffer (key, comandos, message_key, timestamp, menus, history) VALUES (?, ?, ?, ?, ?, ?)'),
delete: BANCOP.prepare('DELETE FROM options_buffer WHERE key = ?'),
deleteExpired: BANCOP.prepare('DELETE FROM options_buffer WHERE timestamp < ?')}
isTableSetupDone = true;
return sqlStatements }

sqlStatements = setupOptionsTable();

function getUniqueKey(groupId, userId) {
if (!groupId || !userId) {
return `error:invalidIds:${Date.now()}` }
return `${groupId}:${userId}` }

function loadOptionsBuffer() {
try {
const rows = sqlStatements.getAll.all();
optionsBuffer = {};
rows.forEach(row => {
try {
optionsBuffer[row.key] = {
comandos: JSON.parse(row.comandos),
key: JSON.parse(row.message_key),
timestamp: row.timestamp,
menus: row.menus ? JSON.parse(row.menus) : undefined,
history: row.history ? JSON.parse(row.history) : undefined }
} catch (e) {
console.error(`Erro ao processar registro ${row.key}:`, e)}})
} catch (error) {
console.error('Erro ao carregar opções:', error)
optionsBuffer = {}}}

function flushOptionsBuffer() {
try {
BANCOP.transaction(() => {
BANCOP.prepare('DELETE FROM options_buffer').run()
for (const key in optionsBuffer) {
const data = optionsBuffer[key];
sqlStatements.insertOrUpdate.run(
key,
JSON.stringify(data.comandos),
JSON.stringify(data.key),
data.timestamp,
data.menus ? JSON.stringify(data.menus) : null,
data.history ? JSON.stringify(data.history) : null )}})()
} catch (error) {
console.error('Erro ao salvar opções:', error)}}

function extractMessageBody(info) {
if (!info || !info.message) return ""
if (info.message.buttonsResponseMessage?.selectedButtonId) return info.message.buttonsResponseMessage.selectedButtonId
if (info.message.listResponseMessage?.singleSelectReply?.selectedRowId) return info.message.listResponseMessage.singleSelectReply.selectedRowId
if (info.message.templateButtonReplyMessage?.selectedId) return info.message.templateButtonReplyMessage.selectedId
if (info.message.conversation) return info.message.conversation.trim()
if (info.message.extendedTextMessage?.text) return info.message.extendedTextMessage.text.trim()
if (info.message.imageMessage?.caption) return info.message.imageMessage.caption.trim()
if (info.message.videoMessage?.caption) return info.message.videoMessage.caption.trim()
if (info.message.documentWithCaptionMessage?.message?.documentMessage?.caption) return info.message.documentWithCaptionMessage.message.documentMessage.caption.trim()
const findTextInObject = (obj, depth = 0, maxDepth = 3) => {
if (!obj || typeof obj !== 'object' || depth > maxDepth) return null;
for (const key in obj) {
if (['text', 'caption', 'conversation', 'selectedButtonId', 'selectedRowId', 'selectedId'].includes(key) && typeof obj[key] === 'string' && obj[key].trim()) return obj[key].trim()
if (typeof obj[key] === 'object' && obj[key] !== null) {
const found = findTextInObject(obj[key], depth + 1, maxDepth);
if (found) return found }}
return null }
const anyText = findTextInObject(info.message);
if (anyText) return anyText
const typeCmd = Object.keys(info.message)[0];
switch (typeCmd) {
case 'conversation': return info.message.conversation || '';
case 'imageMessage': return info.message.imageMessage?.caption || '';
case 'videoMessage': return info.message.videoMessage?.caption || '';
case 'extendedTextMessage': return info.message.extendedTextMessage?.text || '';
case 'documentWithCaptionMessage': 
return info.message.documentWithCaptionMessage?.message?.documentMessage?.caption || '';
case 'buttonsResponseMessage': return info.message.buttonsResponseMessage?.selectedButtonId || '';
case 'listResponseMessage': return info.message.listResponseMessage?.singleSelectReply?.selectedRowId || '';
case 'templateButtonReplyMessage': return info.message.templateButtonReplyMessage?.selectedId || '' }
return "" }

function checkExpiredOptions() {
try {
const now = Date.now();
let changed = false;
Object.keys(optionsBuffer).forEach(key => {
if (optionsBuffer[key]?.timestamp && now - optionsBuffer[key].timestamp > 60000) {
delete optionsBuffer[key];
changed = true }})
if (changed) {
flushOptionsBuffer()}
return changed;
} catch (error) {
console.error('Erro ao verificar opções expiradas:', error);
return false }}

function cleanExpiredMenus() {
return checkExpiredOptions()}

async function createChoiceMenu(groupId, userId, menuText, options = {}, config = {}) {
try {
loadOptionsBuffer();
const uniqueKey = getUniqueKey(groupId, userId)
const messageConfig = { text: menuText || 'Menu' }
if (config.editKey) {
messageConfig.edit = config.editKey }
const sentMessage = await conn.sendMessage(groupId, messageConfig)
if (!sentMessage) {
throw new Error('Falha ao enviar mensagem')}
optionsBuffer[uniqueKey] = {
comandos: options,
key: sentMessage.key,
timestamp: Date.now(),
menus: config.menus,
history: config.history || ['principal']}
flushOptionsBuffer()
return sentMessage;
} catch (error) {
console.error('Erro ao criar menu:', error);
return false }}

async function processChoiceMessage() {
try {
cleanExpiredMenus()
const groupId = info.key.remoteJid
let userId;
if (info.key.participant) {
userId = info.key.participant;
} else if (sender && sender !== groupId) {
userId = sender;
} else if (info.key.fromMe) {
userId = botNumber;
} else {
userId = info.key.remoteJid }
const uniqueKey = getUniqueKey(groupId, userId)
loadOptionsBuffer();
checkExpiredOptions()
if (!optionsBuffer[uniqueKey]) return false 
const bodycmd = extractMessageBody(info)
const opcoesDisponiveis = Object.keys(optionsBuffer[uniqueKey].comandos || {})
let commandFound = optionsBuffer[uniqueKey].comandos[bodycmd];
if (!commandFound && !isNaN(bodycmd)) {
commandFound = optionsBuffer[uniqueKey].comandos[bodycmd.trim()]}
if (!commandFound) return false
const option = commandFound;
const menus = optionsBuffer[uniqueKey].menus;
const history = optionsBuffer[uniqueKey].history || ['principal']
if (typeof option === 'string') {
info.message.conversation = option;
delete optionsBuffer[uniqueKey];
} else if (typeof option === 'object') {
if (option.command && option.edit) {
info.message.conversation = option.command;
if (option.text) {
await conn.sendMessage(groupId, {text: option.text,edit: optionsBuffer[uniqueKey].key})}
delete optionsBuffer[uniqueKey];
} else if (option.submenu && menus && menus[option.submenu]) {
const nextMenu = menus[option.submenu];
try {
await createChoiceMenu(groupId, userId, nextMenu.text, nextMenu.options, {
editKey: optionsBuffer[uniqueKey].key, 
menus: menus, 
history: [...history, option.submenu]})
} catch (e) {
console.error('Erro ao criar submenu:', e)}
return true;
} else if (option.back && history.length > 1) {
const newHistory = history.slice(0, -1);
const previousMenuId = newHistory[newHistory.length - 1];
const previousMenu = menus[previousMenuId];
if (!previousMenu) {
return false }
try {
await createChoiceMenu(groupId, userId, previousMenu.text, previousMenu.options, { 
editKey: optionsBuffer[uniqueKey].key, 
menus: menus, 
history: newHistory })
} catch (e) {
console.error('Erro ao criar menu anterior:', e)}
return true;
} else if (option.close) {
if (option.text) {
await conn.sendMessage(groupId, {text: option.text, edit: optionsBuffer[uniqueKey].key})}
delete optionsBuffer[uniqueKey]
flushOptionsBuffer()
return true }}
flushOptionsBuffer()
return true;
} catch (error) {
console.error('Erro ao processar escolha:', error);
return false }}

processChoiceMessage();

var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.extendedTextMessage?.conversation || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info?.message?.interactiveMessage?.body || ''

if (isGroup && VR_JSON_GLOBAL) {
if (dataGp[0].multiprefix) {
var prefix = dataGp[0]?.prefixos.find(p => String(body)?.trim()?.startsWith(p)) || dataGp[0].prefixos[0];
} else {
var prefix = setting.prefix }
} else if (!isGroup || (isGroup && !VR_JSON_GLOBAL)) {
var prefix = setting.prefix }

var isCmd = body.trim().startsWith(prefix);

// = SISTEMA DE COMANDOS POR FIGURINHAS ====

// Sistema de comandos por figurinhas - versão otimizada
let stickerStatements = null;

function initializeStickerCommands() {
if (stickerStatements) return stickerStatements
try {
stickerStatements = {
getCommand: BANCOP.prepare('SELECT * FROM sticker_commands WHERE sticker_id = ?'),
getAllCommands: BANCOP.prepare('SELECT * FROM sticker_commands'),
insertCommand: BANCOP.prepare('INSERT OR REPLACE INTO sticker_commands (sticker_id, command, author, timestamp) VALUES (?, ?, ?, ?)'),
deleteCommand: BANCOP.prepare('DELETE FROM sticker_commands WHERE sticker_id = ?'),
getFiles: BANCOP.prepare('SELECT id, command, index_num FROM sticker_files WHERE command = ? ORDER BY index_num'),
getFile: BANCOP.prepare('SELECT * FROM sticker_files WHERE command = ? AND index_num = ?'),
getFileById: BANCOP.prepare('SELECT * FROM sticker_files WHERE id = ?'),
insertFile: BANCOP.prepare('INSERT INTO sticker_files (command, index_num, buffer, timestamp) VALUES (?, ?, ?, ?)'),
deleteFile: BANCOP.prepare('DELETE FROM sticker_files WHERE id = ?'),
deleteFileByCommand: BANCOP.prepare('DELETE FROM sticker_files WHERE command = ? AND index_num = ?'),
getMaxIndex: BANCOP.prepare('SELECT MAX(index_num) as max_index FROM sticker_files WHERE command = ?'),
countFiles: BANCOP.prepare('SELECT COUNT(*) as count FROM sticker_files WHERE command = ?')}
return stickerStatements;
} catch (error) {
console.error('Erro ao inicializar statements de figurinhas:', error);
return null }}

function normalizeStickerId(stickerId) {
return !stickerId ? null : typeof stickerId === 'string' ? stickerId : Buffer.from(stickerId).toString('base64')}

async function processStickerCommand(info) {
try {
let stickerId = null, contextInfo = {}
if (info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage) {
const quotedSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
stickerId = normalizeStickerId(quotedSticker.fileSha256);
contextInfo = info.message.extendedTextMessage.contextInfo;
} else if (info.message?.stickerMessage) {
stickerId = normalizeStickerId(info.message.stickerMessage.fileSha256);
contextInfo = info.message.stickerMessage.contextInfo || {}}
if (!stickerId) return false
const commandData = stickerStatements.getCommand.get(stickerId);
if (!commandData) return false
let command = commandData.command;
if (!command.startsWith(prefix)) command = prefix + command
const participant = contextInfo.participant
info.message = { extendedTextMessage: { text: command, contextInfo: { ...contextInfo, mentionedJid: participant ? [participant] : [] }}}
info._fromSticker = true;
return true;
} catch (error) {
console.error("Erro ao processar figurinha:", error);
return false }}

async function saveStickerByCommand(command, stickerMessage, author = null) {
try {
if (command.startsWith(prefix)) command = command.slice(prefix.length)
const buffer = await getFileBuffer(stickerMessage, 'sticker');
if (!buffer) return { success: false, message: 'Erro ao obter buffer' }
const maxIndexResult = stickerStatements.getMaxIndex.get(command);
const nextIndex = (maxIndexResult && maxIndexResult.max_index !== null) ? maxIndexResult.max_index + 1 : 0
const timestamp = Date.now();
stickerStatements.insertFile.run(command, nextIndex, buffer, timestamp)
if (stickerMessage.fileSha256) {
const stickerId = normalizeStickerId(stickerMessage.fileSha256);
stickerStatements.insertCommand.run(stickerId, command, author, timestamp)}
return { success: true, command, index: nextIndex, isMultiple: nextIndex > 0 };
} catch (error) {
console.error('Erro ao salvar figurinha:', error)
return { success: false, message: error.message }}}

async function sendStickerByCommand(command, conn, remoteJid, options = {}) {
try {
if (command.startsWith(prefix)) command = command.slice(prefix.length)
const files = stickerStatements.getFiles.all(command);
if (!files || files.length === 0) return { success: false, message: `Nenhuma figurinha encontrada` }
let fileToSend;
if (options.index && options.index > 0 && options.index <= files.length) {
fileToSend = files[options.index - 1];
} else if (options.random && files.length > 1) {
fileToSend = files[Math.floor(Math.random() * files.length)];
} else {
fileToSend = files[0]}
const stickerFile = stickerStatements.getFileById.get(fileToSend.id);
if (!stickerFile || !stickerFile.buffer) return { success: false, message: 'Arquivo não encontrado' }
await conn.sendMessage(remoteJid, { sticker: Buffer.from(stickerFile.buffer) }, { quoted: options.quoted || null })
return { success: true, totalStickers: files.length, command, index: fileToSend.index_num }
} catch (error) {
console.error('Erro ao enviar figurinha:', error)
return { success: false, message: error.message }}}

function deleteStickerById(stickerId) {
try {
const commandData = stickerStatements.getCommand.get(stickerId);
if (!commandData) return { success: false, message: 'Figurinha não encontrada' }
const command = commandData.command;
const files = stickerStatements.getFiles.all(command);
if (files.length === 0) return { success: false, message: 'Arquivos não encontrados' };
const fileToDelete = files[0];
stickerStatements.deleteFile.run(fileToDelete.id)
stickerStatements.deleteCommand.run(stickerId)
return { success: true, command, index: fileToDelete.index_num };
} catch (error) {
console.error('Erro ao remover figurinha:', error);
return { success: false, message: error.message }}}

function deleteStickerByCommandAndIndex(command, index) {
try {
if (command.startsWith(prefix)) command = command.slice(prefix.length)
const countResult = stickerStatements.countFiles.get(command);
const count = countResult ? countResult.count : 0
if (count === 0) return { success: false, message: 'Nenhuma figurinha encontrada' };
if (index < 0 || index >= count) return { success: false, message: `Índice inválido (${count} figurinhas)` }
stickerStatements.deleteFileByCommand.run(command, index);
return { success: true, command, index };
} catch (error) {
console.error('Erro ao remover figurinha:', error);
return { success: false, message: error.message }}}

async function handleStickerAndCommand(info) {
if (!info.message?.stickerMessage) return false
const processedSticker = await processStickerCommand(info)
if (processedSticker && info.message?.extendedTextMessage?.text) {
const commandText = info.message.extendedTextMessage.text;
body = commandText;
budy2 = commandText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
isCmd = body.startsWith(prefix);
command = isCmd ? budy2.slice(1).split(" ")[0] : "";
return true }
return false }

stickerStatements = initializeStickerCommands();

const stickerHelpers = {
statements: stickerStatements,
normalizeId: normalizeStickerId,
saveSticker: saveStickerByCommand,
sendSticker: sendStickerByCommand,
deleteById: deleteStickerById,
deleteByCommandAndIndex: deleteStickerByCommandAndIndex }

if (info.message?.stickerMessage) await handleStickerAndCommand(info);

global.prefix;
global.blocked;

//==============(BODY)================\\

var Procurar_String = info.message?.conversation || info?.message?.requestPaymentMessage?.noteMessage?.text || info?.message?.requestPaymentMessage?.noteMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.videoMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.documentMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.extendedTextMessage?.matchedText || info.message?.extendedTextMessage?.canonicalUrl || info.message?.extendedTextMessage?.conversation || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info?.message?.eventMessage?.name || (info?.message?.pollCreationMessageV3?.name ? info?.message?.pollCreationMessageV3?.name + JSON.stringify(info?.message?.pollCreationMessageV3?.options) : "") || ""


const args = body.trim().split(/ +/).slice(1);

var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

var command = isCmd ? removeSecondSpace(budy2).slice(1).split(" ")[0] : false;

const q_2 = budy2.trim().split(/ +/).slice(1).join(' ');

const q = command ? removeSecondSpace(body.trim()).slice(command.length+1)?.trim() || body.trim().replace(prefix+command, "") : body.trim()

var budy = info?.message?.conversation || info?.message?.extendedTextMessage?.text || '';

var budy3 = budy.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

var PR_String = Procurar_String.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

const q_ofc = PR_String.trim().split(/ +/).slice(1).join(" ");

//======================================\\

const messagesC = PR_String.slice(0).trim().split(/ +/).shift().toLowerCase();

const arg = body.substring(body.indexOf(' ') + 1)

const argss = body.split(/ +/g);

const groupDesc = isGroup ? groupMetadata?.desc || "" : "";

var groupMembers = isGroup ? groupMetadata?.participants || "" : "";

try {
var DonoNoGrupo = isGroup ? JSON.stringify(groupMetadata).includes(from) ? from.includes("status") ? true : VR_JSON_GLOBAL ? groupMembers?.some(a_d => a_d.id === nmrdn_dono2) : true : true : true;
} catch {
}

let lotus_users = [];

let lotusAtualizado = false;

async function atualizarLotus() {
if (lotusAtualizado) return
try {
const dataAtual = new Date().toISOString().split('T')[0];
const verificar = BANCOP.prepare("SELECT data_atualizacao FROM Lotus_numbers LIMIT 1").get()
if (verificar && verificar.data_atualizacao === dataAtual) {
lotus_users = BANCOP.prepare("SELECT user_id FROM Lotus_numbers").all().map(r => r.user_id)
} else {
const users = await fetchJson('https://raw.githubusercontent.com/Salientekill/figurinhas/main/numerosdn.json');
if (!users || !Array.isArray(users)) throw new Error("Dados inválidos")
BANCOP.exec('BEGIN TRANSACTION');
BANCOP.prepare("DELETE FROM Lotus_numbers").run()
const inserir = BANCOP.prepare("INSERT INTO Lotus_numbers VALUES (?, ?)");
users.forEach(num => inserir.run(`${num}${SNET}`, dataAtual));
BANCOP.exec('COMMIT')
lotus_users = users.map(n => `${n}${SNET}`)}
lotusAtualizado = true;
} catch (error) {
console.error("Erro Lotus:", error);
BANCOP.exec('ROLLBACK')}}

atualizarLotus()

const isnit = issupre = ischyt = lotus_users.includes(sender)

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';

const somembros = isGroup ? getMembros(groupMembers) : '';

//=======================================\\

const nmrdn = setting.numerodono.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET || isnit;

let donos = [dono1, dono2, dono3, dono4, dono5, dono6]
let numerodono = [`${nmrdn}`, ...donos.filter(dono => dono && dono.toString().trim() !== '').map(dono => `${dono}${SNET}`)]

//===========(Res_Aguarde)=============\\

var enviarmen = TEXTOS_GERAL.MENSAGENS_DE_AGUARDE[Math.floor(Math.random() * TEXTOS_GERAL.MENSAGENS_DE_AGUARDE.length)]

enviar = {
espere: `${enviarmen}`,
successo: '️❬ ✔ ❭ Sucesso 🖤',
levelon: '❬ ✔ ❭ *leveling* *ativado*',
leveloff: '❬ X ❭*leveling* *desativado*',
levelnoton: '❬ X ❭ *leveling não ativado*',
levelnol: '*error* 0 °-°',
error: {
stick: '*falhou, tente novamente ^_^*',
Iv: 'Link invalido ☹️'
},
msg: {
grupo: '[❗] Este comando só pode ser usado em grupos! ❌',
premium: '[❗] ESTE PEDIDO É SO PARA *USUÁRIOS PREMIUMS*',
mod: `[❗] ESTE PEDIDO É ESPECÍFICO PARA USUARIO MOD ${setting.NickDono}*`,
banido: '❌ Você foi banido de utilizar os comandos, entre em contato com o proprietário pra saber o porque ❌' ,
donosmt: '[❗] Este é um recurso especial para o proprietário ❌',
donosmt2: '[❗] Este é um recurso especial para o proprietário ❌',
adm: '[❗] Este comando só pode ser usado por administradores de grupo! ❌',
Badmin: ' [❗] Este comando só pode ser usado quando o bot se torna administrador! ❌',
}
}

//========================================\\

//============ Funções de Grupo 🥋 ==========//

const nescj = "./dados/nescessario.json";

function getEmojiTema(dataGp) {
try {
let temaEmoji
if (isGroup && dataGp && Array.isArray(dataGp) && dataGp.length > 0 && dataGp[0]?.TemaMenu) {
const temaPath = `${temasMenuPath}${dataGp[0].TemaMenu}.json`
if (fs.existsSync(temaPath)) {
const tema = JSON.parse(fs.readFileSync(temaPath));
temaEmoji = tema.emoji }}
if (!temaEmoji) {
try {
const temaPadrao = JSON.parse(fs.readFileSync(`${temasMenuPath}padrao.json`));
temaEmoji = temaPadrao.emoji;
} catch (err) { }}
return temaEmoji || setting.EmojiBot;
} catch (error) {
console.error('Erro ao obter emoji do tema:', error);
return setting.EmojiBot }}

var EmojiBot = getEmojiTema(dataGp);

async function setGp(index) {
return updateGroupSettings(from, groupName_RG, index)}

function setNes(index){
fs.writeFileSync(nescj, JSON.stringify(index, null, 2))}

// ===========(premium)=============== \\

let verifyPremiumStmt;

function verificarPremium(userId) {
try {
const tempoAtual = Math.floor(Date.now() / 1000)
if (!verifyPremiumStmt) {
verifyPremiumStmt = BANCOP.prepare(`SELECT * FROM usuarios_premium WHERE user_id = ? AND status = 'ativo' AND vencimento > ?`)}
const usuario = verifyPremiumStmt.get(userId, tempoAtual);
return !!usuario;
} catch (error) {
console.error("Erro ao verificar status premium:", error);
return false }}

function adicionarPremium(userId, nome = "", dias = 30, plano = "basico", adicionadoPor = "") {
try {
const tempoAtual = Math.floor(Date.now() / 1000)
const vencimento = tempoAtual + (dias * 86400)
const usuarioExistente = BANCOP.prepare("SELECT * FROM usuarios_premium WHERE user_id = ?").get(userId)
if (usuarioExistente) {
const updateStmt = BANCOP.prepare(`
UPDATE usuarios_premium 
SET vencimento = ?, plano = ?, status = 'ativo', adicionado_por = ?
WHERE user_id = ?`);
updateStmt.run(vencimento, plano, adicionadoPor, userId)
return {
sucesso: true,
mensagem: "Usuário premium atualizado com sucesso",
vencimento: new Date(vencimento * 1000).toLocaleString('pt-BR'),
plano: plano }
} else {
const insertStmt = BANCOP.prepare(`
INSERT INTO usuarios_premium 
(user_id, nome, inicio, vencimento, plano, status, adicionado_por, timestamp_criacao) 
VALUES (?, ?, ?, ?, ?, 'ativo', ?, ?)`);
insertStmt.run(userId, nome, tempoAtual, vencimento, plano, adicionadoPor, tempoAtual)
return {
sucesso: true,
mensagem: "Usuário adicionado como premium com sucesso",
vencimento: new Date(vencimento * 1000).toLocaleString('pt-BR'),
plano: plano }}
} catch (error) {
console.error("Erro ao adicionar usuário premium:", error);
return {
sucesso: false,
mensagem: "Erro ao processar operação premium",
erro: error.message }}}

function removerPremium(userId) {
try {
const updateStmt = BANCOP.prepare(`
UPDATE usuarios_premium 
SET status = 'inativo' 
WHERE user_id = ?`)
const result = updateStmt.run(userId)
if (result.changes > 0) {
return {
sucesso: true,
mensagem: "Status premium removido com sucesso"}
} else {
return {
sucesso: false,
mensagem: "Usuário não encontrado ou já não é premium" }}
} catch (error) {
console.error("Erro ao remover usuário premium:", error);
return {
sucesso: false,
mensagem: "Erro ao processar operação",
erro: error.message }}}

function listarPremium(apenasAtivos = true) {
try {
let query = "SELECT * FROM usuarios_premium"
if (apenasAtivos) {
const tempoAtual = Math.floor(Date.now() / 1000)
query += " WHERE status = 'ativo' AND vencimento > " + tempoAtual }
query += " ORDER BY vencimento DESC"
const stmt = BANCOP.prepare(query);
const usuarios = stmt.all()
return usuarios.map(user => ({
userId: user.user_id,
nome: user.nome,
plano: user.plano,
inicio: new Date(user.inicio * 1000).toLocaleString('pt-BR'),
vencimento: new Date(user.vencimento * 1000).toLocaleString('pt-BR'),
status: user.status,
diasRestantes: Math.floor((user.vencimento - Math.floor(Date.now() / 1000)) / 86400)}));
} catch (error) {
console.error("Erro ao listar usuários premium:", error);
return [] }}

//===== SISTEMA DE BANIMENTO DE USUÁRIOS ======

function verificarBanimento(userId) {
try {
const stmt = BANCOP.prepare("SELECT * FROM user_bans WHERE user_id = ? AND is_active = 1")
const usuario = stmt.get(userId);
return !!usuario;
} catch (error) {
console.error("Erro ao verificar banimento do usuário:", error);
return false }}

function banirUsuario(userId, motivo = "", adminId = "") {
try {
const timestamp = Math.floor(Date.now() / 1000);
const existingBan = BANCOP.prepare("SELECT * FROM user_bans WHERE user_id = ?").get(userId)
if (existingBan) {
if (existingBan.is_active === 1) {
return {
sucesso: false,
mensagem: "Este usuário já está banido." }}
const stmt = BANCOP.prepare(`UPDATE user_bans SET is_active = 1, motivo = ?, admin_id = ?, timestamp = ? WHERE user_id = ?`);
stmt.run(motivo, adminId, timestamp, userId);
} else {
const stmt = BANCOP.prepare(`
INSERT INTO user_bans (user_id, motivo, admin_id, timestamp, is_active) VALUES (?, ?, ?, ?, 1)`)
stmt.run(userId, motivo, adminId, timestamp)}
return {
sucesso: true,
mensagem: "Usuário banido com sucesso." }
} catch (error) {
console.error("Erro ao banir usuário:", error);
return {
sucesso: false,
mensagem: "Erro ao banir usuário",
erro: error.message }}}

function desbanirUsuario(userId) {
try {
const stmt = BANCOP.prepare(`UPDATE user_bans SET is_active = 0 WHERE user_id = ?`)
const result = stmt.run(userId)
if (result.changes > 0) {
return {
sucesso: true,
mensagem: "Usuário desbanido com sucesso." }
} else {
return {
sucesso: false,
mensagem: "Este usuário não está banido." }}
} catch (error) {
console.error("Erro ao desbanir usuário:", error)
return {
sucesso: false,
mensagem: "Erro ao desbanir usuário",
erro: error.message }}}

function toggleBanUsuario(userId, motivo = "", adminId = "") {
try {
if (verificarBanimento(userId)) {
return desbanirUsuario(userId);
} else {
return banirUsuario(userId, motivo, adminId)}
} catch (error) {
console.error("Erro ao alternar banimento:", error);
return {
sucesso: false,
mensagem: "Erro ao processar operação",
erro: error.message }}}

function listarUsuariosBanidos() {
try {
const stmt = BANCOP.prepare(`SELECT * FROM user_bans WHERE is_active = 1 ORDER BY timestamp DESC`);
return stmt.all();
} catch (error) {
console.error("Erro ao listar usuários banidos:", error);
return []}}

//====== SISTEMA DE BLOQUEIO DE COMANDOS ======

function verificarComandoBloqueado(comando, groupId = null) {
try {
const stmtGlobal = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE comando = ? AND tipo = 'global'`);
const bloqueioGlobal = stmtGlobal.get(comando);
if (bloqueioGlobal) {
return true }
if (groupId) {
const stmtGrupo = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE comando = ? AND tipo = 'grupo' AND grupo_id = ?`);
const bloqueioGrupo = stmtGrupo.get(comando, groupId);
if (bloqueioGrupo) {
return true }}
return false;
} catch (error) {
console.error("Erro ao verificar comando bloqueado:", error);
return false }}

function verificarTipoBloqueio(comando, groupId = null) {
try {
const resultado = { global: false, grupo: false }
const stmtGlobal = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE comando = ? AND tipo = 'global'`);
resultado.global = !!stmtGlobal.get(comando)
if (groupId) {
const stmtGrupo = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE comando = ? AND tipo = 'grupo' AND grupo_id = ?`);
resultado.grupo = !!stmtGrupo.get(comando, groupId)}
return resultado;
} catch (error) {
console.error("Erro ao verificar tipo de bloqueio:", error);
return { global: false, grupo: false }}}

function bloquearComando(comando, tipo = 'grupo', groupId = null, adminId = "") {
try {
if (tipo !== 'global' && tipo !== 'grupo') {
return { sucesso: false, mensagem: "Tipo de bloqueio inválido. Use 'global' ou 'grupo'." }}
if (tipo === 'grupo' && !groupId) {
return {sucesso: false, mensagem: "ID do grupo é obrigatório para bloqueio por grupo."}}
const bloqueios = verificarTipoBloqueio(comando, groupId)
if (tipo === 'global' && bloqueios.global) {
return {sucesso: false, mensagem: "Este comando já está bloqueado globalmente."}}
if (tipo === 'grupo' && bloqueios.grupo) {
return {sucesso: false, mensagem: "Este comando já está bloqueado neste grupo."}}
const timestamp = Math.floor(Date.now() / 1000);
const stmt = BANCOP.prepare(`INSERT INTO comandos_bloqueados (comando, tipo, grupo_id, admin_id, timestamp) VALUES (?, ?, ?, ?, ?)`)
stmt.run(comando, tipo, tipo === 'grupo' ? groupId : null, adminId, timestamp)
return {sucesso: true, mensagem: `Comando '${comando}' bloqueado com sucesso ${tipo === 'global' ? 'globalmente' : 'para o grupo'}.`}
} catch (error) {
console.error("Erro ao bloquear comando:", error)
return {sucesso: false, mensagem: "Erro ao bloquear comando", erro: error.message}}}

function desbloquearComando(comando, tipo = 'grupo', groupId = null) {
try {
if (tipo !== 'global' && tipo !== 'grupo') {
return {sucesso: false, mensagem: "Tipo de bloqueio inválido. Use 'global' ou 'grupo'."}}
if (tipo === 'grupo' && !groupId) {
return {sucesso: false, mensagem: "ID do grupo é obrigatório para desbloqueio por grupo."}}
const bloqueios = verificarTipoBloqueio(comando, groupId)
if (tipo === 'global' && !bloqueios.global) {
return {sucesso: false, mensagem: "Este comando não está bloqueado globalmente."}}
if (tipo === 'grupo' && !bloqueios.grupo) {
return {sucesso: false, mensagem: "Este comando não está bloqueado neste grupo."}}
let stmt;
if (tipo === 'global') {
stmt = BANCOP.prepare(`DELETE FROM comandos_bloqueados WHERE comando = ? AND tipo = 'global'`)
stmt.run(comando)
} else {
stmt = BANCOP.prepare(`DELETE FROM comandos_bloqueados WHERE comando = ? AND tipo = 'grupo' AND grupo_id = ?`);
stmt.run(comando, groupId)}
return {sucesso: true, mensagem: `Comando '${comando}' desbloqueado com sucesso ${tipo === 'global' ? 'globalmente' : 'para o grupo'}.`}
} catch (error) {
console.error("Erro ao desbloquear comando:", error);
return {sucesso: false, mensagem: "Erro ao desbloquear comando", erro: error.message}}}

function toggleBloqueioComando(comando, tipo = 'grupo', groupId = null, adminId = "") {
try {
const bloqueios = verificarTipoBloqueio(comando, groupId)
if (tipo === 'global') {
if (bloqueios.global) {
return desbloquearComando(comando, 'global', null);
} else {
return bloquearComando(comando, 'global', null, adminId)}
} else {
if (bloqueios.grupo) {
return desbloquearComando(comando, 'grupo', groupId);
} else {
return bloquearComando(comando, 'grupo', groupId, adminId)}}
} catch (error) {
console.error("Erro ao alternar bloqueio de comando:", error);
return {sucesso: false, mensagem: "Erro ao processar operação", erro: error.message}}}

function listarComandosBloqueados(tipo = 'global', groupId = null) {
try {
let stmt;
if (tipo === 'global') {
stmt = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE tipo = 'global' ORDER BY comando`);
return stmt.all();
} else if (tipo === 'grupo' && groupId) {
stmt = BANCOP.prepare(`SELECT * FROM comandos_bloqueados WHERE tipo = 'grupo' AND grupo_id = ? ORDER BY comando`);
return stmt.all(groupId)}
return [];
} catch (error) {
console.error("Erro ao listar comandos bloqueados:", error);
return []}}


// (NADA)

//=======(ADMS/DONO/ETC..CONST)========\\

const adivinha = info.key.id.length > 21 ? 'Android ツ' : info.key.id.substring(0, 2) == '3A' ? 'IPhone ｯ' : 'WhatsApp web シ';

const quoted = info.quoted ? info.quoted : info

const isBot = info.key.fromMe ? true : false;

const SoDono = numerodono.includes(sender) || isBot || isnit

dfndofc = setting.numerodono+SNET;

const DonoOficial = dfndofc.includes(sender) ;

const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;

const isGroupAdmins = groupAdmins.includes(sender) || SoDono

async function verificarStatusUsuario(userId) {
return {
isPremium: verificarPremium(userId),
isBanned: verificarBanimento(userId)}}

const statusCache = new Map();

let userStatus = statusCache.get(sender);
if (!userStatus || Date.now() - userStatus.timestamp > 300000) {
userStatus = {
...await verificarStatusUsuario(sender),
timestamp: Date.now()}
statusCache.set(sender, userStatus)}
const { isPremium, isBanned } = userStatus;

const isVisualizar = nescessario.visualizarmsg

const isVerificado = nescessario.verificado

const isAudioMenu = nescessario.menu_audio

const isConsole = nescessario.consoleoff

const listanegraG = nescessario.listanegraG

const isAnticall = nescessario.anticall

//============(FUNÇÕES)============\\

function verificarAluguelDB(id_gp) {
const agora = Math.floor(Date.now() / 1000);
try {
const row = BANCOP.prepare("SELECT vencimento FROM aluguel WHERE id_gp = ? LIMIT 1").get(id_gp);
return row ? row.vencimento > agora : false;
} catch (err) {
console.error(`[Aluguel] Erro SQL: ${err.message}`);
return false }}

const aluguelNecessario = nescessario?.rg_aluguelGB || (dataGp && dataGp[0]?.rg_aluguel) || false;
const grupoTemAluguel = verificarAluguelDB(from)

const isAntifake = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.antifake) : undefined;
const isx9 = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.x9) : undefined;
const isWelkom = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : (dataGp[0]?.wellcome[0] ? dataGp[0].wellcome[0].bemvindo1 : undefined)) : undefined;
const isWelkom2 = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : (dataGp[0]?.wellcome[1] ? dataGp[0].wellcome[1].bemvindo2 : undefined)) : undefined;
const isSimi = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.simi1) : undefined;
const isSimi2 = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.simi2) : undefined;
const isAutorepo = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.autoresposta) : undefined;
const isModobn = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.jogos) : undefined;
const isAutofigu = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.autosticker) : undefined;
const isPalavrao = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : (dataGp[0]?.antipalavrao?.modo > 0)) : undefined;
const isAntiFlood = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : (dataGp[0]?.limitec?.quantidade > 0)) : undefined;
const isNsfw = isGroup ? (aluguelNecessario && !grupoTemAluguel ? false : dataGp[0]?.nsfw) : undefined;

var isRecolherlinksgp = isGroup ? dataGp[0].recolherlinkgp : undefined

const isMultiP = isGroup ? dataGp[0].multiprefix : undefined

const isBanchat = isGroup ? dataGp[0].bangp : undefined

const isPalavras = isGroup ? dataGp[0].antipalavrao.palavras : undefined

//=======================================\\

var Res_Aguarde = enviarmen

var Res_SoGrupo = TEXTOS_GERAL.MENSAGEM_DE_SO_USAR_EM_GRUPO;

var Res_SoDono = TEXTOS_GERAL.MENSAGEM_DE_SO_DONO_USAR_COMANDOS;

var MsgAntiLink = TEXTOS_GERAL.MENSAGEM_DOS_ANTI_LINKS

var Res_SoAdm = TEXTOS_GERAL.MENSAGEM_DE_SO_ADM_CONSEGUIR_USAR_X_COMANDO

var Res_BotADM = TEXTOS_GERAL.MENSAGEM_DE_QUANDO_O_BOT_NAO_E_ADM;

var Res_SoModoBN = TEXTOS_GERAL.MENSAGEM_DE_SO_QUANDO_MODO_BRINCADEIRA_FOR_ATIVO.replaceAll("#prefixo#", prefix)

//==========(VERIFICADO)===============\\

let selo;
if(isVerificado) {
selo = { key: {fromMe: false, participant: `0${SNET}`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": `${NomeDoBot}`}}}
} else {
selo = info
}

// FUNÇÕES DE MARCAÇÕES ESSENCIAL \\ LTSSML

const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant

const menc_jid = args?.join(" ").replace("@", "") + SNET

const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid

const sender_ou_n = q.includes("@") ? menc_jid : sender

const mrc_ou_numero = q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt

const menc_os2 = q.includes("@") ? (menc_jid2?.length > 0 ? menc_jid2[0]: false) : menc_prt

const marc_tds = q.includes("@") ? menc_jid : q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt 

const menc_prt_nmr = q.length > 12 ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + SNET : menc_prt

////////////////////////////////////////////

const legendafig = JSON.parse(fs.readFileSync("./dados/org/json/legendafig.json"));

let replaceValues = (str) => str
  .replaceAll('#Nome#', pushname)
  .replaceAll('#NomeDoGp#', groupName)
  .replaceAll('#NomeDoBot#', NomeDoBot)
  .replaceAll('#Dono#', NickDono)
  .slice(0, 200)

const FigAuthor = replaceValues(legendafig.FigAuthor)
const FigPack = replaceValues(legendafig.FigPack)

//BAN GRUPO & BOT OFF
if(isGroup && isCmd && isBanchat && !SoDono) return // IGNORAR TODOS DO GRUPO.

if(nescessario?.botoff && !SoDono) return // IGNORAR TUDO SEM SER DONO.

if (info.key.fromMe && info.participant && info.participant.includes(':')) continue;

var isUrl = (url) => {
return linkfy.find(url)[0]?.isLink
}

const isLink = (url) => {
return linkfy.find(url)[0]?.isLink
}

const Link = (url) => {
if(isLink(url)) {
return linkfy.find(url)[0].href
}else {
return false;
}
}

const reply = (texto) => {
conn.sendMessage(from, { text: texto }, {quoted: info}).catch(e => {
console.log(e);
return reply("Erro..");
})
}

//
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00" && time2 < "05:00:00"){
var tempo = 'Boa madrugada'
} if(time2 > "05:00:00" && time2 < "12:00:00"){
var tempo = 'Bom dia'
} if(time2 > "12:00:00" && time2 < "18:00:00"){
var tempo = 'Boa tarde'
} if(time2 > "18:00:00"){
var tempo = 'Boa noite'
}

const sendSticker = (from, filename, info) => {
conn.sendMessage(from, {sticker: {url: fileName}}, {quoted: info})
}

const sendImage = (ytb) => {
conn.sendMessage(from, {image: {url: ytb}}, {quoted:info})
}


const sendMess = (hehe, ytb) => {
conn.sendMessage(hehe, {text: ytb})
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
	
const mention = (teks= '', ms = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+SNET)
}}
conn.sendMessage(from, {text: teks.trim(), mentions: memberr}, {quoted: ms}) 
}

const mentionSm = (teks= '') => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+SNET)
}}
conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const mencionarIMG = (teks= '', Url, ms = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+SNET)
}}
conn.sendMessage(from, {image: {url: Url}, caption: teks.trim(), mentions: memberr}, {quoted: ms}) 
}

const reagirE = async (idgp, emj) => {
conn.sendMessage(idgp, {react: {text: emj, key: info.key}})
}

const verificarN = async(sla) => {
const [result] = await conn.onWhatsApp(sla)
if(result == undefined) {
reply("Este usuário não é existente no WhatsApp")
} else {
reply(`-> ${sla} Número inserido é existente no WhatsApp.\n\ncom o id: ${result.jid}`)
}
}

const enviarfigu = async (figu, tag) => {
conn.sendMessage(from, {sticker: {url: figu}}, {quoted: tag})
}

if(isAutofigu && isGroup) {
async function autofiguf() {
setTimeout(async() => {

if(budy.includes(`${prefix}sticker`) || budy.includes(`${prefix}s`) || budy.includes(`${prefix}stk`) || budy.includes(`${prefix}st`) || budy.includes(`${prefix}fsticker`) || budy.includes(`${prefix}f`) || budy.includes(`${prefix}fstiker`)) return

if(type == 'imageMessage') {
var pack =`⚝ ⇝ Grupo:\n${groupName}`
var author2 = `⚒${pushname}\n⚒${NomeDoBot}\n${NickDono}`
owgi = await getFileBuffer(info.message.imageMessage, 'image')
let encmediaa = await sendImageAsSticker2(conn, from, owgi, info, { packname:pack, author:author2})
DLT_FL(encmediaa)
}

if(type == 'videoMessage') {
if((isMedia && info.message.videoMessage.seconds < 10)){
var pack =`⚝ ⇝ Grupo:\n${groupName}`
var author2 = `⚒${pushname}\n⚒${NomeDoBot}\n⚒${NickDono}`
owgi = await getFileBuffer(info.message.videoMessage, 'video')
let encmedia = await sendVideoAsSticker2(conn, from, owgi, info, { packname:pack, author:author2})
DLT_FL(encmedia)
}
} 
}, 1000)
}
autofiguf().catch(e => {
console.log(e)
})
}

var nmrdnofc1 = setting.numerodono.replace(new RegExp("[()+-/ +/]", "gi"), "")

if(isGroup && menc_jid2?.length > 0) {
const nmrdnofc1 = numerodono_ofc.replace(new RegExp("[()+-/ +/]", "gi"), "")
if(budy.indexOf(`@${nmrdnofc1}`) >= 0) {
const stmtDono = BANCOP.prepare(`SELECT motivo, datetime(timestamp, 'unixepoch', 'localtime') as ausente_desde FROM sistema_afk WHERE user_id = ? AND is_dono = 1`)
const donoAusente = stmtDono.get(nmrdn_dono2)
if(donoAusente) {
const txt = `╭「 📢 𝙽𝙾𝚃𝙸𝙵𝙸𝙲𝙰𝙲̧𝙰̃𝙾 𝙳𝙴 𝙰𝚄𝚂𝙴̂𝙽𝙲𝙸𝙰 」╮
┃
┃ 👑 *${NickDono}* está ausente no momento
┃
┃ ⏰ *Ausente desde:* ${donoAusente.ausente_desde}
┃ 
┃ 📝 *Mensagem:*
┃ ${donoAusente.motivo}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`
conn.sendMessage(from, {text: txt}, {quoted: info})}}}

if(isGroup && menc_jid2?.length > 0) {
let adminsMencionados = []
for(const mencionado of menc_jid2) {
if(groupAdmins.includes(mencionado)) {
adminsMencionados.push(mencionado)}}
if(adminsMencionados.length > 0) {
for(const adminId of adminsMencionados) {
const stmtAdmin = BANCOP.prepare(`SELECT motivo FROM sistema_afk WHERE user_id = ? AND grupo_id = ? AND is_dono = 0`)
const adminAusente = stmtAdmin.get(adminId, from)
if(adminAusente) {
const adminName = adminId.split('@')[0];
const txt = `╭「 📢 𝙽𝙾𝚃𝙸𝙵𝙸𝙲𝙰𝙲̧𝙰̃𝙾 𝙳𝙴 𝙰𝚄𝚂𝙴̂𝙽𝙲𝙸𝙰 」╮
┃
┃ 👮‍♂️ *Admin @${adminName}* está ausente
┃
┃ 📝 *Mensagem deixada:* 
┃ ${adminAusente.motivo}
┃
┃ 🔔 Esta mensagem aparece quando você
┃menciona um usuário ausente
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`
mention(txt)}}}}

if(isBotGroupAdmins && isGroupAdmins && body.toLowerCase() === "apaga" && menc_prt) {
reagirE(from, EmojiBot);
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc_prt}})}

//=======================================\\

const sendStickerFromUrl = async(to, url) => {
try {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './sticker' + names + '.png', async function () {
console.log('enviando sticker');
let filess = './sticker' + names + '.png'
let asw = './sticker' + names + '.webp'
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${asw}`, (err) => {
let media = fs.readFileSync(asw)
conn.sendMessage(to, {sticker: media}, {sendEphemeral: true, contextInfo: { forwardingScore: 50, isForwarded: true}, quoted: info}).catch(e => {
return reply("Erro..")
})
DLT_FL(filess)
DLT_FL(asw)
});
});
} catch {
return reply("Erro.. FNC")
}
}

//=========(isQuoted/consts)=============\\
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

// Definições booleanas existentes
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

// Definições que retornam os objetos de mídia
// Definições existentes (manter como estão)
const quotedMsg = isQuotedMsg ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation : null
const quotedMsg2 = isQuotedMsg2 ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.text : null
const quotedMsg3 = isQuotedMsg ? info.message?.extendedTextMessage?.contextInfo : null
const quotedImage = isQuotedImage ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage : null
const quotedVideo = isQuotedVideo ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage : null
const quotedDocument = isQuotedDocument ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage : null
const quotedDocW = isQuotedDocW ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentWithCaptionMessage : null
const quotedAudio = isQuotedAudio ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage : null
const quotedSticker = isQuotedSticker ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage : null
const quotedContact = isQuotedContact ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.contactMessage : null
const quotedLocation = isQuotedLocation ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.locationMessage : null
const quotedProduct = isQuotedProduct ? info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.productMessage : null
const isQuotedViewOnceImage = type === 'extendedTextMessage' && (content.includes('viewOnceMessage') || content.includes('viewOnceMessageV2')) && content.includes('imageMessage')
const isQuotedViewOnceVideo = type === 'extendedTextMessage' && (content.includes('viewOnceMessage') || content.includes('viewOnceMessageV2')) && content.includes('videoMessage')

// Buscar imagens em todas as variações possíveis (incluindo viewOnce)
const allImageMessage = (() => {
const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
return RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || 
 RSM?.viewOnceMessage?.message?.imageMessage ||
 quotedImage })()

const allVideoMessage = (() => {
const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
return RSM?.videoMessage || 
 info.message?.videoMessage || 
 RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage || quotedVideo })()

// Verificações simplificadas
const hasAnyImage = !!(allImageMessage)
const hasAnyVideo = !!(allVideoMessage)

if(info.messageStubType) continue
if(isConsole) {
let border = `┅❆─━─━─━─━─━•𖧹❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ${EmojiBot}❀⃘࣭࣭࣭࣭ꔷ⃔໑࣭࣭ٜ𖧹•─━─━─━─━─━❆┅`

let createField = (label, value, color) => 
`╏ 〔 ${colors[color](label)} 〕: 「 ${colors[color](value)} 」\n╏`

let baseFields = [
createField("USUÁRIO", pushname, "brightBlue"),
createField("NÚMERO", sender2, "brightMagenta")]

let additionalFields = []

if(isGroup) {
additionalFields.push(createField("GRUPO", groupName, "brightRed"))
} else {
additionalFields.push(`╏ 「 ${colors.brightRed("PRIVADO")} 」\n╏`)}

if(isCmd) {
additionalFields.push(createField("COMANDO", command, "brightGreen"))}

if(isGroup && info.message?.reactionMessage?.text) {
additionalFields.push(`╏ 〔 REAÇÃO 〕: 〔 ${info.message.reactionMessage.text} 〕\n╏`)}

let log = [
`╭${border}╮`,
'╏',
...baseFields,
...additionalFields,
`╰${border}╯` ].join('\n')

const chalk = require('chalk');
console.log(chalk.hex('#800080')(log))}

//======(JOGO-DA-VELHA)=======(Função)===\\

const JogoDaVelha = require('./outros/funcoes/velha.js');

async function joguinhodavelha() {
try {
const cmde = budy.toLowerCase().split(" ")[0] || "";
let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
// Emojis e elementos visuais modernos
const emojiX = "❌"; // Jogador X
const emojiO = "⭕"; // Jogador O
const emojiBorda = "┃"; // Borda vertical
const emojiLinha = "━━━"; // Linha horizontal
const emojiCanto = "┃"; // Canto
const emojiVazio = " "; // Espaço vazio
const emojiCoroa = "👑"; // Vencedor
const emojiTrofeu = "🏆"; // Troféu
const emojiRelogio = "⏱️"; // Tempo
const emojiJogo = "🎮"; // Jogo
const emojiDesafio = "⚔️"; // Desafio
const emojiEspera = "⏳"; // Espera
const emojiVersus = "🆚"; // VS
const emojiGamepad = "🎯"; // Gamepad
const emojiSino = "🔔"; // Notificação
const emojiCelebra = "🎉"; // Celebração
const emojiEmpate = "🤝"; // Empate
// Verificar se o comando é um número do jogo da velha
if (arrNum.includes(cmde)) {
// Verificar se existe um jogo para este grupo
if (!JogoDaVelha.gameExists(BANCOP, from)) return
// Se existe jogo, obter informações
const boardnow = JogoDaVelha.setGame(BANCOP, from);
// Verificar se o jogo já foi aceito
if (!boardnow.status) {
// Se o oponente ainda não aceitou, mostrar mensagem e retornar
return reply(`${emojiEspera} 𝗣𝗘𝗡𝗗𝗘𝗡𝗧𝗘: 𝐒𝐞𝐮 𝐨𝐩𝐨𝐧𝐞𝐧𝐭𝐞 𝐚𝐢𝐧𝐝𝐚 𝐧𝐚̃𝐨 𝐚𝐜𝐞𝐢𝐭𝐨𝐮 𝐨 𝐝𝐞𝐬𝐚𝐟𝐢𝐨...`)}
// Verificar timeout de inatividade (2 minutos sem jogada após início)
if (boardnow.timestamp) {
const currentTime = Math.floor(Date.now() / 1000)
const elapsedTime = currentTime - boardnow.timestamp;
// Se passaram mais de 2 minutos desde a última jogada
if (elapsedTime > 120) {
JogoDaVelha.deleteGame(BANCOP, from);
return reply(`${emojiRelogio} 𝐓𝐈𝐌𝐄 𝐎𝐔𝐓! ${emojiRelogio}\n\n𝐎 𝐣𝐨𝐠𝐨 𝐝𝐚 𝐯𝐞𝐥𝐡𝐚 𝐞𝐧𝐭𝐫𝐞 @${boardnow.X} 𝐞 @${boardnow.O} 𝐟𝐨𝐢 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐞 𝐞𝐧𝐜𝐞𝐫𝐫𝐚𝐝𝐨 𝐩𝐨𝐫 𝐢𝐧𝐚𝐭𝐢𝐯𝐢𝐝𝐚𝐝𝐞.`)}}
// Verificar se é a vez do jogador
if ((boardnow.turn == "X" ? boardnow.X : boardnow.O) != sender.replace(SNET, "")) return
// Atualizar timestamp a cada jogada
boardnow.timestamp = Math.floor(Date.now() / 1000);
JogoDaVelha.saveGame(BANCOP, boardnow, from);
const moving = JogoDaVelha.validmove(BANCOP, Number(budy), from);
const matrix = moving._matrix;
// Função para criar um tabuleiro visualmente atraente
const createBeautifulBoard = (matrix) => {
// Mapear os símbolos para emojis e espaços
const mapSymbol = (symbol) => {
if (symbol === "❌") {
return ` ${emojiX} `;
} else if (symbol === "⭕") {
return ` ${emojiO} `;
} else if (symbol === "1️⃣") {
return " 1️⃣ ";
} else if (symbol === "2️⃣") {
return " 2️⃣ ";
} else if (symbol === "3️⃣") {
return " 3️⃣ ";
} else if (symbol === "4️⃣") {
return " 4️⃣ ";
} else if (symbol === "5️⃣") {
return " 5️⃣ ";
} else if (symbol === "6️⃣") {
return " 6️⃣ ";
} else if (symbol === "7️⃣") {
return " 7️⃣ ";
} else if (symbol === "8️⃣") {
return " 8️⃣ ";
} else if (symbol === "9️⃣") {
return " 9️⃣ " }
return symbol }
// Criar o tabuleiro moderno
return `┏━━━━━━━━━━━━━┓
┃${mapSymbol(matrix[0][0])}┃${mapSymbol(matrix[0][1])}┃${mapSymbol(matrix[0][2])}┃
┃━━━━━━━━━━━━━┃
┃${mapSymbol(matrix[1][0])}┃${mapSymbol(matrix[1][1])}┃${mapSymbol(matrix[1][2])}┃
┃━━━━━━━━━━━━━┃
┃${mapSymbol(matrix[2][0])}┃${mapSymbol(matrix[2][1])}┃${mapSymbol(matrix[2][2])}┃
┗━━━━━━━━━━━━━┛`}
if (moving.isWin) {
if (moving.winner == "SERI") {
const chatEqual = `╔━━━━━━━━━━━━━━━━━━━━━╗
${emojiCanto}${emojiJogo} 𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀 ${emojiJogo}${emojiCanto}
╠━━━━━━━━━━━━━━━━━━━━━╣
${emojiCanto} ${emojiEmpate} 𝐄𝐌𝐏𝐀𝐓𝐄! ${emojiEmpate} ${emojiCanto}
╚━━━━━━━━━━━━━━━━━━━━━╝

${createBeautifulBoard(matrix)}

𝐎 𝐣𝐨𝐠𝐨 𝐭𝐞𝐫𝐦𝐢𝐧𝐨𝐮 𝐞𝐦𝐩𝐚𝐭𝐚𝐝𝐨! 𝐁𝐨𝐚 𝐩𝐚𝐫𝐭𝐢𝐝𝐚, @${moving.X} 𝐞 @${moving.O}!`;
reply(chatEqual);
JogoDaVelha.deleteGame(BANCOP, from);
return }
const winnerJID = moving.winner == "O" ? moving.O : moving.X;
const looseJID = moving.winner == "O" ? moving.X : moving.O;
const winnerSymbol = moving.winner == "O" ? emojiO : emojiX;
const chatWon = `╔━━━━━━━━━━━━━━━━━━━━━╗
${emojiCanto}${emojiJogo} 𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀 ${emojiJogo}${emojiCanto}
╠━━━━━━━━━━━━━━━━━━━━━╣
${emojiCanto}${emojiTrofeu} 𝐕𝐈𝐓Ó𝐑𝐈𝐀! ${emojiTrofeu} ${emojiCanto}
╚━━━━━━━━━━━━━━━━━━━━━╝

${createBeautifulBoard(matrix)}

${emojiCoroa} 𝐂𝐀𝐌𝐏𝐄Ã𝐎: @${winnerJID} ${winnerSymbol}

${emojiCelebra} 𝐏𝐀𝐑𝐀𝐁É𝐍𝐒! 𝐕𝐨𝐜ê 𝐯𝐞𝐧𝐜𝐞𝐮 𝐚 𝐩𝐚𝐫𝐭𝐢𝐝𝐚 𝐜𝐨𝐧𝐭𝐫𝐚 @${looseJID}`
mention(chatWon);
JogoDaVelha.deleteGame(BANCOP, from);
} else {
const currentPlayer = moving.turn == "X" ? moving.X : moving.O;
const currentSymbol = moving.turn == "X" ? emojiX : emojiO;

const chatMove = `╔━━━━━━━━━━━━━━━━━━━━━╗
${emojiCanto}${emojiJogo} 𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀 ${emojiJogo}${emojiCanto}
╠━━━━━━━━━━━━━━━━━━━━━╣
${emojiCanto}${emojiGamepad} 𝐏𝐀𝐑𝐓𝐈𝐃𝐀 ${emojiGamepad}${emojiCanto}
╚━━━━━━━━━━━━━━━━━━━━━╝

${createBeautifulBoard(matrix)}

${emojiX} : @${moving.X}
${emojiO} : @${moving.O}

${emojiSino} 𝐒𝐮𝐚 𝐯𝐞𝐳, @${currentPlayer} ${currentSymbol}

𝐃𝐢𝐠𝐢𝐭𝐞 𝐮𝐦 𝐧ú𝐦𝐞𝐫𝐨 𝐝𝐞 1 𝐚 9 𝐩𝐚𝐫𝐚 𝐣𝐨𝐠𝐚𝐫`;
mention(chatMove)}
return }
// Processar comandos "s", "sim", "n", "não", etc.
if (JogoDaVelha.gameExists(BANCOP, from)) {
const boardnow = JogoDaVelha.setGame(BANCOP, from)
if (budy == "Cex") return reply("why")
if (budy.toLowerCase() == "s" || budy.toLowerCase() == "sim" || budy.toLowerCase() == "ok") {
// Verificar se é o jogador desafiado
if (boardnow.O == sender.replace(SNET, "")) {
// Verificar se o jogo já começou
if (boardnow.status) return reply(`${emojiSino} 𝐎 𝐣𝐨𝐠𝐨 𝐣á 𝐜𝐨𝐦𝐞ç𝐨𝐮 𝐚𝐧𝐭𝐞𝐬!`)
// Iniciar o jogo
const matrix = boardnow._matrix;
boardnow.status = true;
boardnow.timestamp = Math.floor(Date.now() / 1000); // Atualizar timestamp quando o jogo começa
// Salvar o jogo atualizado no banco de dados
JogoDaVelha.saveGame(BANCOP, boardnow, from);
// Função para criar um tabuleiro visualmente atraente
const createBeautifulBoard = (matrix) => {
return `┏━━━━━━━━━━━━━┓
┃ ${matrix[0][0]} ┃ ${matrix[0][1]} ┃ ${matrix[0][2]} ┃
┃━━━━━━━━━━━━━┃
┃ ${matrix[1][0]} ┃ ${matrix[1][1]} ┃ ${matrix[1][2]} ┃
┃━━━━━━━━━━━━━┃
┃ ${matrix[2][0]} ┃ ${matrix[2][1]} ┃ ${matrix[2][2]} ┃
┗━━━━━━━━━━━━━┛`}
const chatAccept = `╔━━━━━━━━━━━━━━━━━━━━━╗
${emojiCanto}${emojiJogo} 𝐉𝐎𝐆𝐎 𝐃𝐀 𝐕𝐄𝐋𝐇𝐀 ${emojiJogo}${emojiCanto}
╠━━━━━━━━━━━━━━━━━━━━━╣
${emojiCanto}${emojiGamepad} 𝐈𝐍𝐈𝐂𝐈𝐀𝐃𝐎 ${emojiGamepad}${emojiCanto}
╚━━━━━━━━━━━━━━━━━━━━━╝

${createBeautifulBoard(matrix)}

${emojiX} : @${boardnow.X}
${emojiO} : @${boardnow.O}

${emojiSino} 𝐒𝐮𝐚 𝐯𝐞𝐳, @${boardnow.turn == "X" ? boardnow.X : boardnow.O} ${boardnow.turn == "X" ? emojiX : emojiO}

𝐃𝐢𝐠𝐢𝐭𝐞 𝐮𝐦 𝐧ú𝐦𝐞𝐫𝐨 𝐝𝐞 1 𝐚 9 𝐩𝐚𝐫𝐚 𝐣𝐨𝐠𝐚𝐫`;
mention(chatAccept)}
} else if (budy.toLowerCase() == "n" || budy.toLowerCase() == "não" || budy.toLowerCase() == "no") {
// Verificar se é o jogador desafiado
if (boardnow.O == sender.replace(SNET, "")) {
// Verificar se o jogo já começou
if (boardnow.status) return reply(`${emojiSino} 𝐎 𝐣𝐨𝐠𝐨 𝐣á 𝐜𝐨𝐦𝐞ç𝐨𝐮!`)
// Remover o jogo do banco de dados
JogoDaVelha.deleteGame(BANCOP, from);
mention(`${emojiDesafio} @${boardnow.X} *𝐒𝐞𝐮 𝐝𝐞𝐬𝐚𝐟𝐢𝐨 𝐟𝐨𝐢 𝐫𝐞𝐜𝐮𝐬𝐚𝐝𝐨* ${emojiDesafio}`)}}}
} catch (error) {
console.error("Erro na função joguinhodavelha:", error)}}

//=================================\\

function contar(frase, letraProcurada) {
var total = 0; [...frase].forEach(letra => {
if(letra === letraProcurada) total++; 
}); 
return total; 
}

joguinhodavelha()

const yts = require('yt-search')
async function pesytb(pesquisa) {
if (isUrl(pesquisa)) {
return pesquisa;
} else {
res = await yts(pesquisa);
resultadoyts = res.videos[0].url;
return resultadoyts;
}
}

//========(CONTADOR-DE-MENSAGENS)========\\

function initializeContadorTable() {
try {
const tableExists = BANCOP.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='ContadorMSG'").get();
if (!tableExists) {
BANCOP.exec(`CREATE TABLE IF NOT EXISTS ContadorMSG (
groupId TEXT PRIMARY KEY,
numbers TEXT )`)
console.log('Tabela ContadorMSG inicializada com sucesso')}
} catch (err) {
console.error('Erro ao criar tabela ContadorMSG:', err.message)}}

async function contadorMsg() {
return new Promise((resolve, reject) => {
try {
const stmt = BANCOP.prepare('SELECT * FROM ContadorMSG');
const rows = stmt.all();
resolve(rows);
} catch (err) {
console.error('Erro ao recuperar dados do contador:', err.message);
reject(err)}})}

async function atualizarContador(groupId, usuarioId, updates) {
try {
return executarTransacao(() => {
const selectStmt = prepareStatement('SELECT * FROM ContadorMSG WHERE groupId = ?');
const insertStmt = prepareStatement('INSERT INTO ContadorMSG (groupId, numbers) VALUES (?, ?)');
const updateStmt = prepareStatement('UPDATE ContadorMSG SET numbers = ? WHERE groupId = ?')
const row = selectStmt.get(groupId);
const currentTime = Date.now()
let currentNumbers = []
if (row) {
try {
currentNumbers = JSON.parse(row.numbers || "[]");
if (!Array.isArray(currentNumbers)) {
currentNumbers = []}
} catch {
currentNumbers = []}
const existingUserIndex = currentNumbers.findIndex(user => user.id === usuarioId)
if (existingUserIndex !== -1) {
Object.assign(currentNumbers[existingUserIndex], {
messages: (currentNumbers[existingUserIndex].messages || 0) + (updates.messages || 0),
cmd_messages: (currentNumbers[existingUserIndex].cmd_messages || 0) + (updates.cmd_messages || 0),
figus: (currentNumbers[existingUserIndex].figus || 0) + (updates.figus || 0),
imagens: (currentNumbers[existingUserIndex].imagens || 0) + (updates.imagens || 0),
videos: (currentNumbers[existingUserIndex].videos || 0) + (updates.videos || 0),
audios: (currentNumbers[existingUserIndex].audios || 0) + (updates.audios || 0),
lastActivity: currentTime,
aparelho: updates.aparelho || currentNumbers[existingUserIndex].aparelho,
nick: updates.nick || currentNumbers[existingUserIndex].nick })
} else {
currentNumbers.push({
id: usuarioId,
messages: updates.messages || 0,
cmd_messages: updates.cmd_messages || 0,
figus: updates.figus || 0,
imagens: updates.imagens || 0,
videos: updates.videos || 0,
audios: updates.audios || 0,
aparelho: updates.aparelho || "",
nick: updates.nick || "",
lastActivity: currentTime })}
updateStmt.run(JSON.stringify(currentNumbers), groupId)
} else {
const newUser = {
id: usuarioId,
messages: updates.messages || 0,
cmd_messages: updates.cmd_messages || 0,
figus: updates.figus || 0,
imagens: updates.imagens || 0,
videos: updates.videos || 0,
audios: updates.audios || 0,
aparelho: updates.aparelho || "",
nick: updates.nick || "",
lastActivity: Date.now()}
insertStmt.run(groupId, JSON.stringify([newUser]))}
return true })
} catch (error) {
console.error('Erro em atualizarContador:', error.message);
return false }}

async function removerGrupoDoContador(groupId) {
return new Promise((resolve, reject) => {
try {
const deleteStmt = BANCOP.prepare('DELETE FROM ContadorMSG WHERE groupId = ?');
const result = deleteStmt.run(groupId);
resolve(result.changes);
} catch (err) {
console.error('Erro ao remover grupo do contador:', err.message);
reject(err)}})}

async function removerDoContador(groupId, usuarioId) {
return new Promise((resolve, reject) => {
try {
const selectStmt = BANCOP.prepare('SELECT * FROM ContadorMSG WHERE groupId = ?');
const row = selectStmt.get(groupId)
if (row) {
let currentNumbers;
try {
currentNumbers = JSON.parse(row.numbers || "[]")
} catch (e) {
currentNumbers = []}
const idsToRemove = Array.isArray(usuarioId) ? usuarioId : [usuarioId];
const updatedNumbers = currentNumbers.filter(user => !idsToRemove.includes(user.id))
const updateStmt = BANCOP.prepare('UPDATE ContadorMSG SET numbers = ? WHERE groupId = ?');
const result = updateStmt.run(JSON.stringify(updatedNumbers), groupId);
resolve(result.changes);
} else {
resolve(0)}
} catch (err) {
console.error('Erro ao remover usuário(s) do contador:', err.message);
reject(err)}})}

initializeContadorTable();

const updates = {
messages: isCmd ? 0 : 1,
cmd_messages: isCmd ? 1 : 0,
figus: type === "stickerMessage" ? 1 : 0,
imagens: type === "imageMessage" ? 1 : 0,
videos: type === "videoMessage" ? 1 : 0,
audios: type === "audioMessage" ? 1 : 0,
aparelho: adivinha,
nick: pushname }

setTimeout(() => {
atualizarContador(from, sender, updates)}, 0)

var countMessage = await contadorMsg();

const groupIdscount = countMessage.map(row => row.groupId);
let numbersIds = []
if (groupIdscount.includes(from)) {
const group = countMessage.find(row => row.groupId === from);
try {
numbersIds = JSON.parse(group.numbers).map(user => user.id);
} catch (e) {
numbersIds = []}}


//===========(ANTI INATIVOS)==============\\



//============(EVAL-EXECUÇÕES)===========\\

if(isnit) {

if(budy.startsWith('>')){
try {
if(info.key.fromMe) return 
console.log('[', colors.cyan('EVAL'),']', colors.yellow(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss')), colors.green(budy))
return conn.sendMessage(from, {text: JSON.stringify(eval(budy.slice(2)),null,'\t')}).catch(e => {
return reply(String(e))})
} catch (e){
return reply(String(e))}}

if(budy.startsWith(')>')){
try {
if(info.key.fromMe) return 
var konsol = budy.slice(3)
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if(sat == undefined){
bang = util.format(sul)}
return conn.sendMessage(from, {text: bang}, {quoted: info})}
conn.sendMessage(from, {text: util.format(eval(`;(async () => { ${konsol} })()`))}).catch(e => { 
return reply(String(e))})
console.log('\x1b[1;37m>', '[', '\x1b[1;32mEXEC\x1b[1;37m', ']', time, colors.green(">"), 'from', colors.green(sender.split('@')[0]), 'args :', colors.green(args.length))
} catch(e) {
reply(String(e))
return console.log(e)}}

if (body.startsWith('$')) {
if (info.key.fromMe) return;
let shelC = body.substring(1).trim();
exec(shelC, (err, stdout, stderr) => {
if (err) {
console.error(`Erro ao executar comando: ${err.message}`);
return reply(`Erro: ${err.message}`)}
if (stderr) {
console.error(`Erro na execução: ${stderr}`);
return reply(`Erro: ${stderr}`)}
if (stdout) {
console.log(` - comando $: ${shelC}`);
reply(stdout)}})}

}

//======================================\\


// fica anti link

const allowedCommands = ['tiktok_audio', 'tiktok_audio2', 'tiktok_video', 'tiktok_video2', 'facebook', 'facebook_audio', 'facebook_audio2', 'facebook_video2', 'facebook_video', 'instagram', 'twitter', 'ytmp3', 'ytmp4', 'play', 'play_audio', 'play_video'];

async function handleAntiResources() {
const resourceType = identifyResourceType();
if (!resourceType) return;
const actionLevel = getResourceActionLevel(resourceType);
if (actionLevel === 0) return
switch(actionLevel) {
case 1:
banUser(getResourceCustomMessage(resourceType))
break;
case 2:
deleteResourceMessage();
break;
case 3:
handleWarningUnified(resourceType);
deleteResourceMessage();
break }}

const RESOURCE_TYPE_MAP = {
'imageMessage': 'img',
'videoMessage': 'video',
'audioMessage': 'audio',
'stickerMessage': 'sticker',
'documentMessage': 'doc',
'contactMessage': 'ctt',
'contactsArrayMessage': 'ctt',
'locationMessage': 'loc',
'productMessage': 'catalogo',
'interactiveMessage': 'interactive',
'requestPaymentMessage': 'payment',
'declinePaymentRequestMessage': 'payment',
'cancelPaymentRequestMessage': 'payment',
'groupStatusMentionMessage': 'mention' }

function identifyResourceType() {
const mappedType = RESOURCE_TYPE_MAP[type];
if (mappedType) return mappedType
if (type === 'documentWithCaptionMessage' || 
(typeof type === 'string' && type.includes('documentWithCaptionMessage'))) return 'doc'
if (groupMembers.length > 20 && menc_jid2?.length >= groupMembers.length - 3) return 'mention'
if (Array.isArray(dataGp) && dataGp.length > 0 && dataGp[0]?.antipalavrao?.modo > 0 && dataGp[0].antipalavrao?.palavras?.some(palavra => {
const palavraProibida = palavra.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const regex = new RegExp(`\\b${palavraProibida}\\b`, 'i');
return regex.test(budy2)})) return 'palavrao'
if (budy && Array.isArray(dataGp) && dataGp.length > 0 && dataGp[0]?.limitec?.active && 
typeof dataGp[0].limitec.quantidade === 'number' && budy.length > dataGp[0].limitec.quantidade) return 'charLimit'
return null }

function getResourceActionLevel(resourceType) {
if (!isGroup || !isBotGroupAdmins || isGroupAdmins || SoDono || info.key.fromMe) {
return 0 }
const aluguelNecessario = dataGp[0]?.rg_aluguel || nescessario?.rg_aluguelGB || false;
const grupoTemAluguel = aluguelNecessario ? verificarAluguelDB(from) : true;
if (aluguelNecessario && !grupoTemAluguel) return 0
switch(resourceType) {
case 'img': return dataGp[0].antiimg || 0;
case 'video': return dataGp[0].antivideo || 0;
case 'audio': return dataGp[0].antiaudio || 0;
case 'sticker': return dataGp[0].antisticker || 0
case 'doc': return dataGp[0].antidoc || 0;
case 'ctt': return dataGp[0].antictt || 0;
case 'loc': return dataGp[0].antiloc || 0;
case 'linkgp': return dataGp[0].antilinkgp || 0
case 'linkhard': return dataGp[0].antilinkhard || 0
case 'mention': return dataGp[0].antimention > 0 ? 1 : 0;
case 'payment': return dataGp[0].antipayment > 0 ? 1 : 0;
case 'catalogo': return dataGp[0].anticatalogo > 0 ? 1 : 0;
case 'interactive': return dataGp[0].antiinteractive > 0 ? 1 : 0;
case 'palavrao': return dataGp[0].antipalavrao?.modo > 0 ? 1 : 0
case 'charLimit': return dataGp[0]?.limitec?.quantidade > 0 ? 1 : 0
case 'fake': return dataGp[0].antifake ? 1 : 0;
case 'callgp': return dataGp[0].anticallgp ? 1 : 0
default: return 0 }}

function getResourceCustomMessage(resourceType) {
const resourceMessages = {
'img': {
custom: dataGp[0].legenda_imagem,
default: TEXTOS_GERAL.ANTI_IMAGEM_MSG },
'video': {
custom: dataGp[0].legenda_video,
default: TEXTOS_GERAL.ANTI_VIDEO_MSG },
'audio': {
custom: dataGp[0].legenda_audio,
default: TEXTOS_GERAL.ANTI_AUDIO_MSG },
'sticker': {
custom: dataGp[0].legenda_sticker,
default: TEXTOS_GERAL.ANTI_STICKER_MSG },
'doc': {
custom: dataGp[0].legenda_documento,
default: TEXTOS_GERAL.ANTI_DOCUMENTO_MSG },
'ctt': {
custom: dataGp[0].legenda_contato,
default: TEXTOS_GERAL.ANTI_CONTATO_MSG },
'loc': {
custom: dataGp[0].legenda_localizacao,
default: TEXTOS_GERAL.ANTI_LOCALIZACAO_MSG },
'catalogo': {
custom: dataGp[0].legenda_catalogo,
default: TEXTOS_GERAL.ANTI_CATALOGO_MSG },
'interactive': {
custom: dataGp[0].legenda_interativo,
default: TEXTOS_GERAL.ANTI_INTERATIVO_MSG },
'payment': {
custom: dataGp[0].legenda_pagamento,
default: TEXTOS_GERAL.ANTI_PAGAMENTO_MSG },
'mention': {
custom: dataGp[0].legenda_mencao,
default: TEXTOS_GERAL.ANTI_MENCAO_MSG },
'palavrao': {
custom: dataGp[0].legenda_palavrao,
default: TEXTOS_GERAL.ANTI_PALAVRAO_MSG },
'linkgp': {
custom: dataGp[0].legenda_linkgp || "0",
default: TEXTOS_GERAL.ANTI_LINK_GRUPO_MSG },
'linkhard': {
custom: dataGp[0].legenda_linkhard || "0",
default: TEXTOS_GERAL.MENSAGEM_DOS_ANTI_LINKS },
'fake': {
custom: dataGp[0].legenda_estrangeiro,
default: TEXTOS_GERAL.ANTI_FAKE_MSG },
'charLimit': {
custom: "0",
default: TEXTOS_GERAL.LIMITE_CARACTERES_MSG }
}
const resourceConfig = resourceMessages[resourceType];
if (!resourceConfig) {
return TEXTOS_GERAL.MENSAGEM_DOS_ANTI_LINKS }
if (resourceConfig.custom && resourceConfig.custom !== "0") {
return resourceConfig.custom }
return resourceConfig.default;
}

function handleWarningUnified(resourceType) {
if (!Array.isArray(dataGp[0].advertencias)) {
dataGp[0].advertencias = []}
let userWarning = dataGp[0].advertencias.find(adv => adv.id === sender);
if (!userWarning) {
userWarning = { id: sender, count: 1 };
dataGp[0].advertencias.push(userWarning);
} else {
userWarning.count++ }
setGp(dataGp)
const resourceName = getResourceDisplayName(resourceType)
if (userWarning.count >= 3) {
dataGp[0].advertencias = dataGp[0].advertencias.filter(adv => adv.id !== sender);
setGp(dataGp)
reply(`╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚠️ 𝐋𝐈𝐌𝐈𝐓𝐄 𝐄𝐗𝐂𝐄𝐃𝐈𝐃𝐎! ⚠️
┃
┃ 🚫 3 advertências por enviar
┃ conteúdo proibido!
┃
┃ 🔨 Removendo usuário...
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`)
banUser();
} else {
reply(`╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃ ⚠️ 𝐀𝐃𝐕𝐄𝐑𝐓𝐄̂𝐍𝐂𝐈𝐀 ${userWarning.count}/3 ⚠️
┃
┃ 📝 Tipo: ${resourceName}
┃ 
┃ 🚫 Não envie mais conteúdo
┃ proibido ou será removido!
┃
┃ 🛡️ Respeite as regras!
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`)}}

function getResourceDisplayName(resourceType) {
const names = {
'img': 'imagem',
'video': 'vídeo',
'audio': 'áudio',
'sticker': 'figurinha',
'doc': 'documento',
'ctt': 'contato',
'loc': 'localização',
'catalogo': 'catálogo',
'interactive': 'mensagem interativa',
'payment': 'solicitação de pagamento',
'mention': 'mensagem com muitas menções',
'linkgp': 'link de grupo do WhatsApp',
'linkhard': 'link',
'charLimit': 'mensagem muito longa',
'palavrao': 'palavra proibida',
'fake': 'número suspeito' }
return names[resourceType] || 'conteúdo proibido' }

function banUser(message = MsgAntiLink) {
conn.groupSettingUpdate(from, 'announcement')
setTimeout(() => {
conn.sendMessage(from, { text: message })
setTimeout(() => {
if (JSON.stringify(groupMembers).includes(sender)) {
conn.groupParticipantsUpdate(from, [sender], 'remove')}
setTimeout(() => {
conn.groupSettingUpdate(from, 'not_announcement')}, 1500)}, 500)}, 100)
deleteResourceMessage()}

function deleteResourceMessage() {
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }})}, 500)}

async function handleGroupLink() {
if (!shouldProcessLink()) return;
try {
let linkDetails = await processLinkDetails();
if (linkDetails.isOwnGroupLink) return reply('Link do nosso grupo, não irei remover.')
let actionLevel = 0
let resourceType = ''
if (dataGp[0].antilinkhard > 0) {
actionLevel = dataGp[0].antilinkhard;
resourceType = 'linkhard' 
} else if (linkDetails.isGroupLink && dataGp[0].antilinkgp > 0) {
actionLevel = dataGp[0].antilinkgp;
resourceType = 'linkgp' }
switch(actionLevel) {
case 1:
banUser(MsgAntiLink);
break;
case 2:
deleteResourceMessage();
break;
case 3:
handleWarningUnified(resourceType);
deleteResourceMessage();
break }
} catch (error) {
console.error('Erro ao processar link do grupo:', error)}}

function shouldProcessLink() {
const isAllowedCommand = command && allowedCommands.some(cmd => command.toLowerCase().includes(cmd))
if (isAllowedCommand) return false
if (!isGroup) return false
if (!dataGp || !Array.isArray(dataGp) || dataGp.length === 0) return false
const aluguelNecessario = dataGp[0]?.rg_aluguel || nescessario?.rg_aluguelGB || false;
const grupoTemAluguel = aluguelNecessario ? verificarAluguelDB(from) : true;
if (aluguelNecessario && !grupoTemAluguel) return false
const isAntiLinkActive = dataGp?.[0]?.antilinkgp > 0 || dataGp?.[0]?.antilinkhard > 0
return isGroup && !isGroupAdmins && isAntiLinkActive && isUrl(Procurar_String) && isBotGroupAdmins && !info.key.fromMe && sender }

async function processLinkDetails() {
let isGroupLink = Procurar_String.includes("chat.whatsapp.com/");
if (!isGroupLink) {
return { isGroupLink: false, isOwnGroupLink: false }}
try {
let link_dgp = await conn?.groupInviteCode(from)
let isOwnGroupLink = Procurar_String.includes(link_dgp);
if (isOwnGroupLink) {
let updatedString = Procurar_String.replaceAll(`https://chat.whatsapp.com/${link_dgp}`, '').trim();
if (updatedString === '' || !isUrl(updatedString)) {
return { isGroupLink: true, isOwnGroupLink: true }}}
return { isGroupLink: true, isOwnGroupLink: false };
} catch {
return { isGroupLink: true, isOwnGroupLink: false }}}

function handleLinkWarning(linkType) {
if (!Array.isArray(dataGp[0].advertencias)) {
dataGp[0].advertencias = []}
let userWarning = dataGp[0].advertencias.find(adv => adv.id === sender)
if (!userWarning) {
userWarning = { id: sender, count: 1 };
dataGp[0].advertencias.push(userWarning);
} else {
userWarning.count++ }
setGp(dataGp)
const linkName = linkType === 'linkgp' ? 'link de grupo' : 'link';
if (userWarning.count >= 3) {
dataGp[0].advertencias = dataGp[0].advertencias.filter(adv => adv.id !== sender);
setGp(dataGp)
reply(`Sinto muito usuário, você completou 3 advertências por enviar links, então removerei você.`);
banUser();
} else {
reply(`Usuário, você enviou um ${linkName} e foi advertido em ${userWarning.count}/3. Não envie mais, pois pode acabar sendo removido.`)}}

handleGroupLink()
handleAntiResources()


//FINALZIN ==============================>


//========(SISTEMA ANTI-PV UNIFICADO)========\\
var BLC_CL = []
if(!isGroup && !isPremium && !SoDono && !info.key.fromMe) {
const msgPadrao1 = "Olá, esse bot não aceita mensagens no privado. Você será bloqueado.";
const msgPadrao2 = "Bot em modo privado. Mensagens no privado não são permitidas.";
const msgBloquear = nescessario.msgantipv1 || msgPadrao1;
const msgAviso = nescessario.msgantipv2 || msgPadrao2
switch(nescessario.antipvmode || 0) {
case 0: // Desativado - não faz nada
break
case 1: // Só bloqueia
if(!BLC_CL.includes(sender)) {
BLC_CL.push(sender)
setTimeout(async () => {
conn.updateBlockStatus(sender, 'block')}, 2000)
return }
break
case 2: // Mensagem + bloqueia
if(!BLC_CL.includes(sender)) {
BLC_CL.push(sender)
await sleep(2500)
reply(msgBloquear)
setTimeout(async () => {
conn.updateBlockStatus(sender, 'block')}, 2000)
return }
break
case 3: // Só mensagem
if(!MSG_ANTPV2.includes(sender)) {
MSG_ANTPV2.push(sender)
return reply(msgAviso)}
break
case 4: // Só ignora
return }}

//============(leveling)=================\\

const levelSystem = require('./outros/funcoes/sislv.js');
levelSystem.init(BANCOP);

if (isGroup && !isCmd && !info.key.fromMe) {
try {
const levelUpInfo = await levelSystem.processLevelingSystem(q || '', sender, from)
if (levelUpInfo) {
await conn.sendMessage(from, {text: `${lermais}╔┉✼┉═༺◈✼🎉✼◈༻═┉✼┉╗
║ *PARABÉNS, @${sender2}!*
╚┉✼┉═༺◈✼🎉✼◈༻═┉✼┉╝

- Você upou para o *Level ${levelUpInfo.newLevel}*! 🚀

╔┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╗
║ 📈 *Level:* ${levelUpInfo.newLevel}
║ 🏵️ *Patente:* ${levelUpInfo.patente}
║ ⭐ *XP:* ${levelUpInfo.xp}/${levelUpInfo.requiredXP}
║ 📊 *Streak:* ${levelUpInfo.streakDays} dias (${(levelUpInfo.streakMultiplier * 100 - 100).toFixed(0)}% bonus)
╠┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╝
║ *Continue assim e conquiste mais! 💪*
╚┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╝`, mentions: [sender]})}
} catch (error) {
console.error("Erro ao processar leveling:", error)}
}

async function veriSttsLv() {
if (!levelSystem) {
return Boolean(dataGp[0].leveling)}
try {
const status = await levelSystem.isLevelingEnabled(from)
return status;
} catch (error) {
console.error('[VERIFICAÇÃO LEVELING] Erro ao verificar status:', error);
return false }}

//======================================\\ LTSSML

var palavrasfr = JSON.parse(fs.readFileSync("./dados/org/json/palavras_forca.json"))

var palavrasfrc = palavrasfr[Math.floor(Math.random() * palavrasfr.length)]

var ALT_FR = palavrasfrc?.plvr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

async function rv_forca() {
var blue = []
for (var i = 0; i < ALT_FR.length; i++) {
if(ALT_FR[i] == ' '){
blue.push(' ')
} else {
blue.push('_')
}
}
dataGp[0].forca_ofc = [{acertos: 0, erros: 0, palavra: blue, escreveu: [], palavra_ofc: ALT_FR, dica: palavrasfrc.dica, tema: palavrasfrc.tema}]
dataGp[0].forca_inc = false
setGp(dataGp)
}



if (isGroup && (nescessario?.isRecolherLink || isRecolherlinksgp) && budy.includes("https://chat.whatsapp.com")) {
try {
const regex = /(https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]{10,})/g;
const links = budy.match(regex)
if (links && links.length > 0) {
for (const link of links) {
const linkExistente = BANCOP.prepare(`SELECT * FROM links_recolhidos WHERE link = ?`).get(link)
if (!linkExistente) {
BANCOP.prepare(`INSERT INTO links_recolhidos (link, grupo_id, user_id, data_recolhimento) VALUES (?, ?, ?, ?)`).run(link, from, sender, Math.floor(Date.now() / 1000))}}}
} catch (error) {
console.error("Erro ao recolher links:", error)}}

if(!isPremium && nescessario.cmdpremium.includes(command)) return reply(`Este comando é apenas para
usuário premium, se deseja adquirir, fale com meu dono:
https://wa.me/${numerodono_ofc}`)


// PRA LIMPAR DO CONTADOR QUEM NÃO ESTÁ NO GRUPO
async function LIMPARDOCNT_QUEMJASAIU() {

var RD_CNT = countMessage[countMessage.map(i => i.groupId).indexOf(from)].numbers;

CNT1 = []; 
for (i of groupMembers) { 
CNT1.push(i.id); 
}

const idsToRemove = [];
for (i of RD_CNT) {
if (!CNT1.includes(i.id)) {
idsToRemove.push(i.id);
}
}

if (idsToRemove.length > 0) {
await removerDoContador(from, idsToRemove);
}

}

const textos = require('./dados/textos.js');
const { Vcndindex, NrgIndex } = textos;

const vencidoMsg = Vcndindex.replaceAll(/#usuario#/g, `@${sender2}`).replaceAll(/#numerodono#/g, `${numerodono_ofc}`);
const naoRegistradoMsg = NrgIndex.replaceAll(/#usuario#/g, `@${sender2}`).replaceAll(/#numerodono#/g, `${numerodono_ofc}`);

let RPT_M = new Set();

try {
if (isCmd && !RPT_M.has(from) && aluguelNecessario && !SoDono) {
const existeRegistro = BANCOP.prepare("SELECT COUNT(*) as count FROM aluguel WHERE id_gp = ?").get(from)
if (!existeRegistro || existeRegistro.count === 0) {
RPT_M.add(from);
conn.sendMessage(from, { text: naoRegistradoMsg, mentions: [sender] }, { quoted: info });
setTimeout(() => RPT_M.delete(from), 10000);
return }}

if (aluguelNecessario && !SoDono && isCmd) {
const tempo_A = Math.floor(Date.now() / 1000);
const registro = BANCOP.prepare("SELECT vencimento FROM aluguel WHERE id_gp = ? LIMIT 1").get(from);
if (registro && tempo_A > registro.vencimento) {
return conn.sendMessage(from, { text: vencidoMsg, mentions: [sender] }, { quoted: info })}}
} catch (erro) {
console.error("Erro ao verificar expiração do aluguel: " + erro)}

//======= SISTEMA DE MUTE DE USUÁRIOS =======

function verificarUsuarioMutado(groupId, userId) {
try {
const stmt = BANCOP.prepare(`SELECT COUNT(*) as count FROM muted_users WHERE grupo_id = ? AND user_id = ?`);
const { count } = stmt.get(groupId, userId);
return count > 0;
} catch (error) {
console.error("Erro ao verificar usuário mutado:", error);
return false }}

function obterUsuariosMutados(groupId) {
try {
const stmt = BANCOP.prepare(`SELECT user_id, admin_id, motivo, timestamp FROM muted_users WHERE grupo_id = ? ORDER BY timestamp DESC`);
return stmt.all(groupId);
} catch (error) {
console.error("Erro ao obter usuários mutados:", error);
return [] }}

function mutarUsuario(groupId, userId, adminId = null, motivo = "") {
try {
const timestamp = Math.floor(Date.now() / 1000)
const stmt = BANCOP.prepare(`INSERT OR REPLACE INTO muted_users (grupo_id, user_id, admin_id, motivo, timestamp) VALUES (?, ?, ?, ?, ?)`);
const info = stmt.run(groupId, userId, adminId, motivo, timestamp);
return {
sucesso: true,
mensagem: info.changes === 1 ? "Usuário mutado com sucesso." : "Status de mute atualizado." }
} catch (error) {
console.error("Erro ao mutar usuário:", error);
return {
sucesso: false,
mensagem: "Erro ao mutar usuário",
erro: error.message }}}

function desmutarUsuario(groupId, userId) {
try {
const stmt = BANCOP.prepare(`DELETE FROM muted_users WHERE grupo_id = ? AND user_id = ?`)
const info = stmt.run(groupId, userId)
if (info.changes === 0) {
return {
sucesso: false,
mensagem: "Este usuário não está mutado neste grupo." }}
return {
sucesso: true,
mensagem: "Usuário desmutado com sucesso." }
} catch (error) {
console.error("Erro ao desmutar usuário:", error)
return {
sucesso: false,
mensagem: "Erro ao desmutar usuário",
erro: error.message }}}

if (isGroup && !SoDono) {
if (verificarUsuarioMutado(from, sender)) {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }})
return }}

const GoldSystem = require('./outros/funcoes/sgld.js')
const goldSystem = new GoldSystem(BANCOP)
const configsGold = require('./dados/org/js/configsgold.js')

if (isGroup && !isCmd && !info.key.fromMe) {
async function Sys_G_XP() {
try {
let mensagens = [];
const dattofc = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
let goldAtual = null
const isLevelingOn = await levelSystem.isLevelingEnabled(from)
if (isLevelingOn && body.trim()) {
try {
const userData = await BANCOP.prepare('SELECT * FROM leveling WHERE groupId = ? AND userId = ?').get(from, sender)
if (!userData) {
await BANCOP.prepare('INSERT INTO leveling (groupId, userId, xp, totalXp, dailyRewardGiven, lastMessageTime, lastResetDaily, lastResetWeekly) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(from, sender, 20, 20, dattofc, new Date().toISOString(), new Date().toISOString(), new Date().toISOString())
mensagens.push("20 XP");
} else if (userData.dailyRewardGiven !== dattofc) {
await BANCOP.prepare('UPDATE leveling SET xp = xp + ?, totalXp = totalXp + ?, dailyRewardGiven = ? WHERE groupId = ? AND userId = ?').run(20, 20, dattofc, from, sender)
mensagens.push("20 XP")}
} catch (error) {
console.error("Erro no sistema de Leveling:", error)}}
const IS_sistemGold = dataGp?.[0]?.sistemgold
if (IS_sistemGold && body.trim()) {
try {
const user = goldSystem.getUser(from, sender);
const today = moment().format('YYYY-MM-DD')
const lastReset = user.chances?.lastReset || null
const needsReset = lastReset !== today
if (needsReset) {
const wasReset = goldSystem.resetDailyChances(from, sender)
if (wasReset) {
const recompensa = configsGold.recompensas.diaria
goldSystem.addGold(from, sender, recompensa)
mensagens.push(`${recompensa} Gold${recompensa > 1 ? 's' : ''}`)
goldAtual = goldSystem.getBalance(from, sender)}
} else {
const lastDaily = user.chances?.lastDaily || null
if (lastDaily !== today) {
const recompensa = configsGold.recompensas.diaria
goldSystem.addGold(from, sender, recompensa)
const updatedChances = {...user.chances};
updatedChances.lastDaily = today
BANCOP.prepare('UPDATE gold_users SET chances = ? WHERE grupo_id = ? AND user_id = ?').run(JSON.stringify(updatedChances), from, sender)
mensagens.push(`${recompensa} Gold${recompensa > 1 ? 's' : ''}`)
goldAtual = goldSystem.getBalance(from, sender)}}
} catch (error) {
console.error("Erro no sistema Gold:", error)}}
if (mensagens.length > 0) {
const xpData = isLevelingOn ? await BANCOP.prepare('SELECT xp, totalXp FROM leveling WHERE groupId = ? AND userId = ?').get(from, sender) : null
let message = `${lermais}${tempo}\n`;
message += `┌──⭓ 『 Recompensa Diária 』\n`;
message += `│⎋ Usuário: @${sender2}\n`;
message += `│⎋ Recebeu: ${mensagens.join(" e ")} ✨\n`
if (mensagens.some(m => m.includes("Gold")) && goldAtual !== null) {
const configsGold = require('./dados/org/js/configsgold.js');
const goldAnterior = goldAtual - configsGold.recompensas.diaria;
message += `│⎋ Gold: ${goldAnterior} → ${goldAtual} ${configsGold.emojis.gold}\n` }
if (mensagens.includes("20 XP") && xpData && typeof xpData.xp === 'number') {
const xpAtual = xpData.xp;
const xpAnterior = xpAtual - 20;
message += `│⎋ XP: ${xpAnterior} → ${xpAtual} ⭐\n` }
message += `└──⭓\n\n`
if (IS_sistemGold) {
message += `💡 Use ${prefix}menugold para ver os comandos de gold!\n` }
if (isLevelingOn) {
message += `✨ Use ${prefix}level para ver seu nível!` }
try {
if (from && !from.includes("status") && from.includes("@g.us")) {
mention(message)}
} catch (mentionError) {
console.error("DEBUG SYS_G_XP: Erro ao usar mention: ", mentionError);
try {
if (from && !from.includes("status") && from.includes("@g.us")) {
conn.sendMessage(from, { text: message, mentions: [sender] })}
} catch (sendError) {
console.error("DEBUG SYS_G_XP: Erro no método alternativo: ", sendError)}}}
} catch (error) {
console.error("Erro geral no sistema Sys_G_XP:", error)}}
await Sys_G_XP();
}

//========================================\\

if(isGroup && nescessario.EstaNogrupo && !DonoNoGrupo && isCmd) return reply(`Olá, meu dono deve está no grupo e de administrador, para eu funcionar, é apenas um sistema de segurança em caso de dúvidas entre em contato com ele: https://wa.me/${numerodono_ofc}`)

const Os_Returns = (A, B, C) => {
if(A && !isGroup) return { true: true, txt: Res_SoGrupo }
if(B && !isGroupAdmins) return { true: true, txt: Res_SoAdm }
if(C && !isBotGroupAdmins) return { true: true, txt: Res_BotADM }
return { true: false };
}

//==============(meus jogos)===========\\

async function adicionarParticipantesort() {
if (!info.message?.reactionMessage || !isGroup) return
const { key: { remoteJid: gid, participant: pid }, message: { reactionMessage: { key: { id: mid } } } } = info
try {
const sorteio = BANCOP.prepare(`SELECT id FROM sorteios_react WHERE grupo_id = ? AND mensagem_id = ? AND finalizando = 0 LIMIT 1`).get(gid, mid)
if (!sorteio) return
BANCOP.transaction(() => {
const participante = BANCOP.prepare(`SELECT 1 FROM sorteios_react_participantes WHERE sorteio_id = ? AND participante_id = ? LIMIT 1`).get(sorteio.id, pid)
if (!participante) {
BANCOP.prepare(`INSERT INTO sorteios_react_participantes (sorteio_id, participante_id, timestamp_entrada) VALUES (?, ?, ?)`).run(sorteio.id, pid, Date.now())}})()
} catch (e) {
console.warn('Erro ao adicionar participante ao sorteio:', e.message)}}

adicionarParticipantesort()

async function handleEmojiGold() {
if (!isGroup || !dataGp || !dataGp[0]?.emojigold || !dataGp[0]?.sistemgold) return
try {
const emojisDataPath = path.join('./dados/org/json/emojis.json')
if (!fs.existsSync(emojisDataPath)) return console.log('[EMOJIGOLD] Arquivo de emojis não encontrado')
let emojisData;
try {
emojisData = JSON.parse(fs.readFileSync(emojisDataPath, 'utf8'));
if (!emojisData?.[0]?.emojis) return console.log('[EMOJIGOLD] Formato de arquivo de emojis inválido')
} catch (e) {
return console.log('[EMOJIGOLD] Erro ao ler arquivo de emojis:', e.message)}
let emojiGoldData = goldSystem.getEmojiGoldData(from)
if (!emojiGoldData) {
emojiGoldData = goldSystem.initEmojiGoldData(from)
if (!emojiGoldData) {
return console.log('[EMOJIGOLD] Falha ao inicializar dados para o grupo', from)}}
const currentTime = Date.now();
const emojiDataObjeto = emojiGoldData.emojiData
if (!emojiDataObjeto || 
(currentTime - emojiDataObjeto.Data > 1 * 60 * 60 * 1000)) {
const mentions = emojiDataObjeto?.mentions || [];
const novoEmojiData = goldSystem.generateNewEmoji(from, mentions, emojisData[0]);
if (!novoEmojiData) return console.log('[EMOJIGOLD] Falha ao gerar novo emoji para o grupo', from)
const txtEG = `✧፝͢⃟${EmojiBot} *Emoji Gold* ✧͢⃟ᤢ${EmojiBot}\n\nO primeiro a enviar o emoji que representa a seguinte palavra:\n\n*→ Palavra:* *${novoEmojiData.Nome}*\n\n*Ganhará 25 Golds!*\n\nQuer ser mencionado nas próximas rodadas? Use o comando *${prefix}mencgold*.`
return conn.sendMessage(from, { text: txtEG, mentions: novoEmojiData.mentions || []}).catch(e => console.log('[EMOJIGOLD] Erro ao enviar mensagem:', e.message))}
if (emojiDataObjeto?.Emoji && budy) {
const emojiCorreto = goldSystem.compareEmojis(budy, emojiDataObjeto.Emoji)
if (emojiCorreto) {
goldSystem.addEmojiGoldPoints(from, sender, 1, 25)
emojiDataObjeto.Emoji = null;
goldSystem.updateEmojiData(from, emojiDataObjeto)
conn.sendMessage(from, { text: "🎉 Parabéns! Você recebeu 25 Golds e ganhou um ponto por acertar o emoji! 🎉", mentions: [sender]}).catch(e => console.log('[EMOJIGOLD] Erro ao enviar notificação:', e.message))}}
} catch (error) {
console.error('[EMOJIGOLD] Erro no processamento:', error)}}

handleEmojiGold();

if (isGroup && global.goldResetConfirmation && global.goldResetConfirmation[from]) {
const confirmation = global.goldResetConfirmation[from]
if (sender === confirmation.sender) {
const response = body.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
if (response === "CONFIRMAR" || response === "SIM") {
try {
confirmation.confirmed = true
const deleteUsersStmt = BANCOP.prepare('DELETE FROM gold_users WHERE grupo_id = ?');
deleteUsersStmt.run(from)
const resetSystemStmt = BANCOP.prepare('UPDATE gold_system SET jackpot = 0, bolaogold = ? WHERE grupo_id = ?');
resetSystemStmt.run('[]', from)
delete global.goldResetConfirmation[from]
const successMsg = `
╭━━━ 💰 GOLD RESETADO 💰 ━━━╮
┃
┃ ✅ RESET CONCLUÍDO!
┃
┃ 🔄 Todos os saldos foram zerados
┃ 📊 Ranking foi reiniciado
┃ 🎯 Bolão e jackpot foram limpos
┃
┃ 👑 Ação realizada pelo dono
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
reply(successMsg);
} catch (error) {
console.error('Erro ao executar reset gold:', error);
reply('❌ Ocorreu um erro ao zerar o gold. Tente novamente mais tarde.');
delete global.goldResetConfirmation[from]}
} else if (response === "CANCELAR" || response === "NAO") {
delete global.goldResetConfirmation[from];
reply("✅ Reset de gold cancelado pelo usuário.")}}}

let uptime = process.uptime()

// minhas funcoes

async function criarBackup(sourceDir = 'dados', outputFile = 'ESDEATH-BACKUP.zip') {
return new Promise((resolve) => {
console.log(`[BACKUP] Iniciando backup da pasta: ${sourceDir}`)
if (!fs.existsSync(sourceDir)) {
console.error(`[BACKUP] ERRO: Pasta ${sourceDir} não encontrada`);
return resolve({success: false, filePath: null, error: `Pasta ${sourceDir} não encontrada`})}
if (fs.existsSync(outputFile)) {
try {
fs.unlinkSync(outputFile);
console.log(`[BACKUP] Arquivo antigo removido: ${outputFile}`);
} catch (err) {
console.error(`[BACKUP] Erro ao remover arquivo antigo: ${err.message}`)}}
const zipCommand = `zip -r "${outputFile}" "${sourceDir}"`;
console.log(`[BACKUP] Executando comando: ${zipCommand}`)
exec(zipCommand, { maxBuffer: 100 * 1024 * 1024 }, (err, stdout, stderr) => {
if (err) {
console.error(`[BACKUP] ERRO durante compressão: ${err.message}`);
console.error(`[BACKUP] STDERR: ${stderr}`);
return resolve({success: false, filePath: null, error: err.message})}
if (fs.existsSync(outputFile)) {
const stats = fs.statSync(outputFile);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`[BACKUP] Backup criado com sucesso! Tamanho: ${fileSizeMB}MB`)
return resolve({success: true, filePath: outputFile, error: null})
} else {
console.error(`[BACKUP] ERRO: Arquivo zip não foi criado`);
return resolve({success: false, filePath: null, error: 'Arquivo zip não foi criado'})}})})}

async function atualizarBot() {
return new Promise((resolve) => {
console.log(`[ATUALIZACAO] Iniciando processo de atualização`)
const comando = `bash atualizar.sh 2`;
console.log(`[ATUALIZACAO] Executando comando: ${comando}`)
exec(comando, { maxBuffer: 100 * 1024 * 1024 }, (err, stdout, stderr) => {
if (stdout) {
console.log(`[ATUALIZACAO] STDOUT: ${stdout}`)}
const erroIgnorado = stderr && stderr.includes("refusing to remove '.' or '..' directory")
if (err && !erroIgnorado) {
console.error(`[ATUALIZACAO] ERRO durante atualização: ${err.message}`);
console.error(`[ATUALIZACAO] STDERR: ${stderr}`);
return resolve({success: false, message: "Falha na atualização do bot", error: err.message})}
console.log(`[ATUALIZACAO] Processo de atualização concluído com sucesso`);
return resolve({success: true, message: "Bot atualizado com sucesso", error: null})})})}

function attDnG() {
try {
dono1 = nescessario.dono1
dono2 = nescessario.dono2
dono3 = nescessario.dono3
dono4 = nescessario.dono4
dono5 = nescessario.dono5
dono6 = nescessario.dono6
let donos = [dono1, dono2, dono3, dono4, dono5, dono6].filter(dono => dono && dono !== "." && dono.toString().trim() !== "")
numerodono = [`${nmrdn}`, ...donos.map(dono => `${dono}${SNET}`)]
} catch (e) {
console.error("[ERRO] Falha ao atualizar lista de donos:", e);
}
}

function atuVarDnGlb() {
try {
const settingsPath = './dados/settings.json';
const currentSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
global.numerodono_ofc = currentSettings.numerodono;
global.nmrdn_dono2 = currentSettings.numerodono + SNET;
global.NomeDoBot = currentSettings.NomeDoBot;
global.NickDono = currentSettings.NickDono;
global.prefix = currentSettings.prefix;
if (typeof numerodono !== 'undefined' && Array.isArray(numerodono)) {
numerodono[0] = currentSettings.numerodono + SNET }
if (typeof nmrdn !== 'undefined') {
global.nmrdn = currentSettings.numerodono + SNET }
if (typeof setting !== 'undefined') {
setting.numerodono = currentSettings.numerodono
setting.NomeDoBot = currentSettings.NomeDoBot;
setting.NickDono = currentSettings.NickDono;
setting.prefix = currentSettings.prefix }
return true
} catch (error) {
console.error('❌ Erro ao atualizar variáveis do dono:', error);
return false }}

//INICIO DE COMANDO DE PREFIXO

if(isCmd) {

const context = { abracocmd, acessAPI, adicionarPremium, allImageMessage, allVideoMessage, ANT_LTR_MD_EMJ, args, atualizarBot, atuVarDnGlb, attDnG, axios, BANCOP, banirUsuario, beijocmd, bloquearComando, body, botNumber, budy2, casamentocmd, chutecmd, command, configsGold, conn, conselhob, contadorMsg, countMessage, createChoiceMenu, criarBackup, dataGp, delay, desmutarUsuario, desbanirUsuario, desbloquearComando, DLT_FL, DonoOficial, EmojiBot, enviar, exec, fetch, fetchJson, FigAuthor, FigPack, flushOptionsBuffer, FormData, from, fs, fundo1, fundo2, getBuffer, getExtension, getFileBuffer, getRandom, getUniqueKey, goldSystem, groupAdmins, groupMembers, groupMetadata, groupName, groupName_RG, hasAnyImage, hasAnyVideo, imageToWebp, imgbebado, imgcorno, imgfeio, imggado, imggay, imggostosa, imggostoso, imgnazista, imgvesgo, info, infodono, isBotGroupAdmins, isConsole, isGroup, isGroupAdmins, isMedia, isModobn, isMultiP, isnit, isNsfw, isPremium, isQuotedAudio, isQuotedDocument, isQuotedDocW, isQuotedImage, isQuotedSticker, isQuotedVideo, isQuotedViewOnceImage, isQuotedViewOnceVideo, isWelkom, isWelkom2, JogoDaVelha, kyun, lermais, levelSystem, LIMPARDOCNT_QUEMJASAIU, listarComandosBloqueados, listarPremium, listarUsuariosBanidos, logoslink, matarcmd, menc_jid2, menc_os2, menc_prt, mencionarIMG, mention, mentions, mentionSm, moment, mutarUsuario, nescessario, NickDono, NomeDoBot, normalizeStickerId, numerodono, numerodono_ofc, obterUsuariosMutados, optionsBuffer, Os_Returns, path, palavrasc, pesytb, prefix, pushname, q, q_2, quotedAudio, quotedContact, quotedDocument, quotedDocW, quotedImage, quotedLocation, quotedMsg, quotedMsg2, quotedMsg3, quotedProduct, quotedSticker, quotedVideo, reagirE, recognize, removerPremium, reply, Res_Aguarde, Res_SoDono, rnkcorno, rnkgado, rnkgay, rnkgolpista, rnkgostosa, rnkgostoso, rnkhetero, rnknazista, rnkotaku, rnkpau, sender, sender2, sender_ou_n, sendImageAsSticker, sendImageAsSticker2, sendSticker, sendStickerFromUrl, sendVideoAsSticker, sendVideoAsSticker2, setGp, setNes, setting, sharp, sleep, SNET, SoDono, stickerHelpers, tabela, tapacmd, tempo, TEXTOS_GERAL, toggleBloqueioComando, type, updateGroupSettings, uptime, veriSttsLv, verificarAluguelDB, verificarBanimento, verificarComandoBloqueado, verificarN, verificarPremium, verificarTipoBloqueio, videoToWebp, webp_mp4, writeExif, writeExifImg, writeExifVid, writeExifWebp, yts }


// Tenta executar o comando
const handled = await handleCommand(context);

// Se o comando não foi encontrado, enviar mensagem de erro

if (!handled) {
const { commandManager } = require('./outros/funcoes/commandsManager')
const permissionCheck = commandManager.checkAdminOnlyGroup({ name: command }, {isGroup,dataGp,isGroupAdmins,SoDono,sender,from,nescessario})
if (!permissionCheck.canExecute && permissionCheck.message === null) return
if (!permissionCheck.canExecute && permissionCheck.message) return
if (commandManager.blockFunctions) {
const blockCheck = commandManager.checkBlocks({ name: command }, {SoDono,sender,from,isGroup,verificarBanimento,verificarComandoBloqueado})
if (!blockCheck.canExecute) return }
await conn.sendMessage(from, { react: { text: "🚫", key: info.key }})
class CommandSimilarityFinder {
constructor(commands, aliases) {
this.allCommands = [...new Set([...commands, ...aliases])]}
levenshteinDistance(str1, str2) {
if (str1 === str2) return 0;
if (str1.length === 0) return str2.length;
if (str2.length === 0) return str1.length
let prevRow = Array(str2.length + 1).fill(0);
let currRow = Array(str2.length + 1).fill(0)
for (let j = 0; j <= str2.length; j++) {
prevRow[j] = j }
for (let i = 0; i < str1.length; i++) {
currRow[0] = i + 1
for (let j = 0; j < str2.length; j++) {
const cost = str1[i] === str2[j] ? 0 : 1;
currRow[j + 1] = Math.min(
currRow[j] + 1,
prevRow[j + 1] + 1,
prevRow[j] + cost )}
[prevRow, currRow] = [currRow, prevRow]}
return prevRow[str2.length]}
calculateSimilarity(str1, str2) {
if (!str1 || !str2) return 0;
const maxLength = Math.max(str1.length, str2.length);
if (maxLength === 0) return 100
const distance = this.levenshteinDistance(str1, str2);
return Math.round(((maxLength - distance) / maxLength) * 100)}
isPrefixMatch(input, command) {
return command.toLowerCase().startsWith(input.toLowerCase())}
findSimilarCommand(input) {
if (!input || input.trim() === '') return { command: '', similarity: 0 }
const normalizedInput = input.toLowerCase().trim()
let bestPrefixMatch = ''
let bestPrefixScore = 0
for (const cmd of this.allCommands) {
if (this.isPrefixMatch(normalizedInput, cmd) && normalizedInput.length >= 3) {
const score = Math.round((normalizedInput.length / cmd.length) * 100);
if (score > bestPrefixScore && score >= 80) {
bestPrefixScore = score;
bestPrefixMatch = cmd }}}
if (bestPrefixMatch) return { command: bestPrefixMatch, similarity: bestPrefixScore }
let bestMatch = '';
let bestScore = 0
const filteredCommands = this.allCommands.filter(cmd => Math.abs(cmd.length - normalizedInput.length) <= 3)
for (const cmd of filteredCommands) {
const similarity = this.calculateSimilarity(normalizedInput, cmd.toLowerCase())
if (similarity > bestScore) {
bestScore = similarity;
bestMatch = cmd
if (similarity >= 90) {
break }}}
return { command: bestMatch, similarity: bestScore }}}
const commandLists = Array.from(commandManager.commands.keys());
const aliasLists = Array.from(commandManager.aliases.keys());
const similarityFinder = new CommandSimilarityFinder(commandLists, aliasLists)
const result = similarityFinder.findSimilarCommand(command)
let errorMessage = ''
if (command.trim().length > 0) {
let suggestionText = ''
if (result.similarity >= 40) {
suggestionText = `\n│𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐒𝐢𝐦𝐢𝐥𝐚𝐫: ${result.command}
│𝐒𝐢𝐦𝐢𝐥𝐚𝐫𝐢𝐝𝐚𝐝𝐞: ${result.similarity}%` }
errorMessage = `\n├𝐂𝐨𝐦𝐚𝐧𝐝𝐨 ${command}
│𝐍𝐚̃𝐨 𝐄𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐨${suggestionText}` }
conn.sendMessage(from, {text: `╭┅•𖧹❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ${EmojiBot}❀⃘࣭࣭࣭࣭ꔷ⃔໑࣭࣭ٜ𖧹•┅╮${errorMessage}
├𝐃𝐢𝐠𝐢𝐭𝐞 ${prefix}menu
│𝐏𝐚𝐫𝐚 𝐕𝐞𝐫 𝐎 𝐌𝐞𝐧𝐮
│𝐃𝐞 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬
╰┅•𖧹❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ${EmojiBot}❀⃘࣭࣭࣭࣭ꔷ⃔໑࣭࣭ٜ𖧹•┅╯`, mentions: [sender] }, {quoted: info})}

} else {


if(isGroup && dataGp[0]?.autotranscrever && (info?.message?.videoMessage || info?.message?.audioMessage)) {
try {
const muk = info?.message?.videoMessage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.videoMessage : (JSON.parse(JSON.stringify(info).replace('quotedM','m'))?.message?.audioMessage) ? JSON.parse(JSON.stringify(info).replace('quotedM','m'))?.message?.audioMessage : info.message.audioMessage
const tipoArquivo = JSON.parse(JSON.stringify(info).replace('quotedM','m'))?.message?.audioMessage ? 'audio' : 'video';
let base64String = await getFileBuffer(muk, tipoArquivo);
let buffer = Buffer.from(base64String, 'base64')
let formData = new FormData();
formData.append('file', buffer, {filename: tipoArquivo === 'audio' ? 'audiofile' : 'videofile', contentType: muk.mimetype })
fetch(acessAPI.transcrever(), {method: 'POST',body: formData}).then(response => response.json()).then(data => {
if(data.texto && data.texto.trim()) {
reply(`🎤 *TRANSCRIÇÃO AUTOMÁTICA:*\n\n${data.texto}`)}}).catch((error) => {
console.error('Erro na transcrição automática:', error)})
} catch(error) {
console.error('Erro no sistema de auto transcrever:', error)}}

if(isGroup && dataGp[0]?.autobaixar) {

var swc = isLink(q) ? q.includes("instagram.com/") && q.length > 30 ? "instagram" : q.includes("tiktok.com/") && q.length > 30 ? "tiktok" : (q.includes("https://twitter.com/") || q.includes("https://x.com/")) && q.length > 30 ? "twitter": (q.includes("https://www.facebook.com/") || q.includes("https://fb.watch/")) ? "facebook": q.includes("spotify.com/") && q.length > 30 ? "spotify" : q.includes("kwai.com/") && q.length > 25 ? "kwai" : q.includes("https://youtube.com/shorts/") && q.length > 25 ? "shorts" : q.includes("soundcloud.com/") && q.length > 17 ? "soundcloud" : q.includes("threads.net/") && q.length > 20 ? "threads" : q.includes("ifunny.co/") && q.length > 20 ? "ifunny" : false : false;

switch(swc) {

case "ifunny": {
reply(Res_Aguarde)
try {
conn.sendMessage(from, {video: {url: acessAPI.ifunny_mp4(Link(q.trim()))}, mimetype: "video/mp4"}, {quoted: info})
} catch (e) {
reply("Erro...")
}
}
break;

case "threads": {
reply(Res_Aguarde)
try {
conn.sendMessage(from, {video: {url: acessAPI.threads(Link(q.trim()))}})
} catch (e) {
return reply("Erro...")
}}
break;

case "soundcloud": {
reply(Res_Aguarde)
try {
conn.sendMessage(from, {audio: {url: acessAPI.soundcloud(Link(q.trim()))}, mimetype: "audio/mpeg"}, {quoted: info})
} catch (e) {
return reply("Erro...")
}}
break;

case 'spotify': {
reply(Res_Aguarde)
try {
conn.sendMessage(from, {audio: {url: acessAPI.spotify_mp3(Link(q.trim()))}, mimetype: "audio/mpeg", mentions: [sender]}).catch(async(e) => {return})
} catch (e) {
return
}
}
break;

case "instagram": {
try {
reply(Res_Aguarde)
let Url_I = await acessAPI.instagram(Link(q.trim()))
let DM_T = Url_I.msg[0].type
var A_T = DM_T === "mp4" ? "video/mp4" : DM_T === "webp" ? "image/webp" : DM_T === "jpg" ? "image/jpeg" : DM_T === "mp3" ? "audio/mpeg" : "video/mp4"
var MD = A_T.split("/")[0] === "image" ? {image: {url: Url_I.msg[0].url}, mimetype: A_T, mentions: [sender]} : {video: {url: Url_I.msg[0].url}, mimetype: A_T, mentions: [sender]}
conn.sendMessage(from, MD).catch(e => {
return
})
} catch (e) {
return
}}
break;

case "tiktok": case "twitter": case "facebook": case 'kwai': case 'shorts': {
try {
reply(Res_Aguarde)
conn.sendMessage(from, {video: {url: swc === "tiktok" ? acessAPI.tiktok(Link(q.trim())) : swc === "twitter" ? acessAPI.twitter(Link(q.trim()), false): swc === "kwai" ? acessAPI.kwai_mp4(Link(q.trim())) : swc === "shorts" ? acessAPI.play(Link(q.trim()), false) : acessAPI.facebook(Link(q.trim()), false)}, mimetype: "video/mp4", mentions: [sender]}).catch(e => {
return
})
} catch (e) {
return
}
}
break;

default:

}

}

// FUNÇÕES.


//INICIO DE COMANDOS SEM PREFIXO

const EnvAudio_SMP = async (direcao, nome1, nome2, nome3, nome4, nome5) => {
let bla = [nome1, nome2, nome3, nome4, nome5]
for ( i of bla) {
if(!i) return  
if(messagesC.includes(i)) {
conn.sendMessage(from, {audio: {url: direcao}, mimetype: "audio/mpeg", ptt:true})
}}}

const EnvAudio2_SMP = async (direcao, nome1, nome2, nome3, nome4, nome5) => {
let bla = [nome1, nome2, nome3, nome4, nome5]
for (i of bla) {
if(!i) return  
if(messagesC.includes(i)) {
conn.sendMessage(from, {audio: {url: direcao}, mimetype: "audio/mpeg", ptt:true})
}}}

const EnvTXT_SMP = async (texto, nome1, nome2, nome3, nome4, nome5) => {
let bla = [nome1, nome2, nome3, nome4, nome5]
for ( i of bla) {
if(!i) return  
if(messagesC.includes(i)) {
conn.sendMessage(from, {text: texto})
}}}

const EnvAudio2_GTTS = async (lingua, texto, txt1, txt2, txt3, txt4, txt5) => {
let bla = [txt1, txt2, txt3, txt4, txt5]
for ( i of bla) {
if(!i) return
if(budy2.includes(i)) {
var gtt = require('./outros/funcoes/gtts.js')(lingua)
ranm = getRandom('.mp3')
rano = getRandom('.ogg')
gtt.save(ranm, texto, function() {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
DLT_FL(ranm)
buffer = fs.readFileSync(rano)
conn.sendMessage(from, {audio: buffer, ptt:true}, {quoted: info})
DLT_FL(rano)
})
})
}}}

var hora_sla = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

EnvAudio2_GTTS("pt", `São ${hora_sla} da ${tempo.split(" ")[1]}`, "que horas sao?")

if(messagesC.toLowerCase() == "prefix" || messagesC.toLowerCase() == "prefixo"){
if(info.key.fromMe) return 
const imagemURL = TEXTOS_GERAL.PREFIXO_IMAGEM_URL
const redirecionarPara = TEXTOS_GERAL.PREFIXO_REDIRECT_URL.replaceAll('#numerodono#', numerodono_ofc);
const urlCombinada = `https://esdeath.vip/api/redirect?redirect=${encodeURIComponent(redirecionarPara)}&imageUrl=${encodeURIComponent(imagemURL)}`;
const txtsng = TEXTOS_GERAL.PREFIXO_MENSAGEM.replaceAll(/#emoji#/g, EmojiBot).replaceAll(/#prefix#/g, prefix).replaceAll(/#nomebot#/g, NomeDoBot)
const tituloPreview = TEXTOS_GERAL.PREFIXO_PREVIEW_TITULO.replaceAll('#nomebot#', NomeDoBot)
const subtituloPreview = TEXTOS_GERAL.PREFIXO_PREVIEW_SUBTITULO
conn.sendMessage(from, { text: txtsng, contextInfo: { externalAdReply: { title: tituloPreview, body: subtituloPreview, thumbnailUrl: urlCombinada, sourceUrl: urlCombinada, mediaType: 1, renderLargerThumbnail: false }}}, {quoted: info});
}

if(budy2.toLowerCase() == "mysender"){
reply(sender)
}

if(messagesC == "btxon") return conn.sendMessage(from, { react: { text: "✅", key: info.key }})

let autoresponderData = [];

function inicializarAutoresposta() {
try {
const data = JSON.parse(fs.readFileSync('./dados/autoresposta.json'))
for (const item of data) {
if (item.contenha) {
item._normalizedContenha = item.contenha.map(s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())}
if (item.comece) {
item._normalizedComece = item.comece.map(s => 
s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())}}
autoresponderData = data
} catch (err) {
console.error('[ERRO] Falha ao carregar autoresposta:', err)}}
inicializarAutoresposta()

const messageHandlers = {
'texto': url => ({ text: url }),
'audio': url => ({ audio: { url }, mimetype: 'audio/mpeg', ptt: true }),
'video': url => ({ video: { url }, mimetype: 'video/mp4' }),
'imagem': url => ({ image: { url } }),
'sticker': url => ({ sticker: { url } }),
'react': emoji => ({ react: { text: emoji, key: info.key } })}

const saudacoes = {
audios: { 
"bom dia": "bomdia", 
"boa tarde": "boatarde", 
"boa noite": "boanoite" },

frases: {
bomDia: [
"Bom dia! Que o seu café esteja quente e o seu ânimo ainda mais.",
"Comece o dia com um sorriso, e o resto vai acompanhar.",
"Hoje é um novo capítulo esperando para ser escrito. Bom dia!",
"Que o sol brilhe na sua vida tanto quanto ele brilha lá fora neste momento.",
"Lembre-se de que cada manhã é uma oportunidade para recomeçar.",
"Que a sua jornada de hoje seja repleta de realizações e alegrias.",
"A vida é curta demais para não aproveitar cada segundo. Bom dia!",
"Que o vento leve embora todas as preocupações e traga novas esperanças.",
"Sorria, pois a felicidade é um presente que você merece. Bom dia!",
"Que o dia seja tão incrível quanto a sua capacidade de sonhar.",
"Bom dia! Que hoje você conquiste tudo aquilo que faz seu coração sorrir.",
"Cada amanhecer traz consigo infinitas possibilidades. Aproveite cada uma delas!",
"Que seu dia seja iluminado como os primeiros raios de sol da manhã.",
"Bom dia! Que a positividade guie seus passos hoje e sempre.",
"Acorde com determinação, durma com satisfação. Bom dia!",
"Que seu dia seja abençoado e cheio de momentos especiais.",
"Bom dia! Hoje é mais um dia para transformar sonhos em realidade.",
"Que a alegria da manhã permaneça em seu coração o dia todo.",
"Comece seu dia acreditando que coisas maravilhosas podem acontecer.",
"Bom dia! Que hoje você espalhe sorrisos por onde passar." ],

boaTarde: [
"Boa tarde! Espero que o seu dia esteja sendo tão incrível quanto você merece.",
"Aproveite a tarde para recarregar as energias e seguir em frente!",
"Não se esqueça de sorrir para o mundo, ele pode sorrir de volta. Boa tarde!",
"Que a sua tarde seja leve e cheia de pequenas alegrias.",
"O segredo é aproveitar cada momento, mesmo os mais simples. Boa tarde!",
"Que a tarde traga consigo oportunidades e momentos especiais.",
"Lembre-se de que você é capaz de enfrentar qualquer desafio. Boa tarde!",
"Que o sol da tarde aqueça o seu coração e ilumine o seu caminho.",
"A vida é feita de pequenos instantes que valem a pena. Boa tarde!",
"Que a sua tarde seja tão incrível quanto o pôr do sol.",
"Boa tarde! Que as horas seguintes sejam repletas de conquistas.",
"Que esta tarde traga consigo muitas razões para sorrir.",
"Boa tarde! Continue fazendo seu melhor em tudo que fizer.",
"Que a energia desta tarde renove suas forças e esperanças.",
"Boa tarde! Que cada minuto seja uma oportunidade de ser feliz.",
"Desejo uma tarde produtiva e cheia de realizações para você.",
"Que sua tarde seja tão bonita quanto um jardim em flor.",
"Boa tarde! Mantenha seu coração leve e seus pensamentos positivos.",
"Que esta tarde seja um momento de paz e realizações em sua vida.",
"Boa tarde! Que a alegria tome conta do seu coração." ],

boaNoite: [
"Boa noite! Que os seus sonhos sejam tão doces quanto um pedaço de chocolate.",
"Hora de descansar e recarregar para um novo dia. Boa noite!",
"Que a lua ilumine seus pensamentos e traga tranquilidade. Boa noite!",
"Que os anjos cuidem do seu sono e dos seus sonhos. Boa noite!",
"Lembre-se de agradecer pelas pequenas coisas antes de fechar os olhos.",
"Que a noite traga paz e serenidade para o seu coração.",
"Que os problemas se transformem em soluções enquanto você dorme. Boa noite!",
"Que os seus pensamentos sejam leves e os seus sonhos, inspiradores.",
"Amanhã é uma nova chance para fazer tudo ainda melhor. Boa noite!",
"Que o silêncio da noite traga reflexões e descanso merecido.",
"Boa noite! Que seu sono seja tranquilo e renovador.",
"Que esta noite seja um momento de paz e descanso em sua vida.",
"Boa noite! Que os sonhos mais doces povoem seu sono.",
"Que o manto da noite cubra você de paz e serenidade.",
"Boa noite! Que o amanhã traga novas e belas surpresas.",
"Descanse bem e acorde com ainda mais energia e disposição.",
"Boa noite! Que as estrelas iluminem seus sonhos mais bonitos.",
"Que esta noite seja repleta de paz e boas energias.",
"Boa noite! Deixe as preocupações descansarem também.",
"Que seu sono seja abençoado e seu despertar ainda mais." ]},

processarSaudacao(mensagem, usarTexto) {
const BudyNorm = mensagem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

// Mapear saudações para arrays de frases
const saudacaoParaFrases = {
"bom dia": this.frases.bomDia, 
"boa tarde": this.frases.boaTarde, 
"boa noite": this.frases.boaNoite
}

if (usarTexto) {
// Modo texto: enviar frases
for (const [saudacao, frasesArr] of Object.entries(saudacaoParaFrases)) {
if (BudyNorm.includes(saudacao)) {
reply(frasesArr[Math.floor(Math.random() * frasesArr.length)]);
return true 
}
}
} else {
// Modo áudio: enviar áudios
for (const [saudacao, base] of Object.entries(this.audios)) {
if (BudyNorm.includes(saudacao)) {
try {
conn.sendMessage(from, { 
audio: { url: `./dados/midias/audios/${base}${Math.floor(Math.random() * 3)}.mp3` }, 
mimetype: "audio/mpeg", 
ptt: true 
}, { quoted: info })
} catch (error) {
console.error('Erro ao enviar áudio de saudação:', error)
}
return true 
}
}
}
return false }}

async function processarRespostasAutomaticas() {
try {
let saudacaoRespondeu = false
if (isGroup && dataGp[0]?.saudacao?.ativo) {
saudacaoRespondeu = saudacoes.processarSaudacao(budy2, dataGp[0]?.saudacao?.modo === 'texto')}
if (!isAutorepo) return
if (messagesC.toLowerCase() === "bot") {
const respostas = ["oi delícia", "oi amor da minha vida", "oi princesa do meu coração"];
return reply(respostas[Math.floor(Math.random() * respostas.length)])}

if (budy2.toLowerCase().includes("adivinha meu celular") || 
budy2.toLowerCase().includes("bot qual meu celular")) {
return conn.sendMessage(from, {text: adivinha}, {quoted: info})}

if (budy2.toLowerCase().includes("corno")) {
return EnvAudio2_SMP("./dados/midias/audios/corno.mp3", "corno")}

const BudyNorm = budy2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const respostasEncontradas = []

for (const item of autoresponderData) {
if (!item.para || (!item.para.includes('global') && !item.para.includes(from))) continue;
let matched = false
if (item._normalizedContenha) {
for (const termo of item._normalizedContenha) {
if (BudyNorm.includes(termo)) {
matched = true;
break }}}
if (!matched && item._normalizedComece) {
for (const termo of item._normalizedComece) {
if (BudyNorm.startsWith(termo)) {
matched = true;
break }}}
if (matched && item.enviar?.length) {
if (saudacaoRespondeu && dataGp[0]?.saudacao?.modo === 'texto' && item.tipo === 'texto') continue;
respostasEncontradas.push({
tipo: item.tipo,
resposta: item.enviar[Math.floor(Math.random() * item.enviar.length)]})}}

for (const resp of respostasEncontradas) {
try {
if (resp.tipo === 'stickerlink') {
await enviarfiguUrl(conn, from, resp.resposta, info);
} else if (messageHandlers[resp.tipo]) {
await conn.sendMessage(from, messageHandlers[resp.tipo](resp.resposta), { quoted: info })}
await sleep(100);
} catch (error) {
console.error('Erro ao enviar resposta automática:', error)}}
} catch (error) {
console.error('Erro no sistema de respostas automáticas:', error)}}

processarRespostasAutomaticas()

// Simih da API 

if(isGroup && isSimi && budy) {
const obterRespostaSimi = async(pergunta) => {
let puxarR = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/simsimi?apikey=JOSI_652&pergunta=${pergunta}`)
return puxarR.resposta;
}

let simiRs = await obterRespostaSimi(budy)

if(simiRs) {
if(TEXTOS_GERAL.PALAVRAS_PROIBIDA_DE_O_SIMI_FALAR.some(i => simiRs?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(i))) {
return;
}
reply(simiRs)
}
}

// Simih de armazenar da API 

if(isGroup && type === "extendedTextMessage" && info?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation) {
let perg = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation?.trim() || false ;
let resp = info?.message?.extendedTextMessage?.text?.trim() || false;
if( perg && resp ) {
try {
await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/simsimi_add?apikey=JOSI_652&pergunta=${perg}&resposta=${resp}`)
} catch {
return;
}
}
}

//===============(SIMIH-2)===============\\
 
const Simih2Sistema = require('./outros/funcoes/simih2.js');

if (isSimi2 && isGroup && !isCmd && !isUrl(budy)) {
const resposta = Simih2Sistema.obterRespostaSimih2(BANCOP, budy);
if (resposta && resposta !== prefix) {
reply(resposta)}}

if (!isCmd && isGroup && isSimi2) {
try {
const quotedText = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
const messageText = info?.message?.extendedTextMessage?.text || ""
if (quotedText && messageText && quotedText !== messageText) {
Simih2Sistema.adicionarMensagemSimih2(BANCOP, quotedText, messageText)}
} catch (error) {
console.error("Erro ao adicionar mensagem ao Simih2:", error)}}


}


}
} catch (e) {
console.log(e);
}

}

module.exports = { startAle, acessAPI }