<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Assign Teachers</div>
        <div class="text-caption text-grey-7">Link teachers to specific classes and subjects</div>
      </div>
      <q-btn 
        color="primary" 
        icon="person_add" 
        label="New Assignment" 
        rounded 
        unelevated 
        @click="openAssignDialog()" 
      />
    </div>

    <q-card class="my-card shadow-2">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Assignment">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" size="sm" @click="openAssignDialog(props.row)" />
            <q-btn 
              flat 
              round 
              color="red-5" 
              icon="delete" 
              size="sm" 
              @click="deleteAssignment(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="assignDialog" persistent>
      <q-card style="min-width: 400px; border-radius: 12px;">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ isEdit ? 'Update' : 'Create' }} Assignment</div>
          <q-spacer />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-form @submit="saveAssignment" class="q-gutter-md">
            
            <q-select
              filled
              v-model="form.teacherName"
              :options="teacherOptions"
              label="Select Teacher"
              emit-value
              map-options
              :rules="[val => !!val || 'Required']"
            />

            <q-select
              filled
              v-model="form.className"
              :options="classOptions"
              label="Select Class"
              :rules="[val => !!val || 'Required']"
            />

            <q-select
              filled
              v-model="form.subject"
              :options="subjectOptions"
              label="Select Subject"
              :rules="[val => !!val || 'Required']"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="grey-7" flat v-close-popup />
              <q-btn 
                :label="isEdit ? 'Update' : 'Assign Now'" 
                color="primary" 
                type="submit" 
                unelevated 
                rounded 
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const rows = ref([])
    const filter = ref('')
    const assignDialog = ref(false)
    const isEdit = ref(false)
    const editId = ref(null)

    // Dropdown Data (Ready for integration with your API/Other pages)
    const teacherOptions = ['John Doe', 'Sarah Smith', 'Robert Brown', 'Emily Davis']
    const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 10']
    const subjectOptions = ['Mathematics', 'English', 'Science', 'Physics', 'History']

    const columns = [
      { name: 'teacherName', align: 'left', label: 'Teacher', field: 'teacherName', sortable: true },
      { name: 'className', align: 'left', label: 'Class', field: 'className', sortable: true },
      { name: 'subject', align: 'left', label: 'Subject', field: 'subject', sortable: true },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
    ]

    const form = reactive({
      teacherName: '',
      className: '',
      subject: ''
    })

    const loadData = () => {
      const saved = localStorage.getItem('teacher_assignments')
      if (saved) {
        rows.value = JSON.parse(saved)
      } else {
        // Initial Dummy Data
        rows.value = [
          { id: 1, teacherName: 'John Doe', className: 'Class 10', subject: 'Physics' }
        ]
      }
    }

    const openAssignDialog = (item = null) => {
      if (item) {
        isEdit.value = true
        editId.value = item.id
        Object.assign(form, item)
      } else {
        isEdit.value = false
        form.teacherName = ''
        form.className = ''
        form.subject = ''
      }
      assignDialog.value = true
    }

    const saveAssignment = () => {
      if (isEdit.value) {
        const index = rows.value.findIndex(r => r.id === editId.value)
        if (index !== -1) rows.value[index] = { ...form, id: editId.value }
      } else {
        rows.value.push({ ...form, id: Date.now() })
      }

      localStorage.setItem('teacher_assignments', JSON.stringify(rows.value))
      assignDialog.value = false
      $q.notify({ color: 'positive', message: 'Assignment Saved!', icon: 'done' })
    }

    const deleteAssignment = (id) => {
      $q.dialog({
        title: 'Delete Assignment',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        rows.value = rows.value.filter(r => r.id !== id)
        localStorage.setItem('teacher_assignments', JSON.stringify(rows.value))
        $q.notify({ color: 'negative', message: 'Assignment Deleted', icon: 'delete' })
      })
    }

    onMounted(loadData)

    return {
      rows, columns, filter, assignDialog, isEdit, form,
      teacherOptions, classOptions, subjectOptions,
      openAssignDialog, saveAssignment, deleteAssignment
    }
  }
}
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}
</style>