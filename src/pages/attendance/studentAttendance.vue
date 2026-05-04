<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-indigo-10">
        <q-icon name="person_check" class="q-mr-sm" />Student Attendance
      </div>

      <div class="row q-gutter-sm">
        <q-btn outline color="primary" label="Mark All Present" icon="done_all" @click="markAllPresent" />
        <q-input filled v-model="attendanceDate" mask="date" dense style="width: 170px">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="attendanceDate">
                  <div class="row items-center justify-end"><q-btn v-close-popup label="Close" color="primary" flat /></div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <q-card flat bordered>
      <q-table :rows="attendanceList" :columns="columns" row-key="id" flat>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-btn-toggle
              v-model="props.row.status"
              toggle-color="indigo-10"
              unelevated
              dense
              :options="[
                {label: 'Present', value: 'Present'},
                {label: 'Absent', value: 'Absent'},
                {label: 'Late', value: 'Late'}
              ]"
            />
          </q-td>
        </template>
      </q-table>
      <q-separator />
      <q-card-actions align="right" class="q-pa-md">
        <q-btn label="Save Attendance" color="indigo-10" icon="cloud_upload" @click="saveAttendance" unelevated />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const attendanceDate = ref(new Date().toISOString().split('T')[0].replace(/-/g, '/'))
    const attendanceList = ref([])

    const columns = [
      { name: 'roll', align: 'left', label: 'Roll', field: 'roll' },
      { name: 'name', align: 'left', label: 'Name', field: 'name' },
      { name: 'status', align: 'center', label: 'Status', field: 'status' }
    ]

    const loadStudents = () => {
      const students = JSON.parse(localStorage.getItem('iching_students') || '[]')
      attendanceList.value = students.map(s => ({ ...s, status: 'Present' }))
    }

    const markAllPresent = () => {
      attendanceList.value.forEach(s => s.status = 'Present')
    }

    const saveAttendance = () => {
      const allData = JSON.parse(localStorage.getItem('iching_attendance_records') || '[]')
      allData.push({ date: attendanceDate.value, type: 'Student', data: attendanceList.value })
      localStorage.setItem('iching_attendance_records', JSON.stringify(allData))
      $q.notify({ type: 'positive', message: 'Student attendance saved', icon: 'check' })
    }

    onMounted(loadStudents)
    return { attendanceDate, attendanceList, columns, saveAttendance, markAllPresent }
  }
}
</script>
