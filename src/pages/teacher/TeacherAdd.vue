<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered class="q-mx-auto" style="max-width: 900px">
      <q-card-section class="bg-deep-purple-10 text-white row items-center">
        <q-icon name="person_add_alt" size="sm" class="q-mr-sm" />
        <div class="text-h6">শিক্ষক নিয়োগ (Teacher Registration)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveTeacher" class="row q-col-gutter-md">
          <!-- Personal Info -->
          <div class="col-12 col-md-6">
            <q-input v-model="form.name" label="শিক্ষকের পুরো নাম" outlined dense :rules="[val => !!val || 'নাম আবশ্যক']" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.designation" label="পদবী (যেমন: সিনিয়র শিক্ষক)" outlined dense :rules="[val => !!val || 'পদবী আবশ্যক']" />
          </div>

          <div class="col-12 col-md-4">
            <q-select v-model="form.gender" :options="['পুরুষ', 'মহিলা', 'অন্যান্য']" label="লিঙ্গ" outlined dense />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="form.phone" label="মোবাইল নম্বর" outlined dense mask="###########" />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="form.email" label="ইমেইল" outlined dense type="email" />
          </div>

          <!-- Academic Info -->
          <div class="col-12 col-md-6">
            <q-input v-model="form.qualification" label="শিক্ষাগত যোগ্যতা" outlined dense placeholder="যেমন: এম.এ, বি.এড" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.joinDate" type="date" label="যোগদানের তারিখ" outlined dense stack-label />
          </div>

          <div class="col-12">
            <q-input v-model="form.address" label="বর্তমান ঠিকানা" outlined dense type="textarea" rows="2" />
          </div>

          <div class="col-12 row justify-end q-gutter-sm">
            <q-btn label="রিসেট" color="grey-7" flat type="reset" />
            <q-btn color="deep-purple-10" label="শিক্ষক হিসেবে যুক্ত করুন" icon="save" type="submit" class="q-px-lg" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const form = ref({
  name: '',
  designation: '',
  gender: 'পুরুষ',
  phone: '',
  email: '',
  qualification: '',
  joinDate: new Date().toISOString().substr(0, 10),
  address: ''
})

const saveTeacher = () => {
  try {
    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]')

    // নতুন শিক্ষক অবজেক্ট
    const newTeacher = {
      ...form.value,
      id: Date.now(),
      status: 'Active'
    }

    teachers.push(newTeacher)
    localStorage.setItem('teachers', JSON.stringify(teachers))

    $q.notify({
      color: 'positive',
      message: 'শিক্ষকের তথ্য সফলভাবে সংরক্ষিত হয়েছে!',
      icon: 'check'
    })

    // ফর্ম রিসেট
    form.value = { name: '', designation: '', gender: 'পুরুষ', phone: '', email: '', qualification: '', joinDate: new Date().toISOString().substr(0, 10), address: '' }

  } catch (error) {
    $q.notify({ color: 'negative', message: 'ডাটা সেভ করতে সমস্যা হয়েছে।' })
  }
}
</script>
