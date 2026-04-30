<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-indigo-8 text-white"><div class="text-h6">পণ্যের তালিকা (Product List)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-input v-model="product.name" label="পণ্যের নাম" outlined dense class="col-6" />
        <q-select v-model="product.category" :options="['Stationary', 'Electronics', 'Furniture']" label="ক্যাটাগরি" outlined dense class="col-4" />
        <q-btn color="indigo-8" label="এড করুন" icon="add" @click="addProduct" class="col-2" />
      </q-card-section>
      <q-table :rows="products" :columns="[{name:'name', label:'নাম', field:'name', align:'left'}, {name:'category', label:'ক্যাটাগরি', field:'category', align:'center'}]" flat bordered />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const product = ref({ name: '', category: '' })
const products = ref([])

const addProduct = () => {
  products.value.push({ ...product.value, id: Date.now() })
  localStorage.setItem('inventory_products', JSON.stringify(products.value))
  product.value = { name: '', category: '' }
}
onMounted(() => { products.value = JSON.parse(localStorage.getItem('inventory_products') || '[]') })
</script>
