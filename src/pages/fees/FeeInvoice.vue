<template>
  <q-page padding class="flex flex-center">
    <q-card flat bordered style="width: 500px" id="printable-invoice">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold">E-ducation School</div>
        <div class="text-caption">মিরপুর, ঢাকা - ১২১৬</div>
        <q-separator class="q-my-md" />
        <div class="text-h6">মানি রিসিট (Money Receipt)</div>
      </q-card-section>

      <q-card-section v-if="invoice">
        <div class="row justify-between q-mb-md">
          <span>ইনভয়েস নং: <b>{{ invoice.id }}</b></span>
          <span>তারিখ: {{ invoice.date }}</span>
        </div>

        <div class="bg-grey-2 q-pa-sm rounded-borders">
          <div class="row justify-between">
            <span>শিক্ষার্থীর নাম:</span>
            <span class="text-weight-bold">{{ getStudentName(invoice.studentId) }}</span>
          </div>
          <div class="row justify-between q-mt-xs">
            <span>ফি এর বিবরণ:</span>
            <span class="text-weight-bold">{{ getFeeName(invoice.feeTypeId) }}</span>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="row justify-between text-h6 text-primary">
          <span>মোট পরিশোধ:</span>
          <span>৳ {{ invoice.paidAmount }}</span>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="no-print">
        <q-btn color="primary" icon="print" label="প্রিন্ট করুন" @click="printInvoice" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
@media print {
  .no-print { display: none; }
  body { background: white; }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const invoice = ref(null)
const students = ref([])
const feeTypes = ref([])

onMounted(() => {
  const history = JSON.parse(localStorage.getItem('fee_history') || '[]')
  invoice.value = history.find(h => h.id === route.query.id)
  students.value = JSON.parse(localStorage.getItem('students') || '[{"id":1,"name":"Kazi Emran"}]')
  feeTypes.value = JSON.parse(localStorage.getItem('fee_types') || '[]')
})

const getStudentName = (id) => students.value.find(s => s.id === id)?.name || 'N/A'
const getFeeName = (id) => feeTypes.value.find(f => f.id === id)?.name || 'N/A'

const printInvoice = () => { window.print() }
</script>
