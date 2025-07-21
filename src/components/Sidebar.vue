<template>
  <aside :class="[ 'fixed top-0 left-0 h-full bg-black text-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 w-64', isOpen ? 'translate-x-0' : '-translate-x-full' ]">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-8">City Pulse Menu</h2>
      <ul>
        <li class="mb-5">
          <router-link to="/" @click="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">dashboard</span> Dashboard
          </router-link>
        </li>
        <li class="mb-5">
          <router-link to="/map" @click="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">map</span> Map
          </router-link>
        </li>
        <li class="mb-5">
          <router-link to="/chat" @click="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">chat</span> Chat
          </router-link>
        </li>
        <li class="mb-5">
          <router-link to="/report" @click="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">report</span> Submit Report
          </router-link>
        </li>
        <li class="mb-5 border-t border-gray-700 pt-5">
          <router-link to="/profile" @click="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">person</span> View Profile
          </router-link>
        </li>
        <li class="mb-5">
          <a href="#" @click.prevent="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">logout</span> Log Out
          </a>
        </li>
        <li class="mb-5">
          <a href="#" @click.prevent="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">subscriptions</span> My Subscription
          </a>
        </li>
        <li class="mb-5">
          <a href="#" @click.prevent="closeSidebar" class="flex items-center text-lg hover:text-blue-400">
            <span class="material-icons mr-3">help</span> Help
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-sidebar'])

const closeSidebar = () => {
  emit('close-sidebar')
}
</script>
