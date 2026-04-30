<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-indigo-10 text-white row items-center">
        <q-icon name="settings_applications" size="sm" class="q-mr-sm" />
        <div class="text-h6">পেরোল সেটআপ (Payroll Setup)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveSetup" class="row q-col-gutter-md items-end">
          <div class="col-12 col-sm-4">
            <q-input v-model="setup.role" label="পদবী (যেমন: সিনিয়র টিচার)" outlined dense :rules="[val => !!val || 'আবশ্যক']" />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="setup.basic" type="number" label="মূল বেতন" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="setup.allowance" type="number" label="বোনাস/ভাতা" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-input v-model.number="setup.deduction" type="number" label="কর্তন (ট্যাক্স/অন্যান্য)" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-btn color="indigo-10" icon="save" label="সেভ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-table :rows="setupList" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-net="props">
          <q-td :props="props" class="text-weight-bold">
            ৳ {{ props.row.basic + props.row.allowance - props.row.deduction }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteSetup(props.row.id)" />
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
const setup = ref({ role: '', basic: 0, allowance: 0, deduction: 0 })
const setupList = ref([])

const columns = [
  { name: 'role', label: 'পদবী', field: 'role', align: 'left' },
  { name: 'basic', label: 'বেসিক (৳)', field: 'basic', align: 'center' },
  { name: 'allowance', label: 'ভাতা (+)', field: 'allowance', align: 'center' },
  { name: 'deduction', label: 'কর্তন (-)', field: 'deduction', align: 'center' },
  { name: 'net', label: 'নিট বেতন', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadData = () => { setupList.value = JSON.parse(localStorage.getItem('payroll_configs') || '[]') }

const saveSetup = () => {
  setupList.value.push({ ...setup.value, id: Date.now() })
  localStorage.setItem('payroll_configs', JSON.stringify(setupList.value))
  setup.value = { role: '', basic: 0, allowance: 0, deduction: 0 }
  $q.notify({ color: 'positive', message: 'পেরোল সেটআপ সংরক্ষিত হয়েছে' })
}

const deleteSetup = (id) => {
  setupList.value = setupList.value.filter(s => s.id !== id)
  localStorage.setItem('payroll_configs', JSON.stringify(setupList.value))
}

onMounted(loadData)
</script>
