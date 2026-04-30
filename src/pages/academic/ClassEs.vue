<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-cyan-8 text-white"><div class="text-h6">ক্লাস তালিকা (Class Management)</div></q-card-section>
      <q-card-section>
        <q-form @submit="addClass" class="row q-col-gutter-sm">
          <q-input v-model="className" label="ক্লাসের নাম (যেমন: Class 10)" outlined dense class="col-8" />
          <q-btn color="cyan-8" label="ক্লাস এড করুন" icon="add" type="submit" class="col-4" />
        </q-form>
      </q-card-section>
      <q-table :rows="classes" :columns="[{name:'name', label:'নাম', field:'name', align:'left'}, {name:'actions', label:'অ্যাকশন', align:'right'}]" flat bordered>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props"><q-btn flat round color="red" icon="delete" size="sm" @click="removeClass(props.row.id)" /></q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const className = ref('')
const classes = ref([])

const load = () => { classes.value = JSON.parse(localStorage.getItem('classes') || '[]') }
const addClass = () => {
  classes.value.push({ name: className.value, id: Date.now() })
  localStorage.setItem('classes', JSON.stringify(classes.value))
  className.value = ''
}
const removeClass = (id) => {
  classes.value = classes.value.filter(c => c.id !== id)
  localStorage.setItem('classes', JSON.stringify(classes.value))
}
onMounted(load)
</script>
