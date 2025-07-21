<template>
  <header class="fixed top-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between shadow-lg z-30">
    <div class="flex items-center">
      <button @click="toggleSidebar" class="mr-4 focus:outline-none">
        <span class="material-icons text-3xl">menu</span>
      </button>
      <div>
        <h1 class="text-2xl font-bold">City Pulse</h1>
        <p class="text-sm text-gray-400">Bangalore</p>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="material-icons text-3xl">account_circle</span>
      <span class="material-icons text-3xl">more_vert</span>
    </div>
  </header>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>
