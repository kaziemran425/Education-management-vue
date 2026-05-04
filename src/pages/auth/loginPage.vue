<template>
  <q-card class="login-card shadow-24 rounded-borders">
    <div class="row">
      <div class="col-12 col-md-5 bg-primary text-white flex flex-center q-pa-xl text-center">
        <div>
          <q-icon name="apartment" size="100px" />
          <div class="text-h4 text-weight-bolder">Iching</div>
          <div class="text-subtitle1 opacity-80">Smart Property Management</div>
        </div>
      </div>

      <div class="col-12 col-md-7 q-pa-xl bg-white">
        <div class="text-h5 text-weight-bold q-mb-md">Welcome Back</div>

        <q-form @submit.prevent="handleLogin" class="q-gutter-y-md">
          <q-input outlined v-model="credentials.email" label="Email" type="email" :rules="[val => !!val || 'Required']">
            <template v-slot:prepend><q-icon name="email" /></template>
          </q-input>

          <q-input outlined v-model="credentials.password" label="Password" :type="showPwd ? 'text' : 'password'">
            <template v-slot:prepend><q-icon name="lock" /></template>
            <template v-slot:append>
              <q-icon :name="showPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPwd = !showPwd" />
            </template>
          </q-input>

          <q-btn type="submit" color="primary" class="full-width text-weight-bold" size="lg" label="Sign In" :loading="isLoading" unelevated />

          <div class="row justify-between q-mt-md">
            <q-btn flat color="grey-7" label="Create Account" to="/auth/register" no-caps />
            <q-btn flat color="primary" label="Forgot Password?" to="/auth/forgot-password" no-caps />
          </div>
        </q-form>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const isLoading = ref(false)
const showPwd = ref(false)
const credentials = reactive({ email: '', password: '' })

const handleLogin = async () => {
  isLoading.value = true;
  try {
    // স্টোর থেকে রেসপন্স নেওয়া হচ্ছে
    const response = await auth.login(credentials.email, credentials.password);

    $q.notify({
      type: 'positive',
      message: `Welcome back, ${response.role}!`,
      position: 'top-right'
    });

    // রোল অনুযায়ী সঠিক প্যানেলে রিডাইরেক্ট
    router.push(response.redirect);

  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Login Failed! Please check your email.',
      position: 'bottom'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-card { width: 100%; max-width: 900px; }
</style>
