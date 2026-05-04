<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="shadow-2 rounded-borders overflow-hidden">
      <q-card-section class="bg-indigo-10 text-white row items-center">
        <q-icon name="groups" size="md" class="q-mr-md" />
        <div class="text-h6">Staff Attendance Log</div>
        <q-space />
        <div class="text-subtitle2">{{ currentDate }}</div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-list separator>
          <q-item v-for="staff in staffs" :key="staff.id" class="q-py-md">
            <q-item-section avatar><q-avatar icon="badge" color="grey-2" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ staff.name }}</q-item-label>
              <q-item-label caption>Support Staff</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="staff.isPresent" label="Present" color="green-7" keep-color />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />
      <q-card-actions align="between" class="q-pa-md">
        <q-btn flat color="grey-7" label="Reset" icon="refresh" @click="reset" />
        <q-btn color="indigo-10" label="Confirm & Save" icon="verified" @click="save" unelevated />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const currentDate = ref(new Date().toDateString())
    const staffs = ref([
      { id: 1, name: 'Robert Wilson', isPresent: true },
      { id: 2, name: 'Mary Jane', isPresent: true },
      { id: 3, name: 'Alex Parker', isPresent: false }
    ])

    const save = () => {
      const data = JSON.parse(localStorage.getItem('iching_attendance_records') || '[]')
      data.push({ date: new Date().toISOString(), type: 'Staff', data: staffs.value })
      localStorage.setItem('iching_attendance_records', JSON.stringify(data))
      $q.notify({ type: 'positive', message: 'Staff attendance recorded' })
    }

    const reset = () => staffs.value.forEach(s => s.isPresent = false)

    return { staffs, currentDate, save, reset }
  }
}
</script>
