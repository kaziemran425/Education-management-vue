<template>
  <q-page padding>
    <q-card v-if="student" flat bordered class="q-mx-auto" style="max-width: 600px">
      <q-card-section class="text-center bg-blue-grey-10 text-white">
        <q-avatar size="100px" class="bg-white q-mb-sm">
          <q-icon name="person" color="blue-grey-10" />
        </q-avatar>
        <div class="text-h5">{{ student.name }}</div>
        <div class="text-subtitle2">রোল: {{ student.roll }} | ক্লাস: {{ student.class }}</div>
      </q-card-section>

      <q-list separator>
        <q-item>
          <q-item-section avatar><q-icon name="family_restroom" color="primary" /></q-item-section>
          <q-item-section><q-item-label caption>পিতার নাম</q-item-label>{{ student.fatherName }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar><q-icon name="phone" color="primary" /></q-item-section>
          <q-item-section><q-item-label caption>মোবাইল নম্বর</q-item-label>{{ student.phone }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar><q-icon name="groups" color="primary" /></q-item-section>
          <q-item-section><q-item-label caption>সেকশন</q-item-label>{{ student.section }}</q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="center" class="q-pb-md">
        <q-btn color="primary" label="এডিট প্রোফাইল" outline />
        <q-btn color="grey" label="পিছনে ফিরুন" flat @click="$router.back()" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const student = ref(null)

onMounted(() => {
  const students = JSON.parse(localStorage.getItem('students') || '[]')
  student.value = students.find(s => s.id == route.query.id)
})
</script>
