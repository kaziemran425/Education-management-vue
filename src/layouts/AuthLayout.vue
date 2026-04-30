<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Main Background Wrapper -->
    <q-page-container class="auth-background flex flex-center">
      <q-page class="flex flex-center full-width">

        <div class="auth-card-wrapper">
          <!-- Smart Toggle: Login vs Registration -->
          <div v-if="showToggle" class="row justify-center q-mb-lg">
            <q-btn-toggle
              v-model="activeTab"
              @update:model-value="handleTabChange"
              spread
              no-caps
              rounded
              unelevated
              toggle-color="white"
              color="rgba(255,255,255,0.2)"
              text-color="white"
              toggle-text-color="primary"
              :options="[
                { label: 'Login', value: 'login' },
                { label: 'Register', value: 'registration' }
              ]"
              class="custom-toggle"
            />
          </div>

          <!-- Page Content with Transition -->
          <router-view v-slot="{ Component }">
            <transition
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated fadeOut"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref('login')
const showToggle = ref(true)

/**
 * Smart Logic: URL এর উপর ভিত্তি করে ট্যাব আপডেট করা
 */
const updateTabFromRoute = () => {
  if (route.path.includes('login')) {
    activeTab.value = 'login'
    showToggle.value = true
  } else if (route.path.includes('registration')) {
    activeTab.value = 'registration'
    showToggle.value = true
  } else {
    // Forgot Password বা অন্য পেজে ট্যাব লুকানো থাকবে
    showToggle.value = false
  }
}

// Lifecycle Hooks & Watchers
onMounted(() => {
  updateTabFromRoute()
})

watch(() => route.path, () => {
  updateTabFromRoute()
})

/**
 * ট্যাব পরিবর্তন করলে রাউট চেঞ্জ করা
 */
const handleTabChange = (val) => {
  router.push(`/auth/${val}`)
}
</script>

<style scoped>
/* আপনার দেওয়া ব্লু গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */
.auth-background {
  background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
  min-height: 100vh;
  width: 100%;
}

.auth-card-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

/* কাস্টম টগল বাটন ডিজাইন */
.custom-toggle {
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 280px;
  backdrop-filter: blur(5px); /* হালকা ব্লার ইফেক্ট */
}

/* এনিমেশন ডিউরেশন */
.animated {
  animation-duration: 0.5s;
}
</style>
