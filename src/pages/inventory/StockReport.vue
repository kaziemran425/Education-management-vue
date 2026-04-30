<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-teal-7 text-white text-h6">স্টক রিপোর্ট (Stock Report)</q-card-section>
      <q-table :rows="stockData" :columns="stockCols" flat bordered no-data-label="স্টকে কোনো মালামাল নেই" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stockData = ref([])
const stockCols = [
  { name: 'name', label: 'পণ্যের নাম', field: 'name', align: 'left' },
  { name: 'qty', label: 'বর্তমান স্টক', field: 'qty', align: 'center' }
]

onMounted(() => {
  const products = JSON.parse(localStorage.getItem('inventory_products') || '[]')
  const stock = JSON.parse(localStorage.getItem('inventory_stock') || '{}')

  stockData.value = products.map(p => ({
    name: p.name,
    qty: stock[p.id] || 0
  }))
})
</script>
