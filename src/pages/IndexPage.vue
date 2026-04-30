<template>
  <q-page class="flex flex-center bg-blue-1">
    <div class="text-center">
      <q-spinner-grid color="primary" size="4rem" />
      <div class="text-h5 q-mt-md text-primary">School ERP সিস্টেমে প্রবেশ করা হচ্ছে...</div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.push('/dashBoard/DashBoard')
  }, 1500)
})
</script>
