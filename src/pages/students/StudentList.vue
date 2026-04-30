<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="row items-center">
        <div class="text-h6">শিক্ষার্থী তালিকা</div>
        <q-space />
        <q-input v-model="search" placeholder="নাম বা রোল দিয়ে খুঁজুন" dense outlined class="q-mr-sm">
          <template v-slot:append><q-icon name="search" /></template>
        </q-input>
        <q-btn color="primary" label="নতুন শিক্ষার্থী" icon="add" to="/students/StudentAdd" />
      </q-card-section>

      <q-table :rows="filteredStudents" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="blue" icon="visibility" size="sm" @click="$router.push(`/students/StudentDetails?id=${props.row.id}`)" />
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteStudent(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const students = ref([])
const search = ref('')

const columns = [
  { name: 'roll', label: 'রোল', field: 'roll', align: 'left', sortable: true },
  { name: 'name', label: 'নাম', field: 'name', align: 'left' },
  { name: 'class', label: 'ক্লাস', field: 'class', align: 'center' },
  { name: 'phone', label: 'মোবাইল', field: 'phone', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadData = () => { students.value = JSON.parse(localStorage.getItem('students') || '[]') }

const filteredStudents = computed(() => {
  return students.value.filter(s =>
    s.name.toLowerCase().includes(search.value.toLowerCase()) ||
    s.roll.includes(search.value)
  )
})

const deleteStudent = (id) => {
  students.value = students.value.filter(s => s.id !== id)
  localStorage.setItem('students', JSON.stringify(students.value))
}

onMounted(loadData)
</script>
