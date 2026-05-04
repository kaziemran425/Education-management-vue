<template>
  <q-card class="register-card shadow-10 q-pa-lg">
    <div class="text-center q-mb-lg">
      <div class="text-h4 text-weight-bold text-primary">Create Account</div>
      <div class="text-grey-7">Join Iching Residences</div>
    </div>

    <q-form @submit.prevent="handleRegister" class="q-gutter-y-sm">
      <q-input v-model="form.fullName" label="Full Name" outlined dense required />
      <q-input v-model="form.phone" label="Phone" outlined dense mask="###########" required />
      <q-input v-model="form.email" label="Email" type="email" outlined dense required />
      <q-input v-model="form.password" label="Password" type="password" outlined dense required />

      <q-btn label="Create Account" color="primary" class="full-width q-mt-md" size="lg" :loading="loading" type="submit" unelevated />

      <q-btn flat label="Back to Login" color="grey-7" class="full-width" to="/auth/login" no-caps />
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const form = reactive({ fullName: '', phone: '', email: '', password: '' })

const handleRegister = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    $q.notify({ type: 'positive', message: 'Registration Successful!' })
    router.push('/auth/login')
  }, 2000)
}
</script>

<style scoped>
.register-card { width: 100%; max-width: 450px; border-radius: 15px; }
</style>
