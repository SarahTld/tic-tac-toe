<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 relative overflow-hidden">
    <div class="w-full max-w-7xl relative z-10">
      <!-- En-tête principal -->
      <div class="text-center mb-16">
        <!-- Logo Tic Tac Toe -->
        <div class="flex justify-center mb-6">
          <div class="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-cyan-400 border border-cyan-400/30">🔵</div>
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-pink-400 border border-pink-400/30">🔴</div>
            <div class="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-cyan-400 border border-cyan-400/30">🔵</div>
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-pink-400 border border-pink-400/30">🔴</div>
            <div class="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-cyan-400 border border-cyan-400/30">🔵</div>
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-pink-400 border border-pink-400/30">🔴</div>
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-pink-400 border border-pink-400/30">🔴</div>
            <div class="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-cyan-400 border border-cyan-400/30">🔵</div>
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center text-2xl font-black text-pink-400 border border-pink-400/30">🔴</div>
          </div>
        </div>
        <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-pulse">
          TIC TAC TOE
        </h1>
        <div class="text-2xl text-white/80 mt-2 font-medium">
          Le jeu classique revisité
        </div>
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
              Nouvelle partie
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

          <!-- Conseils -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              💡 Conseils
            </h3>
            <div class="text-white/80 text-sm space-y-2">
              <p>• Cliquez sur une case vide pour jouer</p>
              <p>• Alignez 3 symboles pour gagner</p>
              <p>• En mode IA, l'ordinateur joue automatiquement</p>
            </div>
          </div>
        </div>

        <!-- Plateau de jeu (4 colonnes) -->
        <div class="xl:col-span-4 flex flex-col justify-between">
          <!-- Statut du jeu -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <div class="text-2xl font-bold text-white">
              {{ currentPlayer === 'X' ? '🔵 Votre tour' : '🔴 Tour de l\'IA' }}
            </div>
          </div>

          <!-- Plateau de jeu -->
          <GameBoard 
            :board="board" 
            :game-over="gameOver"
            @move="makeMove"
          />
        </div>

        <!-- Panneau d'informations (4 colonnes) -->
        <div class="xl:col-span-4 space-y-6">
          <!-- Informations -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              ℹ️ Informations
            </h3>
            <div class="text-white/80 text-sm space-y-2">
              <p><strong>Mode actuel :</strong> {{ gameMode === 'ai' ? 'Contre l\'IA' : 'À deux joueurs' }}</p>
              <p v-if="gameMode === 'ai'"><strong>Difficulté :</strong> {{ difficultyText }}</p>
              <p><strong>Parties jouées :</strong> {{ stats.totalGames }}</p>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-lg font-bold text-white mb-4 text-center">
              📊 Statistiques
            </h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-cyan-400">{{ stats.wins }}</div>
                <div class="text-xs text-white/60">Victoires</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-pink-400">{{ stats.losses }}</div>
                <div class="text-xs text-white/60">Défaites</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-purple-400">{{ stats.draws }}</div>
                <div class="text-xs text-white/60">Nuls</div>
              </div>
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
// Utiliser le composable du jeu
const {
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
} = useGame()

// Charger les statistiques au montage
onMounted(() => {
  loadStats()
})
</script>
