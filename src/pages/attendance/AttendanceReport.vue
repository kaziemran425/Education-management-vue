<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-indigo-10">Attendance Overview</div>
      <q-btn color="indigo-10" label="Export CSV" icon="file_download" unelevated />
    </div>

    <!-- Stats Section -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4" v-for="stat in stats" :key="stat.label">
        <q-card bordered flat class="bg-white">
          <q-card-section class="flex justify-between items-center">
            <div>
              <div class="text-grey-7">{{ stat.label }}</div>
              <div class="text-h4 text-weight-bolder">{{ stat.value }}%</div>
            </div>
            <q-icon :name="stat.icon" size="md" color="indigo-10" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- History Table -->
    <q-card flat bordered>
      <q-card-section class="bg-indigo-1 text-indigo-10 flex items-center">
        <q-icon name="history" class="q-mr-sm" />
        <div class="text-h6">Recent Submission Logs</div>
      </q-card-section>

      <q-table :rows="history" :columns="repCols" row-key="date" flat>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat color="primary" label="View Data" icon="launch" size="sm" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const stats = ref([
      { label: 'Student Avg.', value: '94', icon: 'school' },
      { label: 'Teacher Avg.', value: '98', icon: 'supervisor_account' },
      { label: 'Staff Avg.', value: '91', icon: 'badge' }
    ])
    const history = ref([])
    const repCols = [
      { name: 'date', label: 'Date', field: 'date', align: 'left' },
      { name: 'type', label: 'Type', field: 'type', align: 'left' },
      { name: 'action', label: 'Actions', align: 'right' }
    ]

    onMounted(() => {
      const data = JSON.parse(localStorage.getItem('iching_attendance_records') || '[]')
      history.value = data.reverse().map(r => ({
        date: new Date(r.date).toLocaleDateString(),
        type: r.type
      }))
    })

    return { stats, history, repCols }
  }
}
</script>
