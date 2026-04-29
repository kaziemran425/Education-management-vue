<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="auth-card shadow-10">
      <q-card-section class="bg-teal text-white text-center q-pa-lg">
        <q-icon name="admin_panel_settings" size="64px" />
        <div class="text-h5 text-weight-bold">Welcome Back</div>
        <div class="text-caption">Login to your School Management Account</div>
      </q-card-section>

      <q-card-section class="q-pa-xl">
        <q-form @submit.prevent="handleLogin" class="q-gutter-y-md">

          <q-input
            outlined
            v-model="loginForm.email"
            label="Email Address"
            dense
            lazy-rules
            :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email']"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="teal" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="loginForm.password"
            label="Password"
            :type="isPassword ? 'password' : 'text'"
            dense
            lazy-rules
            :rules="[val => !!val || 'Password is required']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="teal" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>

          <div class="row items-center justify-between no-wrap">
            <q-checkbox v-model="rememberMe" label="Remember me" size="sm" color="primary" />
            <q-btn flat no-caps color="primary" label="Forgot Password?" to="/auth/forgot-password" size="sm" />
          </div>

          <q-btn
            type="submit"
            color="teal"
            label="Login Now"
            class="full-width q-py-sm text-weight-bold"
            unelevated
            :loading="loading"
          />

          <div class="text-center q-mt-md">
            <span class="text-grey-7">New school?</span>
            <q-btn flat no-caps color="secondary" label="Register Instance" to="/auth/registration" dense class="q-ml-xs" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  name: 'LoginPage',
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    // State
    const loading = ref(false);
    const isPassword = ref(true);
    const rememberMe = ref(false);

    const loginForm = reactive({
      email: '',
      password: ''
    });

    // On Mount: Check LocalStorage for saved email
    onMounted(() => {
      const savedEmail = localStorage.getItem('remembered_email');
      if (savedEmail) {
        loginForm.email = savedEmail;
        rememberMe.value = true;
      }
    });

    // Integration Logic
    const handleLogin = async () => {
      loading.value = true;

      try {
        // Here you would integrate with your NestJS API:
        // const response = await axios.post('/auth/login', loginForm);

        console.log('Integrating with API:', loginForm);

        // Local Storage Handling: Remember Me
        if (rememberMe.value) {
          localStorage.setItem('remembered_email', loginForm.email);
        } else {
          localStorage.removeItem('remembered_email');
        }

        // Simulate Success
        setTimeout(() => {
          loading.value = false;
          $q.notify({
            type: 'positive',
            message: 'Access Granted! Welcome to EMS',
            position: 'top'
          });
          router.push('/dashboard');
        }, 1500);

      } catch (error) {
        loading.value = false;
        $q.notify({ type: 'negative', message: 'Authentication Failed' });
      }
    };

    return {
      loginForm,
      isPassword,
      rememberMe,
      loading,
      handleLogin
    };
  }
};
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 450px;
  border-radius: 12px;
  overflow: hidden;
}

/* Smart Design: subtle hover effect on the card */
.auth-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
