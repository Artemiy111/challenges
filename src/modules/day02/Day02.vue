<template>
  <div class="w-full h-[100dvh] flex items-center justify-center bg-stone-900">
    <div class="clock relative w-80 aspect-square rounded-full border-[20px]">
      <div class="arrow-hour rounded absolute" ref="arrowHour"></div>
      <div class="arrow-minute rounded absolute" ref="arrowMinute"></div>
      <div class="arrow-second rounded absolute" ref="arrowSecond"></div>
      <div class="arrow-millisecond rounded absolute" ref="arrowMillisecond"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const arrowHour = ref<HTMLDivElement | null>(null)
const arrowMinute = ref<HTMLDivElement | null>(null)
const arrowSecond = ref<HTMLDivElement | null>(null)
const arrowMillisecond = ref<HTMLDivElement | null>(null)
const timeout = ref<number>(0)

onMounted(() => {
  setTime()
})

onBeforeUnmount(() => {
  clearTimeout(timeout.value)
})

const setTime = () => {
  const time = new Date()
  const milliseconds = time.getMilliseconds()
  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  const degreesForMilliseconds = 180 + (360 / 1000) * milliseconds
  const degreesForSeconds = 180 + (360 / 60) * seconds + (360 / 60 / 1000) * milliseconds
  const degreesForMinutes = 180 + (360 / 60) * minutes + (360 / 60 / 60) * seconds
  const degreesForHours = 180 + (360 / 12) * hours + (360 / 12 / 60) * minutes

  if (!arrowHour.value || !arrowMinute.value || !arrowSecond.value || !arrowMillisecond.value)
    return

  arrowHour.value.style.rotate = `${degreesForHours}deg`
  arrowMinute.value.style.rotate = `${degreesForMinutes}deg`
  arrowSecond.value.style.rotate = `${degreesForSeconds}deg`
  arrowMillisecond.value.style.rotate = `${degreesForMilliseconds}deg`
  timeout.value = setTimeout(() => setTime(), 100)
}
</script>

<style scoped>
.arrow-hour {
  transition: all 0.05s;
  --width: 4px;
  width: var(--width);
  height: 60px;
  top: 50%;
  left: 50%;
  transform-origin: center calc(var(--width) / 2);
  background: hsl(0, 0%, 90%);
}
.arrow-minute {
  transition: all 0.05s;
  --width: 4px;
  width: var(--width);
  height: 80px;
  top: 50%;
  left: 50%;
  transform-origin: center calc(var(--width) / 2);
  background: hsl(0, 0%, 80%);
}

.arrow-second {
  transition: all 0.05s;
  --width: 4px;
  width: var(--width);
  height: 100px;
  top: 50%;
  left: 50%;
  transform-origin: center calc(var(--width) / 2);
  background: hsl(0, 0%, 60%);
}

.arrow-millisecond {
  transition: all 0.05s;
  --width: 4px;
  width: var(--width);
  height: 120px;
  top: 50%;
  left: 50%;
  transform-origin: center calc(var(--width) / 2);
  background: hsl(0, 0%, 50%);
}
</style>
