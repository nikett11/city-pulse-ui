<template>
  <div class="flex flex-col h-full p-4">
    <!-- Step 1: Report Details -->
    <template v-if="currentStep === 1">
      <div class="flex-grow flex flex-col-reverse min-h-full">
        <div class="mb-4">
          <label for="description" class="block text-customText text-lg font-bold mb-2">Detailed description</label>
          <textarea id="description" v-model="report.description" placeholder="Describe the incident in your own words... A more detailed description helps us better help the community!"
                    rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-customText leading-tight focus:outline-none focus:shadow-outline resize-none"></textarea>
        </div>

        <div class="mb-4">
          <label for="incidentType" class="block text-customText text-lg font-bold mb-2">Type of Incident</label>
          <div class="relative">
            <select id="incidentType" v-model="report.incidentType"
                    class="block appearance-none w-full bg-black border border-gray-700 text-customText py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500">
              <option value="">Type of incident</option>
              <option value="Traffic Accident">Traffic Accident</option>
              <option value="Flooding">Flooding</option>
              <option value="Potholes">Potholes</option>
              <option value="Bad streetlight">Bad streetlight</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-customText">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="location" class="block text-customText text-lg font-bold mb-2">Location</label>
          <input type="text" id="location" v-model="report.location" placeholder="e.g. Indiranagar"
                 class="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-customText leading-tight focus:outline-none focus:shadow-outline">
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="nextStep" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Next
        </button>
      </div>
    </template>

    <!-- Step 2: Upload Reference -->
    <template v-if="currentStep === 2">
      <div class="flex-grow flex flex-col">
        <h2 class="text-xl font-bold mb-4">Upload reference (optional)</h2>
        <div class="flex-grow bg-gray-700 flex items-center justify-center text-customText text-center p-4 rounded-lg mb-4">
          Upload placeholder.<br>Previews before submission
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="submitReport" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { submitReport as submitReportAPI } from '../services/ConciergeAgentAPI'

const currentStep = ref(1)

const report = ref({
  location: '',
  incidentType: '',
  description: ''
})

const nextStep = () => {
  currentStep.value++
  console.log('Moving to next step. Current step:', currentStep.value)
}

const submitReport = async () => {
  console.log('Submitting report:', report.value)
  const response = await submitReportAPI(report.value)
  if (response.success) {
    alert(response.message)
    // Clear form and reset step
    report.value = {
      location: '',
      incidentType: '',
      description: ''
    }
    currentStep.value = 1
  } else {
    alert('Error submitting report.')
  }
}
</script>

<style scoped>
/* Add any specific styles for SubmitReportView if needed */
</style>