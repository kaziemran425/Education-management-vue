<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-indigo text-white row items-center">
        <q-icon name="grade" size="sm" class="q-mr-sm" />
        <div class="text-h6">গ্রেড সেটআপ (Grade Setup)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="addGrade" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-3">
            <q-input v-model="newGrade.name" label="গ্রেড নাম (যেমন: A+)" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="newGrade.min" type="number" label="মিনিমাম মার্ক" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="newGrade.max" type="number" label="ম্যাক্সিমাম মার্ক" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="newGrade.point" type="number" step="0.1" label="গ্রেড পয়েন্ট" outlined dense />
          </div>
          <div class="col-12 col-sm-3">
            <q-btn color="indigo" icon="add" label="যোগ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-table :rows="grades" :columns="columns" flat bordered>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="removeGrade(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const grades = ref([])
const newGrade = ref({ name: '', min: 0, max: 100, point: 0 })

const columns = [
  { name: 'name', label: 'গ্রেড', field: 'name', align: 'left' },
  { name: 'min', label: 'মিনিমাম', field: 'min', align: 'center' },
  { name: 'max', label: 'ম্যাক্সিমাম', field: 'max', align: 'center' },
  { name: 'point', label: 'পয়েন্ট', field: 'point', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'center' }
]

const loadGrades = () => {
  grades.value = JSON.parse(localStorage.getItem('grades') || '[]')
}

const addGrade = () => {
  const data = { ...newGrade.value, id: Date.now() }
  grades.value.push(data)
  localStorage.setItem('grades', JSON.stringify(grades.value))
  newGrade.value = { name: '', min: 0, max: 100, point: 0 }
  $q.notify({ message: 'গ্রেড সেভ হয়েছে', color: 'positive' })
}

const removeGrade = (id) => {
  grades.value = grades.value.filter(g => g.id !== id)
  localStorage.setItem('grades', JSON.stringify(grades.value))
}

onMounted(loadGrades)
</script>
