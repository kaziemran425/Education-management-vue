<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-purple-7 text-white"><div class="text-h6">সেকশন সেটআপ (Sections)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="sectionData.classId" :options="classList" option-value="id" option-label="name" emit-value map-options label="ক্লাস সিলেক্ট করুন" outlined dense class="col-5" />
        <q-input v-model="sectionData.name" label="সেকশন (যেমন: এ)" outlined dense class="col-4" />
        <q-btn color="purple-7" label="সেভ" @click="saveSection" class="col-3" />
      </q-card-section>
      <q-table :rows="sections" :columns="[{name:'class', label:'ক্লাস', field:'className'}, {name:'name', label:'সেকশন', field:'name'}]" flat bordered />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const sectionData = ref({ classId: null, name: '' })
const classList = ref([])
const sections = ref([])

const load = () => {
  classList.value = JSON.parse(localStorage.getItem('classes') || '[]')
  sections.value = JSON.parse(localStorage.getItem('sections') || '[]')
}
const saveSection = () => {
  const cls = classList.value.find(c => c.id === sectionData.classId)
  sections.value.push({ ...sectionData.value, className: cls.name, id: Date.now() })
  localStorage.setItem('sections', JSON.stringify(sections.value))
  sectionData.value.name = ''
}
onMounted(load)
</script>
