<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">শিক্ষক উপস্থিতি (Teacher Attendance)</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="date" type="date" label="তারিখ" outlined dense stack-label class="q-mb-md" />
        <q-table :rows="teachers" :columns="tColumns" flat bordered>
          <template v-slot:body-cell-attendance="props">
            <q-td :props="props">
              <q-checkbox v-model="props.row.present" label="Present" color="green" />
            </q-td>
          </template>
        </q-table>
        <q-btn color="secondary" label="সেভ করুন" class="q-mt-md full-width" @click="saveTAttendance" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const date = ref(new Date().toISOString().substr(0, 10))
const teachers = ref([
  { id: 1, name: 'Mr. Rahim', present: true },
  { id: 2, name: 'Ms. Karima', present: true }
])

const tColumns = [
  { name: 'name', label: 'শিক্ষকের নাম', field: 'name', align: 'left' },
  { name: 'attendance', label: 'উপস্থিতি', align: 'center' }
]

const saveTAttendance = () => {
  localStorage.setItem(`teacher_attendance_${date.value}`, JSON.stringify(teachers.value))
  alert('শিক্ষকদের উপস্থিতি সেভ হয়েছে।')
}
</script>
