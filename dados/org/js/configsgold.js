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
caixamisteriosa: 5, // 🆕 Vezes que pode jogar caixa misteriosa por dia
forca: 3, // 🆕 Vezes que pode ganhar gold na forca por dia
corrida: 5 // 🆕 Vezes que pode apostar na corrida por dia
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
diaria: 50,

// 🆕 Recompensas de gold para o jogo da forca
forca: {
base: 25, // Recompensa base de gold
porTamanho: 2, // Gold adicional por letra da palavra
maxRecompensa: 100, // Máximo que pode ganhar em uma partida
bonusVelocidade: {
rapido: 1.5, // < 60 segundos (150%)
medio: 1.2, // < 120 segundos (120%)
normal: 1.0 // > 120 segundos (100%)
}
}
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
},

// 🔥 SISTEMA DE COMBO/STREAK (#2)
combo: {
ativo: true,
multiplicadores: {
3: 1.5,  // 3 acertos seguidos = 1.5x gold
5: 2.0,  // 5 acertos seguidos = 2x gold
10: 3.0, // 10 acertos seguidos = 3x gold
20: 5.0  // 20 acertos seguidos = 5x gold
},
quebraPorOutroAcertar: true, // Quebra streak quando OUTRO usuário acerta
bonusStreakPerdida: 0.5, // Ganha 50% do que teria com streak ao quebrar (consolação)
exibirProgresso: true    // Mostrar progresso do combo nas mensagens
},

// 🏆 SISTEMA DE CONQUISTAS (#8)
conquistas: {
ativo: true,
lista: {
iniciante: { acertos: 10, gold: 100, emoji: '🌱', nome: 'Iniciante' },
aprendiz: { acertos: 20, gold: 200, emoji: '🌿', nome: 'Aprendiz' },
dedicado: { acertos: 30, gold: 300, emoji: '🎯', nome: 'Dedicado' },
persistente: { acertos: 40, gold: 500, emoji: '💪', nome: 'Persistente' },
ativo: { acertos: 50, gold: 700, emoji: '⚡', nome: 'Ativo' },
experiente: { acertos: 60, gold: 1000, emoji: '🎖️', nome: 'Experiente' },
veterano: { acertos: 70, gold: 1500, emoji: '⭐', nome: 'Veterano' },
campeao: { acertos: 80, gold: 2000, emoji: '🏆', nome: 'Campeão' },
mestre: { acertos: 90, gold: 3000, emoji: '👑', nome: 'Mestre' },
lenda: { acertos: 100, gold: 5000, emoji: '🔥', nome: 'Lenda' },
perfeccionista: { streak20: true, gold: 1000, emoji: '💎', nome: 'Perfeccionista' },
velocista: { acertos5MesmoDia: true, gold: 800, emoji: '⚡', nome: 'Velocista' },
noturno: { acertos10noturno: true, gold: 1500, emoji: '🌙', nome: 'Coruja Noturna' }
}
},

// ⭐ EMOJI DO DIA ESPECIAL (#12)
emojiDoDia: {
ativo: true,
recompensa: 500,           // Gold especial para quem acertar
unicoPorDia: true,         // Apenas 1 pessoa pode ganhar por dia
notificarGrupo: true,      // Avisar quando aparecer
categoriaEspecial: 'raro', // Categoria dos emojis especiais
horarioAparicao: null,     // null = aleatório, ou hora específica tipo 12
emoji: '⭐'
},

// 👥 MULTIPLICADOR GRUPAL (#13)
multiplicadorGrupal: {
ativo: true,
niveis: {
5: 1.2,  // 5+ participantes = 1.2x
10: 1.5, // 10+ participantes = 1.5x
20: 2.0, // 20+ participantes = 2x
50: 3.0  // 50+ participantes = 3x (grupos grandes)
},
janelaTempo: 24 * 60 * 60 * 1000, // Conta participantes únicos nas últimas 24h
exibirMultiplicador: true
},

// 🌙 MODO NOTURNO/INSÔNIA (#14)
modoNoturno: {
ativo: true,
horarioInicio: 0,  // 00:00 (meia-noite)
horarioFim: 6,     // 06:00 (6 da manhã)
multiplicadorGold: 3.0, // 3x gold no modo noturno
mensagemEspecial: true,
emoji: '🌙'
},

// 🔄 SISTEMA ANTI-REPETIÇÃO INTELIGENTE (#15)
antiRepeticao: {
ativo: true,
historicoSize: 50,        // Não repetir os últimos 50 emojis
priorizarNaoUsados: true, // Priorizar emojis nunca usados
poolRenovacao: 100,       // Tamanho do pool que vai renovando
categoriaRotacao: true    // Rotacionar entre categorias para variedade
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
caixamisteriosa: "🎁",
trabalho: "💼",
investimento: "📈",
boost: "🚀"
},

// 🆕 SISTEMA DE LOJA UNIFICADA
loja: {
    // Itens de recarga (já existentes, agora centralizados)
    recargas: {
        minerar: { preco: 100, quantidade: 3, emoji: "⛏️", nome: "Recarga Minerar" },
        roubar: { preco: 150, quantidade: 3, emoji: "🥷", nome: "Recarga Roubar" },
        aviator: { preco: 120, quantidade: 2, emoji: "✈️", nome: "Recarga Aviator" },
        roleta: { preco: 100, quantidade: 2, emoji: "🎡", nome: "Recarga Roleta" },
        doublegold: { preco: 100, quantidade: 3, emoji: "🎲", nome: "Recarga Double" },
        cachaca: { preco: 80, quantidade: 2, emoji: "🍾", nome: "Recarga Cachaça" }
    },

    // Proteção
    escudo: {
        preco: 200,
        duracao: 24, // horas
        emoji: "🛡️",
        nome: "Escudo Protetor"
    },

    // 🆕 Sistema de Investimento - Rende na primeira mensagem do dia
    investimento: {
        ativo: true,
        minimo: 100,           // Mínimo para investir
        maximo: 50000,         // Máximo total investido
        rendimentoMin: 0.02,   // 2% mínimo por dia
        rendimentoMax: 0.05,   // 5% máximo por dia
        taxaSaque: 0.05,       // 5% de taxa para retirar investimento
        emoji: "📈"
    },

    // 🆕 Sistema de Trabalho - Cargos e salário diário
    trabalho: {
        ativo: true,
        emoji: "💼",
        // Cargos baseados em dias online (consecutivos ou total)
        cargos: [
            { nome: "Estagiário", emoji: "📋", diasNecessarios: 0, salario: 50 },
            { nome: "Assistente", emoji: "📝", diasNecessarios: 3, salario: 80 },
            { nome: "Júnior", emoji: "💼", diasNecessarios: 7, salario: 120 },
            { nome: "Pleno", emoji: "👔", diasNecessarios: 15, salario: 180 },
            { nome: "Sênior", emoji: "🎖️", diasNecessarios: 30, salario: 250 },
            { nome: "Especialista", emoji: "🏅", diasNecessarios: 50, salario: 350 },
            { nome: "Gerente", emoji: "📊", diasNecessarios: 75, salario: 500 },
            { nome: "Diretor", emoji: "🏛️", diasNecessarios: 100, salario: 700 },
            { nome: "CEO", emoji: "👑", diasNecessarios: 150, salario: 1000 }
        ],
        bonusDiasConsecutivos: 0.05 // 5% extra por cada dia consecutivo (max 50%)
    }
},

// 🆕 SISTEMA DE BOOST (para leveling, pago com gold)
boosts: {
    xp2x: {
        preco: 500,
        multiplicador: 2.0,
        duracao: 60,       // minutos
        emoji: "🚀",
        nome: "Boost 2x XP"
    },
    xp15x: {
        preco: 300,
        multiplicador: 1.5,
        duracao: 120,      // minutos
        emoji: "⚡",
        nome: "Boost 1.5x XP"
    },
    dailyReset: {
        preco: 200,
        emoji: "🔄",
        nome: "Reset Daily"
    }
}
};