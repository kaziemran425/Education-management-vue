<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered class="q-mx-auto" style="max-width: 900px">
      <q-card-section class="bg-blue-grey-10 text-white row items-center">
        <q-icon name="school" size="sm" class="q-mr-sm" />
        <div class="text-h6">স্কুল প্রোফাইল (School Profile)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveProfile" class="row q-col-gutter-md">
          <!-- School Logo Placeholder -->
          <div class="col-12 text-center q-mb-md">
            <q-avatar size="100px" font-size="52px" color="blue-grey-2" text-color="blue-grey-10" icon="photo_camera" />
            <div class="text-caption q-mt-sm">স্কুল লোগো আপলোড করুন (SaaS Logo)</div>
          </div>

          <div class="col-12 col-md-6">
            <q-input v-model="profile.name" label="স্কুলের নাম" outlined dense :rules="[val => !!val || 'নাম আবশ্যক']" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="profile.eiin" label="EIIN নম্বর" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="profile.phone" label="মোবাইল নম্বর" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="profile.email" label="অফিসিয়াল ইমেইল" outlined dense />
          </div>
          <div class="col-12">
            <q-input v-model="profile.address" label="স্কুলের ঠিকানা" outlined dense type="textarea" rows="2" />
          </div>

          <div class="col-12 row justify-end">
            <q-btn color="blue-grey-10" label="প্রোফাইল আপডেট করুন" icon="save" type="submit" class="q-px-lg" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const profile = ref({
  name: '',
  eiin: '',
  phone: '',
  email: '',
  address: ''
})

const loadProfile = () => {
  const saved = localStorage.getItem('school_profile')
  if (saved) profile.value = JSON.parse(saved)
}

const saveProfile = () => {
  localStorage.setItem('school_profile', JSON.stringify(profile.value))
  $q.notify({
    color: 'positive',
    message: 'স্কুল প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!',
    icon: 'done'
  })
}

onMounted(loadProfile)
</script>
