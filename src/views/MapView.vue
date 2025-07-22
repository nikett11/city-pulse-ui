<template>
  <div class="relative flex flex-col h-full">
    <!-- Map Placeholder -->
    <div class="flex-grow bg-gray-700 flex items-center justify-center text-customText text-2xl">
      MAP: {{ selectedOverlay || 'No Overlay Selected' }} ({{ events.length }} events)
    </div>

    <!-- Overlay Options -->
    <div class="absolute bottom-0 left-0 right-0 flex-shrink-0 bg-transparent p-4 overflow-x-auto whitespace-nowrap flex justify-center z-10">
      <button @click="handleButtonClick('Traffic')" 
              @mousedown="startLongPressTimer($event, 'Traffic Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Traffic Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Traffic', 'bg-black': selectedOverlay !== 'Traffic' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">traffic</span>
      </button>
      <button @click="handleButtonClick('Incidents')" 
              @mousedown="startLongPressTimer($event, 'Incidents Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Incidents Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Incidents', 'bg-black': selectedOverlay !== 'Incidents' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">warning</span>
      </button>
      <button @click="handleButtonClick('Events')" 
              @mousedown="startLongPressTimer($event, 'Events Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Events Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Events', 'bg-black': selectedOverlay !== 'Events' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">event</span>
      </button>
      <button @click="handleButtonClick('Safety')" 
              @mousedown="startLongPressTimer($event, 'Safety Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Safety Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Safety', 'bg-black': selectedOverlay !== 'Safety' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">security</span>
      </button>
      <button @click="handleButtonClick('Public Transport')" 
              @mousedown="startLongPressTimer($event, 'Public Transport Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Public Transport Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Public Transport', 'bg-black': selectedOverlay !== 'Public Transport' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">directions_bus</span>
      </button>
      <button @click="handleButtonClick('Food & Drink')" 
              @mousedown="startLongPressTimer($event, 'Food & Drink Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Food & Drink Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Food & Drink', 'bg-black': selectedOverlay !== 'Food & Drink' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">restaurant</span>
      </button>
      <button @click="handleButtonClick('Attractions')" 
              @mousedown="startLongPressTimer($event, 'Attractions Overlay')" @mouseup="clearLongPressTimer" @mouseleave="clearLongPressTimer"
              @touchstart="startLongPressTimer($event, 'Attractions Overlay')" @touchend="clearLongPressTimer"
              :class="{ 'bg-blue-500': selectedOverlay === 'Attractions', 'bg-black': selectedOverlay !== 'Attractions' }"
              class="text-customText w-12 h-12 rounded-full mr-2 flex items-center justify-center">
        <span class="material-icons">attractions</span>
      </button>
    </div>

    <!-- Snackbar -->
    <div v-if="showSnackbar" 
         :style="{ left: snackbarX, bottom: snackbarY }"
         class="absolute bg-black bg-opacity-60 text-customText px-4 py-2 rounded-md z-20 transition-opacity duration-300 transform -translate-x-1/2">
      {{ snackbarText }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEventsStore } from '../stores/events'
import { getInitialEvents } from '../services/ConciergeAgentAPI'
import { storeToRefs } from 'pinia'

const selectedOverlay = ref(null)
const snackbarText = ref('')
const showSnackbar = ref(false)
const snackbarX = ref('0px')
const snackbarY = ref('0px')

let longPressTimer = null
let snackbarVisibleTimer = null
let isLongPressing = false

const eventsStore = useEventsStore()
const { events } = storeToRefs(eventsStore)

onMounted(async () => {
  eventsStore.clearEvents()
  const initialEvents = await getInitialEvents()
  eventsStore.setEvents(initialEvents)
})

const handleButtonClick = (overlayName) => {
  if (isLongPressing) {
    isLongPressing = false
    return
  }
  if (selectedOverlay.value === overlayName) {
    selectedOverlay.value = null
  } else {
    selectedOverlay.value = overlayName
  }
  hideSnackbar()
}

const startLongPressTimer = (event, text) => {
  snackbarText.value = text
  // Calculate position relative to the button
  const buttonRect = event.currentTarget.getBoundingClientRect()

  snackbarX.value = `${buttonRect.left + buttonRect.width / 2}px`
  snackbarY.value = `${buttonRect.height + 20}px` // 20px above the button

  longPressTimer = setTimeout(() => {
    showSnackbar.value = true
    isLongPressing = true
    snackbarVisibleTimer = setTimeout(() => {
      hideSnackbar()
    }, 1500)
  }, 375)
}

const clearLongPressTimer = () => {
  clearTimeout(longPressTimer)
}

const hideSnackbar = () => {
  clearTimeout(longPressTimer)
  clearTimeout(snackbarVisibleTimer)
  showSnackbar.value = false
  snackbarText.value = ''
  isLongPressing = false
}
</script>

<style scoped>
/* Add any specific styles for MapView if needed */
</style>
