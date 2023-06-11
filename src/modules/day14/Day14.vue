<template>
  <p>Object and Arrays - Reference VS Copy</p>
  {{ obj3 }}
</template>

<script setup lang="ts">
const obj1 = {
  a: 4,
  b: 5,
  50: 50,
}

const obj2 = structuredClone(obj1)
const obj3 = JSON.parse(JSON.stringify(obj2)) as typeof obj2
</script>
