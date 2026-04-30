<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-teal text-white text-h6">উপস্থিতি পরিসংখ্যান (Attendance Statistics)</q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-input v-model="targetDate" type="date" label="তারিখ সিলেক্ট করুন" outlined dense class="col-9" stack-label />
        <q-btn color="teal" label="রিপোর্ট দেখুন" icon="assessment" class="col-3" @click="fetchStats" />
      </q-card-section>

      <div class="row q-pa-md q-col-gutter-md" v-if="stats">
        <div class="col-6"><q-card bordered class="text-center q-pa-md bg-green-1">Present: {{ stats.present }}</q-card></div>
        <div class="col-6"><q-card bordered class="text-center q-pa-md bg-red-1">Absent: {{ stats.absent }}</q-card></div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const targetDate = ref('')
const stats = ref(null)

const fetchStats = () => {
  const keys = Object.keys(localStorage).filter(key => key.includes(targetDate.value))
  let p = 0, a = 0

  keys.forEach(key => {
    const data = JSON.parse(localStorage.getItem(key))
    data.forEach(item => {
      if (item.status === 'P' || item.present === true) p++
      else a++
    })
  })
  stats.value = { present: p, absent: a }
}
</script>
