<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-deep-purple-7 text-white row items-center">
        <q-icon name="category" size="sm" class="q-mr-sm" />
        <div class="text-h6">ফি এর ধরন (Fee Types)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveFeeType" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-5">
            <q-input v-model="form.name" label="ফি এর নাম (যেমন: মাসিক বেতন)" outlined dense :rules="[val => !!val || 'আবশ্যক']" />
          </div>
          <div class="col-12 col-sm-4">
            <q-input v-model.number="form.amount" type="number" label="টাকার পরিমাণ" outlined dense />
          </div>
          <div class="col-12 col-sm-3">
            <q-btn color="deep-purple-7" icon="add" label="ফি যোগ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-table :rows="feeTypes" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteType(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({ name: '', amount: 0 })
const feeTypes = ref([])
const columns = [
  { name: 'name', label: 'ফি এর নাম', field: 'name', align: 'left' },
  { name: 'amount', label: 'পরিমাণ (৳)', field: 'amount', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadData = () => { feeTypes.value = JSON.parse(localStorage.getItem('fee_types') || '[]') }
const saveFeeType = () => {
  feeTypes.value.push({ ...form.value, id: Date.now() })
  localStorage.setItem('fee_types', JSON.stringify(feeTypes.value))
  form.value = { name: '', amount: 0 }
}
const deleteType = (id) => {
  feeTypes.value = feeTypes.value.filter(f => f.id !== id)
  localStorage.setItem('fee_types', JSON.stringify(feeTypes.value))
}
onMounted(loadData)
</script>
