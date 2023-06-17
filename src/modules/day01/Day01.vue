<template>
  <div class="screen w-full h-[100dvh] flex items-center justify-center gap-5 relative">
    <img class="object-cover w-full h-full absolute -z-10" src="./assets/piano.webp" alt="" />
    <div v-for="[key] of map" :key="key" class="flex flex-col gap-2">
      <button @click="handleClick(key)" class="btn">
        {{ key }}
      </button>
    </div>
    <audio ref="audiosRefs" v-for="(audioSrc, index) in AUDIOUS_PATHS" :key="index">
      <source :src="audioSrc" type="audio/wav" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const KEYS = 'ASDFGHJKL'.split('')
const AUDIOUS = [
  'a-clap',
  's-hihat',
  'd-kick',
  'f-openhat',
  'g-boom',
  'h-ride',
  'j-snare',
  'k-tom',
  'l-tink',
]
const AUDIOUS_PATHS = AUDIOUS.map(a => `./src/modules/day01/assets/${a}.wav`)

const audiosRefs = ref<HTMLAudioElement[]>([])

const map = computed(() => {
  const m = new Map<string, HTMLAudioElement | null>()
  if (audiosRefs.value == null) return m
  for (const index in KEYS) {
    m.set(KEYS[index], audiosRefs.value[index] as HTMLAudioElement)
  }
  return m
})

onMounted(() => {
  document.addEventListener('keypress', handeleKeypress)
})

const handeleKeypress = async (event: KeyboardEvent) => {
  const key = event.key.toUpperCase()
  const audio = map.value.get(key) || null
  if (!audio) return

  handeleAudio(audio)
}

const handleClick = (key: string) => {
  const audio = map.value.get(key) || null
  if (!audio) return
  handeleAudio(audio)
}

const handeleAudio = async (audio: HTMLAudioElement) => {
  audio.currentTime = 0
  audio.play()
}
</script>

<style scoped>
.playing {
  box-shadow: 0 0 10px 10px pink;
}
</style>
