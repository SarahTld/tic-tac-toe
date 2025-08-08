import { ref, computed } from 'vue'

export const useGame = () => {
  // État du jeu
  const board = ref(Array(9).fill(''))
  const currentPlayer = ref('X')
  const gameOver = ref(false)
  const gameMode = ref('ai') // 'ai' ou 'player'
  const difficulty = ref('medium') // 'easy', 'medium', 'hard', 'impossible'
  
  // Statistiques
  const stats = ref({
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0
  })

  // Texte de difficulté
  const difficultyText = computed(() => {
    const texts = {
      easy: 'Facile',
      medium: 'Moyen', 
      hard: 'Difficile',
      impossible: 'Impossible'
    }
    return texts[difficulty.value]
  })

  // Vérifier si le jeu est terminé
  const checkWinner = (boardState) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontales
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticales
      [0, 4, 8], [2, 4, 6] // diagonales
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a]
      }
    }

    // Vérifier s'il y a match nul
    if (boardState.every(cell => cell !== '')) {
      return 'draw'
    }

    return null
  }

  // Faire un mouvement
  const makeMove = (index) => {
    if (board.value[index] !== '' || gameOver.value) return

    // Mouvement du joueur
    board.value[index] = currentPlayer.value
    
    // Vérifier si le joueur a gagné
    const winner = checkWinner(board.value)
    if (winner) {
      endGame(winner)
      return
    }

    // Changer de joueur
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'

    // Si c'est le tour de l'IA et en mode IA
    if (gameMode.value === 'ai' && currentPlayer.value === 'O' && !gameOver.value) {
      setTimeout(() => {
        makeAIMove()
      }, 500)
    }
  }

  // Logique de l'IA
  const makeAIMove = () => {
    if (gameOver.value) return

    let move
    switch (difficulty.value) {
      case 'easy':
        move = getRandomMove()
        break
      case 'medium':
        move = Math.random() < 0.5 ? getBestMove() : getRandomMove()
        break
      case 'hard':
        move = Math.random() < 0.8 ? getBestMove() : getRandomMove()
        break
      case 'impossible':
        move = getBestMove()
        break
      default:
        move = getRandomMove()
    }

    if (move !== -1) {
      makeMove(move)
    }
  }

  // Obtenir un mouvement aléatoire
  const getRandomMove = () => {
    const emptyCells = board.value
      .map((cell, index) => cell === '' ? index : -1)
      .filter(index => index !== -1)
    
    if (emptyCells.length === 0) return -1
    
    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  // Obtenir le meilleur mouvement (algorithme minimax)
  const getBestMove = () => {
    let bestScore = -Infinity
    let bestMove = -1

    for (let i = 0; i < 9; i++) {
      if (board.value[i] === '') {
        board.value[i] = 'O'
        const score = minimax(board.value, 0, false)
        board.value[i] = ''
        
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }

    return bestMove
  }

  // Algorithme minimax
  const minimax = (boardState, depth, isMaximizing) => {
    const winner = checkWinner(boardState)
    
    if (winner === 'O') return 10 - depth
    if (winner === 'X') return depth - 10
    if (winner === 'draw') return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = 'O'
          const score = minimax(boardState, depth + 1, false)
          boardState[i] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = 'X'
          const score = minimax(boardState, depth + 1, true)
          boardState[i] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  // Terminer le jeu
  const endGame = (winner) => {
    gameOver.value = true
    
    if (winner === 'draw') {
      stats.value.draws++
    } else if (winner === 'X') {
      stats.value.wins++
    } else {
      stats.value.losses++
    }
    
    stats.value.totalGames++
    saveStats()
  }

  // Réinitialiser le jeu
  const resetGame = () => {
    board.value = Array(9).fill('')
    currentPlayer.value = 'X'
    gameOver.value = false
  }

  // Définir le mode de jeu
  const setGameMode = (mode) => {
    gameMode.value = mode
    resetGame()
  }

  // Définir la difficulté
  const setDifficulty = (level) => {
    difficulty.value = level
    resetGame()
  }

  // Sauvegarder les statistiques
  const saveStats = () => {
    if (process.client) {
      localStorage.setItem('ticTacToeStats', JSON.stringify(stats.value))
    }
  }

  // Charger les statistiques
  const loadStats = () => {
    if (process.client) {
      const savedStats = localStorage.getItem('ticTacToeStats')
      if (savedStats) {
        stats.value = JSON.parse(savedStats)
      }
    }
  }

  return {
    board,
    currentPlayer,
    gameOver,
    gameMode,
    difficulty,
    stats,
    difficultyText,
    makeMove,
    resetGame,
    setGameMode,
    setDifficulty,
    loadStats
  }
}



