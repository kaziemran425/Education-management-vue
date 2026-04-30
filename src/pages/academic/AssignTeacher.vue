<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-deep-orange text-white"><div class="text-h6">শিক্ষক অ্যাসাইন (Assign Teacher)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="assign.teacher" :options="['Teacher A', 'Teacher B']" label="শিক্ষক" outlined dense class="col-4" />
        <q-select v-model="assign.class" :options="['Class 1', 'Class 2']" label="ক্লাস" outlined dense class="col-4" />
        <q-select v-model="assign.subject" :options="['Bangla', 'English']" label="বিষয়" outlined dense class="col-4" />
        <q-btn color="deep-orange" label="অ্যাসাইন করুন" class="q-mt-md full-width" @click="saveAssign" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const assign = ref({ teacher: '', class: '', subject: '' })
const saveAssign = () => {
  const list = JSON.parse(localStorage.getItem('teacher_assign') || '[]')
  list.push({ ...assign.value, id: Date.now() })
  localStorage.setItem('teacher_assign', JSON.stringify(list))
  alert('শিক্ষক অ্যাসাইন হয়েছে!')
}
</script>
