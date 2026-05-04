<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="width: 100%; max-width: 800px" flat bordered>
      <q-card-section class="bg-indigo-10 text-white">
        <div class="text-h6">Student Admission Form</div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-form @submit="saveStudent" class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="form.name" label="Full Name *" outlined dense :rules="[val => !!val || 'Required']" />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="form.roll" label="Roll Number *" outlined dense />
          </div>
          <div class="col-12 col-sm-6">
            <q-select v-model="form.class" :options="['Class 1', 'Class 2', 'Class 3']" label="Class" outlined dense />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="form.phone" label="Parent Phone" outlined dense mask="###########" />
          </div>
          <div class="col-12">
            <q-input v-model="form.address" label="Address" type="textarea" outlined dense />
          </div>

          <div class="col-12 text-right q-mt-md">
            <q-btn label="Cancel" flat to="/admin/students" color="grey" class="q-mr-sm" />
            <q-btn label="Confirm Admission" type="submit" color="indigo-10" unelevated />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const form = reactive({ name: '', roll: '', class: '', phone: '', address: '' })

    const saveStudent = () => {
      const existing = JSON.parse(localStorage.getItem('iching_students') || '[]')
      const newStudent = { ...form, id: Date.now() }
      existing.push(newStudent)
      localStorage.setItem('iching_students', JSON.stringify(existing))
      $q.notify({ type: 'positive', message: 'Admission Successful' })
      router.push('/admin/students')
    }

    return { form, saveStudent }
  }
}
</script>
