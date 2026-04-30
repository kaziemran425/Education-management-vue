<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">পরীক্ষার রুটিন (Exam Routine)</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-select v-model="selectedExam" :options="examOptions" label="পরীক্ষা সিলেক্ট করুন" outlined dense />
            <q-input v-model="routineEntry.date" type="date" label="তারিখ" outlined dense class="q-mt-sm" stack-label />
            <q-input v-model="routineEntry.subject" label="বিষয়" outlined dense class="q-mt-sm" />
            <q-input v-model="routineEntry.time" label="সময় (যেমন: 10:00 AM)" outlined dense class="q-mt-sm" />
            <q-btn color="teal" label="রুটিন এড করুন" icon="event" class="q-mt-md full-width" @click="addToRoutine" />
          </div>

          <div class="col-12 col-md-8">
            <q-table :rows="filteredRoutine" :columns="routineCols" flat bordered no-data-label="কোনো রুটিন পাওয়া যায়নি" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedExam = ref(null)
const examOptions = ref([])
const routine = ref([])
const routineEntry = ref({ date: '', subject: '', time: '' })

const routineCols = [
  { name: 'date', label: 'তারিখ', field: 'date', align: 'left' },
  { name: 'subject', label: 'বিষয়', field: 'subject', align: 'left' },
  { name: 'time', label: 'সময়', field: 'time', align: 'center' }
]

const loadAll = () => {
  const exams = JSON.parse(localStorage.getItem('exams') || '[]')
  examOptions.value = exams.map(e => e.title)
  routine.value = JSON.parse(localStorage.getItem('routines') || '[]')
}

const filteredRoutine = computed(() => {
  return routine.value.filter(r => r.examName === selectedExam.value)
})

const addToRoutine = () => {
  if(!selectedExam.value) return alert('আগে পরীক্ষা সিলেক্ট করুন')
  const data = { ...routineEntry.value, examName: selectedExam.value, id: Date.now() }
  routine.value.push(data)
  localStorage.setItem('routines', JSON.stringify(routine.value))
  routineEntry.value = { date: '', subject: '', time: '' }
}

onMounted(loadAll)
</script>
