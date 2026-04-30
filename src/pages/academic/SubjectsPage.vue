<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-indigo-9 text-white"><div class="text-h6">বিষয় সেটআপ (Subjects)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="subjectData.classId" :options="classList" option-value="id" option-label="name" emit-value map-options label="ক্লাস" outlined dense class="col-4" />
        <q-input v-model="subjectData.name" label="বিষয়ের নাম" outlined dense class="col-4" />
        <q-input v-model="subjectData.code" label="কোড" outlined dense class="col-2" />
        <q-btn color="indigo-9" label="যোগ করুন" @click="addSubject" class="col-2" />
      </q-card-section>
      <q-table :rows="subjects" :columns="[{name:'name', label:'বিষয়', field:'name'}, {name:'className', label:'ক্লাস', field:'className'}]" flat bordered />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const subjectData = ref({ classId: null, name: '', code: '' })
const subjects = ref([])
const classList = ref([])

onMounted(() => {
  classList.value = JSON.parse(localStorage.getItem('classes') || '[]')
  subjects.value = JSON.parse(localStorage.getItem('subjects') || '[]')
})

const addSubject = () => {
  const cls = classList.value.find(c => c.id === subjectData.classId)
  subjects.value.push({ ...subjectData.value, className: cls.name, id: Date.now() })
  localStorage.setItem('subjects', JSON.stringify(subjects.value))
  subjectData.value = { classId: null, name: '', code: '' }
}
</script>
