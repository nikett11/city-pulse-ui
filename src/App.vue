<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isOpen="isSidebarOpen" @close-sidebar="closeSidebar" />

    <!-- Overlay for when sidebar is open -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black opacity-50 z-40" @click="closeSidebar"></div>

    <main class="flex-grow pt-16">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style>
/* Global styles can go here */
body {
  margin: 0;
}
</style>