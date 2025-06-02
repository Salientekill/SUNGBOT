class EventosGrupo {
constructor(conn, BANCOP, setting, nescessario, utils) {
// ===== CORE DEPENDENCIES =====
this.conn = conn;
this.BANCOP = BANCOP;
this.setting = setting;
this.nescessario = nescessario;

// Unificar utils em uma única operação
Object.assign(this, utils);

// ===== CONFIGURAÇÕES CENTRALIZADAS =====
this.CONFIG = {
TIMEOUTS: {
BAN_PROCESSING: 10000,
PENDING_BAN: 15000,
X9_FLOOD: 3000,
CACHE_CLEANUP: 300000,
X9_CLEAN_INTERVAL: 60 * 60 * 1000
},
X9: {
MAX_MESSAGES: 1500,
PRUNE_THRESHOLD: 0.2,
PROCESS_TIMEOUT: 5000,
DEFAULT_AVATAR: 'https://esdeath.vip/api/media/get/f6b6c095-6e6d-4538-bd6a-f617482186aa',
CACHE_TTL: {
AVATAR: 30 * 60 * 1000
},
TITLES: {
DELETE: this.TEXTOS_GERAL?.X9_MENSAGEM_DELETADA_TITULO || "⚠️ MSG DELETADA ⚠️",
EDIT: this.TEXTOS_GERAL?.X9_MENSAGEM_EDITADA_TITULO || "🔄 MSG EDITADA 🔄",
PROMOTE: this.TEXTOS_GERAL?.X9_PROMOCAO_TITULO || "👑 PROMOÇÃO DETECTADA 👑",
DEMOTE: this.TEXTOS_GERAL?.X9_REBAIXAMENTO_TITULO || "⬇️ REBAIXAMENTO DETECTADO ⬇️",
LINK_RESET: this.TEXTOS_GERAL?.X9_LINK_RESET_TITULO || "🔗 LINK REDEFINIDO 🔗",
PIN: this.TEXTOS_GERAL?.X9_MENSAGEM_FIXADA_TITULO || "📌 MENSAGEM FIXADA 📌",
UNPIN: this.TEXTOS_GERAL?.X9_MENSAGEM_DESAFIXADA_TITULO || "📌 MENSAGEM DESAFIXADA 📌",
APPROVAL: this.TEXTOS_GERAL?.X9_APROVACAO_REJEITADA_TITULO || "❌ SOLICITAÇÃO REJEITADA ❌"
}
}
};

// ===== DADOS CORE UNIFICADOS =====
this.numerodono_ofc = setting.numerodono.replace(/[()+-/ +/]/gi, "");
this.nmrdn_dono2 = `${this.numerodono_ofc}@s.whatsapp.net`;
this.donosArray = this.construirListaDonos();

// ===== SISTEMA DE CACHE UNIFICADO =====
this.unifiedCache = {
groups: new Map(),
x9Messages: new Map(),
x9Avatars: new Map(),
messageCount: 0,
recentlyProcessed: new Set(),
stats: { deletes: 0, edits: 0, failedDeletes: 0, failedEdits: 0 }
};

// ===== SISTEMAS DE CONTROLE (MANTIDOS ORIGINAIS) =====
this.banProcessingControl = new Map();
this.pendingRequestsBanned = new Map();
this.x9EventFloodControl = new Map();

// ===== MAPEAMENTOS CONSOLIDADOS =====
this.eventMap = new Map([
[27, 'add'], ['GROUP_PARTICIPANT_ADD', 'add'],
[28, 'remove'], [32, 'remove'], ['GROUP_PARTICIPANT_REMOVE', 'remove'], ['GROUP_PARTICIPANT_LEAVE', 'remove'],
[29, 'promote'], ['GROUP_PARTICIPANT_PROMOTE', 'promote'],
[30, 'demote'], ['GROUP_PARTICIPANT_DEMOTE', 'demote'],
[33, 'numberChange'], ['GROUP_PARTICIPANT_CHANGE_NUMBER', 'numberChange'],
[20, 'groupCreate'], ['GROUP_CREATE', 'groupCreate']
]);

this.configHandlers = new Map([
[24, (from, params) => this.atualizarGrupo("desc", from, params[0])],
[21, (from, params) => this.atualizarGrupo("subject", from, params[0])],
[25, (from, params) => this.atualizarGrupo("restrict", from, params[0] === "off" ? 0 : 1)],
[26, (from, params) => this.atualizarGrupo("announce", from, params[0] === "off" ? 0 : 1)],
[145, (from, params) => this.atualizarGrupo("joinApprovalMode", from, params[0] === "off" ? 0 : 1)],
[171, (from, params) => this.atualizarGrupo("memberAddMode", from, params[0] === "admin_add" ? 0 : 1)]
]);

this.x9EventHandlers = new Map([
[23, this.handleGroupLinkResetX9.bind(this)],
[29, this.handlePromotionEventX9.bind(this)], 
[30, this.handleDemotionEventX9.bind(this)],
[172, this.handleApprovalEventX9.bind(this)]
]);

this.specialEventHandlers = new Map([
[172, this.handlePendingRequests.bind(this)],
[27, this.handleOwnerAutoPromote.bind(this)],
[29, this.handleAntiTheftPromote.bind(this)],
[30, this.handleAntiTheftDemote.bind(this)],
[28, this.handleAntiTheftRemove.bind(this)]
]);

// ===== VALIDAÇÕES CONSOLIDADAS =====
this.validateDependencies();

// ===== INICIALIZAÇÕES =====
this.startUnifiedCacheCleanup();
this.initializeX9();
}

// ===== VALIDAÇÃO CONSOLIDADA =====
validateDependencies() {
const required = ['atualizarOuAdicionarDB', 'puxarGrupo'];
required.forEach(method => {
if (typeof this[method] !== 'function') {
console.error(`❌ [EVENTOS] ${method} não está disponível!`);
}
});
}

// ===== SISTEMA DE CACHE UNIFICADO =====
startUnifiedCacheCleanup() {
setInterval(() => {
const now = Date.now();

// Limpar cache de grupos
this.cleanCacheByTTL(this.unifiedCache.groups, this.CONFIG.TIMEOUTS.CACHE_CLEANUP, now);

// Limpar cache de avatares X9
this.cleanCacheByTTL(this.unifiedCache.x9Avatars, this.CONFIG.X9.CACHE_TTL.AVATAR, now);

// Limpar controles de flood
this.cleanCacheByTTL(this.x9EventFloodControl, this.CONFIG.TIMEOUTS.X9_FLOOD, now);

// Limpar controles de banimento
this.cleanBanProcessingControl();

// Prunear mensagens X9 se necessário
if (this.unifiedCache.messageCount > this.CONFIG.X9.MAX_MESSAGES) {
this.x9PruneMessages();
}
}, this.CONFIG.TIMEOUTS.CACHE_CLEANUP);
}

cleanCacheByTTL(cache, ttl, now) {
for (const [key, value] of cache.entries()) {
if (value?.timestamp && (now - value.timestamp) > ttl) {
cache.delete(key);
}
}
}

// ===== SISTEMA ANTI-DUPLICAÇÃO (MANTIDO ORIGINAL) =====
checkAndMarkBanProcessing(userId, groupId) {
const key = `${groupId}:${userId}`;
const now = Date.now();

if (this.banProcessingControl.has(key)) {
const timestamp = this.banProcessingControl.get(key);
if ((now - timestamp) < this.CONFIG.TIMEOUTS.BAN_PROCESSING) {
return false;
}
}

if (this.pendingRequestsBanned.has(key)) {
const timestamp = this.pendingRequestsBanned.get(key);
if ((now - timestamp) < this.CONFIG.TIMEOUTS.PENDING_BAN) {
return false;
}
}

this.banProcessingControl.set(key, now);
setTimeout(() => this.banProcessingControl.delete(key), this.CONFIG.TIMEOUTS.BAN_PROCESSING);
return true;
}

markPendingRequestBan(userId, groupId) {
const key = `${groupId}:${userId}`;
this.pendingRequestsBanned.set(key, Date.now());
setTimeout(() => this.pendingRequestsBanned.delete(key), this.CONFIG.TIMEOUTS.PENDING_BAN);
}

cleanBanProcessingControl() {
const now = Date.now();
const cutoffs = {
ban: now - this.CONFIG.TIMEOUTS.BAN_PROCESSING,
pending: now - this.CONFIG.TIMEOUTS.PENDING_BAN
};

[
[this.banProcessingControl, cutoffs.ban],
[this.pendingRequestsBanned, cutoffs.pending]
].forEach(([cache, cutoff]) => {
for (const [key, timestamp] of cache.entries()) {
if (timestamp < cutoff) cache.delete(key);
}
});
}

// ===== SISTEMA X9 OTIMIZADO =====
initializeX9() {
// Handler consolidado para mensagens
this.conn.ev.on('messages.upsert', ({messages}) => {
if (!Array.isArray(messages)) return;
messages.forEach(msg => {
if (!msg.key.fromMe && msg.key.remoteJid?.endsWith('@g.us')) {
this.x9StoreMessage(msg);
}
});
});

// Handler consolidado para atualizações
this.conn.ev.on('messages.update', async updates => {
if (!Array.isArray(updates)) return;

for (const update of updates) {
if (!update.key?.remoteJid?.endsWith('@g.us')) continue;

const updateType = this.getUpdateType(update);
if (!updateType) continue;

const processId = `${update.key.id}-${updateType}`;
if (this.unifiedCache.recentlyProcessed.has(processId)) continue;

this.unifiedCache.recentlyProcessed.add(processId);
setTimeout(() => this.unifiedCache.recentlyProcessed.delete(processId), this.CONFIG.X9.PROCESS_TIMEOUT);

try {
await this.processX9Update(update.key, update, updateType);
} catch (err) {
this.unifiedCache.stats[`failed${updateType.charAt(0).toUpperCase() + updateType.slice(1)}s`]++;
console.error(`[X9] Erro ao processar ${updateType}:`, err);
}
}
});

// Limpeza periódica unificada
setInterval(() => this.cleanX9Caches(), this.CONFIG.X9.CLEAN_INTERVAL);
}

getUpdateType(update) {
if (update.update?.messageStubType === 1) return 'delete';
if (update.update?.message?.editedMessage) return 'edit';
return null;
}

x9StoreMessage(message) {
this.unifiedCache.x9Messages.set(message.key.id, message);
this.unifiedCache.messageCount++;

if (this.unifiedCache.messageCount > this.CONFIG.X9.MAX_MESSAGES) {
this.x9PruneMessages();
}
}

x9PruneMessages() {
const toRemove = Math.floor(this.CONFIG.X9.MAX_MESSAGES * this.CONFIG.X9.PRUNE_THRESHOLD);
const entries = [...this.unifiedCache.x9Messages.entries()].slice(0, toRemove);

entries.forEach(([key]) => {
this.unifiedCache.x9Messages.delete(key);
this.unifiedCache.messageCount--;
});
}

cleanX9Caches() {
const now = Date.now();
this.cleanCacheByTTL(this.unifiedCache.x9Avatars, this.CONFIG.X9.CACHE_TTL.AVATAR, now);
this.cleanCacheByTTL(this.x9EventFloodControl, this.CONFIG.TIMEOUTS.X9_FLOOD, now);
this.cleanBanProcessingControl();

if (this.unifiedCache.messageCount > this.CONFIG.X9.MAX_MESSAGES) {
this.x9PruneMessages();
}
}

// ===== VERIFICAÇÕES CONSOLIDADAS =====
async isX9Enabled(groupId) {
try {
const jsonGp = await this.getGroupSettings(groupId);
return !!(jsonGp?.[0]?.x9);
} catch (error) {
console.error("[X9] Erro ao verificar status:", error);
return false;
}
}

async isGroupAdminX9(groupId, userId) {
try {
const metadata = await this.puxarGrupo(this.conn, groupId);
return metadata.participants
.filter(p => p.admin !== null)
.map(p => p.id)
.includes(userId);
} catch (error) {
console.error("[X9] Erro ao verificar administradores:", error);
return false;
}
}

async getProfilePictureX9(userId) {
const now = Date.now();
const cached = this.unifiedCache.x9Avatars.get(userId);

if (cached && (now - cached.timestamp) < this.CONFIG.X9.CACHE_TTL.AVATAR) {
return cached.url;
}

try {
const url = await this.conn.profilePictureUrl(userId, 'image');
this.unifiedCache.x9Avatars.set(userId, { url, timestamp: now });
return url;
} catch (error) {
const defaultUrl = this.CONFIG.X9.DEFAULT_AVATAR;
this.unifiedCache.x9Avatars.set(userId, { url: defaultUrl, timestamp: now });
return defaultUrl;
}
}

// ===== PROCESSAMENTO X9 CONSOLIDADO =====
async processX9Update(key, update, updateType) {
const {remoteJid, participant, id: messageId, fromMe} = key;

if (fromMe || !(await this.isX9Enabled(remoteJid))) return;

const originalMessage = this.unifiedCache.x9Messages.get(messageId);
if (!originalMessage) return;

const sender = participant || remoteJid;
if (await this.isGroupAdminX9(remoteJid, sender)) return;

const profileUrl = await this.getProfilePictureX9(sender);

if (updateType === 'delete') {
await this.processDeletedMessage(remoteJid, sender, originalMessage, profileUrl);
this.unifiedCache.stats.deletes++;
} else if (updateType === 'edit') {
await this.processEditedMessage(remoteJid, sender, originalMessage, update, profileUrl);
this.unifiedCache.stats.edits++;
}
}

async processDeletedMessage(jid, sender, message, profileUrl) {
const content = this.extractMessageContent(message);
if (!content) return;

await this.sendX9Notification({
jid, sender, message,
title: this.CONFIG.X9.TITLES.DELETE,
content: `MENSAGEM:\n${content}`,
profileUrl,
type: 'delete'
});

this.unifiedCache.x9Messages.delete(message.key.id);
this.unifiedCache.messageCount--;
}

async processEditedMessage(jid, sender, originalMessage, update, profileUrl) {
const originalText = this.extractMessageContent(originalMessage);
const editedText = this.extractEditedContent(update);

if (!originalText || !editedText || originalText === editedText) return;

await this.sendX9Notification({
jid, sender, message: originalMessage,
title: this.CONFIG.X9.TITLES.EDIT,
content: `*Original:*\n${originalText}\n\n*Editado para:*\n${editedText}`,
profileUrl,
type: 'edit'
});

// Atualizar mensagem no cache
this.updateMessageInCache(originalMessage, editedText);
}

updateMessageInCache(originalMessage, editedText) {
const msg = originalMessage.message;
if (msg.conversation) {
msg.conversation = editedText;
} else if (msg.extendedTextMessage) {
msg.extendedTextMessage.text = editedText;
}
this.unifiedCache.x9Messages.set(originalMessage.key.id, originalMessage);
}

// ===== EXTRAÇÃO DE CONTEÚDO CONSOLIDADA =====
extractMessageContent(message) {
if (!message?.message) return '';

const msg = message.message;
const contentMap = [
['conversation', msg.conversation],
['extendedText', msg.extendedTextMessage?.text],
['image', msg.imageMessage?.caption && `[Imagem] ${msg.imageMessage.caption || ''}`],
['video', msg.videoMessage?.caption && `[Vídeo] ${msg.videoMessage.caption || ''}`],
['document', msg.documentMessage?.caption && `[Documento] ${msg.documentMessage.caption || ''}`],
['audio', msg.audioMessage && '[Áudio]'],
['sticker', msg.stickerMessage && '[Sticker]']
];

for (const [type, content] of contentMap) {
if (content) return content;
}

return '[Conteúdo não textual]';
}

extractEditedContent(update) {
const editedMsg = update.update?.message?.editedMessage?.message;
if (!editedMsg) return '';
return editedMsg.conversation || editedMsg.extendedTextMessage?.text || '';
}

// ===== NOTIFICAÇÃO X9 CONSOLIDADA =====
async sendX9Notification({jid, sender, message, title, content, profileUrl, type}) {
const userName = message.pushName || 'Usuário';
const text = `*${title}*\n\n👤 *${userName}*\n\n${content}`;

await this.conn.sendMessage(jid, {
text,
contextInfo: {
mentionedJid: [sender],
externalAdReply: {
title,
body: `POR: ${userName}`,
thumbnailUrl: profileUrl,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}
}
});
}

// ===== CONTROLE DE FLOOD CONSOLIDADO =====
checkX9FloodControl(groupId, eventType, participant) {
const key = `${groupId}:${eventType}:${participant}`;
const now = Date.now();
const lastEvent = this.x9EventFloodControl.get(key);

if (lastEvent && (now - lastEvent) < this.CONFIG.TIMEOUTS.X9_FLOOD) {
return false;
}

this.x9EventFloodControl.set(key, now);

// Auto-cleanup para prevenir memory leak
if (this.x9EventFloodControl.size > 1000) {
const cutoff = now - this.CONFIG.TIMEOUTS.X9_FLOOD;
for (const [k, timestamp] of this.x9EventFloodControl.entries()) {
if (timestamp < cutoff) this.x9EventFloodControl.delete(k);
}
}
return true;
}

// ===== UTILITÁRIOS CONSOLIDADOS =====
fixedTime(duration) {
if (!duration || duration === 0) return "0";
if (duration >= 2592000) return "30d";
if (duration >= 604800) return "7d"; 
if (duration >= 86400) return "24h";
return duration.toString();
}

getBotNumber() {
return this.conn.user.id.split(':')[0] + "@s.whatsapp.net";
}

// ===== HANDLERS X9 (MANTIDOS ORIGINAIS) =====
async handleGroupLinkResetX9(msg) {
const { key, participant } = msg;
const from = key.remoteJid;

if (!participant || participant === this.getBotNumber()) return;
if (!this.checkX9FloodControl(from, 'linkReset', participant)) return;

try {
await this.delay(1000);
await this.conn.sendMessage(from, {
text: this.TEXTOS_GERAL.X9_LINK_RESET_MSG.replaceAll('#admin#', participant.split("@")[0]),
mentions: [participant]
});
} catch (error) {
console.error("Erro ao processar reset de link X9:", error);
}
}

async handlePromotionEventX9(msg) {
const { key, participant, messageStubParameters } = msg;
const promoted = messageStubParameters?.[0];

if (!promoted || !participant || participant === this.getBotNumber()) return;
if (!this.checkX9FloodControl(key.remoteJid, 'promotion', promoted)) return;

try {
await this.delay(1000);
await this.conn.sendMessage(key.remoteJid, {
text: this.TEXTOS_GERAL.X9_PROMOCAO_MSG
.replaceAll('#promovido#', promoted.split("@")[0])
.replaceAll('#admin#', participant.split("@")[0]),
mentions: [promoted, participant]
});
} catch (error) {
console.error("Erro ao processar evento de promoção X9:", error);
}
}

async handleDemotionEventX9(msg) {
const { key, participant, messageStubParameters } = msg;
const demoted = messageStubParameters?.[0];

if (!demoted || !participant || participant === this.getBotNumber()) return;
if (!this.checkX9FloodControl(key.remoteJid, 'demotion', demoted)) return;

try {
await this.delay(1000);
await this.conn.sendMessage(key.remoteJid, {
text: this.TEXTOS_GERAL.X9_REBAIXAMENTO_MSG
.replaceAll('#rebaixado#', demoted.split("@")[0])
.replaceAll('#admin#', participant.split("@")[0]),
mentions: [demoted, participant]
});
} catch (error) {
console.error("Erro ao processar evento de rebaixamento X9:", error);
}
}

async handleApprovalEventX9(msg) {
const { key, messageStubParameters } = msg;
const params = messageStubParameters;

if (!params || params.length < 2 || !key.participant) return;
if (key.participant === this.getBotNumber()) return;

const [user, action] = params;
if (action === 'rejected' && this.checkX9FloodControl(key.remoteJid, 'approval', user)) {
try {
await this.conn.sendMessage(key.remoteJid, {
text: this.TEXTOS_GERAL.X9_SOLICITACAO_REJEITADA_MSG
.replaceAll('#admin#', key.participant.split('@')[0])
.replaceAll('#usuario#', user.split('@')[0]),
mentions: [user, key.participant]
});
} catch (error) {
console.error("Erro ao processar evento de aprovação X9:", error);
}
}
}

async handlePinMessageX9(msg) {
const { key, message } = msg;
const participant = key.participant || key.remoteJid;

if (!participant || participant === this.getBotNumber()) return;
if (!this.checkX9FloodControl(key.remoteJid, 'pin', participant)) return;

try {
const duration = message?.messageContextInfo?.messageAddOnDurationInSecs;
const action = this.fixedTime(duration) === "0" ? 
'desafixar uma mensagem' : 
`fixar uma mensagem por *${this.fixedTime(duration)}*`;

const title = duration === 0 ? 
this.CONFIG.X9.TITLES.UNPIN : 
this.CONFIG.X9.TITLES.PIN;

await this.conn.sendMessage(key.remoteJid, {
text: `${title}\n\nO admin @${participant.split("@")[0]} acabou de ${action}.`,
mentions: [participant]
});
} catch (error) {
console.error("Erro ao processar fixação de mensagem X9:", error);
}
}

// ===== STATUS E CONTROLE CONSOLIDADOS =====
getX9Status() {
return {
messageCount: this.unifiedCache.messageCount,
cacheStats: {
avatars: this.unifiedCache.x9Avatars.size,
recentlyProcessed: this.unifiedCache.recentlyProcessed.size,
eventFloodControl: this.x9EventFloodControl.size,
banProcessingControl: this.banProcessingControl.size,
pendingRequestsBanned: this.pendingRequestsBanned.size,
groups: this.unifiedCache.groups.size
},
operationStats: this.unifiedCache.stats,
memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024
};
}

clearX9Data() {
// Limpar cache unificado
Object.assign(this.unifiedCache, {
x9Messages: new Map(),
messageCount: 0,
recentlyProcessed: new Set(),
x9Avatars: new Map(),
stats: { deletes: 0, edits: 0, failedDeletes: 0, failedEdits: 0 }
});

// Limpar controles
this.x9EventFloodControl.clear();
this.banProcessingControl.clear();
this.pendingRequestsBanned.clear();

return { success: true, message: "Sistema X9 e anti-duplicação reiniciados com sucesso." };
}

// ===== MÉTODOS EXISTENTES CONSOLIDADOS =====
construirListaDonos() {
const nmrdn = `${this.numerodono_ofc}@s.whatsapp.net`;
const donosKeys = ['dono1', 'dono2', 'dono3', 'dono4', 'dono5', 'dono6'];

return [nmrdn, ...donosKeys
.map(key => this.nescessario[key])
.filter(dono => dono && dono !== "." && dono.trim() !== "")
.map(dono => `${dono}@s.whatsapp.net`)
];
}

invalidarCachesGlobais(groupId) {
return this.unifiedCache.groups.delete(groupId);
}

// ===== PROCESSAMENTO PRINCIPAL DE EVENTOS =====
async processarEventoMensagem(msg) {
const { key, messageStubType, messageStubParameters, message } = msg;
if (!key?.remoteJid || (!messageStubType && !message?.messageContextInfo)) return;

const from = key.remoteJid;

// Processar mensagens fixadas (sistema x9)
if (message?.messageContextInfo?.messageAddOnDurationInSecs !== undefined) {
if (await this.isX9Enabled(from)) {
await this.handlePinMessageX9(msg);
}
return;
}

if (!messageStubType) return;

// Processar eventos X9 (exceto 172)
if (await this.isX9Enabled(from)) {
const x9Handler = this.x9EventHandlers.get(messageStubType);
if (x9Handler && messageStubType !== 172) {
await x9Handler(msg);
if ([23].includes(messageStubType)) return;
}
}

// ✅ LÓGICA SIMPLIFICADA: Processar handlers especiais incluindo 172
const specialHandler = this.specialEventHandlers.get(messageStubType);
if (specialHandler) {
await specialHandler(msg);
if (messageStubType === 172 && await this.isX9Enabled(from)) {
const x9Handler = this.x9EventHandlers.get(messageStubType);
if (x9Handler) await x9Handler(msg);
}
// Não fazer return para eventos de participantes (27,28,29,30) - eles precisam atualizar o banco
if (![27, 28, 29, 30].includes(messageStubType)) {
return;
}
}

// Processar eventos de participantes
const eventType = this.eventMap.get(messageStubType);
if (eventType && ['add', 'remove', 'promote', 'demote'].includes(eventType)) {
if (messageStubParameters?.[0]) {
// Verificação especial para eventos de entrada
if (eventType === 'add') {
const participantId = messageStubParameters[0];
const key = `${from}:${participantId}`;
if (this.pendingRequestsBanned.has(key)) {
await this.atualizarParticipantes(eventType, from, participantId);
return;
}
}
await this.atualizarParticipantes(eventType, from, messageStubParameters[0]);
}
return;
}

// Processar outros tipos de evento
if (eventType === 'numberChange' && messageStubParameters?.[0]) {
await this.handleNumberChange(key.participant, messageStubParameters[0], from);
} else if (eventType === 'groupCreate') {
await this.handleGroupCreate(from);
} else {
const configHandler = this.configHandlers.get(messageStubType);
if (configHandler) await configHandler(from, messageStubParameters);
}
}

// ===== RESTO DOS MÉTODOS MANTIDOS COMO ORIGINAL =====

// ✅ LÓGICA CORRETA: handlePendingRequests com aprovação para banimento
async handlePendingRequests(msg) {
const { key } = msg;
const from = key.remoteJid;

try {
const response = await this.conn.groupRequestParticipantsList(from);

if (!response || response.length === 0) {
return;
}

for (let { jid } of response) {
if (!jid) continue;

// Donos e usuários especiais - Aceitar e promover
if (this.donosArray.includes(jid) || this.lotus_users.includes(jid)) {
try {
await this.conn.groupRequestParticipantsUpdate(from, [jid], "approve");
await this.conn.sendMessage(from, { 
text: this.TEXTOS_GERAL.USUARIO_APROVADO_DONO.replaceAll('#usuario#', jid.split("@")[0]), 
mentions: [jid] 
});
await this.conn.groupParticipantsUpdate(from, [jid], "promote");
} catch (approvalError) {
console.error("Erro ao aprovar/promover:", approvalError);
}
continue;
}

// ✅ VERIFICAR SE DEVE SER BANIDO (precisa aprovar primeiro para banir)
const needsBan = await this.shouldBanUser(jid, from);

if (needsBan.shouldBan) {
// ✅ PROCESSO CORRETO: Aceitar → Banir → Remover
await this.banUserWithGroupControl(from, jid, needsBan.reason, needsBan.config);
continue;
}

// ✅ TODOS OS OUTROS: DEIXAR PENDENTE (não fazer nada)
// O admin vai aprovar ou rejeitar manualmente
}
} catch (error) {
console.error("Erro ao processar solicitações:", error);
}
}

// ✅ LÓGICA SIMPLIFICADA: shouldBanUser apenas determina se deve banir
async shouldBanUser(jid, groupId) {
// Verificar se já está sendo processado
const key = `${groupId}:${jid}`;
if (this.banProcessingControl.has(key) || this.pendingRequestsBanned.has(key)) {
return { shouldBan: false, reason: 'already_processed' };
}

// Lista negra global sempre ativa (maior prioridade)
if (this.nescessario.listanegraG?.includes(jid)) {
return {
shouldBan: true,
reason: 'listanegraGlobal',
config: { listanegraEspera: true }
};
}

const dataGp = await this.getGroupSettings(groupId);

// Se não tem configurações, não pode verificar regras - não banir
if (!dataGp || !Array.isArray(dataGp) || dataGp.length === 0) {
return { shouldBan: false, reason: 'no_config' };
}

// Verificar se precisa de aluguel e se está válido
const aluguelNecessario = this.nescessario?.rg_aluguelGB || dataGp[0]?.rg_aluguel || false;

if (aluguelNecessario) {
const grupoTemAluguel = this.verificarAluguelDB(groupId);
if (!grupoTemAluguel) {
// Sem aluguel válido, não pode verificar regras - não banir
return { shouldBan: false, reason: 'no_rent' };
}
}

// Lista negra do grupo
if (dataGp[0]?.listanegra?.includes(jid)) {
return {
shouldBan: true,
reason: 'listanegraGrupo',
config: dataGp[0]?.msgBanimento || { listanegraEspera: true },
customMessage: dataGp[0]?.legenda_listanegra_espera
};
}

// Anti-fake
if (dataGp[0]?.antifake && !jid.split("@")[0].startsWith('55')) {
return {
shouldBan: true,
reason: 'antifake',
config: dataGp[0]?.msgBanimento || { antifakeEspera: true },
customMessage: dataGp[0]?.legenda_estrangeiro_espera
};
}

// Se chegou até aqui, não deve ser banido
return { shouldBan: false, reason: 'safe_user' };
}

async banUserWithGroupControl(groupId, jid, reason, options) {
let originalGroupState = null;

try {
// Marcar como banido via pending request
this.markPendingRequestBan(jid, groupId);

const groupMetadata = await this.conn.groupMetadata(groupId);
originalGroupState = { announce: groupMetadata.announce };

// Fechar grupo se necessário
if (!originalGroupState.announce) {
await this.conn.groupSettingUpdate(groupId, 'announcement');
await this.delay(500);
}

// Aceitar usuário
await this.conn.groupRequestParticipantsUpdate(groupId, [jid], "approve");
await this.delay(1000);

// Enviar mensagem de banimento
await this.sendBanMessage(groupId, jid, reason, options);
await this.delay(500);

// Remover usuário
await this.conn.groupParticipantsUpdate(groupId, [jid], "remove");
await this.delay(500);

} catch (error) {
console.error(`[BANIMENTO] Erro durante processo de ban de ${jid}:`, error);
} finally {
// Reabrir grupo se necessário
if (originalGroupState && !originalGroupState.announce) {
try {
await this.conn.groupSettingUpdate(groupId, 'not_announcement');
} catch (restoreError) {
console.error(`[BANIMENTO] ERRO CRÍTICO - Falha ao reabrir grupo:`, restoreError);
setTimeout(async () => {
try {
await this.conn.groupSettingUpdate(groupId, 'not_announcement');
} catch (secondError) {
console.error(`[BANIMENTO] FALHA CRÍTICA - Grupo permanece fechado:`, secondError);
}
}, 3000);
}
}
}
}

async sendBanMessage(groupId, jid, reason, options) {
const userName = jid.split("@")[0];
const messageMap = {
'listanegraGlobal': {
shouldSend: options.listanegraEspera !== false,
message: this.TEXTOS_GERAL.ACEITO_E_BANIDO_LISTANEGRA.replaceAll('#usuario#', userName)
},
'listanegraGrupo': {
shouldSend: options.listanegraEspera !== false,
message: options.customMessage || this.TEXTOS_GERAL.ACEITO_E_BANIDO_GRUPO.replaceAll('#usuario#', userName)
},
'antifake': {
shouldSend: options.antifakeEspera !== false,
message: options.customMessage || this.TEXTOS_GERAL.ACEITO_E_BANIDO_ANTIFAKE.replaceAll('#usuario#', userName)
}
};

const messageConfig = messageMap[reason];
if (messageConfig?.shouldSend && messageConfig.message) {
try {
const finalMessage = messageConfig.message.includes('@') ? 
messageConfig.message : 
`${messageConfig.message}\n\n@${userName}`;

await this.conn.sendMessage(groupId, { 
text: finalMessage,
mentions: [jid]
});
} catch (error) {
console.error("[BANIMENTO] Erro ao enviar mensagem:", error);
}
}
}

// Manter delay original
delay(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== RESTO DOS MÉTODOS MANTIDOS SEM ALTERAÇÃO =====
// (Para não quebrar funcionalidades críticas, mantenho os métodos restantes como estão)

async handleOwnerAutoPromote(msg) {
const { key, messageStubParameters } = msg;
const from = key.remoteJid;
if (!messageStubParameters?.length) return;
const enteredJid = messageStubParameters[0];
if (!enteredJid) return;

// ✅ CORREÇÃO: Promover dono SEMPRE, independente do status do grupo
if (this.donosArray.includes(enteredJid) || this.lotus_users.includes(enteredJid)) {
try {
const grupoData = await this.puxarGrupo(this.conn, from);
if (!grupoData) return;

const groupAdmins = grupoData.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);

// ✅ Se o dono não é admin ainda, promover
if (!groupAdmins.includes(enteredJid)) {
await this.conn.groupParticipantsUpdate(from, [enteredJid], "promote");
await this.conn.sendMessage(from, { 
text: this.TEXTOS_GERAL.DONO_PROMOVIDO_AUTO.replaceAll('#dono#', enteredJid.split("@")[0]), 
mentions: [enteredJid] 
});
}
} catch (error) {
console.error("Erro ao processar promoção automática:", error);
}
}
}

// ✅ CORREÇÃO: Garantir que anti-roubo também atualiza o banco
async handleAntiTheftPromote(msg) {
await this.processAntiTheft(msg, 'promote');
// ✅ CORREÇÃO: Garantir que a atualização do banco ainda aconteça
const { messageStubParameters, key } = msg;
if (messageStubParameters?.[0] && key?.remoteJid) {
await this.atualizarParticipantes('promote', key.remoteJid, messageStubParameters[0]);
}
}

async handleAntiTheftDemote(msg) {
await this.processAntiTheft(msg, 'demote');
// ✅ CORREÇÃO: Garantir que a atualização do banco ainda aconteça
const { messageStubParameters, key } = msg;
if (messageStubParameters?.[0] && key?.remoteJid) {
await this.atualizarParticipantes('demote', key.remoteJid, messageStubParameters[0]);
}
}

async handleAntiTheftRemove(msg) {
await this.processAntiTheft(msg, 'remove');
// ✅ CORREÇÃO: Garantir que a atualização do banco ainda aconteça
const { messageStubParameters, key } = msg;
if (messageStubParameters?.[0] && key?.remoteJid) {
await this.atualizarParticipantes('remove', key.remoteJid, messageStubParameters[0]);
}
}

async processAntiTheft(msg, action) {
const { key, participant, messageStubParameters } = msg;
const from = key.remoteJid;
if (!participant || key.fromMe || this.donosArray.includes(participant)) return;
try {
const dataGp = await this.getGroupSettings(from);
if (!dataGp || !dataGp[0]?.peradm?.length) return;
if (dataGp[0].peradm.includes(participant)) return;
const groupMetadata = await this.puxarGrupo(this.conn, from);
const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
const botNumber = this.getBotNumber();
const djid = `${this.numerodono_ofc}@s.whatsapp.net`;
switch(action) {
case 'promote':
await this.handleUnauthorizedPromote(from, participant, messageStubParameters, groupAdmins);
break;
case 'demote':
await this.handleUnauthorizedDemote(from, participant, messageStubParameters, groupAdmins, botNumber, djid);
break;
case 'remove':
await this.handleUnauthorizedRemove(from, participant, messageStubParameters, groupAdmins, botNumber, djid);
break;
}
} catch (error) {
console.error(`Erro no sistema anti-roubo (${action}):`, error);
}
}

async handleUnauthorizedPromote(groupId, adminId, promoted, allAdmins) {
const promotedNames = promoted.map(p => `@${p.split("@")[0]}`).join(', ');
const mentions = [adminId, ...promoted, ...allAdmins];
const uniqueMentions = [...new Set(mentions)];

const message = this.TEXTOS_GERAL.ANTI_ROUBO_PROMOCAO
.replaceAll('#admin#', adminId.split("@")[0])
.replaceAll('#promovidos#', promotedNames);

await this.conn.sendMessage(groupId, {
text: message,
mentions: uniqueMentions
});

await this.conn.groupParticipantsUpdate(groupId, [adminId], "demote");
await this.conn.groupParticipantsUpdate(groupId, promoted, "demote");
}

async handleUnauthorizedDemote(groupId, adminId, demoted, allAdmins, botNumber, ownerId) {
const demotedNames = demoted.map(d => `@${d.split("@")[0]}`).join(', ');

if (demoted.includes(botNumber)) {
// Bot foi rebaixado
const mentions = [adminId, ...allAdmins];
const uniqueMentions = [...new Set(mentions)];

const alertMessage = this.TEXTOS_GERAL.ANTI_ROUBO_BOT_REBAIXADO.replaceAll('#admin#', adminId.split("@")[0]);

await this.conn.sendMessage(groupId, {
text: alertMessage,
mentions: uniqueMentions
});

// Aviso para o dono
const groupMetadata = await this.puxarGrupo(this.conn, groupId);
const ownerMessage = this.TEXTOS_GERAL.ANTI_ROUBO_BOT_REMOVIDO
.replaceAll('#nomegrupo#', groupMetadata.subject)
.replaceAll('#idgrupo#', groupId)
.replaceAll('#admin#', adminId.split("@")[0]);

await this.conn.sendMessage(ownerId, {
text: ownerMessage,
mentions: [adminId]
});
} else {
// Admin normal foi rebaixado
const mentions = [adminId, ...demoted, ...allAdmins];
const uniqueMentions = [...new Set(mentions)];

const message = this.TEXTOS_GERAL.ANTI_ROUBO_REBAIXAMENTO
.replaceAll('#admin#', adminId.split("@")[0])
.replaceAll('#rebaixados#', demotedNames);

await this.conn.sendMessage(groupId, {
text: message,
mentions: uniqueMentions
});

await this.conn.groupParticipantsUpdate(groupId, demoted, "promote");
await this.conn.groupParticipantsUpdate(groupId, [adminId], "demote");
}
}

async handleUnauthorizedRemove(groupId, adminId, removed, allAdmins, botNumber, ownerId) {
if (removed.includes(botNumber)) {
// Bot foi removido
const groupMetadata = await this.puxarGrupo(this.conn, groupId);
const message = this.TEXTOS_GERAL.ANTI_ROUBO_BOT_REMOVIDO
.replaceAll('#nomegrupo#', groupMetadata.subject)
.replaceAll('#idgrupo#', groupId)
.replaceAll('#admin#', adminId.split("@")[0]);

await this.conn.sendMessage(ownerId, {
text: message,
mentions: [adminId]
});
return;
}

try {
const removedAdmins = removed.filter(member => allAdmins.includes(member));
if (removedAdmins.length === 0) return;

const isBotAdmin = allAdmins.includes(botNumber);
if (isBotAdmin) {
const removedNames = removedAdmins.map(a => `@${a.split('@')[0]}`).join(', ');
const mentions = [adminId, ...removedAdmins, ...allAdmins];
const uniqueMentions = [...new Set(mentions)];

const message = this.TEXTOS_GERAL.ANTI_ROUBO_REMOCAO
.replaceAll('#admin#', adminId.split("@")[0])
.replaceAll('#removidos#', removedNames);

await this.conn.sendMessage(groupId, {
text: message,
mentions: uniqueMentions
});

await this.conn.groupParticipantsUpdate(groupId, [adminId], "demote");

await this.conn.sendMessage(groupId, {
text: this.TEXTOS_GERAL.ANTI_ROUBO_ADMINS_REMOVIDOS_INFO.replaceAll('#removidos#', removedNames),
mentions: uniqueMentions
});
}
} catch (e) {
console.error("Erro verificação admins removidos:", e);
}
}

// ✅ CORREÇÃO: Verificação do bot corrigida
async processarEventoParticipante(event) {
try {
const { id: groupId, participants, action } = event;
const jsonGp = await this.getGroupSettings(groupId);
if (!jsonGp) return;
let groupMetadata;
try {
groupMetadata = await this.conn.groupMetadata(groupId);
} catch {
return console.error(`[EVENTOS] Erro ao obter metadata do grupo: ${groupId}`);
}
// ✅ CORREÇÃO: Verificação correta do bot
const botId = this.conn.user.id.split(':')[0] + "@s.whatsapp.net";
if (participants[0] === botId) return;

// Verificação especial para eventos de entrada via participant event
if (action === 'add') {
const participantId = participants[0];
const key = `${groupId}:${participantId}`;
if (this.pendingRequestsBanned.has(key)) {
await this.atualizarParticipantes(action, groupId, participantId);
return;
}
}

if (action === 'add') {
await this.processarEntrada(groupId, participants[0], jsonGp, groupMetadata);
} else if (action === 'remove') {
await this.processarSaida(groupId, participants[0], jsonGp, groupMetadata);
}
await this.atualizarParticipantes(action, groupId, participants[0]);
} catch (error) {
this.logError("processarEventoParticipante", error);
}
}

async processarEntrada(groupId, participantId, jsonGp, groupMetadata) {
const participantNumber = participantId.split('@')[0];

// Verificar se já está sendo processado ou foi banido via pending
if (!this.checkAndMarkBanProcessing(participantId, groupId)) {
return;
}

// Lista negra global
if (this.nescessario.listanegraG?.includes(participantId)) {
const msgConfig = jsonGp[0]?.msgBanimento || { listanegra: true };

if (msgConfig.listanegra !== false) {
await this.conn.sendMessage(groupId, {
text: this.TEXTOS_GERAL?.LISTA_NEGRA_GLOBAL_MENSAGEM || 
`*Olha quem deu as cara por aqui, sente o poder do ban!*\n\n@${participantNumber} está na lista negra global.`,
mentions: [participantId]
});
}

await this.conn.groupParticipantsUpdate(groupId, [participantId], 'remove');
return;
}

// Lista negra do grupo
if (jsonGp[0].listanegra?.includes(participantId)) {
const msgConfig = jsonGp[0]?.msgBanimento || { listanegra: true };

if (msgConfig.listanegra !== false) {
const mensagemBan = jsonGp[0]?.legenda_listanegra && jsonGp[0]?.legenda_listanegra !== "0" 
? jsonGp[0].legenda_listanegra 
: this.TEXTOS_GERAL.LISTA_NEGRA_GRUPO_MSG.replaceAll('#usuario#', participantNumber);

await this.conn.sendMessage(groupId, { 
text: mensagemBan.includes('@') ? mensagemBan : mensagemBan + `\n\n@${participantNumber}`,
mentions: [participantId]
});
}

await this.conn.groupParticipantsUpdate(groupId, [participantId], 'remove');
return;
}

// Anti-fake
if (jsonGp[0].antifake && !participantNumber.startsWith('55')) {
const msgConfig = jsonGp[0]?.msgBanimento || { antifake: true };

if (msgConfig.antifake !== false) {
const mensagemAntifake = jsonGp[0]?.legenda_estrangeiro && jsonGp[0]?.legenda_estrangeiro !== "0"
? jsonGp[0].legenda_estrangeiro
: this.TEXTOS_GERAL.ANTI_FAKE_GRUPO_MSG.replaceAll('#usuario#', participantNumber);

await this.conn.sendMessage(groupId, { 
text: mensagemAntifake.includes('@') ? mensagemAntifake : mensagemAntifake + `\n\n@${participantNumber}`,
mentions: [participantId]
});
}

setTimeout(async () => {
await this.conn.groupParticipantsUpdate(groupId, [participantId], 'remove');
}, 500);
return;
}

// Se chegou até aqui, não precisa ser banido - enviar boas-vindas
await this.enviarBemVindo(groupId, participantId, jsonGp, groupMetadata);
}

async processarSaida(groupId, participantId, jsonGp, groupMetadata) {
await this.enviarDespedida(groupId, participantId, jsonGp, groupMetadata);
}

async enviarBemVindo(groupId, participantId, jsonGp, groupMetadata) {
if (!jsonGp[0].wellcome[0].bemvindo1 && !jsonGp[0].wellcome[1].bemvindo2) return;

let ppimg;
try {
const ppim = await this.conn.profilePictureUrl(`${participantId.split("@")[0]}@c.us`, 'image');
const ppBuffer = await this.getBuffer(ppim);
ppimg = `data:image/png;base64,${ppBuffer.toString('base64')}`;
} catch {
ppimg = 'https://dl.dropboxusercontent.com/scl/fi/vy50rrlq2x5zvhncdjwdd/semfoto.png?rlkey=cgoqchjw1tvkivpbeivd7h14q&st=ki1bt77p&dl=0';
}

const replaceVariables = (text) => {
if (!text || text === "0") return null;
return text
.replaceAll('#hora#', this.moment().format('HH:mm:ss'))
.replaceAll('#nomedogp#', groupMetadata.subject)
.replaceAll('#numerodele#', '@' + participantId.split('@')[0])
.replaceAll('#numerobot#', this.conn.user.id)
.replaceAll('#prefix#', jsonGp[0].multiprefix ? jsonGp[0].prefixos[0] : this.setting.prefix)
.replaceAll('#prefixo#', jsonGp[0].multiprefix ? jsonGp[0].prefixos[0] : this.setting.prefix)
.replaceAll('#descrição#', groupMetadata.desc || '');
};

if (jsonGp[0].wellcome[0].bemvindo1) {
const texto = jsonGp[0].wellcome[0].legendabv 
? replaceVariables(jsonGp[0].wellcome[0].legendabv)
: this.TEXTOS_GERAL.BEM_VINDO_PADRAO
.replaceAll('#usuario#', participantId.split('@')[0])
.replaceAll('#nomegrupo#', groupMetadata.subject);
await this.enviarMensagemComImagem(groupId, participantId, texto, ppimg, groupMetadata, true);
}

if (jsonGp[0].wellcome[1].bemvindo2) {
const texto = jsonGp[0].wellcome[1].legendabv
? replaceVariables(jsonGp[0].wellcome[1].legendabv)
: this.TEXTOS_GERAL.BEM_VINDO_PADRAO
.replaceAll('#usuario#', participantId.split('@')[0])
.replaceAll('#nomegrupo#', groupMetadata.subject);
await this.conn.sendMessage(groupId, { text: texto, mentions: [participantId] });
}
}

async enviarDespedida(groupId, participantId, jsonGp, groupMetadata) {
if (jsonGp[0].wellcome[0].bemvindo1 && jsonGp[0].wellcome[0].legendasaiu && jsonGp[0].wellcome[0].legendasaiu !== "0") {
let ppimg;
try {
const ppim = await this.conn.profilePictureUrl(`${participantId.split("@")[0]}@c.us`, 'image');
const ppBuffer = await this.getBuffer(ppim);
ppimg = `data:image/png;base64,${ppBuffer.toString('base64')}`;
} catch {
ppimg = 'https://dl.dropboxusercontent.com/scl/fi/vy50rrlq2x5zvhncdjwdd/semfoto.png?rlkey=cgoqchjw1tvkivpbeivd7h14q&st=ki1bt77p&dl=0';
}

const texto = jsonGp[0].wellcome[0].legendasaiu || 
this.TEXTOS_GERAL.DESPEDIDA_PADRAO
.replaceAll('#usuario#', participantId.split('@')[0])
.replaceAll('#nomegrupo#', groupMetadata.subject);
await this.enviarMensagemComImagem(groupId, participantId, texto, ppimg, groupMetadata, false);
}

if (jsonGp[0].wellcome[1].bemvindo2 && jsonGp[0].wellcome[1].legendasaiu && jsonGp[0].wellcome[1].legendasaiu !== "0") {
const texto = jsonGp[0].wellcome[1].legendasaiu || 
this.TEXTOS_GERAL.DESPEDIDA_PADRAO
.replaceAll('#usuario#', participantId.split('@')[0])
.replaceAll('#nomegrupo#', groupMetadata.subject);
await this.conn.sendMessage(groupId, { text: texto, mentions: [participantId] });
}
}

async enviarMensagemComImagem(groupId, participantId, texto, ppimg, groupMetadata, isWelcome) {
try {
let perfilData;
if (typeof ppimg === 'string') {
if (ppimg.startsWith('data:image')) {
perfilData = ppimg;
} else if (ppimg.startsWith('https')) {
const response = await this.axios.get(ppimg, { responseType: 'arraybuffer' });
perfilData = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
} else {
perfilData = `data:image/png;base64,${ppimg}`;
}
}

const dadosEnvio = {
titulo: isWelcome ? 'BEM VINDO(A)' : 'ADEUS',
nome: participantId.split('@')[0],
perfil: perfilData,
fundo: isWelcome ? this.LINKS_T.fundo1 : this.LINKS_T.fundo2,
grupo: isWelcome ? `BEM VINDO AO GRUPO ${groupMetadata.subject}` : groupMetadata.subject,
ano: '2025',
quantidade_membros: String(groupMetadata.participants?.length || 'X')
};

const formData = new URLSearchParams();
Object.entries(dadosEnvio).forEach(([key, value]) => {
if (value) formData.append(key, value);
});

const response = await this.axios.post('http://sungbot.vip/api/welcome_', formData, {
headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
responseType: 'arraybuffer',
timeout: isWelcome ? 15000 : 30000
});

await this.conn.sendMessage(groupId, {
image: response.data,
mentions: [participantId],
caption: texto
});
} catch (error) {
console.error('❌ Erro ao enviar mensagem com imagem:', error);
await this.conn.sendMessage(groupId, { text: texto, mentions: [participantId] });
}
}

async atualizarGrupo(chave, grupo, valor) {
try {
if (typeof valor === 'boolean') valor = valor ? 1 : 0;
else if (valor === 'on' || valor === 'off') valor = valor === 'on' ? 1 : 0;

if (['announce', 'restrict', 'joinApprovalMode', 'memberAddMode'].includes(chave)) {
valor = typeof valor === 'number' ? valor : (valor ? 1 : 0);
}

const data_rg = await this.puxarGrupo(this.conn, grupo);
if (!data_rg) {
console.error(`Dados do grupo não encontrados: ${grupo}`);
return;
}

const dados = { [chave]: valor };
await this.atualizarOuAdicionarDB('DadosGP', dados, 'id', grupo);

} catch (error) {
console.error(`Erro em atualizarGrupo:`, error);
}
}

async atualizarParticipantes(acao, grupo, participante) {
if (!participante || typeof participante !== 'string' || participante.trim() === '') {
return;
}

try {
const data_rg = await this.puxarGrupo(this.conn, grupo);
if (!data_rg) {
console.error(`Dados do grupo não encontrados: ${grupo}`);
return;
}

let participants;
try {
if (Array.isArray(data_rg.participants)) {
participants = [...data_rg.participants];
} else if (typeof data_rg.participants === 'string') {
participants = JSON.parse(data_rg.participants || "[]");
} else {
participants = [];
}

if (!Array.isArray(participants)) {
participants = [];
}
} catch (e) {
console.error(`Erro ao processar participantes: ${e.message}`);
participants = [];
}

const index = participants.findIndex(p => p.id === participante);

switch(acao) {
case 'add':
if (index === -1) {
participants.push({ id: participante, admin: null });
}
break;
case 'remove':
if (index !== -1) {
participants.splice(index, 1);
}
break;
case 'promote':
if (index !== -1) {
participants[index].admin = "admin";
} else {
participants.push({ id: participante, admin: "admin" });
}
break;
case 'demote':
if (index !== -1) {
participants[index].admin = null;
}
break;
default:
return;
}

const newSize = participants.length;
const dadosParaSalvar = {
participants: JSON.stringify(participants),
size: newSize
};

await this.atualizarOuAdicionarDB('DadosGP', dadosParaSalvar, 'id', grupo);

} catch (error) {
console.error(`Erro em atualizarParticipantes:`, error);
}
}

async handleNumberChange(oldNumber, newNumber, groupId) {
if (!oldNumber || !newNumber) return;

try {
const data_rg = await this.puxarGrupo(this.conn, groupId);
if (!data_rg) {
console.error(`[EVENTOS] Dados do grupo não encontrados: ${groupId}`);
return;
}

let participants = Array.isArray(data_rg.participants)
? [...data_rg.participants]
: JSON.parse(data_rg.participants || "[]");

const index = participants.findIndex(p => p.id === oldNumber);
if (index !== -1) {
participants[index].id = newNumber;

const resultado = await this.atualizarOuAdicionarDB('DadosGP', {
participants: JSON.stringify(participants)
}, 'id', groupId);

if (resultado) {
this.invalidarCachesGlobais(groupId);
} else {
console.error(`[EVENTOS] ❌ Falha ao salvar mudança de número no banco`);
}
} else {
console.warn(`[EVENTOS] ⚠️ Número antigo não encontrado: ${oldNumber}`);
}
} catch (error) {
this.logError("handleNumberChange", error);
}
}

async handleGroupCreate(groupId) {
try {
const groupMetadata = await this.conn.groupMetadata(groupId);
if (!groupMetadata) {
console.error("[EVENTOS] Não foi possível obter metadados do grupo");
return;
}

const dataToSave = {
id: groupMetadata.id,
desc: groupMetadata.desc || "",
announce: groupMetadata.announce ? 1 : 0,
restrict: groupMetadata.restrict ? 1 : 0,
subject: groupMetadata.subject || "",
participants: JSON.stringify(groupMetadata.participants || [])
};

await this.atualizarOuAdicionarDB('DadosGP', dataToSave, 'id', groupId);

} catch (error) {
this.logError("handleGroupCreate", error);
}
}

verificarAluguelDB(id_gp) {
const agora = Math.floor(Date.now() / 1000);
try {
const row = this.BANCOP.prepare("SELECT vencimento FROM aluguel WHERE id_gp = ? LIMIT 1").get(id_gp);
return row ? row.vencimento > agora : false;
} catch (err) {
console.error(`[Aluguel] Erro SQL: ${err.message}`);
return false;
}
}

async puxarGrupoComCache(groupId) {
const cached = this.unifiedCache.groups.get(groupId);
if (cached && Date.now() - cached.timestamp < this.CONFIG.TIMEOUTS.CACHE_CLEANUP) {
return cached.data;
}

const data = await this.puxarGrupo(this.conn, groupId);
if (data) {
this.unifiedCache.groups.set(groupId, { data, timestamp: Date.now() });
}
return data;
}

logError(funcName, error) {
if (!error.message?.includes("bye is not defined") && 
!error.message?.includes("bye2 is not defined")) {
console.error(`[EventosGrupo.${funcName}] Erro:`, error);
}
}
}

// ===== SISTEMA DE INSTÂNCIA GLOBAL =====
let eventosInstance = null;

function initEventos(conn, BANCOP, setting, nescessario, utils) {
if (!eventosInstance) {
eventosInstance = new EventosGrupo(conn, BANCOP, setting, nescessario, utils);
}
return eventosInstance;
}

function getEventos() {
if (!eventosInstance) {
throw new Error('EventosGrupo não foi inicializado ainda. Chame initEventos() primeiro.');
}
return eventosInstance;
}

// ===== EXPORTS CONSOLIDADOS =====
module.exports = {
EventosGrupo,
initEventos,
getEventos,
getX9Status: () => getEventos().getX9Status(),
clearX9Data: () => getEventos().clearX9Data()
};