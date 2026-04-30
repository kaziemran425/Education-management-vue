<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-blue-grey text-white text-h6">উপস্থিতি রিপোর্ট (Attendance Report)</q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="reportType" :options="['Student', 'Teacher', 'Staff']" label="রিপোর্ট টাইপ" outlined dense class="col-4" />
        <q-input v-model="searchDate" type="date" label="তারিখ" outlined dense stack-label class="col-4" />
        <q-btn color="blue-grey" label="রিপোর্ট দেখুন" icon="search" class="col-4" @click="generateReport" />
      </q-card-section>

      <q-card-section v-if="reportData.length">
        <q-table :rows="reportData" :columns="reportCols" flat bordered />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const reportType = ref('Student')
const searchDate = ref('')
const reportData = ref([])
const reportCols = [
  { name: 'name', label: 'নাম', field: 'name', align: 'left' },
  { name: 'status', label: 'অবস্থা', field: 'status', align: 'center' }
]

const generateReport = () => {
  let key = ''
  if (reportType.value === 'Student') key = `std_attendance_` // এটি আরও ডাইনামিক করা যাবে
  else if (reportType.value === 'Teacher') key = `teacher_attendance_${searchDate.value}`

  const data = localStorage.getItem(key)
  if (data) {
    reportData.value = JSON.parse(data).map(d => ({
      name: d.name,
      status: d.present || d.status === 'P' ? 'Present' : 'Absent'
    }))
  } else {
    alert('কোনো ডাটা পাওয়া যায়নি!')
    reportData.value = []
  }
}
</script>
