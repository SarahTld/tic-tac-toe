<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 relative overflow-hidden">
    <div class="w-full max-w-4xl relative z-10">
      <!-- En-tête principal -->
      <div class="text-center mb-12">
        <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-pulse mb-4">
          TIC TAC TOE
        </h1>
        <div class="text-2xl text-white/80 font-medium">
          Le jeu classique revisité
        </div>
      </div>

      <!-- Section principale du jeu -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Panneau de contrôle -->
        <div class="space-y-6">
          <!-- Actions du jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <button
              @click="resetGame"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50 mb-4"
            >
              🎮 Nouvelle partie
            </button>
            <button
              @click="undoMove"
              :disabled="movesHistory.length === 0"
              class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg shadow-blue-500/50"
            >
              ↩️ Annuler
            </button>
          </div>

          <!-- Sélection du mode de jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-bold text-white mb-4 text-center">
              🎮 Mode de jeu
            </h3>
            <div class="space-y-3">
              <button
                @click="setGameMode('ai')"
                :class="gameMode === 'ai' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                🤖 Contre l'IA
              </button>
              <button
                @click="setGameMode('player')"
                :class="gameMode === 'player' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                👥 À deux joueurs
              </button>
            </div>
          </div>

          <!-- Niveau de difficulté (visible seulement en mode IA) -->
          <div v-if="gameMode === 'ai'" class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-bold text-white mb-4 text-center">
              🎯 Niveau de difficulté
            </h3>
            <div class="space-y-2">
              <button
                @click="setDifficulty('easy')"
                :class="difficulty === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                🌱 Facile
              </button>
              <button
                @click="setDifficulty('medium')"
                :class="difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                ⚡ Moyen
              </button>
              <button
                @click="setDifficulty('hard')"
                :class="difficulty === 'hard' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                🔥 Difficile
              </button>
              <button
                @click="setDifficulty('impossible')"
                :class="difficulty === 'impossible' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/50' : 'bg-white/20 text-white hover:bg-white/30'"
                class="w-full py-2 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                💀 Impossible
              </button>
            </div>
          </div>
        </div>

        <!-- Plateau de jeu -->
        <div class="flex flex-col justify-center">
          <!-- Statut du jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <div class="text-2xl font-bold text-white text-center">
              <div v-if="winner">
                <span v-if="winner === 'tie'" class="text-yellow-400">🤝 Match nul !</span>
                <span v-else-if="winner === 'X'" class="text-cyan-400">🎉 Vous avez gagné !</span>
                <span v-else class="text-pink-400">😔 L'IA a gagné !</span>
              </div>
              <div v-else>
                <span v-if="currentPlayer === 'X'" class="text-cyan-400">🔵 Votre tour</span>
                <span v-else class="text-pink-400">🔴 Tour de l'IA</span>
              </div>
            </div>
          </div>

          <!-- Plateau de jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="(cell, index) in board"
                :key="index"
                @click="makeMove(index)"
                :disabled="cell !== null || winner"
                class="w-24 h-24 bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20 rounded-xl flex items-center justify-center text-4xl font-black transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                :class="{
                  'text-cyan-400': cell === 'X',
                  'text-pink-400': cell === 'O',
                  'animate-bounce': cell !== null
                }"
              >
                {{ cell === 'X' ? '🔵' : cell === 'O' ? '🔴' : '' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Panneau d'informations -->
        <div class="space-y-6">
          <!-- Statistiques -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-bold text-white mb-4 text-center">
              📊 Statistiques
            </h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-3xl font-bold text-cyan-400">{{ stats.X }}</div>
                <div class="text-sm text-white/60">Victoires</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-pink-400">{{ stats.O }}</div>
                <div class="text-sm text-white/60">Défaites</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-yellow-400">{{ stats.ties }}</div>
                <div class="text-sm text-white/60">Nuls</div>
              </div>
            </div>
            <div class="mt-4 text-center">
              <div class="text-lg font-bold text-white">
                Total: {{ stats.X + stats.O + stats.ties }}
              </div>
            </div>
          </div>

          <!-- Informations -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-bold text-white mb-4 text-center">
              ℹ️ Informations
            </h3>
            <div class="text-white/80 text-sm space-y-2">
              <p><strong>Mode :</strong> {{ gameMode === 'ai' ? 'Contre l\'IA' : 'À deux joueurs' }}</p>
              <p v-if="gameMode === 'ai'"><strong>Difficulté :</strong> 
                <span v-if="difficulty === 'easy'">🌱 Facile</span>
                <span v-else-if="difficulty === 'medium'">⚡ Moyen</span>
                <span v-else-if="difficulty === 'hard'">🔥 Difficile</span>
                <span v-else>💀 Impossible</span>
              </p>
              <p><strong>Mouvements :</strong> {{ movesCount }}/9</p>
            </div>
          </div>

          <!-- Conseils -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-bold text-white mb-4 text-center">
              💡 Conseils
            </h3>
            <div class="text-white/80 text-sm space-y-2">
              <p>• Cliquez sur une case vide pour jouer</p>
              <p>• Alignez 3 symboles pour gagner</p>
              <p>• Utilisez "Annuler" pour revenir en arrière</p>
              <p>• En mode IA, l'ordinateur joue automatiquement</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="fixed left-0 right-0 bottom-0 z-20 text-white text-sm flex flex-col items-center bg-transparent pointer-events-auto mb-8 mt-8">
        <div>
          Développé avec <span class="text-pink-500">❤️</span> par
          <a href="https://github.com/SarahTld" target="_blank" rel="noopener" class="text-purple-600 font-semibold hover:underline">Sarah T</a>.
        </div>
        <div>
          &copy; 2025 - Tic Tac Toe. Tous droits réservés.
        </div>
      </footer>
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


