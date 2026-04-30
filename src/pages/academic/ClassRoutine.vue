<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-green-9 text-white"><div class="text-h6">ক্লাস রুটিন (Class Routine)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="routine.day" :options="['Saturday', 'Sunday', 'Monday']" label="দিন" outlined dense class="col-3" />
        <q-select v-model="routine.subject" :options="['Math', 'Science']" label="বিষয়" outlined dense class="col-3" />
        <q-input v-model="routine.time" label="সময়" outlined dense class="col-3" />
        <q-btn color="green-9" icon="add" label="রুটিনে যোগ করুন" @click="addRoutine" class="col-3" />
      </q-card-section>
      <q-table :rows="routineList" :columns="[{name:'day', label:'দিন', field:'day'}, {name:'subject', label:'বিষয়', field:'subject'}, {name:'time', label:'সময়', field:'time'}]" flat bordered />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const routine = ref({ day: '', subject: '', time: '' })
const routineList = ref([])

onMounted(() => { routineList.value = JSON.parse(localStorage.getItem('class_routines') || '[]') })

const addRoutine = () => {
  routineList.value.push({ ...routine.value, id: Date.now() })
  localStorage.setItem('class_routines', JSON.stringify(routineList.value))
}
</script>
