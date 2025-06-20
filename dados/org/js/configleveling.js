// configleveling.js
const ConfigsLevel = {
// Configurações dos rankings diário e semanal
ranking: {
dailyTime: { hour: 21, minute: 0 },// Horário do ranking diário (21:00)
weeklyTime: { hour: 21, minute: 0, day: 6 }, // Ranking semanal (Sábado 21:00)
tolerance: 60, // Janela de 60 minutos após o horário (21:00-21:59)
activeMessageCount: 50,// Mínimo de mensagens para aparecer no ranking
messageGoals: [50, 100, 200, 300, 400, 500], // Metas de mensagens para conquistas
rewards: {
daily: [200, 150, 100, 75, 50],// XP para 1º ao 5º lugar do ranking diário
weekly: [1000, 750, 500, 350, 250] // XP para 1º ao 5º lugar do ranking semanal
}
},

// Sistema de atividade consecutiva (streak)
streak: {
requiredMessages: 50,// Mensagens necessárias por dia para manter streak
maxDays: 7, // Número máximo de dias de streak
maxMultiplier: 2.0, // Bônus máximo de 100% (1 + 1.0)
multiplierPerDay: 0.15 // Aumento de 15% de bônus por dia de streak
},


// Configurações de XP e progressão de níveis
xp: {
levelMultiplier: 1.1,// Aumento de 10% de XP necessário por nível
maxPerHour: 1000,// Limite de XP que pode ser ganho por hora
baseXP: {min: 3, max: 7}, // XP base por mensagem
bonusXP: {
10: {min: 15, max: 25}, // Bônus ao atingir 10 mensagens
20: {min: 25, max: 35}, // Bônus ao atingir 20 mensagens
30: {min: 35, max: 45}// Bônus ao atingir 30 mensagens
},
initialRequired: 600// XP necessário para atingir o nível 1
},

// Configurações de mensagens
message: {
minLength: 10, // Tamanho mínimo da mensagem para ser válida
dailyGoal: 50// Meta de mensagens diárias para o grupo
},

// Configurações do comando !daily
daily: {
minXP: 50,// Mínimo de XP recebido no comando daily
maxXP: 150, // Máximo de XP recebido no comando daily
cooldown: 24// Horas de espera entre usos do comando
},

// Temas disponíveis e suas patentes
themes: {
espacial: {
name: 'Espacial',
ranks: [
"Cadete Espacial", "Explorador", "Piloto Estelar", "Navegador Cósmico",
"Oficial de Frota", "Capitão Estelar", "Comandante Espacial", 
"Almirante da Frota", "Guardião Galáctico", "Mestre das Estrelas",
"Conquistador Espacial", "Senhor dos Planetas", "Imperador Galáctico",
"Guardião do Cosmos", "Mestre Dimensional", "Viajante Quântico",
"Senhor do Espaço-Tempo", "Guardião Universal", "Imperador Cósmico",
"Mestre das Galáxias", "Senhor dos Universos", "Entidade Celestial",
"Guardião Multiversal", "Mestre do Infinito", "Senhor dos Cosmos",
"Imperador Multiversal", "Guardião Supremo", "Entidade Primordial",
"Deus Cósmico", "Ser Universal"
]
},
medieval: {
name: 'Medieval',
ranks: [
"Camponês", "Aprendiz", "Escudeiro", "Cavaleiro", "Cavaleiro Real",
"Nobre", "Barão", "Visconde", "Conde", "Marquês", "Duque",
"Grão-Duque", "Príncipe", "Rei", "Alto Rei", "Imperador",
"Sumo Imperador", "Guardião Real", "Protetor do Reino", 
"Lorde Supremo", "Soberano", "Monarca Absoluto", "Regente Divino",
"Guardião Imperial", "Imperador Divino", "Soberano Celestial",
"Monarca Eterno", "Regente Supremo", "Imperador Lendário",
"Soberano Imortal"
]
},
elementos: {
name: 'Elementos',
ranks: [
"Aprendiz Elemental", "Iniciado dos Elementos", "Manipulador", 
"Conjurador", "Mestre da Terra", "Mestre do Ar", "Mestre da Água", 
"Mestre do Fogo", "Mestre do Raio", "Mestre do Gelo",
"Senhor das Tempestades", "Senhor dos Vulcões", "Senhor dos Oceanos",
"Senhor dos Ventos", "Guardião Elemental", "Arcano Elemental",
"Sábio dos Elementos", "Xamã Supremo", "Avatar Elemental",
"Mestre do Caos", "Senhor da Harmonia", "Guardião da Natureza",
"Arcano Primordial", "Sábio Universal", "Avatar Cósmico",
"Entidade Elemental", "Deus dos Elementos", "Senhor da Criação",
"Avatar Supremo", "Ser Primordial"
]
},
mitologia: {
name: 'Mitologia',
ranks: [
"Mortal", "Herói", "Semideus", "Campeão", "Escolhido", 
"Guerreiro Divino", "Guardião Sagrado", "Arauto dos Deuses",
"Avatar Divino", "Semideus Maior", "Herói Lendário",
"Campeão dos Deuses", "Escolhido Divino", "Guerreiro Celestial",
"Guardião do Olimpo", "Arauto Supremo", "Avatar Celestial",
"Deus Menor", "Deus do Panteão", "Deus Maior", "Deus Supremo",
"Titã", "Primordial", "Entidade Cósmica", "Ser Divino",
"Deus dos Deuses", "Criador", "Ser Supremo", "Divindade Absoluta",
"Ser Eterno"
]
},
tecnologia: {
name: 'Tecnologia',
ranks: [
"Iniciante Tech", "Programador Jr", "Desenvolvedor", "Programador Sr",
"Arquiteto de Software", "Engenheiro de Dados", "DevOps Master",
"Especialista em IA", "Cientista de Dados", "Líder Técnico",
"Arquiteto de Sistemas", "Diretor de Tecnologia", "Visionário Tech",
"Inovador Digital", "Pioneiro Tech", "Gênio da Computação",
"Mestre da Inovação", "Guru da Tecnologia", "Líder Disruptivo",
"Visionário Digital", "Oráculo Tech", "Mestre da Transformação",
"Pioneiro Digital", "Gênio da Inovação", "Mestre da Revolução",
"Guru da Disrupção", "Líder Visionário", "Oráculo Digital",
"Mestre Supremo", "Deus da Tecnologia"
]
},
minecraft: {
name: 'Minecraft',
ranks: [
"Novato", "Minerador de Carvão", "Minerador de Ferro", "Minerador de Ouro",
"Minerador de Diamante", "Explorador de Cavernas", "Construtor Iniciante",
"Fazendeiro", "Guerreiro", "Encantador", "Mestre das Poções",
"Caçador de Mobs", "Domador de Animais", "Explorador do Nether",
"Matador de Blazes", "Mestre do Nether", "Caçador do End",
"Matador de Dragão", "Explorador de End City", "Mestre do End",
"Conquistador de Monumentos", "Guardião dos Oceanos", "Mestre Redstone",
"Arquiteto Master", "Lendário Builder", "Comandante de Server",
"Speedrunner Elite", "Hardcore Master", "Lenda do Minecraft",
"Deus do Minecraft"
]
},
militar: {
name: 'Militar', // Tema militar (padrão)
ranks: [
"Recruta", "Soldado", "Cabo", "3º Sargento", "2º Sargento", 
"1º Sargento", "Aspirante", "2º Tenente", "1º Tenente", "Capitão",
"Major", "Tenente-Coronel", "Coronel", "General de Brigada",
"General de Divisão", "General de Exército", "Marechal", "Comandante",
"Comandante Supremo", "Guardião Supremo", "Mestre da Guerra",
"Herói Nacional", "Campeão Supremo", "Protetor da Pátria",
"Defensor Lendário", "Líder Épico", "Senhor das Batalhas",
"Soberano Invicto", "Lenda Viva", "Imortal"
]
},
rpg: {
name: 'RPG Fantasy', // Tema de RPG medieval
ranks: [
"Aprendiz", "Aventureiro", "Escudeiro", "Guerreiro", "Cavaleiro",
"Paladino", "Guardião", "Campeão", "Herói", "Lenda", "Mestre",
"Grão-Mestre", "Sábio", "Arquimago", "Lorde", "Grão-Lorde",
"Arcano", "Místico", "Celestial", "Divino", "Transcendental",
"Épico", "Mítico", "Lendário", "Ancestral", "Imortal", "Eterno",
"Supremo", "Absoluto", "Divindade"
]
},
anime: {
name: 'Anime', // Tema baseado em anime ninja
ranks: [
"Academy Student", "Genin", "Chunin", "Special Jonin", "Jonin", 
"ANBU", "Elite Jonin", "Sage", "Kage", "Supreme Kage", 
"Legendary Ninja", "Shadow Master", "Mystic Sage", "Elder Sage",
"Divine Sage", "Chakra Lord", "Spirit Master", "Celestial Ninja",
"Eternal Master", "God of Shinobi", "Ultimate Ninja", 
"Legendary Master", "Divine Emperor", "Immortal Sage",
"Cosmic Ninja", "Universe Master", "Reality Bender",
"Dimension Lord", "Eternal God", "Supreme Being"
]
},
cyberpunk: {
name: 'Cyberpunk', // Tema futurista
ranks: [
"Script Kiddie", "Code Runner", "Data Miner", "Net Runner",
"Cyber Jockey", "Grid Rider", "System Cracker", "Code Master",
"Hack Master", "Digital Lord", "Network Ghost", "Cyber Phantom",
"Grid Master", "System Lord", "Digital God", "Virtual Emperor",
"Code Legend", "Matrix Master", "Cyber King", "Network God",
"Digital Overlord", "System God", "Matrix Lord", "Cyber God",
"Virtual Deity", "Digital Divinity", "Quantum Master",
"Code Deity", "Digital Supreme", "Cyber Divine"
]
}
},

// Números romanos para subníveis
romanNumerals: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
}

module.exports = ConfigsLevel;