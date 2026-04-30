<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-green-10 text-white"><div class="text-h6">বেতন প্রদান (Salary Payment)</div></q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="payment.staffId" :options="staffOptions" option-label="name" option-value="id" emit-value map-options label="স্টাফ/শিক্ষক সিলেক্ট করুন" outlined dense class="col-12 col-md-4" />
        <q-select v-model="payment.month" :options="months" label="মাস" outlined dense class="col-12 col-md-3" />
        <q-input v-model="payment.date" type="date" label="প্রদানের তারিখ" outlined dense stack-label class="col-12 col-md-3" />
        <q-btn color="green-10" label="পেমেন্ট হিস্ট্রি দেখুন" @click="loadHistory" class="col-12 col-md-2" />
      </q-card-section>

      <q-card-section v-if="selectedStaffConfig">
        <div class="bg-blue-1 q-pa-md rounded-borders row justify-between items-center">
          <div>
            <div class="text-subtitle2">নিট প্রদেয় বেতন (Net Payable):</div>
            <div class="text-h5 text-primary text-weight-bolder">৳ {{ calculateNet(selectedStaffConfig) }}</div>
          </div>
          <q-btn color="positive" size="lg" icon="receipt_long" label="পেমেন্ট কনফার্ম করুন" @click="confirmPayment" />
        </div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <q-table title="সাম্প্রতিক পেমেন্টসমূহ" :rows="paymentHistory" :columns="historyCols" flat bordered />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const payment = ref({ staffId: null, month: '', date: new Date().toISOString().substr(0, 10) })
const staffOptions = ref([
  { id: 1, name: 'Abdur Rahim', role: 'সিনিয়র টিচার' },
  { id: 2, name: 'Karim Ullah', role: 'অফিস সহকারী' }
])
const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
const paymentHistory = ref([])

const historyCols = [
  { name: 'name', label: 'নাম', field: 'staffName', align: 'left' },
  { name: 'month', label: 'মাস', field: 'month', align: 'center' },
  { name: 'amount', label: 'পরিমাণ', field: 'amount', align: 'center' },
  { name: 'date', label: 'তারিখ', field: 'date', align: 'right' }
]

const configs = ref([])
onMounted(() => {
  configs.value = JSON.parse(localStorage.getItem('payroll_configs') || '[]')
  paymentHistory.value = JSON.parse(localStorage.getItem('salary_history') || '[]')
})

const selectedStaffConfig = computed(() => {
  const staff = staffOptions.value.find(s => s.id === payment.value.staffId)
  if (!staff) return null
  return configs.value.find(c => c.role === staff.role)
})

const calculateNet = (c) => (c.basic + c.allowance - c.deduction)

const confirmPayment = () => {
  const staff = staffOptions.value.find(s => s.id === payment.value.staffId)
  const amount = calculateNet(selectedStaffConfig.value)

  const entry = {
    id: Date.now(),
    staffId: staff.id,
    staffName: staff.name,
    month: payment.value.month,
    amount: amount,
    date: payment.value.date
  }

  paymentHistory.value.unshift(entry)
  localStorage.setItem('salary_history', JSON.stringify(paymentHistory.value))
  $q.notify({ color: 'positive', message: `${staff.name} এর বেতন সফলভাবে প্রদান করা হয়েছে।` })
}
</script>
