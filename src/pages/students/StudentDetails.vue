<template>
  <q-page class="q-pa-md">
    <q-btn icon="arrow_back" flat label="Back to List" to="/admin/students" class="q-mb-md" />

    <q-card v-if="student" flat bordered class="row q-pa-lg">
      <div class="col-12 col-md-4 text-center">
        <q-avatar size="150px" font-size="80px" color="indigo-1" text-color="indigo-10" icon="person" />
        <div class="text-h5 q-mt-md">{{ student.name }}</div>
        <q-badge color="primary">Active Student</q-badge>
      </div>

      <div class="col-12 col-md-8 q-pl-md">
        <q-list separator>
          <q-item><q-item-section><b>Roll:</b> {{ student.roll }}</q-item-section></q-item>
          <q-item><q-item-section><b>Class:</b> {{ student.class }}</q-item-section></q-item>
          <q-item><q-item-section><b>Guardian Phone:</b> {{ student.phone }}</q-item-section></q-item>
          <q-item><q-item-section><b>Address:</b> {{ student.address }}</q-item-section></q-item>
        </q-list>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const student = ref(null)

    onMounted(() => {
      const students = JSON.parse(localStorage.getItem('iching_students') || '[]')
      student.value = students.find(s => s.id == route.query.id)
    })

    return { student }
  }
}
</script>
