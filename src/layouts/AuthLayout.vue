<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="auth-background">
      <q-page class="flex flex-center">

        <div class="auth-card-wrapper">
          <div v-if="showToggle" class="row justify-center q-mb-md">
            <q-btn-toggle
              v-model="activeTab"
              @update:model-value="handleTabChange"
              spread
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Login', value: 'login' },
                { label: 'Register', value: 'registration' }
              ]"
              class="custom-toggle"
            />
          </div>

          <router-view v-slot="{ Component }">
            <transition appear enter-active-class="animated fadeIn">
              <component :is="Component" />
            </transition>
          </router-view>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const activeTab = ref('login')
    const showToggle = ref(true)

    // 1. Smart Integration: Sync the toggle button with the current URL
    const updateTabFromRoute = () => {
      if (route.path.includes('login')) {
        activeTab.value = 'login'
        showToggle.value = true
      } else if (route.path.includes('registration')) {
        activeTab.value = 'registration'
        showToggle.value = true
      } else {
        showToggle.value = false // Hide toggle on Forgot Password page
      }
    }

    // 2. Local Storage Check: Redirect if already logged in
    onMounted(() => {
      updateTabFromRoute()
      const session = localStorage.getItem('user_session')
      if (session) {
        const userData = JSON.parse(session)
        if (userData.isLoggedIn) {
          console.log('User already logged in, redirecting to Dashboard...')
          // router.push('/') // Uncomment this to redirect logged-in users
        }
      }
    })

    // Watch for route changes to update the UI
    watch(() => route.path, () => updateTabFromRoute())

    const handleTabChange = (val) => {
      router.push({ path: `/auth/${val}` }) // Adjust path based on your route config
    }

    return {
      activeTab,
      showToggle,
      handleTabChange
    }
  }
}
</script>

<style scoped>
/* 1. Smart Design Background (Gradient) */
.auth-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.auth-card-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

/* 2. Custom Styling for the Switcher */
.custom-toggle {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 250px;
}

/* Animation */
.animated {
  animation-duration: 0.4s;
}
</style>
