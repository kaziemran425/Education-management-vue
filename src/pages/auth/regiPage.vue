<template>
  <div class="registration-container flex flex-center">
    <q-card class="my-card shadow-10">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6 text-center">Register Your Account</div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <div class="q-pa-md q-gutter-md">

          <q-input
            filled
            v-model="regForm.fullName"
            label="Full Name"
            dense
            outlined
            :rules="[ val => val && val.length > 0 || 'Name is required']"
          />

          <q-input
            filled
            v-model="regForm.email"
            label="Email Address"
            type="email"
            dense
            outlined
            :rules="[ val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Email must be valid']"
          />

          <q-input
            filled
            v-model="regForm.password"
            label="Create Password"
            type="password"
            dense
            outlined
            :rules="[ val => val && val.length >= 6 || 'Minimum 6 characters']"
          />

          <q-input
            filled
            v-model="regForm.confirmPassword"
            label="Confirm Password"
            type="password"
            dense
            outlined
            :rules="[ val => val === regForm.password || 'Passwords do not match']"
          />

          <q-btn
            @click="handleRegister"
            color="secondary"
            label="Create Account"
            class="full-width q-mt-md"
            rounded
            unelevated
          />

          <div class="text-center q-mt-sm">
            <span class="text-grey-7">Already have an account? </span>
            <q-btn flat no-caps color="primary" label="Login here" size="sm" />
          </div>

        </div>
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

    // 1. Reactive state for the registration form
    const regForm = reactive({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    // 2. Function to save registration data
    const handleRegister = () => {
      // Basic validation check
      if (regForm.fullName && regForm.email && (regForm.password === regForm.confirmPassword)) {

        // Prepare data for Local Storage
        const newUser = {
          name: regForm.fullName,
          email: regForm.email,
          password: regForm.password, // In a real app, never store plain text passwords
          joinedDate: new Date().toLocaleDateString()
        }

        // Save to Local Storage (as a list of users)
        let users = JSON.parse(localStorage.getItem('registered_users') || '[]')
        users.push(newUser)
        localStorage.setItem('registered_users', JSON.stringify(users))

        $q.notify({
          color: 'secondary',
          textColor: 'white',
          icon: 'person_add',
          message: 'Account created successfully and saved locally!'
        })

        // Clear form
        regForm.fullName = ''
        regForm.email = ''
        regForm.password = ''
        regForm.confirmPassword = ''

      } else {
        $q.notify({
          color: 'negative',
          message: 'Please fix the errors in the form'
        })
      }
    }

    return {
      regForm,
      handleRegister
    }
  }
}
</script>

<style scoped>
.registration-container {
  height: 100vh;
  background: #eceff1;
}

.my-card {
  width: 100%;
  max-width: 450px;
  border-radius: 15px;
}
</style>
