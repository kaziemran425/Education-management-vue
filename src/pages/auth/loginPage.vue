<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="auth-card shadow-10">
      <!-- Header Section -->
      <q-card-section class="bg-teal text-white text-center q-pa-lg">
        <q-icon name="admin_panel_settings" size="64px" />
        <div class="text-h5 text-weight-bold">Welcome Back</div>
        <div class="text-caption">Login to your School Management Account</div>
      </q-card-section>

      <!-- Form Section -->
      <q-card-section class="q-pa-xl">
        <q-form @submit.prevent="onLoginSubmit" class="q-gutter-y-md">

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

          <!-- Role Hint for testing -->
          <div class="text-center q-mt-sm text-caption text-grey-6">
            Admin: admin@mail.com | User: user@mail.com
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

    // On Mount: Check LocalStorage for saved email (Remember Me)
    onMounted(() => {
      const savedEmail = localStorage.getItem('remembered_email');
      if (savedEmail) {
        loginForm.email = savedEmail;
        rememberMe.value = true;
      }
    });

    // Marched Login Logic
    const onLoginSubmit = async () => {
      loading.value = true;

      try {
        // ১. Local Storage Handling for "Remember Me"
        if (rememberMe.value) {
          localStorage.setItem('remembered_email', loginForm.email);
        } else {
          localStorage.removeItem('remembered_email');
        }

        // ২. Simulate API Call & Session Logic
        setTimeout(() => {
          // ৩. Role Determination (Based on your logic)
          // এখানে কন্ডিশনাল রোল সেট করা হয়েছে:
          const assignedRole = loginForm.email === 'admin@mail.com' ? 'admin' : 'user';

          const userData = {
            isLoggedIn: true,
            email: loginForm.email,
            role: assignedRole,
            token: 'simulated-jwt-token-' + Date.now()
          };

          // ৪. Save Session Data to LocalStorage
          localStorage.setItem('user_session', JSON.stringify(userData));

          loading.value = false;

          $q.notify({
            type: 'positive',
            message: `Welcome! Logged in as ${assignedRole.toUpperCase()}`,
            position: 'top'
          });

          // ৫. Smart Redirection based on role
          if (userData.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard');
          }
        }, 1500);

      } catch (error) {
        loading.value = false;
        $q.notify({
          type: 'negative',
          message: 'Authentication Failed. Please check your credentials.'
        });
      }
    };

    return {
      loginForm,
      isPassword,
      rememberMe,
      loading,
      onLoginSubmit
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

/* Subtle card hover animation */
.auth-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
