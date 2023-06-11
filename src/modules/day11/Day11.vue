<template>
  <div class="w-full h-[100dvh] flex justify-center items-center">
    <div class="player group text-white relative w-max max-h-[100dvh]">
      <video
        @canplaythrough="initDuration"
        @timeupdate="handleTimeUpdate"
        @click="toggle"
        class="player__video w-full"
        src="./assets/652333414.mp4"
        ref="video"
      ></video>
      <div
        class="player__controls opacity-0 group-hover:opacity-100 transition-all bg-black/25 w-full h-max absolute bottom-0"
      >
        <input
          type="range"
          class="range"
          :min="0"
          :max="duration"
          :value="currentTime"
          @change="setCurrentTIme"
          :step="0.1"
        />
        <div class="flex gap-3 items-center justify-center">
          <button class="p-2 text-4xl" @click="stepTime(-10)">⊴</button>
          <button class="p-2 text-4xl" @click="toggle">
            {{ isPlaying ? '⊳' : '■' }}
          </button>
          <button class="p-2 text-4xl" @click="stepTime(25)">⊵</button>
          <input
            type="range"
            class="range w-24"
            v-model.number="volume"
            :min="0"
            :max="1"
            :step="0.01"
          />
          <span class="w-full">{{ humanCurrentTime }} / {{ humanDuration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const video = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const duration = ref(0)
const currentTime = ref(0)

const toHumanTime = (seconds: number): string => {
  const minutes = Math.trunc(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${minutes}:${remainingSeconds}`
}
const humanDuration = computed(() => toHumanTime(duration.value))
const humanCurrentTime = computed(() => toHumanTime(currentTime.value))
onMounted(() => {})

const volume = ref(50)
watch(volume, () => {
  video.value.volume = volume.value
})

const initDuration = () => {
  if (!video.value) return
  duration.value = video.value.duration
}

const handleTimeUpdate = (event: Event) => {
  currentTime.value = (event.target as HTMLVideoElement).currentTime
}
const setCurrentTIme = (event: Event) => {
  currentTime.value = parseFloat((event.target as HTMLInputElement).value)
  video.value.currentTime = currentTime.value
}

const toggle = () => {
  const play = () => {
    video.value.play()
    isPlaying.value = true
  }

  const pause = () => {
    video.value.pause()
    isPlaying.value = false
  }

  if (isPlaying.value) pause()
  else play()
}

const stepTime = (seconds: number) => {
  if (seconds < 0) {
    currentTime.value = Math.max(0, currentTime.value + seconds)
  } else {
    currentTime.value = Math.min(duration.value, currentTime.value + seconds)
  }
  video.value.currentTime = currentTime.value
}
</script>
