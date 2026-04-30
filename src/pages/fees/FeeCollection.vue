<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-green-7 text-white">
        <div class="text-h6">ফি সংগ্রহ (Fee Collection)</div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-select v-model="collection.studentId" :options="students" option-label="name" option-value="id" emit-value map-options label="শিক্ষার্থী সিলেক্ট করুন" outlined dense />
        </div>
        <div class="col-12 col-md-4">
          <q-select v-model="collection.feeTypeId" :options="feeTypes" option-label="name" option-value="id" emit-value map-options label="ফি এর ধরন" outlined dense @update:model-value="updateAmount" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model.number="collection.paidAmount" type="number" label="প্রদত্ত টাকা" outlined dense />
        </div>
        <div class="col-12">
          <q-btn color="green-7" label="টাকা জমা নিন এবং ইনভয়েস তৈরি করুন" icon="payments" class="full-width" @click="collectFee" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const collection = ref({ studentId: null, feeTypeId: null, paidAmount: 0, date: new Date().toLocaleDateString() })
const students = ref([])
const feeTypes = ref([])

onMounted(() => {
  students.value = JSON.parse(localStorage.getItem('students') || '[{"id":1,"name":"Kazi Emran"}]') // ডামি ডাটা
  feeTypes.value = JSON.parse(localStorage.getItem('fee_types') || '[]')
})

const updateAmount = (val) => {
  const selected = feeTypes.value.find(f => f.id === val)
  if (selected) collection.value.paidAmount = selected.amount
}

const collectFee = () => {
  if (!collection.value.studentId || !collection.value.paidAmount) return alert('সব তথ্য দিন')
  const history = JSON.parse(localStorage.getItem('fee_history') || '[]')
  const invoiceId = 'INV-' + Date.now()
  const data = { ...collection.value, id: invoiceId }
  history.push(data)
  localStorage.setItem('fee_history', JSON.stringify(history))

  // ইনভয়েস পেজে পাঠিয়ে দেওয়া
  router.push({ path: '/fees/FeeInvoice', query: { id: invoiceId } })
}
</script>
