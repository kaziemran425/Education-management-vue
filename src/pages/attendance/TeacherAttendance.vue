<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold text-indigo-10 q-mb-md">Teacher Attendance</div>
    <q-card flat bordered class="q-pa-md">
      <q-list separator>
        <q-item v-for="teacher in teachers" :key="teacher.id">
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ teacher.name }}</q-item-label>
            <q-item-label caption>ID: {{ teacher.id }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select
              v-model="teacher.status"
              :options="['Present', 'Absent', 'On Leave']"
              outlined dense style="width: 150px"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn color="indigo-10" label="Submit Attendance" class="full-width q-mt-md" @click="submit" unelevated />
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const teachers = ref([
      { id: 'T-101', name: 'John Doe', status: 'Present' },
      { id: 'T-102', name: 'Sarah Khan', status: 'Present' }
    ])

    const submit = () => {
      const records = JSON.parse(localStorage.getItem('iching_attendance_records') || '[]')
      records.push({ date: new Date().toLocaleDateString(), type: 'Teacher', data: teachers.value })
      localStorage.setItem('iching_attendance_records', JSON.stringify(records))
      $q.notify({ type: 'positive', message: 'Teacher records updated' })
    }

    return { teachers, submit }
  }
}
</script>
