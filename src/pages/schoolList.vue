<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-teal-9 text-white">
        <div class="text-h6">নিবন্ধিত স্কুলসমূহ (All Schools)</div>
      </q-card-section>
      <q-list separator>
        <q-item v-for="school in schools" :key="school.id">
          <q-item-section avatar><q-avatar icon="business" color="teal-1" text-color="teal-9" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ school.name }}</q-item-label>
            <q-item-label caption>{{ school.address }}</q-item-label>
          </q-item-section>
          <q-item-section side><q-badge color="green">Active</q-badge></q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const schools = ref([{ id: 1, name: 'Ideal School', address: 'Motijheel, Dhaka' }])
onMounted(() => {
  const profile = JSON.parse(localStorage.getItem('school_profile'))
  if (profile) schools.value.push({ ...profile, id: Date.now() })
})
</script>
