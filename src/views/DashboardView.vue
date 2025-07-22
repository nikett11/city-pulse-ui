<template>
  <div class="flex flex-col flex-grow p-4">
    <template v-if="isLoading">
      <div class="flex flex-col items-center justify-center flex-grow">
        <LoadingSpinner />
        <p class="mt-4 text-customText">Loading updates...</p>
      </div>
    </template>
    <template v-else>
      <div class="p-4 pt-4">
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
  console.log('DashboardView: onMounted fired.')
  console.log('DashboardView: Events in store before fetch:', eventsStore.events.length)
  
  isLoading.value = true // Set loading to true
  eventsStore.clearEvents() // Clear existing events
  const initialEvents = await getInitialEvents()
  console.log('DashboardView: Fetched initial events:', initialEvents.length)
  eventsStore.setEvents(initialEvents) // Use setEvents to replace the array reactively
  console.log('DashboardView: Events in store after fetch:', eventsStore.events.length)
  isLoading.value = false // Set loading to false after fetch
})
</script>