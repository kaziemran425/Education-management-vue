<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Teacher Management</div>
        <div class="text-caption text-grey-7">View, search, and manage your school faculty members.</div>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="Add New Teacher"
        rounded
        unelevated
        @click="openTeacherDialog()"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-4">
        <q-card class="stats-card text-center q-pa-md shadow-2">
          <q-icon name="people" color="primary" size="32px" />
          <div class="text-h6 q-mt-sm">{{ teachers.length }}</div>
          <div class="text-caption text-grey">Total Teachers</div>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="stats-card text-center q-pa-md shadow-2">
          <q-icon name="check_circle" color="green" size="32px" />
          <div class="text-h6 q-mt-sm">{{ activeCount }}</div>
          <div class="text-caption text-grey">Active Faculty</div>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="stats-card text-center q-pa-md shadow-2">
          <q-icon name="verified_user" color="orange" size="32px" />
          <div class="text-h6 q-mt-sm">Full-Time</div>
          <div class="text-caption text-grey">Staff Status</div>
        </q-card>
      </div>
    </div>

    <q-card class="shadow-2 border-radius-10">
      <q-table
        :rows="teachers"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :filter="filter"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Teacher...">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" color="blue-1" text-color="primary" class="q-mr-sm">
                {{ props.row.name.charAt(0) }}
              </q-avatar>
              <div class="text-weight-medium">{{ props.row.name }}</div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="text-center">
            <q-badge
              :color="props.row.status === 'Active' ? 'green' : 'red'"
              rounded
              class="q-px-sm"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" size="sm" @click="openTeacherDialog(props.row)" />
            <q-btn flat round color="red-5" icon="delete" size="sm" @click="deleteTeacher(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="teacherDialog" persistent>
      <q-card style="min-width: 400px; border-radius: 12px;">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ isEdit ? 'Update Teacher' : 'Register Teacher' }}</div>
          <q-spacer />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-form @submit="saveTeacher" class="q-gutter-md">
            <q-input
              filled
              v-model="form.name"
              label="Full Name *"
              dense
              :rules="[val => !!val || 'Name is required']"
            />

            <q-input
              filled
              v-model="form.email"
              label="Email Address *"
              dense
              type="email"
              :rules="[val => !!val || 'Email is required']"
            />

            <q-input
              filled
              v-model="form.subject"
              label="Specialized Subject"
              dense
              hint="e.g. Physics, Mathematics"
            />

            <q-select
              filled
              v-model="form.status"
              :options="['Active', 'Inactive']"
              label="Status"
              dense
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="grey-7" flat v-close-popup />
              <q-btn
                :label="isEdit ? 'Update' : 'Save'"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const teachers = ref([])
    const filter = ref('')
    const teacherDialog = ref(false)
    const isEdit = ref(false)
    const editId = ref(null)

    const columns = [
      { name: 'name', align: 'left', label: 'Teacher Name', field: 'name', sortable: true },
      { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
      { name: 'subject', align: 'left', label: 'Subject', field: 'subject', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status' },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
    ]

    const form = reactive({
      name: '',
      email: '',
      subject: '',
      status: 'Active'
    })

    // Load Data from LocalStorage
    const loadTeachers = () => {
      const data = localStorage.getItem('school_teachers')
      if (data) {
        teachers.value = JSON.parse(data)
      } else {
        // Default Sample Data
        teachers.value = [
          { id: 1, name: 'Dr. John Smith', email: 'john@school.com', subject: 'Mathematics', status: 'Active' },
          { id: 2, name: 'Sarah Wilson', email: 'sarah@school.com', subject: 'English', status: 'Active' }
        ]
        localStorage.setItem('school_teachers', JSON.stringify(teachers.value))
      }
    }

    const openTeacherDialog = (item = null) => {
      if (item) {
        isEdit.value = true
        editId.value = item.id
        Object.assign(form, item)
      } else {
        isEdit.value = false
        form.name = ''
        form.email = ''
        form.subject = ''
        form.status = 'Active'
      }
      teacherDialog.value = true
    }

    const saveTeacher = () => {
      if (isEdit.value) {
        const index = teachers.value.findIndex(t => t.id === editId.value)
        if (index !== -1) teachers.value[index] = { ...form, id: editId.value }
      } else {
        teachers.value.push({ ...form, id: Date.now() })
      }

      localStorage.setItem('school_teachers', JSON.stringify(teachers.value))
      teacherDialog.value = false
      $q.notify({ color: 'positive', message: 'Teacher data saved successfully!', icon: 'check' })
    }

    const deleteTeacher = (id) => {
      $q.dialog({
        title: 'Delete Teacher',
        message: 'Are you sure you want to remove this teacher from the faculty?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        teachers.value = teachers.value.filter(t => t.id !== id)
        localStorage.setItem('school_teachers', JSON.stringify(teachers.value))
        $q.notify({ color: 'negative', message: 'Teacher removed', icon: 'delete' })
      })
    }

    const activeCount = computed(() => {
      return teachers.value.filter(t => t.status === 'Active').length
    })

    onMounted(loadTeachers)

    return {
      teachers, columns, filter, teacherDialog, isEdit, form,
      activeCount, openTeacherDialog, saveTeacher, deleteTeacher
    }
  }
}
</script>

<style scoped>
.stats-card {
  border-radius: 12px;
  border-left: 4px solid #1976d2;
}
.border-radius-10 {
  border-radius: 10px;
}
</style>
