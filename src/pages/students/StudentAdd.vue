<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered class="q-mx-auto" style="max-width: 800px">
      <q-card-section class="bg-primary text-white row items-center">
        <q-icon name="person_add" size="sm" class="q-mr-sm" />
        <div class="text-h6">শিক্ষার্থী ভর্তি (Admission Form)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveStudent" class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="form.name" label="শিক্ষার্থীর নাম" outlined dense :rules="[val => !!val || 'নাম আবশ্যক']" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.roll" label="রোল নম্বর" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-select v-model="form.class" :options="classList" label="ক্লাস সিলেক্ট করুন" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-select v-model="form.section" :options="['A', 'B', 'C']" label="সেকশন" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.fatherName" label="পিতার নাম" outlined dense />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.phone" label="মোবাইল নম্বর" outlined dense />
          </div>
          <div class="col-12">
            <q-btn color="primary" label="ভর্তি সম্পন্ন করুন" icon="how_to_reg" type="submit" class="full-width" />
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
const form = ref({ name: '', roll: '', class: '', section: '', fatherName: '', phone: '' })
const classList = ref([])

onMounted(() => {
  const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
  classList.value = savedClasses.map(c => c.name)
})

const saveStudent = () => {
  const students = JSON.parse(localStorage.getItem('students') || '[]')
  students.push({ ...form.value, id: Date.now() })
  localStorage.setItem('students', JSON.stringify(students))

  $q.notify({ color: 'positive', message: 'শিক্ষার্থী সফলভাবে ভর্তি করা হয়েছে' })
  form.value = { name: '', roll: '', class: '', section: '', fatherName: '', phone: '' }
}
</script>
