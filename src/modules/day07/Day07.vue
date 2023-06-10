<template>
  <div class="w-full h-[100dvh] flex justify-center items-center">
    <ul>
      <li>{{ isAtLeastOne19orOlder }}</li>
      <li>{{ isEveryone19orOlder }}</li>
      <li>{{ commentWithId823423 }}</li>
      <li>{{ comments }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 },
]

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 },
]

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const todayYear = new Date().getFullYear()
const isAtLeastOne19orOlder = people.some(p => todayYear - p.year >= 19)
// Array.prototype.every() // is everyone 19 or older?
const isEveryone19orOlder = people.every(p => todayYear - p.year >= 19)
// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const commentWithId823423 = comments.find(c => c.id === 823423)
// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
const index = comments.findIndex(c => c.id === 823423)
comments.splice(index, 1)
</script>
