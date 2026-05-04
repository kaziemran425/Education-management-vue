<template>
  <q-layout view="lHh Lpr lFf">
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
        <q-toolbar-title> User Panel </q-toolbar-title>
        <q-btn flat round icon="notifications" />
        <q-btn flat round icon="logout" to="/auth/login" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header> User Menu </q-item-label>

        <q-item clickable v-ripple to="/panel">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/panel/payment-history">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Payments History</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/panel/school-list">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Schools</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/panel/subscription">
          <q-item-section avatar><q-icon name="payment" /></q-item-section>
          <q-item-section>Subscription</q-item-section>
        </q-item>

        <!-- Logout Button Sidebar (Error Fixed Here) -->
        <q-item clickable v-ripple @click="handleLogout" class="text-negative">
          <q-item-section avatar>
            <q-icon name="power_settings_new" color="negative" />
          </q-item-section>
          <!-- Fixed closing tag from </q-section> to </q-item-section> -->
          <q-item-section class="text-weight-bold">Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- Renders children like Dashboard.vue or IndexPage.vue -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
