<template>
  <div class="flex flex-col flex-grow">
    <template v-if="isLoading">
      <div class="flex flex-col items-center justify-center flex-grow">
        <LoadingSpinner />
        <p class="mt-4 text-customText">Loading updates...</p>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col flex-grow p-4">
        <h2 class="text-2xl font-bold mb-4">Your Updates</h2>
        <ExpandableList>
          <li v-for="event in events" :key="event.id" class="mb-1">
            <span class="font-semibold">{{ event.type }}</span>: {{ event.description }} ({{ event.location }})
          </li>
        </ExpandableList>
      </div>
      <div class="bg-green-500 flex items-center justify-center text-black font-bold rounded-lg mx-4 mb-4"
           :class="{ 'flex-grow': !isUpdatesExpanded, 'aspect-square': isUpdatesExpanded }">
        MAP Placeholder: {{ events.length }} events
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExpandableList from '../components/ExpandableList.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useEventsStore } from '../stores/events'
import { getInitialEvents } from '../services/ConciergeAgentAPI'
import { storeToRefs } from 'pinia'

const isLoading = ref(true) // Initial state is loading
const isUpdatesExpanded = ref(false)
const eventsStore = useEventsStore()
const { events } = storeToRefs(eventsStore) // Ensure reactivity

onMounted(async () => {
  isLoading.value = true // Set loading to true
  eventsStore.clearEvents() // Clear existing events
  const initialEvents = await getInitialEvents()
  eventsStore.setEvents(initialEvents) // Use setEvents to replace the array reactively
  isLoading.value = false // Set loading to false after fetch
})
</script>
