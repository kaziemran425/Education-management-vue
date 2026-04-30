<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-orange-9 text-white">
        <div class="text-h6">মার্ক এন্ট্রি (Mark Entry)</div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="filter.exam" :options="examOptions" label="পরীক্ষা" outlined dense class="col-4" />
        <q-select v-model="filter.class" :options="['Class 1', 'Class 2']" label="ক্লাস" outlined dense class="col-4" />
        <q-btn color="orange-9" label="স্টুডেন্ট লোড করুন" @click="loadStudents" class="col-4" />
      </q-card-section>

      <q-card-section v-if="students.length > 0">
        <q-table :rows="students" :columns="studentCols" row-key="id" flat bordered>
          <template v-slot:body-cell-marks="props">
            <q-td :props="props">
              <q-input v-model.number="props.row.inputMarks" type="number" dense outlined style="width: 100px" @blur="updateLocalMark(props.row)" />
            </q-td>
          </template>
        </q-table>
        <div class="text-right q-mt-md">
          <q-btn color="positive" label="সব মার্ক সেভ করুন" icon="done_all" @click="saveAllMarks" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const filter = ref({ exam: '', class: '' })
const students = ref([])
const examOptions = ref([])

const studentCols = [
  { name: 'roll', label: 'রোল', field: 'roll', align: 'left' },
  { name: 'name', label: 'নাম', field: 'name', align: 'left' },
  { name: 'marks', label: 'মার্কস ইনপুট', field: 'inputMarks', align: 'center' }
]

const loadStudents = () => {
  // ডামি ডাটা (আপনার StudentList থেকে আসবে পরে)
  students.value = [
    { id: 1, roll: '101', name: 'Rahim Ali', inputMarks: 0 },
    { id: 2, roll: '102', name: 'Karim Uddin', inputMarks: 0 }
  ]
}

const saveAllMarks = () => {
  localStorage.setItem(`marks_${filter.value.exam}_${filter.value.class}`, JSON.stringify(students.value))
  alert('মার্কস সফলভাবে সেভ হয়েছে!')
}

onMounted(() => {
  const exams = JSON.parse(localStorage.getItem('exams') || '[]')
  examOptions.value = exams.map(e => e.title)
})
</script>
