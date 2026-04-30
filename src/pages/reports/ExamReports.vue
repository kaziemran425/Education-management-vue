<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-indigo-9 text-white row items-center">
        <q-icon name="analytics" size="sm" class="q-mr-sm" />
        <div class="text-h6">পরীক্ষার রিপোর্ট (Exam Analytics)</div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="filter.exam" :options="examOptions" label="পরীক্ষা" outlined dense class="col-12 col-sm-4" />
        <q-select v-model="filter.class" :options="['Class 1', 'Class 2']" label="ক্লাস" outlined dense class="col-12 col-sm-4" />
        <q-btn color="indigo-9" icon="search" label="রিপোর্ট জেনারেট করুন" class="col-12 col-sm-4" @click="generateReport" />
      </q-card-section>

      <q-table v-if="reportData.length" :rows="reportData" :columns="columns" flat bordered class="q-mt-md">
        <template v-slot:body-cell-performance="props">
          <q-td :props="props">
            <q-linear-progress :value="props.row.marks / 100" color="indigo" class="q-mt-sm" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const filter = ref({ exam: '', class: '' })
const examOptions = ref([])
const reportData = ref([])

const columns = [
  { name: 'name', label: 'শিক্ষার্থীর নাম', field: 'name', align: 'left' },
  { name: 'marks', label: 'প্রাপ্ত নম্বর', field: 'marks', align: 'center', sortable: true },
  { name: 'performance', label: 'পারফরম্যান্স গ্রাফ', align: 'center' }
]

const generateReport = () => {
  const savedMarks = localStorage.getItem(`marks_${filter.value.exam}_${filter.value.class}`)
  if (savedMarks) {
    const data = JSON.parse(savedMarks)
    reportData.value = data.map(item => ({ name: item.name, marks: item.inputMarks }))
  } else {
    alert('ডাটা পাওয়া যায়নি!')
    reportData.value = []
  }
}

onMounted(() => {
  const exams = JSON.parse(localStorage.getItem('exams') || '[]')
  examOptions.value = exams.map(e => e.title)
})
</script>
