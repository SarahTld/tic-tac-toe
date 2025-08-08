<template>
  <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="(cell, index) in board"
        :key="index"
        @click="$emit('move', index)"
        :disabled="cell !== '' || gameOver"
        class="w-20 h-20 bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20 rounded-xl flex items-center justify-center text-3xl font-black transition-all duration-300 transform hover:scale-105 disabled:transform-none"
        :class="{
          'text-cyan-400': cell === 'X',
          'text-pink-400': cell === 'O',
          'animate-bounce': cell !== ''
        }"
      >
        {{ cell === 'X' ? '🔵' : cell === 'O' ? '🔴' : '' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  board: {
    type: Array,
    required: true
  },
  gameOver: {
    type: Boolean,
    default: false
  }
})

defineEmits(['move'])
</script>
