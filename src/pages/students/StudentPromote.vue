<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script setup>
//
</script>
<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-orange-8 text-white"><div class="text-h6">শিক্ষার্থী প্রমোশন (Promotion)</div></q-card-section>

      <q-card-section class="row q-col-gutter-sm items-end">
        <q-select v-model="currentClass" :options="['Class 1', 'Class 2']" label="বর্তমান ক্লাস" outlined dense class="col-4" />
        <q-select v-model="nextClass" :options="['Class 2', 'Class 3']" label="পরবর্তী ক্লাস" outlined dense class="col-4" />
        <q-btn color="orange-8" label="স্টুডেন্ট প্রমোট করুন" icon="trending_up" class="col-4" @click="promoteStudents" />
      </q-card-section>

      <q-banner dense class="bg-orange-1 q-ma-md">
        সতর্কতা: প্রমোট বাটনে ক্লিক করলে নির্দিষ্ট ক্লাসের সব শিক্ষার্থী পরবর্তী ক্লাসে স্থানান্তরিত হবে।
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const currentClass = ref(null)
const nextClass = ref(null)

const promoteStudents = () => {
  if (!currentClass.value || !nextClass.value) return alert('উভয় ক্লাস সিলেক্ট করুন')

  const students = JSON.parse(localStorage.getItem('students') || '[]')
  let count = 0

  students.forEach(s => {
    if (s.class === currentClass.value) {
      s.class = nextClass.value
      count++
    }
  })

  localStorage.setItem('students', JSON.stringify(students))
  alert(`${count} জন শিক্ষার্থীকে ${nextClass.value}-এ প্রমোট করা হয়েছে।`)
}
</script>
