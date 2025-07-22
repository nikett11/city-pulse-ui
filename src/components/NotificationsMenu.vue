<template>
  <div class="absolute top-full right-0 mt-2 w-64 bg-black rounded-md shadow-lg py-1 z-50">
    <div class="px-4 py-2 text-lg font-bold text-gray-300">Your recent events</div>
    <template v-if="recentEvents.length > 0">
      <a v-for="event in recentEvents" :key="event.id" href="#" @click.prevent="closeMenu" class="block px-4 py-2 text-sm text-customText hover:bg-gray-700">
        <span class="font-semibold">{{ event.type }}</span>: {{ event.description }}
      </a>
    </template>
    <template v-else>
      <p class="px-4 py-2 text-sm text-gray-500">No recent events.</p>
    </template>
  </div>
</template>

<script setup>
import { defineEmits, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['close-menu'])

const eventsStore = useEventsStore()
const { events } = storeToRefs(eventsStore)

const recentEvents = computed(() => {
  // Sort by timestamp (newest first) and take the top 3
  return [...events.value]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3)
})

const closeMenu = () => {
  emit('close-menu')
}
</script>