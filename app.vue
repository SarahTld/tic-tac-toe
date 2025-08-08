<template>
  <div>
    <NuxtPage />
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


