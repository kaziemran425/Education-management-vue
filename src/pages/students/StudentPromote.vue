<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-indigo-10 q-mb-md text-weight-bold">Promote Students</div>

    <q-card flat bordered class="q-pa-md">
      <div class="row q-col-gutter-md items-end">
        <div class="col-12 col-sm-4">
          <q-select v-model="currentClass" :options="['Class 1', 'Class 2', 'Class 3']" label="From Class" outlined dense />
        </div>
        <div class="col-12 col-sm-4">
          <q-select v-model="targetClass" :options="['Class 2', 'Class 3', 'Class 4']" label="To Class" outlined dense />
        </div>
        <div class="col-12 col-sm-4">
          <q-btn label="Promote All" color="positive" icon="trending_up" class="full-width" @click="handlePromote" unelevated />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const currentClass = ref('')
    const targetClass = ref('')

    const handlePromote = () => {
      if(!currentClass.value || !targetClass.value) return
      let students = JSON.parse(localStorage.getItem('iching_students') || '[]')
      students = students.map(s => {
        if(s.class === currentClass.value) s.class = targetClass.value
        return s
      })
      localStorage.setItem('iching_students', JSON.stringify(students))
      $q.notify({ type: 'positive', message: 'Students promoted successfully' })
    }

    return { currentClass, targetClass, handlePromote }
  }
}
</script>
