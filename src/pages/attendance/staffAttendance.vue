<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-brown text-white">
        <div class="text-h6">স্টাফ উপস্থিতি (Staff Attendance)</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="date" type="date" outlined dense stack-label class="q-mb-md" />
        <q-list bordered separator>
          <q-item v-for="staff in staffList" :key="staff.id">
            <q-item-section>{{ staff.name }} ({{ staff.role }})</q-item-section>
            <q-item-section side>
              <q-toggle v-model="staff.present" color="green" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn color="brown" label="উপস্থিতি সেভ" class="q-mt-md full-width" @click="saveStaff" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const date = ref(new Date().toISOString().substr(0, 10))
const staffList = ref([
  { id: 1, name: 'Abul', role: 'Driver', present: true },
  { id: 2, name: 'Kuddus', role: 'Guard', present: true }
])
const saveStaff = () => {
  localStorage.setItem(`staff_attendance_${date.value}`, JSON.stringify(staffList.value))
}
</script>
