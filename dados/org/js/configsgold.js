/**
 * Configurações do Sistema Gold
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
quiz: 2 // Vezes que pode jogar quiz por dia
},

// Limites de valores para apostas e transferências
limites: {
minAposta: 10,// Aposta mínima
maxAposta: 100, // Aposta máxima
maxRoubo: 500,// Máximo que pode ser roubado
maxBolao: 50, // Máximo para apostar no bolão
maxJackpot: 50000 // Máximo valor do jackpot
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
diaria: 50,

// Recompensas para ranking de emoji gold
ranking: {
primeiro: 50,
segundo: 30,
terceiro: 15
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
perdaFalhada: {
min: 0,// Mínimo perdido se falhar (0%)
max: 50// Máximo perdido se falhar (50%)
}
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
double: "🎲"
}
};