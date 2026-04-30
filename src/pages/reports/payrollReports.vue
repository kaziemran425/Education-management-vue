<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-deep-orange-9 text-white row items-center">
        <q-icon name="receipt" size="sm" class="q-mr-sm" />
        <div class="text-h6">পেরোল রিপোর্ট (Payroll Reports)</div>
      </q-card-section>

      <q-table
        :rows="salaryData"
        :columns="salaryCols"
        flat
        bordered
        class="q-mt-md"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge color="green">Paid</q-badge>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const salaryData = ref([])
const salaryCols = [
  { name: 'name', label: 'শিক্ষক/স্টাফ', field: 'staffName', align: 'left' },
  { name: 'month', label: 'মাস', field: 'month', align: 'center' },
  { name: 'amount', label: 'টাকার পরিমাণ', field: 'amount', align: 'center' },
  { name: 'status', label: 'স্ট্যাটাস', align: 'center' }
]

onMounted(() => {
  salaryData.value = JSON.parse(localStorage.getItem('salary_history') || '[]')
})
</script>
