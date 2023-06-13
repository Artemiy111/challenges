<template>
  <div class="">
    <nav>
      <ul class="menu">
        <li><a href="">Home</a></li>
        <li><a href="">Order Status</a></li>
        <li><a href="">Tweets</a></li>
        <li><a href="">Read Our History</a></li>
        <li><a href="">Contact Us</a></li>
      </ul>
    </nav>

    <div class="wrapper">
      <p>
        Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est
        <a href="" class="">explicabo</a> unde natus necessitatibus esse obcaecati distinctio, aut
        itaque, qui vitae!
      </p>
      <p>
        Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur
        earum <a href="">quaerat</a> cupiditate consequuntur facilis ullam dignissimos, aperiam quam
        veniam.
      </p>
      <p>
        Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime
        <a href="">corrupti</a> possimus <a href="">veritatis</a> ipsum fugit recusandae est
        doloremque? Hic, <a href="">quibusdam</a>, nulla.
      </p>
      <p>
        Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit
        <a href="">totam</a> ut consequatur eveniet sunt quam provident sapiente dicta neque quod.
      </p>
      <p>
        Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio
        ad minima, maxime <a href="">odio</a>, distinctio magni impedit tempore enim repellendus
        <a href="">repudiandae</a> quas!
      </p>
    </div>

    <div class="marker rounded-full" ref="marker"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
const marker = ref<HTMLDivElement | null>(null)
const isActive = ref(0)

const top = ref(0)
const left = ref(0)
const width = ref(0)
const height = ref(0)

const topPx = computed(() => `${top.value}px`)
const leftPx = computed(() => `${left.value}px`)
const widthPx = computed(() => `${width.value}px`)
const heightPx = computed(() => `${height.value}px`)

onMounted(() => {
  document.addEventListener('mouseover', event => {
    const target = event.target as HTMLElement
    const A = 'A'
    if (target.nodeName === A) {
      const {
        top: aTop,
        left: aLeft,
        width: aWindth,
        height: aHeight,
      } = target.getBoundingClientRect()
      top.value = aTop
      left.value = aLeft
      width.value = aWindth
      height.value = aHeight
    }
  })
})
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 500px;
  font-size: 20px;
  line-height: 2;
  position: relative;
}

a {
  text-decoration: none;
  color: black;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}

.marker {
  transition: all 0.2s;
  border-bottom: 2px solid rgb(85, 42, 42);
  position: absolute;

  top: v-bind(topPx);
  left: v-bind(leftPx);
  width: v-bind(widthPx);
  height: v-bind(heightPx);
  background: white;
  z-index: -1;
  border-radius: 20px;
  display: block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu {
  padding: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  margin: 100px 0;
}

.menu a {
  display: inline-block;
  padding: 5px;
  margin: 0 20px;
  color: black;
}
</style>
