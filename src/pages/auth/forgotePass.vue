<template>
  <div class="forgot-password-container flex flex-center">
    <q-card class="my-card shadow-12">
      <q-card-section class="bg-primary text-white text-center">
        <div class="text-h6">Forgot Your Password?</div>
        <div class="text-caption">Enter your email to receive a reset link</div>
      </q-card-section>

      <q-card-section class="q-pa-xl">
        <q-form @submit="handleForgotPassword" class="q-gutter-y-md">

          <q-input
            outlined
            v-model="forgotForm.email"
            label="Email Address"
            dense
            lazy-rules
            :rules="[
              val => !!val || 'Email is required',
              val => /.+@.+\..+/.test(val) || 'Invalid email'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Send Reset Link"
            class="full-width q-py-sm text-weight-bold"
            unelevated
            rounded
          />

          <div class="text-center q-mt-md">
            <q-btn flat no-caps color="grey-7" label="Back to Login" icon="arrow_back" size="sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    // 1. Reactive form data
    const forgotForm = reactive({
      email: ''
    })

    // 2. Logic to handle the reset request
    const handleForgotPassword = () => {
      // Check if users exist in Local Storage (from your Registration page)
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]')

      // Smart Check: Does this email exist in our "database"?
      const userExists = users.find(u => u.email === forgotForm.email)

      $q.loading.show({ message: 'Validating email...' })

      // Simulate API Delay
      setTimeout(() => {
        $q.loading.hide()

        if (userExists) {
          $q.notify({
            color: 'positive',
            icon: 'check_circle',
            message: 'Reset link has been sent to your email!',
            position: 'top'
          })
          console.log("Reset link sent for:", forgotForm.email)
        } else {
          $q.notify({
            color: 'negative',
            icon: 'error',
            message: 'This email is not registered with us.',
            position: 'top'
          })
        }
      }, 1500)
    }

    return {
      forgotForm,
      handleForgotPassword
    }
  }
}
</script>

<style scoped>
.forgot-password-container {
  height: 100vh;
  background: #f0f4f8;
}

.my-card {
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  overflow: hidden;
}

/* Customizing the shadow for a "Smart" look */
.shadow-12 {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}
</style>
