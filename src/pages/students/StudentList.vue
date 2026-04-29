<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Student Management</div>
        <div class="text-caption text-grey-7">Manage your student records and admission status</div>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="New Admission"
        rounded
        unelevated
        @click="openDialog()"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-4">
        <q-card class="my-card shadow-2 text-center q-pa-sm">
          <div class="text-h6 text-primary">{{ students.length }}</div>
          <div class="text-caption">Total Students</div>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="my-card shadow-2 text-center q-pa-sm">
          <div class="text-h6 text-green">{{ activeCount }}</div>
          <div class="text-caption">Active Students</div>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="my-card shadow-2 text-center q-pa-sm">
          <div class="text-h6 text-orange">{{ inactiveCount }}</div>
          <div class="text-caption">On Leave/Inactive</div>
        </q-card>
      </div>
    </div>

    <q-card class="shadow-5 border-radius-10">
      <q-table
        :rows="students"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Student">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" color="primary" text-color="white" class="q-mr-sm">
                {{ props.row.name.charAt(0) }}
              </q-avatar>
              <div class="text-weight-bold">{{ props.row.name }}</div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="text-center">
            <q-chip
              :color="props.row.status === 'Active' ? 'green-1' : 'red-1'"
              :text-color="props.row.status === 'Active' ? 'green-9' : 'red-9'"
              size="sm"
              class="text-weight-bold"
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" size="sm" @click="openDialog(props.row)" />
            <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteStudent(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 400px; border-radius: 15px;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ isEdit ? 'Update Student' : 'Student Admission' }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md q-gutter-md">
          <q-input filled v-model="form.name" label="Student Full Name" dense />
          <q-input filled v-model="form.roll" label="Roll Number" dense />
          <q-select filled v-model="form.class" :options="['Class 9', 'Class 10', 'Class 11']" label="Select Class" dense />
          <q-select filled v-model="form.status" :options="['Active', 'Inactive']" label="Status" dense />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn unelevated :label="isEdit ? 'Update' : 'Save'" color="primary" @click="saveStudent" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    // --- State ---
    const students = ref([])
    const filter = ref('')
    const showDialog = ref(false)
    const isEdit = ref(false)
    const currentId = ref(null)

    const form = reactive({
      name: '',
      roll: '',
      class: '',
      status: 'Active'
    })

    const columns = [
      { name: 'name', align: 'left', label: 'Student Name', field: 'name', sortable: true },
      { name: 'roll', align: 'left', label: 'Roll', field: 'roll', sortable: true },
      { name: 'class', align: 'left', label: 'Class', field: 'class', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status' },
      { name: 'actions', align: 'right', label: 'Actions' }
    ]

    // --- Computed ---
    const activeCount = computed(() => students.value.filter(s => s.status === 'Active').length)
    const inactiveCount = computed(() => students.value.filter(s => s.status === 'Inactive').length)

    // --- Methods ---
    const loadData = () => {
      const saved = localStorage.getItem('school_students')
      if (saved) {
        students.value = JSON.parse(saved)
      }
    }

    const openDialog = (student = null) => {
      if (student) {
        isEdit.value = true
        currentId.value = student.id
        form.name = student.name
        form.roll = student.roll
        form.class = student.class
        form.status = student.status
      } else {
        isEdit.value = false
        form.name = ''; form.roll = ''; form.class = ''; form.status = 'Active'
      }
      showDialog.value = true
    }

    const saveStudent = () => {
      if (!form.name || !form.roll) {
        $q.notify({ color: 'warning', message: 'Name and Roll are required' })
        return
      }

      if (isEdit.value) {
        const index = students.value.findIndex(s => s.id === currentId.value)
        students.value[index] = { ...form, id: currentId.value }
      } else {
        students.value.push({ ...form, id: Date.now() })
      }

      localStorage.setItem('school_students', JSON.stringify(students.value))
      showDialog.value = false
      $q.notify({ color: 'positive', message: 'Successfully Saved!' })
    }

    const deleteStudent = (id) => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this student?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        students.value = students.value.filter(s => s.id !== id)
        localStorage.setItem('school_students', JSON.stringify(students.value))
        $q.notify({ color: 'negative', message: 'Student Deleted' })
      })
    }

    onMounted(loadData)

    // --- Return to Template ---
    return {
      students,
      columns,
      filter,
      showDialog,
      form,
      isEdit,
      activeCount,
      inactiveCount,
      openDialog,
      saveStudent,
      deleteStudent
    }
  }
}
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}
.border-radius-10 {
  border-radius: 10px;
}
</style>
