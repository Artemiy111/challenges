<template>
  <div class="flex justify-center items-center flex-col gap5">
    <h1>
      Whack-a-mole! <span class="score">{{ score }}</span>
    </h1>
    <button class="btn btm-primary w-max" @click="startGame()">Start!</button>

    <div class="game">
      <div
        v-for="(mole, index) in moles"
        :key="index"
        class="hole hole1"
        :class="[mole.isShowing ? 'up' : '']"
      >
        <div class="mole" @mouseenter="beatMole(index)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isGameActive = ref(false)
const score = ref(0)
type Mole = {
  isShowing: boolean
}
const moles = ref<Mole[]>([
  { isShowing: false },
  { isShowing: false },
  { isShowing: false },
  { isShowing: false },
  { isShowing: false },
  { isShowing: false },
])

const getRandomTimeInMs = () => 150 + Math.trunc(Math.random() * 500)

const startGame = () => {
  isGameActive.value = true
  const getRandomMoleIndex = () => Math.trunc(Math.random() * 10) % 6
  const showRandomMole = () => {
    showMole(getRandomMoleIndex())
  }
  const interval = setInterval(showRandomMole, 100)
  setTimeout(() => {
    clearInterval(interval)
    isGameActive.value = false
  }, 10 * 1000)
}

const showMole = (index: number) => {
  console.log(index)
  const mole = moles.value[index]
  if (mole.isShowing) return
  mole.isShowing = true
  setTimeout(() => {
    mole.isShowing = true

    setTimeout(() => unshowMole(index), getRandomTimeInMs())
  }, getRandomTimeInMs())
}

const unshowMole = (index: number) => {
  moles.value[index].isShowing = false
}

const beatMole = (index: number) => {
  unshowMole(index)
  score.value++
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 10rem;
  line-height: 1;
  margin-bottom: 0;
}

.score {
  background: rgba(255, 255, 255, 0.2);
  padding: 0 3rem;
  line-height: 1;
  border-radius: 1rem;
}

.game {
  width: 600px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.hole {
  flex: 1 0 33.33%;
  overflow: hidden;
  position: relative;
}

.hole:after {
  display: block;
  background: url('./assets/dirt.svg') bottom center no-repeat;
  background-size: contain;
  content: '';
  width: 100%;
  height: 70px;
  position: absolute;
  z-index: 2;
  bottom: -30px;
}

.mole {
  background: url('./assets/mole.svg') bottom center no-repeat;
  background-size: 60%;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
}

.hole.up .mole {
  top: 0;
}
</style>
