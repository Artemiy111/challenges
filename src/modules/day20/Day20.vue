<template>
  <div class="">
    <p>Говори</p>
    <p v-for="(text, index) in transcript" :key="index">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'

const transcript = ref<string[]>([])
const isRecognizing = ref(false)

onMounted(() => {
  const speechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const recognizer: SpeechRecognition = new speechRecognition()
  recognizer.lang = 'ru-Ru'
  recognizer.interimResults = true
  recognizer.maxAlternatives = 3
  recognizer.continuous = true
  recognizer.start()
  recognizer.onstart = event => {
    console.log('Почалось', event)
    isRecognizing.value = true
  }

  recognizer.onresult = event => {
    console.log(event)
    const result = Array.from(event.results)
      .map(r => r[0].transcript)
      .join('')
    console.log(result)
    if (event.results[0].isFinal) transcript.value.push(result)
  }

  recognizer.onend = event => {
    recognizer.start()
  }
})
</script>
