<template>
  <div class="inbox">
    <div class="item" v-for="(item, index) in items">
      <input
        type="checkbox"
        class="checkbox"
        :checked="item.checked"
        @change="handleCheck($event, index)"
      />
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const items = ref([
  {
    text: 'This is an inbox layout',
    checked: false,
  },
  {
    text: 'Check one item',
    checked: false,
  },
  {
    text: 'Hold down your Shift key',
    checked: false,
  },
  {
    text: 'Check a lower item',
    checked: false,
  },
  {
    text: 'Everything in between should also be set to checked',
    checked: false,
  },
  {
    text: 'Try to do it without any libraries',
    checked: false,
  },
])

const isPrevIndexChecked = ref(false)
const prevIndex = ref<number | null>(null)

const shift = ref(false)

const handleCheck = (event: Event, index: number) => {
  const isChecked = (event.target as HTMLInputElement).checked

  if (isPrevIndexChecked.value === isChecked && shift.value) {
    const minIndex = Math.min(prevIndex.value, index)
    const maxIndex = Math.max(prevIndex.value, index)
    for (let i = minIndex; i < maxIndex; i++) items.value[i].checked = isChecked
  }

  isPrevIndexChecked.value = isChecked
  prevIndex.value = index
}

const handleShiftStatus = (event: KeyboardEvent) => {
  shift.value = event.shiftKey
}

onMounted(() => {
  document.addEventListener('keydown', handleShiftStatus)
  document.addEventListener('keyup', handleShiftStatus)
})

onUnmounted(() => {
  removeEventListener('keydown', handleShiftStatus)
  removeEventListener('keyup', handleShiftStatus)
})
</script>

<style scoped>
.inbox {
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.item:last-child {
  border-bottom: 0;
}

input:checked + p {
  background: #f9f9f9;
  text-decoration: line-through;
}

input[type='checkbox'] {
  margin: 20px;
}

p {
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  flex: 1;
  font-family: 'helvetica neue';
  font-size: 20px;
  font-weight: 200;
  border-left: 1px solid #d1e2ff;
}
</style>
