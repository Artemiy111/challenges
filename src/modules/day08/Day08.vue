<template>
  <div class="w-full h-[100dvh] flex justify-center items-center">
    <canvas
      ref="canvas"
      width="500"
      height="500"
      @mousedown="handleStartDrawing"
      @mousemove="handleDrawing"
      @mouseup="handleEndDrawing"
      @mouseleave="handleEndDrawing"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeUnmount } from 'vue'
import { ref, onMounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const hue = ref(56)
const saturationPersent = 100
const lightnessPrecent = 60
const color = computed(() => `hsl(${hue.value}, ${saturationPersent}%, ${lightnessPrecent}%)`)

const minRadius = 4
const radius = ref(minRadius)
const maxRadius = 20
const isRadiusScalesUp = ref(true)

const isDrawing = ref(false)

const lastX = ref<number | null>(null)
const lastY = ref<number | null>(null)

const getPosition = () => {
  const x = ref(0)
  const y = ref(0)

  const mouseMoveHandler = (event: MouseEvent) => {
    x.value = event.offsetX
    y.value = event.offsetY
  }
  onMounted(() => {
    window.addEventListener('mousemove', mouseMoveHandler)
  })
  onBeforeUnmount(() => {
    removeEventListener('mousemove', mouseMoveHandler)
  })
  return { x, y }
}

const { x, y } = getPosition()

onMounted(() => {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx.value = canvas.value.getContext('2d')
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'
})

const handleStartDrawing = () => {
  isDrawing.value = true
}
const handleEndDrawing = () => {
  isDrawing.value = false
  radius.value = 4
  lastX.value = null
  lastY.value = null
}

const handleDrawing = (event: MouseEvent) => {
  if (!isDrawing.value) return

  if (lastX.value && lastY.value) {
    ctx.value.beginPath()
    ctx.value.moveTo(lastX.value, lastY.value)
    ctx.value.lineTo(x.value, y.value)
    ctx.value.strokeStyle = color.value
    ctx.value.lineWidth = radius.value * 1.9
    ctx.value.stroke()
    ctx.value.closePath()
  }

  lastX.value = x.value
  lastY.value = y.value

  if (isRadiusScalesUp.value) {
    radius.value = Math.min(
      radius.value + Math.sqrt(event.movementX ** 2 + event.movementY ** 2) * 0.01,
      maxRadius
    )
    if (radius.value === maxRadius) isRadiusScalesUp.value = false
  } else {
    radius.value = Math.max(
      radius.value - Math.sqrt(event.movementX ** 2 + event.movementY ** 2) * 0.01,
      minRadius
    )
    if (radius.value === minRadius) isRadiusScalesUp.value = true
  }

  const setNextHue = () => {
    hue.value = (hue.value + 1) % 360
  }
  setNextHue()
}
</script>
