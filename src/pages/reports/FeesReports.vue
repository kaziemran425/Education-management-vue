<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6">
        <q-card class="bg-green-7 text-white shadow-2">
          <q-card-section>
            <div class="text-subtitle1">মোট সংগৃহীত ফি</div>
            <div class="text-h4 text-weight-bolder">৳ {{ totalEarnings }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="bg-blue-grey-8 text-white shadow-2">
          <q-card-section>
            <div class="text-subtitle1">মোট ট্রানজেকশন</div>
            <div class="text-h4 text-weight-bolder">{{ history.length }} টি</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-table title="ফি পেমেন্ট রিপোর্ট" :rows="history" :columns="columns" flat bordered />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const history = ref([])
const columns = [
  { name: 'id', label: 'ইনভয়েস নং', field: 'id', align: 'left' },
  { name: 'date', label: 'তারিখ', field: 'date', align: 'center' },
  { name: 'amount', label: 'পরিমাণ (৳)', field: 'paidAmount', align: 'right', sortable: true }
]

const totalEarnings = computed(() => {
  return history.value.reduce((sum, item) => sum + item.paidAmount, 0)
})

onMounted(() => {
  history.value = JSON.parse(localStorage.getItem('fee_history') || '[]')
})
</script>
