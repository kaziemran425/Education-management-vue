<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header Section -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-weight-bold">
          School <span class="text-weight-light">ERP Portal</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Notifications -->
          <q-btn round flat icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>

          <!-- User Profile & Logout -->
          <q-btn round flat>
            <q-avatar size="32px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup class="text-red" @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" color="red" />
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar Navigation -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-weight-bold text-uppercase text-grey-7">
            User Menu
          </q-item-label>

          <!-- Dashboard Link -->
          <q-item clickable v-ripple to="/dashboard" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>User Dashboard</q-item-section>
          </q-item>

          <!-- Payment History Link -->
          <q-item clickable v-ripple to="/payment-history" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>
            <q-item-section>My Payments</q-item-section>
          </q-item>

          <!-- Subscription Plans Link -->
          <q-item clickable v-ripple to="/subscription-plans" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="card_membership" />
            </q-item-section>
            <q-item-section>Subscription Plans</q-item-section>
          </q-item>

          <!-- School List Link -->
          <q-item clickable v-ripple to="/school-list" active-class="active-link">
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>
            <q-item-section>School List</q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <!-- Admin Panel Quick Link -->
          <q-item clickable v-ripple to="/admin/dashboard" class="text-indigo-7">
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" />
            </q-item-section>
            <q-item-section class="text-weight-bold">Switch to Admin</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Content Area -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const router = useRouter()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  localStorage.removeItem('user_session')
  router.push('/auth/login')
}
</script>

<style scoped>
.active-link {
  color: #1976D2;
  background: rgba(25, 118, 210, 0.1);
  border-right: 4px solid #1976D2;
}
.text-weight-light {
  font-weight: 300;
}
</style>
