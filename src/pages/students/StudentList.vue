<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-indigo-10">
        <q-icon name="group" class="q-mr-sm" />Student Directory
      </div>
      <q-btn color="primary" icon="add" label="New Admission" to="/admin/students/add" unelevated />
    </div>

    <q-card flat bordered>
      <q-table
        :rows="students"
        :columns="columns"
        row-key="id"
        flat
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Student">
            <template v-slot:append><q-icon name="search" /></template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="primary" icon="visibility" size="sm" @click="viewDetails(props.row.id)" />
            <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteStudent(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const students = ref([])
    const filter = ref('')

    const columns = [
      { name: 'roll', align: 'left', label: 'Roll', field: 'roll', sortable: true },
      { name: 'name', align: 'left', label: 'Student Name', field: 'name', sortable: true },
      { name: 'class', align: 'center', label: 'Class', field: 'class' },
      { name: 'actions', align: 'right', label: 'Actions' }
    ]

    const loadData = () => {
      const data = localStorage.getItem('iching_students')
      students.value = data ? JSON.parse(data) : []
    }

    const deleteStudent = (id) => {
      $q.dialog({ title: 'Confirm', message: 'Delete this record?', cancel: true }).onOk(() => {
        students.value = students.value.filter(s => s.id !== id)
        localStorage.setItem('iching_students', JSON.stringify(students.value))
        $q.notify({ type: 'positive', message: 'Deleted successfully' })
      })
    }

    const viewDetails = (id) => router.push(`/admin/students/details?id=${id}`)

    onMounted(loadData)

    return { students, columns, filter, deleteStudent, viewDetails }
  }
}
</script>
