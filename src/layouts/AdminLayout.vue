<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
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
          School <span class="text-weight-light">ERP Admin</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>
          <q-btn round flat>
            <q-avatar size="32px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar
                    ><q-icon name="logout" color="red"
                  /></q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-white">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-expansion-item icon="dashboard" label="Dashboard" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/dashboard">
                <q-item-section>Dashboard</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="school" label="Academic" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/academic-year">
                <q-item-section>Academic Year</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/class">
                <q-item-section>Class Setup</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/asin-teacher">
                <q-item-section>Assign Teacher</q-item-section>
              </q-item>
                 <q-item clickable v-ripple to="/admin/subject">
                <q-item-section>Subject </q-item-section>
              </q-item>
                  <q-item clickable v-ripple to="/admin/section">
                <q-item-section>Section </q-item-section>
              </q-item>
                  <q-item clickable v-ripple to="/admin/class-routine">
                <q-item-section>class Routine </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="group" label="Students" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/student-list">
                <q-item-section>Student List</q-item-section>
              </q-item>
              <!-- <q-item clickable v-ripple to="/admin/student-add">
                <q-item-section>Add Student</q-item-section>
              </q-item> -->
              <q-item clickable v-ripple to="/admin/student-promote">
                <q-item-section>Promote Student</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="person" label="Teacher" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/teacher-list">
                <q-item-section>Teacher List</q-item-section>
              </q-item>
               <q-item clickable v-ripple to="/admin/teacher-add">
                <q-item-section>Teacher Add</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="fingerprint" label="Attendance" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/student-attendance">
                <q-item-section>Student Attendance</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/teacher-attendance">
                <q-item-section>Teacher Attendance</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/staff-attendance">
                <q-item-section>Staff Attendance</q-item-section>
              </q-item>
              <!-- <q-item clickable v-ripple to="/admin/attendance-report">
                <q-item-section> Attendance Report</q-item-section>
              </q-item> -->
            </q-list>
          </q-expansion-item>

          <!-- notice -->
          <q-expansion-item icon="announcement" label="Notice" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/notice-list">
                <q-item-section>Notice List</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="assignment" label="Exam" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/exam-list">
                <q-item-section>Exam List</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/mark-entry">
                <q-item-section>Mark Entry</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/Result-publish">
                <q-item-section>Result Publish</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/exam-create">
                <q-item-section>Exam Create</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/exam-routine">
                <q-item-section>Exam Routine</q-item-section>
              </q-item>
                <q-item clickable v-ripple to="/admin/grade-setup">
                <q-item-section>Grade Setup</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="local_library" label="Library" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/book-list">
                <q-item-section>Book List</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/book-issue">
                <q-item-section>Book Issue</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/book-return">
                <q-item-section>Book Return</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item icon="inventory_2" label="Inventory" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/product-list">
                <q-item-section>Product List</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/purchase">
                <q-item-section>Purchase</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/stock-report">
                <q-item-section>Stock Report</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/supplier-list">
                <q-item-section>Supplier List</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item
            icon="payments"
            label="Finance & Payroll"
            group="menu"
          >
            <q-list class="q-pl-md">

              <q-item clickable v-ripple to="/admin/payroll-setup">
                <q-item-section>Payroll Setup</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/salary-payment">
                <q-item-section>Salary Payment</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <!-- report -->

          <q-expansion-item icon="report" label="Reports" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/attendance-report">
                <q-item-section>Attendance Report</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/exam-reports">
                <q-item-section>Exam-reports</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/fees-reports">
                <q-item-section>Fees Reports</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/payroll-reports">
                <q-item-section>Payroll Reports</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

<!-- fees -->

           <q-expansion-item icon="monetization_on" label="Fees" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/fee-collection">
                <q-item-section>Fee Collection</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/fee-types">
                <q-item-section>Fee Types</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/fee-invoice">
                <q-item-section>Fee Invoice</q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>

          <!-- certificate -->

          <q-expansion-item icon="verified" label="Certificate" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/generate-certificate">
                <q-item-section>Generate Certificate</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/id-card">
                <q-item-section>ID Card Generator</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/admit-card-generator">
                <q-item-section>Admit Card Generator</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin/list-certificate">
                <q-item-section>List Certificates</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <!-- setting -->
          <q-expansion-item icon="settings" label="Settings" group="menu">
            <q-list class="q-pl-md">
              <q-item clickable v-ripple to="/admin/general-settings">
                <q-item-section>school Profile</q-item-section>
              </q-item>
                <q-item clickable v-ripple to="/admin/general-settings">
                <q-item-section></q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

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

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("user_session");
      router.push("/auth/login");
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
};
</script>

<style scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
  margin-right: 8px;
}
.q-expansion-item--expanded {
  background: rgba(25, 118, 210, 0.05);
}
</style>
