<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-blue-grey-9 text-white row items-center">
        <q-icon name="receipt_long" size="sm" class="q-mr-sm" />
        <div class="text-h6">পেমেন্ট ইতিহাস (Payment History)</div>
      </q-card-section>
      <q-table :rows="payments" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge color="green">Success</q-badge>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const payments = ref([])
const columns = [
  { name: 'id', label: 'ট্রানজেকশন আইডি', field: 'id', align: 'left' },
  { name: 'date', label: 'তারিখ', field: 'date', align: 'center' },
  { name: 'amount', label: 'টাকার পরিমাণ', field: 'paidAmount', align: 'center' },
  { name: 'status', label: 'স্ট্যাটাস', align: 'center' }
]
onMounted(() => {
  payments.value = JSON.parse(localStorage.getItem('fee_history') || '[]')
})
</script>
