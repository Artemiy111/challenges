<template>
  <div class="panels flex flex-row w-full">
    <div
      class="panel panel1 flex-grow"
      :ref="el => (panelRefs[0] = el as any)"
      @click="openPanel(1)"
    >
      <p>Hey</p>
      <p>Let's</p>
      <p>Dance</p>
    </div>
    <div
      class="panel panel2 flex-grow"
      :ref="el => (panelRefs[1] = el as any)"
      @click="openPanel(2)"
    >
      <p>Give</p>
      <p>Take</p>
      <p>Receive</p>
    </div>
    <div
      class="panel panel3 flex-grow"
      :ref="el => (panelRefs[2] = el as any)"
      @click="openPanel(3)"
    >
      <p>Experience</p>
      <p>It</p>
      <p>Today</p>
    </div>
    <div
      class="panel panel4 flex-grow"
      :ref="el => (panelRefs[3] = el as any)"
      @click="openPanel(4)"
    >
      <p>Give</p>
      <p>All</p>
      <p>You can</p>
    </div>
    <div
      class="panel panel5 flex-grow"
      :ref="el => (panelRefs[4] = el as any)"
      @click="openPanel(5)"
    >
      <p>Life</p>
      <p>In</p>
      <p>Motion</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const panelRefs = ref<HTMLDivElement[]>([])

const openPanel = (panelNumber: number) => {
  const panelIndex = panelNumber - 1
  if (!panelRefs.value) return
  for (const index in panelRefs.value) {
    const panel = panelRefs.value[index]
    if (parseInt(index) === panelIndex) panel.classList.add('open')
    else panel.classList.remove('open')
  }
}
</script>

<style scoped>
.panels {
  min-height: 100vh;
  overflow: hidden;
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 100px;
  background: #6b0f9c;
  box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  align-items: center;
  /* Safari transitionend event.propertyName === flex */
  /* Chrome + FF transitionend event.propertyName === flex-grow */
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
    flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
  font-size: 20px;
  background-size: cover;
  background-position: center;
}
.panel.open {
  flex-grow: 2;
  font-size: 30px;
}
.panel.open p {
  opacity: 1;
}
.panel1 {
  background-image: url(https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80);
}
.panel2 {
  background-image: url(https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80);
}
.panel3 {
  background-image: url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d);
}
.panel4 {
  background-image: url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80);
}
.panel5 {
  background-image: url(https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80);
}

/* Flex Children */

.panel p {
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 2em;
  opacity: 0;
  transition: opacity 1s ease;
}

.panel p:nth-child(2) {
  font-size: 4em;
  opacity: 1;
}
</style>
