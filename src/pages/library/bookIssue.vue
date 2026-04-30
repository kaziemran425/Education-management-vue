<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-brown-8 text-white"><div class="text-h6">বই ইস্যু (Book Issue)</div></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <q-select v-model="issue.studentId" :options="students" option-label="name" option-value="id" emit-value map-options label="শিক্ষার্থী" outlined dense class="col-4" />
        <q-select v-model="issue.bookId" :options="books" option-label="title" option-value="id" emit-value map-options label="বই" outlined dense class="col-4" />
        <q-input v-model="issue.returnDate" type="date" label="ফেরত তারিখ" outlined dense class="col-4" stack-label />
        <q-btn color="brown-8" label="ইস্যু নিশ্চিত করুন" class="q-mt-md full-width" @click="processIssue" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const issue = ref({ studentId: null, bookId: null, returnDate: '' })
const students = ref([])
const books = ref([])

onMounted(() => {
  students.value = JSON.parse(localStorage.getItem('students') || '[{"id":1,"name":"Kazi Emran"}]')
  books.value = JSON.parse(localStorage.getItem('library_books') || '[]')
})

const processIssue = () => {
  const issued = JSON.parse(localStorage.getItem('library_issued') || '[]')
  const std = students.value.find(s => s.id === issue.value.studentId)
  const bk = books.value.find(b => b.id === issue.value.bookId)

  issued.push({ ...issue.value, studentName: std.name, bookTitle: bk.title, id: Date.now(), status: 'Issued' })
  localStorage.setItem('library_issued', JSON.stringify(issued))
  alert('বই ইস্যু করা হয়েছে!')
}
</script>
