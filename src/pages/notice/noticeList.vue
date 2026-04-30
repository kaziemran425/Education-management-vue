<template>
  <q-page padding class="bg-grey-2">
    <!-- Header Section -->
    <div class="row q-col-gutter-md items-center q-mb-lg">
      <div class="col-12 col-md-6">
        <div class="text-h4 text-weight-bold text-primary">
          <q-icon name="campaign" class="q-mr-sm" />নোটিশ বোর্ড
        </div>
      </div>
      <div class="col-12 col-md-6 text-right">
        <q-btn
          color="primary"
          icon="add"
          label="নতুন নোটিশ লিখুন"
          @click="showDialog = true"
          class="q-px-md"
        />
      </div>
    </div>

    <!-- Notice Display Area -->
    <div class="row q-col-gutter-lg">
      <div v-if="notices.length === 0" class="col-12 text-center q-pa-xl">
        <q-icon name="event_busy" size="100px" color="grey-4" />
        <div class="text-h6 text-grey-6">এখন পর্যন্ত কোনো নোটিশ দেওয়া হয়নি।</div>
      </div>

      <div v-for="notice in notices" :key="notice.id" class="col-12 col-md-6 col-lg-4">
        <q-card flat bordered class="notice-card shadow-1 full-height">
          <q-card-section class="q-pb-none">
            <div class="row justify-between items-start">
              <q-badge :color="getCategoryColor(notice.category)" class="q-pa-xs">
                {{ notice.category }}
              </q-badge>
              <div class="text-caption text-grey-7">
                <q-icon name="schedule" /> {{ notice.date }}
              </div>
            </div>
            <div class="text-h6 q-mt-sm text-weight-bold notice-title">{{ notice.title }}</div>
          </q-card-section>

          <q-card-section class="text-grey-8">
            <div class="ellipsis-3-lines">{{ notice.description }}</div>
          </q-card-section>

          <q-separator inset />

          <q-card-actions align="right">
            <q-btn flat round color="blue" icon="visibility" @click="viewNotice(notice)" />
            <q-btn flat round color="red" icon="delete" @click="deleteNotice(notice.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Create Notice Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px; width: 600px">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">নতুন নোটিশ তৈরি করুন</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.title" label="নোটিশের শিরোনাম" outlined dense autofocus />
          <q-select
            v-model="form.category"
            :options="['সাধারণ', 'পরীক্ষা', 'ছুটি', 'ভর্তি', 'জরুরি']"
            label="ক্যাটাগরি"
            outlined
            dense
          />
          <q-input
            v-model="form.description"
            type="textarea"
            label="বিস্তারিত বিবরণ"
            outlined
            dense
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pb-md q-px-md">
          <q-btn flat label="বাতিল" v-close-popup />
          <q-btn color="primary" label="প্রকাশ করুন" icon="send" @click="saveNotice" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- View Notice Detail Dialog -->
    <q-dialog v-model="viewDialog">
      <q-card style="width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedNotice?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="text-caption text-grey">
          প্রকাশের তারিখ: {{ selectedNotice?.date }} | ক্যাটাগরি: {{ selectedNotice?.category }}
        </q-card-section>
        <q-card-section class="q-pt-sm text-body1">
          {{ selectedNotice?.description }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const notices = ref([])
const showDialog = ref(false)
const viewDialog = ref(false)
const selectedNotice = ref(null)

const form = ref({
  title: '',
  category: 'সাধারণ',
  description: ''
})

const loadNotices = () => {
  const saved = localStorage.getItem('school_notices')
  notices.value = saved ? JSON.parse(saved) : []
}

const saveNotice = () => {
  if (!form.value.title || !form.value.description) {
    $q.notify({ color: 'negative', message: 'সবগুলো তথ্য পূরণ করুন' })
    return
  }

  const newEntry = {
    id: Date.now(),
    ...form.value,
    date: new Date().toLocaleDateString('bn-BD')
  }

  notices.value.unshift(newEntry) // নতুন নোটিশ সবার উপরে দেখাবে
  localStorage.setItem('school_notices', JSON.stringify(notices.value))

  // Reset
  form.value = { title: '', category: 'সাধারণ', description: '' }
  showDialog.value = false
  $q.notify({ color: 'positive', message: 'নোটিশটি সফলভাবে প্রকাশিত হয়েছে', icon: 'campaign' })
}

const deleteNotice = (id) => {
  $q.dialog({
    title: 'নিশ্চিত করুন',
    message: 'আপনি কি এই নোটিশটি ডিলিট করতে চান?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    notices.value = notices.value.filter(n => n.id !== id)
    localStorage.setItem('school_notices', JSON.stringify(notices.value))
    $q.notify({ color: 'orange', message: 'নোটিশ ডিলিট করা হয়েছে' })
  })
}

const viewNotice = (notice) => {
  selectedNotice.value = notice
  viewDialog.value = true
}

const getCategoryColor = (cat) => {
  switch (cat) {
    case 'জরুরি': return 'red'
    case 'পরীক্ষা': return 'orange-9'
    case 'ছুটি': return 'teal'
    case 'ভর্তি': return 'indigo'
    default: return 'blue-grey'
  }
}

onMounted(loadNotices)
</script>

<style scoped>
.notice-card {
  transition: transform 0.3s;
  border-radius: 12px;
}
.notice-card:hover {
  transform: translateY(-5px);
}
.notice-title {
  color: #2c3e50;
  line-height: 1.2;
}
.ellipsis-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  height: 4.5em;
}
</style>
