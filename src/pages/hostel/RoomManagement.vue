<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-indigo-10">
        <q-icon name="meeting_room" class="q-mr-sm" />Room Management
      </div>
      <q-btn color="indigo-10" icon="add_box" label="Allocate Room" @click="roomDialog = true" unelevated />
    </div>

    <!-- Room Cards Grid -->
    <div class="row q-col-gutter-md">
      <div v-for="room in rooms" :key="room.id" class="col-12 col-sm-6 col-md-4">
        <q-card bordered flat class="room-card transition-hover shadow-1">
          <q-card-section class="bg-indigo-1 text-indigo-10 flex justify-between items-center">
            <div class="text-subtitle1 text-weight-bold">Room No: {{ room.number }}</div>
            <q-badge :color="room.capacity > room.occupied ? 'positive' : 'negative'">
              {{ room.capacity > room.occupied ? 'Available' : 'Full' }}
            </q-badge>
          </q-card-section>

          <q-card-section>
            <div class="text-caption text-grey-7">Hostel: {{ room.hostelName }}</div>
            <div class="q-mt-sm">
              <q-linear-progress :value="room.occupied / room.capacity" color="indigo" size="10px" rounded />
              <div class="text-right text-caption q-mt-xs">
                Seats: {{ room.occupied }} / {{ room.capacity }}
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat color="negative" icon="delete" @click="deleteRoom(room.id)" dense size="sm" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="rooms.length === 0" class="text-center q-pa-xl">
      <q-icon name="bed" size="100px" color="grey-4" />
      <div class="text-grey-6 text-h6">No rooms found. Add your first room!</div>
    </div>

    <!-- Add Room Dialog -->
    <q-dialog v-model="roomDialog">
      <q-card style="min-width: 400px">
        <q-card-section class="bg-indigo-10 text-white">
          <div class="text-h6">Register New Room</div>
        </q-card-section>

        <q-card-section class="q-pa-lg q-gutter-y-md">
          <q-input v-model="form.number" label="Room Number" outlined dense />
          <q-select v-model="form.hostelName" :options="hostelOptions" label="Select Hostel" outlined dense />
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input v-model.number="form.capacity" type="number" label="Total Capacity" outlined dense />
            </div>
            <div class="col-6">
              <q-input v-model.number="form.occupied" type="number" label="Current Occupied" outlined dense />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Close" v-close-popup />
          <q-btn color="indigo-10" label="Add Room" @click="saveRoom" unelevated />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const roomDialog = ref(false)
    const rooms = ref([])
    const hostelOptions = ref([])

    const form = reactive({
      number: '',
      hostelName: '',
      capacity: 4,
      occupied: 0
    })

    const loadData = () => {
      // Load Rooms
      const savedRooms = localStorage.getItem('iching_rooms')
      rooms.value = savedRooms ? JSON.parse(savedRooms) : []

      // Load Hostel options for select dropdown
      const savedHostels = localStorage.getItem('iching_hostels')
      if (savedHostels) {
        hostelOptions.value = JSON.parse(savedHostels).map(h => h.name)
      } else {
        hostelOptions.value = ['Main Boys Hostel', 'Staff Residence']
      }
    }

    const saveRoom = () => {
      if (!form.number || !form.hostelName) {
        $q.notify({ color: 'red-5', message: 'Missing room details' })
        return
      }
      const newRoom = { ...form, id: Date.now() }
      rooms.value.push(newRoom)
      localStorage.setItem('iching_rooms', JSON.stringify(rooms.value))
      roomDialog.value = false
      Object.assign(form, { number: '', hostelName: '', capacity: 4, occupied: 0 })
      $q.notify({ type: 'positive', message: 'Room allocated!' })
    }

    const deleteRoom = (id) => {
      rooms.value = rooms.value.filter(r => r.id !== id)
      localStorage.setItem('iching_rooms', JSON.stringify(rooms.value))
    }

    onMounted(loadData)

    return {
      rooms, roomDialog, form, hostelOptions,
      saveRoom, deleteRoom
    }
  }
}
</script>

<style scoped>
.room-card {
  border-radius: 12px;
  overflow: hidden;
}
.transition-hover:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
</style>
