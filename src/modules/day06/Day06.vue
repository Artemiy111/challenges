<template>
  <div class="flex w-full h-[100dvh] pt-20 items-center flex-col gap-20">
    <form class="search-form">
      <input type="text" class="search" placeholder="City or State" v-model="filter" />
      <ul class="suggestions">
        <li v-for="[city, state] of highlightedCities" class="flex gap-5">
          <span v-html="city"></span><span class="text-slate-700" v-html="state"></span>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

type City = {
  city: string
  growth_from_2000_to_2013: string
  latitude: number
  longitude: number
  population: string
  rank: string
  state: string
}

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

onMounted(() => {
  fetchCities()
})

const fetchCities = async () => {
  const fetchedCities = (await (await fetch(endpoint)).json()) as City[]
  cities.value = fetchedCities
}

const cities = ref<City[]>([])
const filter = ref('')
const foundedCities = computed(() =>
  cities.value.filter(c => {
    const regexp = new RegExp(filter.value, 'gi')
    return c.city.match(regexp) || c.state.match(regexp)
  })
)

const highlightedCities = computed(() => {
  const regexp = new RegExp(filter.value, 'gi')
  return foundedCities.value.map(city => {
    if (!filter.value) return [city.city, city.state] as const
    console.log(city.city.matchAll(regexp).next())
    return [
      city.city.replace(regexp, s => `<mark>${s}</mark>`),
      city.state.replace(regexp, s => `<mark>${s}</mark>`),
    ] as const
  })
})
</script>

<style scoped>
input {
  padding: 20px;
}

input.search {
  margin: 0;
  text-align: center;
  outline: 0;
  border: 10px solid #f7f7f7;
  width: 120%;
  left: -10%;
  position: relative;
  top: 10px;
  z-index: 2;
  border-radius: 5px;
  font-size: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
}

.suggestions li {
  background: white;
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
}

.suggestions li:nth-child(even) {
  transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
  background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
}

.suggestions li:nth-child(odd) {
  transform: perspective(100px) rotateX(-3deg) translateY(3px);
  background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
}

span.population {
  font-size: 15px;
}
</style>
