<template>
  <div class="w-full h-[100dvh] flex flex-col gap-10 items-center justify-center">
    <p>{{ bornIn1500s }}</p>
    <p>{{ inventorsWithFullNames }}</p>
    <p>{{ sortedByBirthdate }}</p>
    <p>{{ sumOfLifes }}</p>
    <p>{{ sortedByYearsLived }}</p>
    <p>{{ sortByLastName }}</p>
    <p>{{ sortByLastName }}</p>
  </div>
</template>

<script setup lang="ts">
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
]

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornIn1500s = inventors.filter(i => i.year >= 1500 && i.year < 1600)

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const inventorsWithFullNames = inventors.map(i => ({
  name: i.first + ' ' + i.last,
  year: i.year,
  passed: i.passed,
}))
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const sortedByBirthdate = [...inventors].sort((a, b) => a.year - b.year)
// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const sumOfLifes = inventors.reduce((acc, i) => acc + i.passed - i.year, 0)
// 5. Sort the inventors by years lived
const sortedByYearsLived = [...inventors].sort((a, b) => b.passed - b.year - (a.passed - a.year))
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// 7. sort Exercise
// Sort the people alphabetically by last name
const sortByLastName = [...inventors].sort((a, b) => {
  if (a.last < b.last) return -1
  else if (a.last === b.last) return 0
  else return 1
})
// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
]
</script>
