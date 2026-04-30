<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">বিস্তারিত ভর্তি ফর্ম (Detailed Admission)</div>
      </q-card-section>
      <q-card-section>
        <q-stepper v-model="step" vertical color="primary" animated>
          <q-step :name="1" title="ব্যক্তিগত তথ্য" icon="person">
            <q-input v-model="form.name" label="পুরো নাম" outlined class="q-mb-md" />
            <q-input v-model="form.dob" type="date" label="জন্ম তারিখ" outlined stack-label />
            <q-stepper-navigation><q-btn @click="step = 2" color="primary" label="পরবর্তী" /></q-stepper-navigation>
          </q-step>

          <q-step :name="2" title="পারিবারিক তথ্য" icon="family_restroom">
            <q-input v-model="form.father" label="পিতার নাম" outlined class="q-mb-md" />
            <q-input v-model="form.mother" label="মাতার নাম" outlined />
            <q-stepper-navigation>
              <q-btn flat @click="step = 1" label="পিছনে" />
              <q-btn @click="save" color="primary" label="সেভ করুন" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const step = ref(1)
const form = ref({ name: '', dob: '', father: '', mother: '' })

const save = () => {
  const list = JSON.parse(localStorage.getItem('students_detailed') || '[]')
  list.push({ ...form.value, id: Date.now() })
  localStorage.setItem('students_detailed', JSON.stringify(list))
  alert('বিস্তারিত তথ্য সংরক্ষিত হয়েছে')
}
</script>
