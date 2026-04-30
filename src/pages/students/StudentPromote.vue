<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-orange-8 text-white row items-center">
        <q-icon name="trending_up" size="sm" class="q-mr-sm" />
        <div class="text-h6">শিক্ষার্থী প্রমোশন (Student Promotion)</div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm items-end">
        <div class="col-12 col-md-4">
          <q-select
            v-model="currentClass"
            :options="classList"
            label="বর্তমান ক্লাস"
            outlined
            dense
          />
        </div>
        <div class="col-12 col-md-4">
          <q-select
            v-model="nextClass"
            :options="classList"
            label="পরবর্তী ক্লাস"
            outlined
            dense
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            color="orange-8"
            label="স্টুডেন্ট প্রমোট করুন"
            icon="auto_awesome"
            class="full-width"
            @click="promoteStudents"
          />
        </div>
      </q-card-section>

      <q-banner dense class="bg-orange-1 q-ma-md rounded-borders">
        <template v-slot:avatar>
          <q-icon name="warning" color="orange-8" />
        </template>
        সতর্কতা: প্রমোট বাটনে ক্লিক করলে নির্বাচিত ক্লাসের সব শিক্ষার্থী পরবর্তী ক্লাসে স্থানান্তরিত হবে। এটি করার আগে অবশ্যই ডাটা চেক করে নিন।
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const currentClass = ref(null)
const nextClass = ref(null)
const classList = ref([])

// ক্লাস লিস্ট লোড করা
onMounted(() => {
  const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
  if (savedClasses.length > 0) {
    classList.value = savedClasses.map(c => c.name)
  } else {
    // যদি ডাটাবেসে ক্লাস না থাকে তবে ডিফল্ট কিছু ক্লাস দেখানো
    classList.value = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']
  }
})

const promoteStudents = () => {
  if (!currentClass.value || !nextClass.value) {
    $q.notify({
      color: 'negative',
      message: 'অনুগ্রহ করে বর্তমান এবং পরবর্তী ক্লাস উভয়ই সিলেক্ট করুন',
      icon: 'report_problem'
    })
    return
  }

  if (currentClass.value === nextClass.value) {
    $q.notify({
      color: 'warning',
      message: 'বর্তমান এবং পরবর্তী ক্লাস একই হতে পারবে না',
      icon: 'warning'
    })
    return
  }

  const students = JSON.parse(localStorage.getItem('students') || '[]')
  let count = 0

  // লজিক: বর্তমান ক্লাসের স্টুডেন্টদের নতুন ক্লাসে এসাইন করা
  const updatedStudents = students.map(s => {
    if (s.class === currentClass.value) {
      count++
      return { ...s, class: nextClass.value }
    }
    return s
  })

  if (count > 0) {
    localStorage.setItem('students', JSON.stringify(updatedStudents))
    $q.notify({
      color: 'positive',
      message: `${count} জন শিক্ষার্থীকে সফলভাবে ${nextClass.value}-এ প্রমোট করা হয়েছে।`,
      icon: 'check_circle'
    })

    // ফর্ম রিসেট
    currentClass.value = null
    nextClass.value = null
  } else {
    $q.notify({
      color: 'info',
      message: 'নির্বাচিত ক্লাসে কোনো শিক্ষার্থী খুঁজে পাওয়া যায়নি।',
      icon: 'info'
    })
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
