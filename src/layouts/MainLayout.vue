<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8">
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
          School <span class="text-primary">Master</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>

          <q-btn round flat>
            <q-avatar size="32px">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar><q-icon name="logout" color="red" /></q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="260"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-uppercase text-weight-bold text-grey-7">
            Main Menu
          </q-item-label>

          <q-item
            v-for="link in menuLinks"
            :key="link.title"
            clickable
            v-ripple
            :to="link.to"
            exact
            active-class="bg-blue-1 text-primary text-weight-bold"
            class="q-mx-sm rounded-borders q-mb-xs"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption v-if="link.caption">{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    // Sajiya dewa links based on your routes
    const menuLinks = [
      {
        title: 'Dashboard',
        caption: 'Overview of system',
        icon: 'dashboard',
        to: '/dashboard'
      },
      {
        title: 'School List',
        caption: 'Manage all schools',
        icon: 'domain',
        to: '/school-list'
      },
      {
        title: 'Payment History',
        caption: 'Track transactions',
        icon: 'history_edu',
        to: '/payment-history'
      },
      {
        title: 'Subscription Plans',
        caption: 'Plan management',
        icon: 'card_membership',
        to: '/subscription-plans'
      }
    ]

    const logout = () => {
      // Clear session logic
      localStorage.removeItem('user_session')
      router.push('/auth/login')
    }

    return {
      menuLinks,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout
    }
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 10px;
}
</style>
