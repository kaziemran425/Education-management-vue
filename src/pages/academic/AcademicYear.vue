<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-blue-10 text-white row items-center">
        <q-icon name="event_note" size="sm" class="q-mr-sm" />
        <div class="text-h6">শিক্ষাবর্ষ সেটআপ (Academic Year)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveYear" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-5">
            <q-input v-model="yearForm.title" label="শিক্ষাবর্ষ (যেমন: ২০২৬)" outlined dense :rules="[val => !!val || 'আবশ্যক']" />
          </div>
          <div class="col-12 col-sm-4">
            <q-toggle v-model="yearForm.isCurrent" label="বর্তমান সেশন হিসেবে সেট করুন" color="green" />
          </div>
          <div class="col-12 col-sm-3">
            <q-btn color="blue-10" icon="add" label="বছরের তালিকা যোগ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-table :rows="years" :columns="yearCols" flat bordered row-key="id">
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="props.row.isCurrent ? 'green' : 'grey'">
              {{ props.row.isCurrent ? 'Active' : 'Inactive' }}
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteYear(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const yearForm = ref({ title: '', isCurrent: false })
const years = ref([])

const yearCols = [
  { name: 'title', label: 'শিক্ষাবর্ষ', field: 'title', align: 'left' },
  { name: 'status', label: 'স্ট্যাটাস', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'center' }
]

const loadData = () => { years.value = JSON.parse(localStorage.getItem('academic_years') || '[]') }

const saveYear = () => {
  if (yearForm.value.isCurrent) years.value.forEach(y => y.isCurrent = false)
  years.value.push({ ...yearForm.value, id: Date.now() })
  localStorage.setItem('academic_years', JSON.stringify(years.value))
  yearForm.value = { title: '', isCurrent: false }
}

const deleteYear = (id) => {
  years.value = years.value.filter(y => y.id !== id)
  localStorage.setItem('academic_years', JSON.stringify(years.value))
}

onMounted(loadData)
</script>
