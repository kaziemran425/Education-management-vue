<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-primary text-white row items-center">
        <q-icon name="person_check" size="sm" class="q-mr-sm" />
        <div class="text-h6">শিক্ষার্থীর উপস্থিতি (Student Attendance)</div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <q-input v-model="attendanceDate" type="date" label="তারিখ" outlined dense class="col-12 col-sm-3" stack-label />
        <q-select v-model="selectedClass" :options="classList" label="ক্লাস" outlined dense class="col-12 col-sm-3" />
        <q-select v-model="selectedSection" :options="['A', 'B', 'C']" label="সেকশন" outlined dense class="col-12 col-sm-3" />
        <q-btn color="primary" label="তালিকা লোড করুন" icon="sync" class="col-12 col-sm-3" @click="loadStudents" />
      </q-card-section>

      <q-separator v-if="students.length > 0" />

      <q-card-section v-if="students.length > 0">
        <q-table :rows="students" :columns="columns" row-key="id" flat bordered>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-btn-toggle
                v-model="props.row.status"
                toggle-color="green"
                flat
                dense
                :options="[
                  {label: 'Present', value: 'P'},
                  {label: 'Absent', value: 'A'}
                ]"
              />
            </q-td>
          </template>
        </q-table>
        <div class="text-right q-mt-md">
          <q-btn color="positive" label="উপস্থিতি সেভ করুন" icon="save" @click="saveAttendance" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const attendanceDate = ref(new Date().toISOString().substr(0, 10))
const selectedClass = ref(null)
const selectedSection = ref(null)
const classList = ref([])
const students = ref([])

const columns = [
  { name: 'roll', label: 'রোল', field: 'roll', align: 'left', sortable: true },
  { name: 'name', label: 'নাম', field: 'name', align: 'left' },
  { name: 'status', label: 'অবস্থা (P/A)', align: 'center' }
]

onMounted(() => {
  const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
  classList.value = savedClasses.map(c => c.name)
})

const loadStudents = () => {
  // এখানে আপনার স্টুডেন্ট লিস্ট লোড হবে
  students.value = [
    { id: 1, roll: '101', name: 'Arif Ahmed', status: 'P' },
    { id: 2, roll: '102', name: 'Sumi Akter', status: 'P' }
  ]
}

const saveAttendance = () => {
  const key = `std_attendance_${selectedClass.value}_${attendanceDate.value}`
  localStorage.setItem(key, JSON.stringify(students.value))
  $q.notify({ color: 'positive', message: 'উপস্থিতি সফলভাবে সেভ হয়েছে!' })
}
</script>
