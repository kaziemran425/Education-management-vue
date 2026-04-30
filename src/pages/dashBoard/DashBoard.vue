<template>
  <q-page padding class="bg-grey-2">
    <!-- Welcome Header -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12">
        <div class="text-h4 text-weight-bolder text-primary">স্বাগতম, অ্যাডমিন!</div>
        <div class="text-subtitle1 text-grey-7">আজকের স্কুলের সংক্ষিপ্ত সারসংক্ষেপ এখানে দেখুন।</div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="(stat, index) in stats" :key="index" class="col-12 col-sm-6 col-md-3">
        <!-- Class Binding Fix -->
        <q-card flat bordered class="stats-card" :class="[`bg-${stat.color}-1`, `text-${stat.color}`]">
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-overline text-grey-8">{{ stat.title }}</div>
              <div class="text-h4 text-weight-bold">{{ stat.value }}</div>
            </div>
            <q-icon :name="stat.icon" size="3rem" :color="stat.color" />
          </q-card-section>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <!-- Recent Activity / Notices -->
      <div class="col-12 col-md-7">
        <q-card flat bordered class="full-height">
          <q-card-section class="row items-center">
            <q-icon name="campaign" size="sm" color="orange" class="q-mr-sm" />
            <div class="text-h6">সাম্প্রতিক নোটিশ</div>
            <q-space />
            <q-btn flat color="primary" label="সব দেখুন" to="/notice/noticeList" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list separator v-if="notices.length > 0">
              <q-item v-for="notice in notices.slice(0, 5)" :key="notice.id" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar color="orange-1" text-color="orange-9" icon="notifications" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ notice.title }}</q-item-label>
                  <q-item-label caption lines="2">{{ notice.description }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>{{ notice.date }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <div v-else class="text-center q-pa-lg text-grey">কোনো নোটিশ পাওয়া যায়নি।</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Quick Actions & Summaries -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="bg-indigo-7 text-white">
            <div class="text-h6">দ্রুত লিঙ্ক (Quick Links)</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn color="primary" icon="person_add" label="ভর্তি" class="full-width" to="/students/StudentAdd" />
            </div>
            <div class="col-6">
              <q-btn color="teal" icon="payments" label="ফি সংগ্রহ" class="full-width" to="/fees/FeeCollection" />
            </div>
            <div class="col-6">
              <q-btn color="orange" icon="edit_calendar" label="এটেন্ডেন্স" class="full-width" to="/attendance/studentAttendance" />
            </div>
            <div class="col-6">
              <q-btn color="blue-grey" icon="analytics" label="রিপোর্ট" class="full-width" to="/reports/ExamReports" />
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
          <q-card-section class="row items-center">
            <q-icon name="account_balance_wallet" size="sm" color="green" class="q-mr-sm" />
            <div class="text-h6">আর্থিক সংক্ষিপ্ত বিবরণ</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row justify-between q-mb-sm">
              <span>মোট সংগৃহীত ফি:</span>
              <span class="text-weight-bold text-green">৳ {{ totalFees }}</span>
            </div>
            <div class="row justify-between">
              <span>মোট বেতন প্রদান:</span>
              <span class="text-weight-bold text-red">৳ {{ totalPayroll }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const notices = ref([])
const totalFees = ref(0)
const totalPayroll = ref(0)

const stats = ref([
  { title: 'মোট শিক্ষার্থী', value: 0, icon: 'groups', color: 'blue' },
  { title: 'মোট শিক্ষক', value: 0, icon: 'deep-purple', color: 'deep-purple' },
  { title: 'মোট লাইব্রেরি বই', value: 0, icon: 'menu_book', color: 'brown' },
  { title: 'অ্যাকটিভ ইউজার', value: 0, icon: 'admin_panel_settings', color: 'teal' }
])

const loadDashboardData = () => {
  loading.value = true

  // Local Storage থেকে ডাটা আনা
  const studentData = JSON.parse(localStorage.getItem('students') || '[]')
  const teacherData = JSON.parse(localStorage.getItem('teachers') || '[]')
  const bookData = JSON.parse(localStorage.getItem('library_books') || '[]')
  const userData = JSON.parse(localStorage.getItem('system_users') || '[]')
  const noticeData = JSON.parse(localStorage.getItem('school_notices') || '[]')
  const feeHistory = JSON.parse(localStorage.getItem('fee_history') || '[]')
  const salaryHistory = JSON.parse(localStorage.getItem('salary_history') || '[]')

  // Stats আপডেট করা
  stats.value[0].value = studentData.length
  stats.value[1].value = teacherData.length
  stats.value[2].value = bookData.length
  stats.value[3].value = userData.length

  notices.value = noticeData

  // ফিন্যান্সিয়াল ক্যালকুলেশন
  totalFees.value = feeHistory.reduce((sum, item) => sum + (Number(item.paidAmount) || 0), 0)
  totalPayroll.value = salaryHistory.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)

  loading.value = false
}

onMounted(() => {
  setTimeout(loadDashboardData, 500)
})
</script>

<style scoped>
.stats-card {
  border-radius: 15px;
  transition: transform 0.2s ease-in-out;
}
.stats-card:hover {
  transform: scale(1.03);
}
.full-height {
  height: 100%;
}
</style>
