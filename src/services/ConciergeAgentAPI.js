import { useEventsStore } from '../stores/events'

// Mock data for incidents
const mockIncidents = [
  {
    id: 'inc1',
    type: 'Traffic Accident',
    location: 'MG Road',
    description: 'Minor fender bender, traffic slowing down.',
    timestamp: Date.now() - 3600000, // 1 hour ago
    coords: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'inc2',
    type: 'Pothole',
    location: 'Koramangala 4th Block',
    description: 'Large pothole near the main signal.',
    timestamp: Date.now() - 7200000, // 2 hours ago
    coords: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: 'inc3',
    type: 'Flooding',
    location: 'Indiranagar 100 Feet Road',
    description: 'Water logging near the metro station.',
    timestamp: Date.now() - 10800000, // 3 hours ago
    coords: { lat: 12.9719, lng: 77.6412 }
  }
]

// Mock data for events
const mockEvents = [
  {
    id: 'evt1',
    type: 'Concert',
    name: 'Rock Fest',
    location: 'Palace Grounds',
    description: 'Annual rock music festival.',
    timestamp: Date.now() + 86400000, // Tomorrow
    coords: { lat: 13.0082, lng: 77.5946 }
  },
  {
    id: 'evt2',
    type: 'Food Festival',
    name: 'Taste of Bangalore',
    location: 'Lalbagh Botanical Garden',
    description: 'Local food vendors and culinary delights.',
    timestamp: Date.now() + 172800000, // Day after tomorrow
    coords: { lat: 12.9507, lng: 77.5848 }
  }
]

// Simulate a POST request for submitting a report
export const submitReport = async (reportData) => {
  console.log('Mock API: Submitting report:', reportData)
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Mock API: Report submitted successfully.')
      resolve({ success: true, message: 'Report submitted successfully.' })
    }, 1000)
  })
}

// Simulate a GET request for chat response
export const getChatResponse = async (message, context) => {
  console.log('Mock API: Getting chat response for message:', message)
  console.log('Mock API: Chat context:', context)
  return new Promise(resolve => {
    setTimeout(() => {
      let response = 'I am your Bangalore buddy. How can I help you today?'
      if (message.toLowerCase().includes('traffic')) {
        response = 'Traffic is moderate on Outer Ring Road. Expect delays near Marathahalli.'
      } else if (message.toLowerCase().includes('friends')) {
        response = 'There are many pubs in Koramangala and Indiranagar. You could also check out a live music venue.'
      } else if (message.toLowerCase().includes('nature')) {
        response = 'Lalbagh Botanical Garden and Cubbon Park are great for a nature retreat.'
      }
      console.log('Mock API: Sending chat response:', response)
      resolve({ response })
    }, 1500)
  })
}

// Initial data fetch (simulated)
export const getInitialEvents = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Mock API: Providing initial events.')
      resolve([...mockIncidents, ...mockEvents])
    }, 500)
  })
}
