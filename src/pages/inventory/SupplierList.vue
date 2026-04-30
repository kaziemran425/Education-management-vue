<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-blue-grey-9 text-white row items-center">
        <q-icon name="local_shipping" size="sm" class="q-mr-sm" />
        <div class="text-h6">সাপ্লায়ার তালিকা (Supplier List)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveSupplier" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-4">
            <q-input v-model="form.name" label="সাপ্লায়ারের নাম" outlined dense :rules="[val => !!val || 'আবশ্যক']" />
          </div>
          <div class="col-12 col-sm-3">
            <q-input v-model="form.phone" label="ফোন নম্বর" outlined dense />
          </div>
          <div class="col-12 col-sm-3">
            <q-input v-model="form.address" label="ঠিকানা" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-btn color="blue-grey-9" icon="add" label="যোগ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-table :rows="suppliers" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteSupplier(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({ name: '', phone: '', address: '' })
const suppliers = ref([])
const columns = [
  { name: 'name', label: 'সাপ্লায়ার', field: 'name', align: 'left' },
  { name: 'phone', label: 'ফোন', field: 'phone', align: 'center' },
  { name: 'address', label: 'ঠিকানা', field: 'address', align: 'left' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadData = () => { suppliers.value = JSON.parse(localStorage.getItem('suppliers') || '[]') }
const saveSupplier = () => {
  suppliers.value.push({ ...form.value, id: Date.now() })
  localStorage.setItem('suppliers', JSON.stringify(suppliers.value))
  form.value = { name: '', phone: '', address: '' }
}
const deleteSupplier = (id) => {
  suppliers.value = suppliers.value.filter(s => s.id !== id)
  localStorage.setItem('suppliers', JSON.stringify(suppliers.value))
}
onMounted(loadData)
</script>
