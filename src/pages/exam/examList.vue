<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="row items-center">
        <div class="text-h6">পরীক্ষার তালিকা (Exam List)</div>
        <q-space />
        <q-btn color="primary" label="নতুন পরীক্ষা" icon="add" to="/exam/create" />
      </q-card-section>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :no-data-label="'কোনো পরীক্ষার ডাটা পাওয়া যায়নি'"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="blue" icon="edit" size="sm" />
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteExam(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'ExamList',
  setup() {
    const rows = ref([])
    const columns = [
      { name: 'title', label: 'পরীক্ষার নাম', field: 'title', align: 'left', sortable: true },
      { name: 'term', label: 'টার্ম', field: 'term', align: 'center' },
      { name: 'year', label: 'শিক্ষাবর্ষ', field: 'year', align: 'center' },
      { name: 'startDate', label: 'শুরু', field: 'startDate', align: 'center' },
      { name: 'actions', label: 'অ্যাকশন', align: 'center' }
    ]

    const loadData = () => {
      const data = localStorage.getItem('exams')
      rows.value = data ? JSON.parse(data) : []
    }

    const deleteExam = (id) => {
      const data = JSON.parse(localStorage.getItem('exams') || '[]')
      const filtered = data.filter(item => item.id !== id)
      localStorage.setItem('exams', JSON.stringify(filtered))
      loadData()
    }

    onMounted(loadData)

    return { rows, columns, deleteExam }
  }
})
</script>
