<template>
  <div class="w-full h-[100dvh] flex flex-col gap-5 items-center justify-center">
    <div class="">
      <label
        ><span>Spacing</span>
        <input class="range" type="range" min="0" max="50" :value="spacing" @change="changeSpacing"
      /></label>
      <label
        ><span>Blur</span>
        <input class="range" type="range" min="0" max="10" :value="blur" @change="changeBlur"
      /></label>
      <label><span>Color</span> <input type="color" :value="color" @change="changeColor" /></label>
    </div>
    <div class="border-[20px] image-outer">
      <img ref="imageRef" src="./assets/image.jpg" alt="" class="h-80 image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spacing = ref(0)
const blur = ref(0)
const color = ref('#ffffff')
const imageRef = ref<HTMLImageElement | null>(null)

const changeSpacing = (event: Event) => {
  spacing.value = parseFloat((event.target as HTMLInputElement).value)
  imageRef.value?.style.setProperty('--spacing', `${spacing.value}px`)
}

const changeBlur = (event: Event) => {
  blur.value = parseFloat((event.target as HTMLInputElement).value)
  imageRef.value?.style.setProperty('--blur', `${blur.value}px`)
}

const changeColor = (event: Event) => {
  color.value = (event.target as HTMLInputElement).value
  imageRef.value?.parentElement?.style.setProperty('--color', color.value)
}
</script>

<style scoped>
.image-outer {
  --color: #ffffff;
  border-color: var(--color);
}
.image {
  --spacing: 10px;
  --blur: 0px
  position: relative;
  translate: var(--spacing) var(--spacing);
  filter: blur(var(--blur));
}
</style>
