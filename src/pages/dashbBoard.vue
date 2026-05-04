<template>
  <q-page class="q-pa-md">
    <!-- Header Section -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-primary">
        <q-icon name="schedule" class="q-mr-sm" />Class Routine
      </div>
      <q-btn
        outline
        color="primary"
        icon="print"
        label="Download PDF"
        @click="downloadPDF"
      />
    </div>

    <!-- Day Filter Chips -->
    <div class="q-mb-lg row q-gutter-sm justify-center">
      <q-btn
        v-for="day in weekDays"
        :key="day"
        :label="day"
        :color="selectedDay === day ? 'primary' : 'grey-4'"
        :text-color="selectedDay === day ? 'white' : 'dark'"
        unelevated
        rounded
        @click="selectedDay = day"
        class="q-px-md"
      />
    </div>

    <!-- Routine Table -->
    <q-card flat bordered class="shadow-2">
      <q-card-section class="bg-primary text-white q-py-sm">
        <div class="text-subtitle1 text-weight-bold">
          {{ selectedDay }}'s Schedule
        </div>
      </q-card-section>

      <q-separator />

      <q-table
        :rows="filteredRoutine"
        :columns="columns"
        row-key="time"
        flat
        hide-bottom
        :pagination="{ rowsPerPage: 0 }"
      >
        <!-- Custom Body Rendering for Badge Style -->
        <template v-slot:body-cell-subject="props">
          <q-td :props="props">
            <q-badge color="indigo-1" text-color="indigo-10" class="text-weight-bold q-pa-sm">
              {{ props.row.subject }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-time="props">
          <q-td :props="props" class="text-weight-medium">
            <q-icon name="access_time" color="grey-7" class="q-mr-xs" />
            {{ props.row.time }}
          </q-td>
        </template>
      </q-table>

      <!-- Empty State if no classes -->
      <div v-if="filteredRoutine.length === 0" class="text-center q-pa-xl">
        <q-icon name="event_busy" size="80px" color="grey-4" />
        <div class="text-h6 text-grey-6 q-mt-md">No classes scheduled for today</div>
      </div>
    </q-card>

    <!-- Info Section -->
    <div class="q-mt-lg q-pa-md bg-blue-1 rounded-borders border-blue row items-center">
      <q-icon name="info" color="blue-8" size="sm" class="q-mr-sm" />
      <div class="text-caption text-blue-9">
        * Note: Please contact the class teacher for any sudden changes in the routine.
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const selectedDay = ref('Monday')
    const weekDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

    const columns = [
      { name: 'time', align: 'left', label: 'Time Slot', field: 'time' },
      { name: 'subject', align: 'left', label: 'Subject', field: 'subject' },
      { name: 'teacher', align: 'left', label: 'Teacher', field: 'teacher' },
      { name: 'room', align: 'center', label: 'Room No', field: 'room' }
    ]

    // Mock Routine Data (Local Storage থেকে ডাটা লোড করার লজিক এখানে যুক্ত করা যাবে)
    const routineData = ref([
      { day: 'Monday', time: '09:00 AM - 09:45 AM', subject: 'Mathematics', teacher: 'Mr. Rahim', room: '101' },
      { day: 'Monday', time: '09:45 AM - 10:30 AM', subject: 'English', teacher: 'Ms. Emily', room: '102' },
      { day: 'Monday', time: '11:00 AM - 11:45 AM', subject: 'Physics', teacher: 'Dr. Karim', room: 'Lab-1' },
      { day: 'Tuesday', time: '09:00 AM - 09:45 AM', subject: 'Chemistry', teacher: 'Ms. Sultana', room: 'Lab-2' },
      { day: 'Wednesday', time: '10:00 AM - 10:45 AM', subject: 'ICT', teacher: 'Mr. Jamil', room: 'CS-01' }
    ])

    // Filter routine based on selected day
    const filteredRoutine = computed(() => {
      return routineData.value.filter(item => item.day === selectedDay.value)
    })

    const downloadPDF = () => {
      $q.notify({
        message: 'Preparing your routine for download...',
        color: 'info',
        icon: 'file_download'
      })
    }

    onMounted(() => {
      // বর্তমান দিন অনুযায়ী অটো ফিল্টার করার ব্যবস্থা
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
      if (weekDays.includes(today)) {
        selectedDay.value = today
      }
    })

    return {
      selectedDay,
      weekDays,
      columns,
      filteredRoutine,
      downloadPDF
    }
  }
}
</script>

<style scoped>
.border-blue {
  border: 1px solid #bbdefb;
}
.q-table th {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
