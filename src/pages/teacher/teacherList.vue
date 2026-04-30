<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-weight-bold text-deep-purple-10">শিক্ষক তালিকা (Teacher List)</div>
        <q-space />
        <q-btn color="deep-purple-10" label="নতুন শিক্ষক" icon="add" to="/teacher/TeacherAdd" />
      </q-card-section>

      <q-card-section>
        <q-input v-model="filter" placeholder="নাম, পদবী বা ফোন দিয়ে খুঁজুন..." outlined dense class="q-mb-md">
          <template v-slot:append><q-icon name="search" /></template>
        </q-input>

        <q-table
          :rows="teachers"
          :columns="columns"
          row-key="id"
          :filter="filter"
          flat
          bordered
          :no-data-label="'কোনো শিক্ষকের তথ্য পাওয়া যায়নি'"
        >
          <!-- Status Badge -->
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="props.row.status === 'Active' ? 'green' : 'red'">
                {{ props.row.status }}
              </q-badge>
            </q-td>
          </template>

          <!-- Actions -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-xs">
              <q-btn flat round color="blue" icon="edit" size="sm">
                <q-tooltip>এডিট করুন</q-tooltip>
              </q-btn>
              <q-btn flat round color="red" icon="delete" size="sm" @click="confirmDelete(props.row.id)">
                <q-tooltip>ডিলিট করুন</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const teachers = ref([])
const filter = ref('')

const columns = [
  { name: 'name', label: 'শিক্ষকের নাম', field: 'name', align: 'left', sortable: true },
  { name: 'designation', label: 'পদবী', field: 'designation', align: 'left', sortable: true },
  { name: 'phone', label: 'মোবাইল', field: 'phone', align: 'center' },
  { name: 'qualification', label: 'যোগ্যতা', field: 'qualification', align: 'left' },
  { name: 'status', label: 'অবস্থা', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadTeachers = () => {
  const data = localStorage.getItem('teachers')
  teachers.value = data ? JSON.parse(data) : []
}

const confirmDelete = (id) => {
  $q.dialog({
    title: 'সতর্কতা',
    message: 'আপনি কি নিশ্চিতভাবে এই শিক্ষকের তথ্য ডিলিট করতে চান?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteTeacher(id)
  })
}

const deleteTeacher = (id) => {
  const allTeachers = JSON.parse(localStorage.getItem('teachers') || '[]')
  const filtered = allTeachers.filter(t => t.id !== id)
  localStorage.setItem('teachers', JSON.stringify(filtered))
  loadTeachers()
  $q.notify({ color: 'orange-9', message: 'তথ্য ডিলিট করা হয়েছে' })
}

onMounted(loadTeachers)
</script>
