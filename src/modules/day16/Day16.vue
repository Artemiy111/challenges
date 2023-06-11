<template>
  <div class="hero">
    <h1 ref="heroRef" contenteditable>🔥WOAH!</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(0)
const height = ref(0)
const x = ref(0)
const y = ref(0)

const heroRef = ref<HTMLDivElement | null>(null)
const heroCenterX = ref(0)
const heroCenterY = ref(0)

const offsetX = computed(() => (-(heroCenterX.value - x.value) / width.value) * 100)
const offsetY = computed(() => (-(heroCenterY.value - y.value) / height.value) * 100)
const offsetXInPx = computed(() => offsetX.value + 'px')
const offsetYInPx = computed(() => offsetY.value + 'px')

const handleMouseMove = (event: MouseEvent) => {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)

  width.value = document.documentElement.clientWidth
  height.value = document.documentElement.clientHeight

  const heroInfo = heroRef.value.getBoundingClientRect()
  heroCenterX.value = heroInfo.left + heroInfo.width / 2
  heroCenterY.value = heroInfo.top + heroInfo.height / 2
})

onUnmounted(() => {
  removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

h1 {
  text-shadow: v-bind(offsetXInPx) v-bind(offsetYInPx) 0 rgba(0, 0, 0, 1);
  font-size: 100px;
}
</style>
