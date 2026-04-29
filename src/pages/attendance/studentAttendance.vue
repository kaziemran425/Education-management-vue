<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row q-col-gutter-lg justify-center">
      
      <div class="col-12 col-md-5">
        <q-card class="scanner-card shadow-10 text-center q-pa-lg">
          <div class="text-h6 text-weight-bold q-mb-md">Biometric Attendance Scanner</div>
          
          <div class="fingerprint-wrapper q-mx-auto q-my-xl" :class="{ 'scanning': isScanning }">
            <q-icon name="fingerprint" size="120px" :color="scanColor" />
            <div class="scan-line" v-if="isScanning"></div>
          </div>

          <div class="q-px-lg">
            <q-input 
              filled 
              v-model="studentID" 
              label="Enter Student ID / Scan Card" 
              placeholder="e.g. STD-1001"
              bg-color="white"
              @keyup.enter="simulateScan"
            >
              <template v-slot:append>
                <q-btn round flat icon="sensors" @click="simulateScan" />
              </template>
            </q-input>
          </div>

          <div class="q-mt-lg text-subtitle2" :class="`text-${scanColor}`">
            {{ statusMessage }}
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-7">
        <q-card class="log-card shadow-3">
          <q-card-section class="row items-center bg-primary text-white">
            <div class="text-h6">Daily Attendance Log</div>
            <q-spacer />
            <q-chip color="white" text-color="primary" label="Date: 2026-04-28" />
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table
              :rows="attendanceLog"
              :columns="columns"
              row-key="id"
              flat
              dense
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-time="props">
                <q-td :props="props">
                  <q-badge outline color="blue-7" :label="props.row.time" />
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip size="sm" color="green-1" text-color="green-9" icon="check_circle">
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar, date } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const studentID = ref('')
    const isScanning = ref(false)
    const scanColor = ref('grey-5')
    const statusMessage = ref('Place finger on scanner or enter ID')
    const attendanceLog = ref([])

    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id' },
      { name: 'name', align: 'left', label: 'Name', field: 'name' },
      { name: 'time', align: 'center', label: 'Scan Time', field: 'time' },
      { name: 'status', align: 'center', label: 'Status', field: 'status' }
    ]

    // 1. Load data from Local Storage
    const loadLog = () => {
      const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
      const saved = localStorage.getItem(`attendance_${today}`)
      if (saved) attendanceLog.value = JSON.parse(saved)
    }

    // 2. Simulate Fingerprint Scan
    const simulateScan = () => {
      if (!studentID.value) {
        $q.notify({ message: 'Please enter a Student ID', color: 'negative' })
        return
      }

      isScanning.value = true
      scanColor.value = 'blue-5'
      statusMessage.value = 'Scanning Fingerprint...'

      // Mock delay for "biometric processing"
      setTimeout(() => {
        isScanning.value = false
        
        // Logical check: In real integration, fetch user name from a "students" database
        const newEntry = {
          id: studentID.value,
          name: "User " + studentID.value, // Placeholder
          time: date.formatDate(Date.now(), 'hh:mm:ss A'),
          status: 'Present'
        }

        // Save to List & LocalStorage
        attendanceLog.value.unshift(newEntry)
        const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
        localStorage.setItem(`attendance_${today}`, JSON.stringify(attendanceLog.value))

        // Success State
        scanColor.value = 'green-6'
        statusMessage.value = `Access Granted: ${studentID.value}`
        studentID.value = ''

        // Reset scanner color after 2 seconds
        setTimeout(() => { scanColor.value = 'grey-5'; statusMessage.value = 'Ready for next scan' }, 2000)
      }, 1500)
    }

    onMounted(loadLog)

    return {
      studentID, isScanning, scanColor, statusMessage,
      attendanceLog, columns, simulateScan
    }
  }
}
</script>

<style scoped>
.scanner-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
}

.fingerprint-wrapper {
  width: 200px;
  height: 200px;
  border: 4px solid #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fafafa;
  transition: all 0.3s ease;
}

.scanning {
  border-color: #2196f3;
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.3);
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 4px;
  background: rgba(33, 150, 243, 0.8);
  box-shadow: 0 0 15px #2196f3;
  animation: scan 1.5s infinite linear;
}

@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}

.log-card {
  border-radius: 15px;
  overflow: hidden;
}
</style>