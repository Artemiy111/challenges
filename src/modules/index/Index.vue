<template>
  <div class="w-full h-[100dvh] flex flex-col justify-center items-center">
    <ul>
      <li v-for="number in 30">
        <RouterLink :to="`/day${String(number).padStart(2, '0')}`">Day {{ number }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
