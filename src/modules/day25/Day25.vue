<template>
  <div class="one">
    <div class="two">
      <div class="three"></div>
    </div>
  </div>

  <button class="btn">button</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const divs = document.querySelectorAll('div')
  const button = document.querySelector('button')

  function logText(e) {
    console.log(this.classList.value)
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
  }

  divs.forEach(div =>
    div.addEventListener('click', logText, {
      capture: false,
      once: true,
    })
  )

  button.addEventListener(
    'click',
    () => {
      console.log('Click!!!')
    },
    {
      once: true,
    }
  )
})
</script>

<style scoped>
div {
  width: 100%;
  padding: 100px;
}

.one {
  background: thistle;
}

.two {
  background: mistyrose;
}

.three {
  background: coral;
}
</style>
