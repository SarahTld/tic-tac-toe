<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 relative overflow-hidden">
    <div class="w-full max-w-7xl relative z-10">
      <!-- En-tête principal -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mb-3 animate-pulse">
          TIC TAC TOE
        </h1>
      </div>

      <!-- Section principale du jeu -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <!-- Panneau de contrôle (4 colonnes) -->
        <div class="xl:col-span-4 space-y-6">
          <!-- Actions du jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <button
              @click="resetGame"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50"
            >
              🆕 Nouvelle partie
            </button>
          </div>

          <!-- Sélection du mode de jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              🎮 Mode de jeu
            </h3>
            <div class="space-y-3">
              <button
                @click="setGameMode('ai')"
                :class="gameMode === 'ai' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                🤖 Jouer contre l'IA
              </button>
              <button
                @click="setGameMode('player')"
                :class="gameMode === 'player' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                👥 Jouer à deux
              </button>
            </div>
          </div>

          <!-- Niveau de difficulté (visible seulement en mode IA) -->
          <div v-if="gameMode === 'ai'" class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              🎯 Niveau de difficulté
            </h3>
            <div class="space-y-2">
              <button
                @click="setDifficulty('easy')"
                :class="difficulty === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                🌱 Facile
              </button>
              <button
                @click="setDifficulty('medium')"
                :class="difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                ⚡ Moyen
              </button>
              <button
                @click="setDifficulty('hard')"
                :class="difficulty === 'hard' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                🔥 Difficile
              </button>
              <button
                @click="setDifficulty('impossible')"
                :class="difficulty === 'impossible' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
              >
                💀 Impossible
              </button>
            </div>
          </div>
        </div>

        <!-- Zone centrale du jeu (4 colonnes) -->
        <div class="xl:col-span-4 flex flex-col justify-between">
          <!-- Statut actuel du jeu (aligné en haut) -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 w-full max-w-md mx-auto">
            <div class="text-center">
              <div v-if="winner" class="space-y-3">
                <div class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-bounce">
                  {{ winner === 'tie' ? '🤝 MATCH NUL' : '🎉 VICTOIRE' }}
                </div>
                <div v-if="winner !== 'tie'" class="text-xl font-bold text-white">
                  {{ winner === 'X' ? '🔵' : '🔴' }} remporte la partie !
                </div>
              </div>
              <div v-else class="space-y-3">
                <div class="text-2xl font-bold text-white">
                  {{ currentPlayer === 'X' ? '🔵 Votre tour' : '🔴 Tour de l\'IA' }}
                </div>
                <!-- Barre de progression -->
                <div class="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    class="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                    :style="{ width: `${(movesCount / 9) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Grille de jeu (alignée en bas) -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-md mx-auto">
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="(cell, index) in board"
                :key="index"
                @click="makeMove(index)"
                :disabled="cell !== null || winner || (gameMode === 'ai' && currentPlayer === 'O')"
                class="w-28 h-28 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-black transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-white/30"
                :class="{
                  'text-cyan-400 shadow-lg shadow-cyan-400/50': cell === 'X',
                  'text-pink-400 shadow-lg shadow-pink-400/50': cell === 'O',
                  'hover:bg-white/30 hover:shadow-lg hover:shadow-white/20': cell === null && !winner && !(gameMode === 'ai' && currentPlayer === 'O'),
                  'animate-pulse': cell === null && !winner && !(gameMode === 'ai' && currentPlayer === 'O')
                }"
              >
                <span v-if="cell === 'X'" class="animate-bounce">🔵</span>
                <span v-else-if="cell === 'O'" class="animate-bounce">🔴</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Panneau d'informations (4 colonnes) -->
        <div class="xl:col-span-4 space-y-6">
          <!-- Règles et conseils -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              💡 Conseils
            </h3>
            <div class="space-y-2 text-sm text-cyan-100">
              <div class="bg-white/10 rounded-lg p-2">
                • Alignez 3 symboles pour gagner
              </div>
              <div class="bg-white/10 rounded-lg p-2">
                • Bloquez votre adversaire quand c'est possible
              </div>
            </div>
          </div>

          <!-- Informations de jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              ℹ️ Informations
            </h3>
            <div class="space-y-3 text-sm text-cyan-100">
              <div class="flex justify-between items-center bg-white/10 rounded-lg p-2">
                <span>Mode:</span>
                <span class="font-bold">{{ gameMode === 'ai' ? 'vs IA' : 'vs Joueur' }}</span>
              </div>
              <div v-if="gameMode === 'ai'" class="flex justify-between items-center bg-white/10 rounded-lg p-2">
                <span>Difficulté:</span>
                <span class="font-bold">
                  {{ difficulty === 'easy' ? '🌱 Facile' : difficulty === 'medium' ? '⚡ Moyen' : difficulty === 'hard' ? '🔥 Difficile' : '💀 Impossible' }}
                </span>
              </div>
              <div class="flex justify-between items-center bg-white/10 rounded-lg p-2">
                <span>Coups:</span>
                <span class="font-bold">{{ movesCount }}/9</span>
              </div>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              📊 Statistiques
            </h3>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-3 border border-cyan-400/30">
                <div class="text-xl font-black text-cyan-400 mb-1">{{ stats.X }}</div>
                <div class="text-xs text-cyan-200 font-medium">🔵</div>
              </div>
              <div class="bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl p-3 border border-gray-400/30">
                <div class="text-xl font-black text-gray-300 mb-1">{{ stats.ties }}</div>
                <div class="text-xs text-gray-200 font-medium">🤝</div>
              </div>
              <div class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl p-3 border border-pink-400/30">
                <div class="text-xl font-black text-pink-400 mb-1">{{ stats.O }}</div>
                <div class="text-xs text-pink-200 font-medium">🔴</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// État du jeu
const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const winner = ref(null)
const gameMode = ref('ai') // 'ai' ou 'player'
const difficulty = ref('easy') // 'easy', 'medium', 'hard'
const movesHistory = ref([])
const stats = ref({ X: 0, O: 0, ties: 0 })

// Computed
const movesCount = computed(() => board.value.filter(cell => cell !== null).length)

// Vérifier les combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
  [0, 4, 8], [2, 4, 6] // Diagonales
]

// Vérifier s'il y a un gagnant
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      return board.value[a]
    }
  }
  
  if (board.value.every(cell => cell !== null)) {
    return 'tie'
  }
  
  return null
}

// Faire un mouvement
function makeMove(index) {
  if (board.value[index] !== null || winner.value) return
  
  // Sauvegarder l'état actuel pour l'annulation
  movesHistory.value.push({
    board: [...board.value],
    currentPlayer: currentPlayer.value,
    winner: winner.value
  })
  
  board.value[index] = currentPlayer.value
  winner.value = checkWinner()
  
  if (!winner.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    
    // Tour de l'IA
    if (gameMode.value === 'ai' && currentPlayer.value === 'O') {
      setTimeout(makeAIMove, 800) // Délai plus long pour l'effet
    }
  } else {
    // Mettre à jour les statistiques
    if (winner.value === 'tie') {
      stats.value.ties++
    } else {
      stats.value[winner.value]++
    }
  }
}

// Mouvement de l'IA selon le niveau de difficulté
function makeAIMove() {
  if (winner.value) return
  
  const emptyCells = board.value
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)
  
  if (emptyCells.length === 0) return
  
  let moveIndex
  
  switch (difficulty.value) {
    case 'easy':
      // IA facile : choix aléatoire
      moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      break
      
    case 'medium':
      // IA moyenne : 50% chance de jouer intelligemment, 50% aléatoire
      if (Math.random() < 0.5) {
        moveIndex = findBestMove()
      } else {
        moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      }
      break
      
    case 'hard':
      // IA difficile : joue toujours le meilleur coup
      moveIndex = findBestMove()
      break
      
    case 'impossible':
      // IA impossible : algorithme minimax complet
      moveIndex = findImpossibleMove()
      break
      
    default:
      moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }
  
  if (moveIndex !== undefined) {
    makeMove(moveIndex)
  }
}

// Trouver le meilleur coup (algorithme minimax simplifié)
function findBestMove() {
  const emptyCells = board.value
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)
  
  // Vérifier d'abord si on peut gagner en un coup
  for (const index of emptyCells) {
    const testBoard = [...board.value]
    testBoard[index] = 'O'
    if (checkWinnerForBoard(testBoard) === 'O') {
      return index
    }
  }
  
  // Vérifier si on doit bloquer le joueur
  for (const index of emptyCells) {
    const testBoard = [...board.value]
    testBoard[index] = 'X'
    if (checkWinnerForBoard(testBoard) === 'X') {
      return index
    }
  }
  
  // Priorité au centre
  if (emptyCells.includes(4)) {
    return 4
  }
  
  // Priorité aux coins
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter(corner => emptyCells.includes(corner))
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)]
  }
  
  // Sinon, choix aléatoire
  return emptyCells[Math.floor(Math.random() * emptyCells.length)]
}

// Trouver le meilleur coup pour le niveau impossible (minimax complet)
function findImpossibleMove() {
  const emptyCells = board.value
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)
  
  let bestScore = -Infinity
  let bestMove = emptyCells[0]
  
  for (const index of emptyCells) {
    const testBoard = [...board.value]
    testBoard[index] = 'O'
    const score = minimax(testBoard, 0, false)
    
    if (score > bestScore) {
      bestScore = score
      bestMove = index
    }
  }
  
  return bestMove
}

// Algorithme minimax
function minimax(board, depth, isMaximizing) {
  const result = checkWinnerForBoard(board)
  
  if (result === 'O') {
    return 10 - depth
  }
  if (result === 'X') {
    return depth - 10
  }
  if (result === 'tie') {
    return 0
  }
  
  const emptyCells = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)
  
  if (isMaximizing) {
    let bestScore = -Infinity
    for (const index of emptyCells) {
      const testBoard = [...board]
      testBoard[index] = 'O'
      const score = minimax(testBoard, depth + 1, false)
      bestScore = Math.max(bestScore, score)
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (const index of emptyCells) {
      const testBoard = [...board]
      testBoard[index] = 'X'
      const score = minimax(testBoard, depth + 1, true)
      bestScore = Math.min(bestScore, score)
    }
    return bestScore
  }
}

// Vérifier le gagnant pour un plateau donné
function checkWinnerForBoard(board) {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  
  if (board.every(cell => cell !== null)) {
    return 'tie'
  }
  
  return null
}

// Réinitialiser le jeu
function resetGame() {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
  movesHistory.value = []
}

// Annuler le dernier mouvement
function undoMove() {
  if (movesHistory.value.length === 0) return
  
  const lastMove = movesHistory.value.pop()
  board.value = lastMove.board
  currentPlayer.value = lastMove.currentPlayer
  winner.value = lastMove.winner
}

// Changer le mode de jeu
function setGameMode(mode) {
  gameMode.value = mode
  resetGame()
}

// Changer le niveau de difficulté
function setDifficulty(level) {
  difficulty.value = level
}

// Charger les statistiques depuis le localStorage
onMounted(() => {
  const savedStats = localStorage.getItem('tic-tac-toe-stats')
  if (savedStats) {
    stats.value = JSON.parse(savedStats)
  }
})

// Sauvegarder les statistiques
watch(stats, (newStats) => {
  localStorage.setItem('tic-tac-toe-stats', JSON.stringify(newStats))
}, { deep: true })
</script>

<style scoped>
/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Effet de brillance */
.shine {
  position: relative;
  overflow: hidden;
}

.shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.shine:hover::before {
  left: 100%;
}

/* Scrollbar personnalisée */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>


