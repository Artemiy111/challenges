<template>
  <div class="w-full h-[100dvh] flex flex-col justify-center items-center">
    <p>Key Sequence Detection (KONAMI CODE)</p>
    <p>T + U + V + E = Epic</p>
    <p v-show="isSequenceCompleted">You are Epic!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const predefinedSequence = ['t', 'u', 'v', 'e']
const numberOfPressedKeysOfSequence = ref(0)
const isSequenceCompleted = ref(false)

onMounted(() => {
  document.addEventListener('keypress', handleKeypress)
})

watch(isSequenceCompleted, () => {
  if (isSequenceCompleted.value) setTimeout(() => (isSequenceCompleted.value = false), 1000)
})

const handleKeypress = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  if (key === predefinedSequence[numberOfPressedKeysOfSequence.value]) {
    numberOfPressedKeysOfSequence.value++
  }
  if (numberOfPressedKeysOfSequence.value === predefinedSequence.length) {
    isSequenceCompleted.value = true
    numberOfPressedKeysOfSequence.value = 0
  }
}
</script>
