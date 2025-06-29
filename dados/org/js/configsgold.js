/**
 * Configurações do Sistema Gold - VERSÃO ATUALIZADA
 * Aqui você pode personalizar todas as configurações do sistema de Gold
 */

module.exports = {
// Número máximo de vezes que cada ação pode ser usada por dia
chances: {
ChanceG: 3, // Chances de minerar gold
ChanceAp: 10, // Chances de apostar
ChanceR: 5, // Chances de roubar (quantidade máxima de alvos)
roletadasorte: 3, // Vezes que pode usar a roleta da sorte por dia
cachaca: 3, // Quantidade de cachaças disponíveis por dia
aviator: 3, // Vezes que pode jogar aviator por dia
doubleg: 5, // Vezes que pode jogar double gold por dia
cassino: 5, // Vezes que pode jogar cassino por dia
cara_coroa: 3,// Vezes que pode jogar cara ou coroa por dia
quiz: 2, // Vezes que pode jogar quiz por dia
caixamisteriosa: 5 // 🆕 Vezes que pode jogar caixa misteriosa por dia
},

// Limites de valores para apostas e transferências
limites: {
minAposta: 10,// Aposta mínima
maxAposta: 100, // Aposta máxima
maxRoubo: 500,// Máximo que pode ser roubado
maxBolao: 50, // Máximo para apostar no bolão
maxJackpot: 50000, // Máximo valor do jackpot
// 🆕 Limites específicos para Caixa Misteriosa
caixaMisteriosa: {
minAposta: 10,
maxAposta: 100
}
},

// Recompensas e valores padrão
recompensas: {
// Valores para mineração de gold
mineracao: {
min: 1,
max: 100
},

// Multiplicadores de ganho para apostas
ganhoAposta: {
min: 1.2,// Ganho mínimo (120%)
max: 4.0 // Ganho máximo (400%)
},

// Gold recebido diariamente
diaria: 50
},

// 🆕 Configurações para Caixa Misteriosa 
caixamisteriosa: {
// Configurações de bombas
bombas: {
minQuantidade: 1, // Mínimo de bombas por jogo
maxQuantidade: 5, // Máximo de bombas por jogo
chancePorcentual: 100 // 100% = sempre aleatório entre min-max
},

// Multiplicadores de prêmio por dificuldade (baseado no número de bombas)
multiplicadores: {
1: { // 1 bomba = 8 caixas seguras
min: 0.15, // 15% da aposta por caixa (mínimo)
max: 0.35, // 35% da aposta por caixa (máximo)
maxTotal: 1.2, // 120% da aposta (lucro máximo total)
chanceRaro: 0.08 // 8% chance de prêmio raro
},
2: { // 2 bombas = 7 caixas seguras
min: 0.20,
max: 0.45,
maxTotal: 1.4, // 140% da aposta
chanceRaro: 0.16 // 16% chance de prêmio raro
},
3: { // 3 bombas = 6 caixas seguras
min: 0.25,
max: 0.60,
maxTotal: 1.8, // 180% da aposta
chanceRaro: 0.24 // 24% chance de prêmio raro
},
4: { // 4 bombas = 5 caixas seguras
min: 0.35,
max: 0.80,
maxTotal: 2.4, // 240% da aposta
chanceRaro: 0.32 // 32% chance de prêmio raro
},
5: { // 5 bombas = 4 caixas seguras
min: 0.50,
max: 1.20,
maxTotal: 3.0, // 300% da aposta
chanceRaro: 0.40 // 40% chance de prêmio raro
}
},

// Configurações do diamante especial
diamante: {
multiplicador: 3.0, // 3x a aposta inicial
semprePresente: true // Sempre tem 1 diamante por jogo
},

// Configurações do prêmio raro
premioRaro: {
multiplicadorMin: 1.5, // 1.5x a aposta (mínimo)
multiplicadorMax: 3.0, // 3.0x a aposta (máximo)
baseCalculo: "bombas" // "bombas" ou "fixo"
},

// Sistema de tempo ⏰ TIMEOUT POR ESCOLHA
tempo: {
timeoutSegundos: 60,// 🔄 60 segundos para CADA escolha (reseta a cada jogada)
cooldownMinutos: 0// 🔄 Cooldown entre jogos (0 = sem cooldown)
},

// Valores mínimos de segurança
valores: {
premioMinimo: 5, // Mínimo de gold por caixa
premioMaximoIndividual: 1000, // Máximo de gold em uma caixa (exceto raro)
limiteDiamante: 500 // Máximo que o diamante pode dar
},

// Emojis específicos do jogo
emojis: {
caixa: "📦",
bomba: "💣",
explosao: "💥",
diamante: "💎",
presente: "🎁",
numero1: "1️⃣",
numero2: "2️⃣",
numero3: "3️⃣",
numero4: "4️⃣",
numero5: "5️⃣",
numero6: "6️⃣",
numero7: "7️⃣",
numero8: "8️⃣",
numero9: "9️⃣",
jackpot: "🏆",
dificuldades: {
1: "🟢", // Verde = Fácil
2: "🟡", // Amarelo = Normal
3: "🟠", // Laranja = Médio
4: "🔴", // Vermelho = Difícil
5: "⚫" // Preto = Extremo
}
},

// Mensagens personalizáveis
mensagens: {
dificuldades: {
1: "🟢 FÁCIL (1 bomba)",
2: "🟡 NORMAL (2 bombas)",
3: "🟠 MÉDIO (3 bombas)",
4: "🔴 DIFÍCIL (4 bombas)",
5: "⚫ EXTREMO (5 bombas)"
},
lucrosEstimados: {
1: "Lucro estimado: +20%",
2: "Lucro estimado: +40%",
3: "Lucro estimado: +80%",
4: "Lucro estimado: +140%",
5: "Lucro estimado: +200%"
},
resultados: {
bomba: "💥 BOOOOM! Você pegou uma bomba e perdeu tudo!",
diamante: "💎 DIAMANTE ESPECIAL! +{valor} gold!",
jackpot: "🏆 JACKPOT RARO! Você ganhou {valor} gold! 🎰",
premio: "🎁 Parabéns! Você ganhou {valor} gold!",
finalizado: "🎯 Você usou todas as suas tentativas!",
parado: "🎯 Jogo finalizado! Você coletou {valor} gold!",
cancelado: "🚪 Você saiu do jogo sem coletar os prêmios."
}
},

// Configurações de balanceamento avançado
balanceamento: {
// Se true, prêmios são ajustados automaticamente se muito altos
autoAjuste: true,

// Fator de redução se prêmio total exceder o máximo
fatorReducaoAuto: 0.85, // 85% do valor se exceder

// Controle de economia
limiteDiarioIndividual: 500, // Máximo que um player pode ganhar por dia no jogo
limiteDiarioGeral: 5000 // Máximo que pode ser distribuído por dia no grupo
}
},

// Configurações específicas do EmojiGold
emojiGold: {
// Horários para reset/ranking (formato 24h)
horariosReset: [21], // Pode adicionar múltiplos horários: [9, 15, 21]

// Janela de tempo após horário configurado (em minutos)
// Se configurado 21h com janela 60min, executa entre 21:00-21:59
janelaExecucao: 60,

// Recompensas para ranking diário (TOP 5)
ranking: {
primeiro: 200, // 1º lugar
segundo: 150,// 2º lugar
terceiro: 100, // 3º lugar
quarto: 50,// 4º lugar
quinto: 25 // 5º lugar
},

// tempo e pontuação
settings: {
goldPorAcerto: 100,// Gold ganho por acerto
pontosPorAcerto: 1, // Pontos ganhos por acerto
timeoutMinutos: 60// Timeout em minutos para novo desafio
}
},

// Configurações para double gold
doublegold: {
// Símbolos visuais
simbolos: {
BRANCO: '⚪',
VERMELHO: '🔴',
PRETO: '⚫'
},

// Porcentagem de cada resultado
chances: {
branco: 7,// 7%
vermelho: 46.5, // 46.5%
preto: 46.5 // 46.5%
},

// Multiplicadores por cor
multiplicadores: {
branco: 5,
vermelho: 2,
preto: 2
}
},

// Configurações para roubo
roubo: {
chanceBaseDeExito: 40, // 40% de chance base de sucesso
chanceBaseDeDefesa: 30,// 30% de chance base de defesa
chanceQuebrarEscudo: 20, // 20% de chance de quebrar escudo no roubo
perdaFalhada: {
min: 0,// Mínimo perdido se falhar (0%)
max: 50// Máximo perdido se falhar (50%)
}
},

// 🆕 Configurações para vingança
vinganca: {
chanceBase: 50, // 50% de chance base de sucesso na vingança
chanceQuebrarEscudo: 50, // 50% de chance de quebrar escudo na vingança
multiplicadorMin: 1.0, // 100% do valor original (mínimo)
multiplicadorMax: 2.0, // 200% do valor original (máximo)
chancePunicao: 20, // 20% de chance de perder gold se falhar
perdaFalha: 20, // 20% de perda do gold atual se falhar
tempoLimite: 24 * 60 * 60 * 1000 // 24 horas para se vingar (em ms)
},

// Configurações para o sistema de empréstimos
emprestimos: {
taxaDeJuros: 0.15, // 15% de juros
tempoParaVencimento: 86400 // 24 horas (em segundos)
},

// Configurações para aviator
aviator: {
chanceBase: 0.25,// 25% de chance base de ganhar
multiplicadorMin: 1.1, // Multiplicador mínimo (110%)
multiplicadorMax: 10.0 // Multiplicador máximo (1000%)
},

// Emojis do sistema
emojis: {
gold: "🪙",
win: "🎉",
lose: "😢",
steal: "🥷",
shield: "🛡️",
mine: "⛏️",
jackpot: "🎰",
roulette: "🎡",
quiz: "🧩",
cachaça: "🍾",
aviator: "✈️",
double: "🎲",
revenge: "⚔️", 
skull: "💀",
fire: "🔥",
caixamisteriosa: "🎁" // 🆕 Emoji para caixa misteriosa
}
};