<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md">
      <div class="text-h5 q-mb-md text-primary font-bold">ফলাফল প্রকাশ (Result Management)</div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-5">
           <q-select v-model="selectedExam" :options="examOptions" label="পরীক্ষা সিলেক্ট করুন" outlined />
        </div>
        <div class="col-12 col-md-5">
           <q-select v-model="selectedClass" :options="['Class 1', 'Class 2']" label="ক্লাস সিলেক্ট করুন" outlined />
        </div>
        <div class="col-12 col-md-2">
           <q-btn color="primary" label="ভিউ রেজাল্ট" class="full-height full-width" @click="generateResult" />
        </div>
      </div>

      <q-separator class="q-my-lg" />

      <q-table v-if="resultData.length" :rows="resultData" :columns="resultCols" flat bordered>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="props.row.marks >= 33 ? 'green' : 'red'">
              {{ props.row.marks >= 33 ? 'পাস' : 'ফেইল' }}
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedExam = ref(null)
const selectedClass = ref(null)
const examOptions = ref([])
const resultData = ref([])

const resultCols = [
  { name: 'roll', label: 'রোল', field: 'roll', align: 'left' },
  { name: 'name', label: 'নাম', field: 'name', align: 'left' },
  { name: 'marks', label: 'প্রাপ্ত নম্বর', field: 'marks', align: 'center' },
  { name: 'status', label: 'অবস্থা', align: 'center' }
]

const generateResult = () => {
  const savedMarks = localStorage.getItem(`marks_${selectedExam.value}_${selectedClass.value}`)
  if (savedMarks) {
    const rawData = JSON.parse(savedMarks)
    resultData.value = rawData.map(item => ({
      roll: item.roll,
      name: item.name,
      marks: item.inputMarks
    }))
  } else {
    alert('এই ক্লাসের কোনো মার্কস এন্ট্রি করা হয়নি!')
  }
}

onMounted(() => {
  const exams = JSON.parse(localStorage.getItem('exams') || '[]')
  examOptions.value = exams.map(e => e.title)
})
</script>
