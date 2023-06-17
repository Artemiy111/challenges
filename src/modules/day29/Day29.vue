<template>
  <div class="timer">
    <div class="timer__controls">
      <button @click="setSecondsLeft(20)" data-time="20" class="timer__button">20 Secs</button>
      <button @click="setSecondsLeft(300)" data-time="300" class="timer__button">Work 5</button>
      <button @click="setSecondsLeft(900)" data-time="900" class="timer__button">Quick 15</button>
      <button @click="setSecondsLeft(1200)" data-time="1200" class="timer__button">Snack 20</button>
      <button @click="setSecondsLeft(3600)" data-time="3600" class="timer__button">
        Lunch Break
      </button>
      <form name="customForm" id="custom" @submit.prevent="">
        <input
          type="text"
          name="minutes"
          placeholder="Enter Minutes"
          :value="customMinutes"
          @input="handleCustomMinutes"
        />
      </form>
    </div>
    <div class="display">
      <h1 class="display__time-left">{{ timeLeft }}</h1>
      <p class="display__end-time text-black">Be back at {{ timeEnd }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const timeStartInMs = ref(0)
const timeEndInMs = ref(0)
const secondsLeft = ref(0)
const customMinutes = ref(0)

const timeLeft = computed(() => {
  const min = Math.trunc(secondsLeft.value / 60)
  const sec = secondsLeft.value % 60
  return `${min}:${sec}`
})

const timeEnd = computed(() => {
  const timeEnd = new Date(timeEndInMs.value)
  const hours = timeEnd.getHours()
  const minutes = timeEnd.getMinutes()
  return `${hours}:${minutes}`
})

const handleCustomMinutes = (event: Event) => {
  const min = parseInt((event.target as HTMLInputElement).value)
  customMinutes.value = min
  setSecondsLeft(customMinutes.value * 60)
}

const intervalId = ref(0)
const setSecondsLeft = (seconds: number) => {
  timeStartInMs.value = Date.now()
  timeEndInMs.value = timeStartInMs.value + 1000 * seconds
  secondsLeft.value = seconds
  clearInterval(intervalId.value)

  intervalId.value = setInterval(() => {
    const now = Date.now()
    if (now >= timeEndInMs.value) {
      secondsLeft.value = 0
      clearInterval(intervalId.value)
      return
    }
    secondsLeft.value = Math.round((timeEndInMs.value - now) / 1000)
  }, 1000) as unknown as number
}
</script>

<style scoped>
.display__time-left {
  font-weight: 100;
  font-size: 20rem;
  margin: 0;
  color: white;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
}

.timer {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.timer__controls {
  display: flex;
}

.timer__controls > * {
  flex: 1;
}

.timer__controls form {
  flex: 1;
  display: flex;
}

.timer__controls input {
  flex: 1;
  border: 0;
  padding: 2rem;
}

.timer__button {
  background: none;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 2rem;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  font-family: 'Inconsolata', monospace;
}

.timer__button:hover,
.timer__button:focus {
  background: rgba(0, 0, 0, 0.2);
  outline: 0;
}

.display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.display__end-time {
  font-size: 2rem;
}
</style>
