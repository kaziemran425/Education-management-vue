<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header Section -->
    <q-header elevated class="bg-indigo-10 text-white" :style="{ zIndex: 2000 }">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          Iching Admin Panel
        </q-toolbar-title>

        <q-space />

        <!-- Notification Bell -->
        <q-btn flat round icon="notifications">
          <q-badge floating color="red" rounded label="3" />
        </q-btn>

        <!-- User Profile Menu -->
        <q-btn flat round icon="account_circle" class="q-ml-sm">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 150px">
              <q-item clickable v-ripple to="/admin/settings/school">
                <q-item-section avatar>
                  <q-icon name="manage_accounts" color="primary" />
                </q-item-section>
                <q-item-section>School Profile</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-ripple @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="power_settings_new" color="negative" />
                </q-item-section>
                <q-item-section class="text-negative text-weight-bold">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Sidebar / Drawer Section -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="280"
      :breakpoint="500"
      class="bg-grey-1"
    >
      <q-scroll-area class="fit shadow-1">
        <q-list padding class="text-grey-8">

          <!-- Dashboard Overview -->
          <q-item clickable v-ripple to="/admin" exact active-class="nav-active">
            <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
            <q-item-section class="text-weight-bold">Dashboard</q-item-section>
          </q-item>

          <q-separator q-my-sm inset />

          <!-- Dynamic Expansion Menu Groups -->
          <template v-for="(menu, index) in menuGroups" :key="index">
            <q-expansion-item
              :icon="menu.icon"
              :label="menu.label"
              group="admin-menu"
              header-class="text-weight-medium"
            >
              <q-list class="q-pl-md bg-white">
                <q-item
                  v-for="sub in menu.items"
                  :key="sub.path"
                  clickable
                  v-ripple
                  :to="sub.path"
                  active-class="nav-active"
                  dense
                >
                  <q-item-section side>
                    <q-icon name="chevron_right" size="xs" />
                  </q-item-section>
                  <q-item-section>{{ sub.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </template>

          <q-separator q-my-md />

          <!-- Notice Board -->
          <q-item clickable v-ripple to="/admin/notice" active-class="nav-active">
            <q-item-section avatar><q-icon name="campaign" /></q-item-section>
            <q-item-section>Notice Board</q-item-section>
          </q-item>

          <q-separator q-my-md />

          <!-- Logout Button -->
          <q-item clickable v-ripple @click="handleLogout" class="text-negative q-mx-sm rounded-borders">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section class="text-weight-bolder">Logout System</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Main Page Content with Transition -->
    <q-page-container class="bg-grey-2">
      <router-view v-slot="{ Component }">
        <transition enter-active-class="animated fadeIn" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

/**
 * Menu Groups Configuration
 */
const menuGroups = [
  {
    label: 'Academic',
    icon: 'auto_stories',
    items: [
      { label: 'Academic Year', path: '/admin/academic-year' },
      { label: 'Classes', path: '/admin/class' },
      { label: 'Sections', path: '/admin/sections' },
      { label: 'Subjects', path: '/admin/subjects' },
      { label: 'Assign Teacher', path: '/admin/assign-teacher' },
      { label: 'Class Routine', path: '/admin/class-routine' }
    ]
  },
  {
    label: 'Attendance',
    icon: 'fact_check',
    items: [
      { label: 'Student Attendance', path: '/admin/attendance/student' },
      { label: 'Teacher Attendance', path: '/admin/attendance/teacher' },
      { label: 'Staff Attendance', path: '/admin/attendance/staff' },
      { label: 'Attendance Report', path: '/admin/attendance/report' }
    ]
  },
  {
    label: 'Students',
    icon: 'school',
    items: [
      { label: 'Student List', path: '/admin/students' },
      { label: 'Admission Form', path: '/admin/students/add' },
      { label: 'Quick Create', path: '/admin/students/create' },
      { label: 'Promote Student', path: '/admin/students/promote' }
      // Details path সাধারণত ডিরেক্ট মেনুতে থাকে না কারণ এটি ID ভিত্তিক, তবে এখানে লিস্টে রাখা হয়েছে
    ]
  },
  {
    label: 'Teachers',
    icon: 'record_voice_over',
    items: [
      { label: 'All Teachers', path: '/admin/teachers' },
      { label: 'Add Teacher', path: '/admin/teachers/add' }
    ]
  },
  {
    label: 'Examinations',
    icon: 'assignment',
    items: [
      { label: 'Create Exam', path: '/admin/exam/create' },
      { label: 'Exam List', path: '/admin/exam/list' },
      { label: 'Exam Routine', path: '/admin/exam/routine' },
      { label: 'Mark Entry', path: '/admin/exam/marks' },
      { label: 'Result Publish', path: '/admin/exam/result' },
      { label: 'Grade Setup', path: '/admin/exam/grade' }
    ]
  },
  {
    label: 'Fees & Accounts',
    icon: 'account_balance_wallet',
    items: [
      { label: 'Fee Types', path: '/admin/fees/type' },
      { label: 'Collection', path: '/admin/fees/collection' },
      { label: 'Invoices', path: '/admin/fees/invoice' }
    ]
  },
  {
    label: 'Inventory',
    icon: 'inventory_2',
    items: [
      { label: 'Product List', path: '/admin/inventory/products' },
      { label: 'Suppliers', path: '/admin/inventory/suppliers' },
      { label: 'Purchase', path: '/admin/inventory/purchase' },
      { label: 'Stock Report', path: '/admin/inventory/report' }
    ]
  },
  {
    label: 'Payroll',
    icon: 'payments',
    items: [
      { label: 'Salary Setup', path: '/admin/payroll/setup' },
      { label: 'Pay Salary', path: '/admin/payroll/salary' }
    ]
  },
  {
    label: 'Library',
    icon: 'collections_bookmark',
    items: [
      { label: 'Books List', path: '/admin/library/books' },
      { label: 'Issue Book', path: '/admin/library/issue' },
      { label: 'Return Book', path: '/admin/library/return' }
    ]
  },
  {
    label: 'Hostel Management',
    icon: 'hotel',
    items: [
      { label: 'Hostel List', path: '/admin/hostel/list' },
      { label: 'Room Management', path: '/admin/hostel/rooms' }
    ]
  },
  {
    label: 'Reports',
    icon: 'summarize',
    items: [
      { label: 'Exam Report', path: '/admin/reports/exam' },
      { label: 'Fees Report', path: '/admin/reports/fees' },
      { label: 'Attendance Report', path: '/admin/reports/attendance' },
      { label: 'Payroll Report', path: '/admin/reports/payroll' }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings',
    items: [
      { label: 'School Profile', path: '/admin/settings/school' },
      { label: 'User Control', path: '/admin/settings/users' }
    ]
  }
]

function handleLogout() {
  $q.dialog({
    title: '<span class="text-negative">Confirm Logout</span>',
    message: 'Are you sure you want to exit from the Admin Panel?',
    html: true,
    cancel: true,
    persistent: true,
    ok: { label: 'Logout', color: 'negative', unelevated: true },
    cancel: { label: 'Cancel', flat: true, color: 'primary' }
  }).onOk(() => {
    authStore.logout()
    router.push('/auth/login')
    $q.notify({ message: 'Logged out successfully', color: 'info', icon: 'check' })
  })
}
</script>

<style scoped>
.nav-active {
  color: #1a237e !important;
  background: #e8eaf6 !important;
  border-right: 5px solid #1a237e;
  font-weight: bold;
}

.q-expansion-item--expanded {
  background: #fdfdfd;
}

.fit { height: 100%; }

.q-item:hover {
  background-color: #f5f5f5;
  transition: 0.3s;
}
</style>
