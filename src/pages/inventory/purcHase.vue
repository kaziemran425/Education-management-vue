<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-green-9 text-white"><div class="text-h6">পণ্য ক্রয় (Purchase Inventory)</div></q-card-section>
      <q-card-section class="row q-col-gutter-md">
        <q-select v-model="purchase.productId" :options="productList" option-label="name" option-value="id" emit-value map-options label="পণ্য সিলেক্ট করুন" outlined dense class="col-4" />
        <q-select v-model="purchase.supplierId" :options="supplierList" option-label="name" option-value="id" emit-value map-options label="সাপ্লায়ার" outlined dense class="col-4" />
        <q-input v-model.number="purchase.qty" type="number" label="পরিমাণ (Qty)" outlined dense class="col-2" />
        <q-input v-model.number="purchase.price" type="number" label="একক মূল্য" outlined dense class="col-2" />
        <q-btn color="green-9" label="পারচেজ সম্পন্ন করুন" icon="shopping_cart" class="full-width" @click="processPurchase" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const purchase = ref({ productId: null, supplierId: null, qty: 0, price: 0 })
const productList = ref([])
const supplierList = ref([])

const processPurchase = () => {
  const purchases = JSON.parse(localStorage.getItem('purchase_history') || '[]')
  purchases.push({ ...purchase.value, id: Date.now(), date: new Date().toLocaleDateString() })
  localStorage.setItem('purchase_history', JSON.stringify(purchases))

  // আপডেট স্টক লজিক (সিম্পল)
  const stock = JSON.parse(localStorage.getItem('inventory_stock') || '{}')
  stock[purchase.value.productId] = (stock[purchase.value.productId] || 0) + purchase.value.qty
  localStorage.setItem('inventory_stock', JSON.stringify(stock))

  alert('ক্রয় সফল হয়েছে!')
}

onMounted(() => {
  productList.value = JSON.parse(localStorage.getItem('inventory_products') || '[]')
  supplierList.value = JSON.parse(localStorage.getItem('suppliers') || '[]')
})
</script>
