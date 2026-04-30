<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <q-card-section class="bg-teal-9 text-white row items-center">
        <q-icon name="menu_book" size="sm" class="q-mr-sm" />
        <div class="text-h6">বইয়ের তালিকা (Book List)</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="addBook" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-4">
            <q-input v-model="newBook.title" label="বইয়ের নাম" outlined dense :rules="[val => !!val || 'আবশ্যক']" />
          </div>
          <div class="col-12 col-sm-3">
            <q-input v-model="newBook.author" label="লেখকের নাম" outlined dense />
          </div>
          <div class="col-12 col-sm-3">
            <q-input v-model="newBook.isbn" label="ISBN/কোড" outlined dense />
          </div>
          <div class="col-12 col-sm-2">
            <q-btn color="teal-9" icon="add" label="বই যোগ করুন" type="submit" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-table :rows="books" :columns="columns" flat bordered row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="red" icon="delete" size="sm" @click="deleteBook(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])
const newBook = ref({ title: '', author: '', isbn: '' })

const columns = [
  { name: 'title', label: 'বইয়ের নাম', field: 'title', align: 'left' },
  { name: 'author', label: 'লেখক', field: 'author', align: 'left' },
  { name: 'isbn', label: 'ISBN', field: 'isbn', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

const loadData = () => { books.value = JSON.parse(localStorage.getItem('library_books') || '[]') }
const addBook = () => {
  books.value.push({ ...newBook.value, id: Date.now() })
  localStorage.setItem('library_books', JSON.stringify(books.value))
  newBook.value = { title: '', author: '', isbn: '' }
}
const deleteBook = (id) => {
  books.value = books.value.filter(b => b.id !== id)
  localStorage.setItem('library_books', JSON.stringify(books.value))
}
onMounted(loadData)
</script>
