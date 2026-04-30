<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="bg-blue-grey-10 text-white row items-center">
        <q-icon name="keyboard_return" size="sm" class="q-mr-sm" />
        <div class="text-h6">বই ফেরত (Book Return)</div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="issuedList"
          :columns="columns"
          flat
          bordered
          no-data-label="বর্তমানে কোনো বই ইস্যু করা নেই"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="positive"
                label="ফেরত নিন"
                size="sm"
                icon="check_circle"
                @click="returnBook(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const issuedList = ref([])

const columns = [
  { name: 'student', label: 'শিক্ষার্থী', field: 'studentName', align: 'left' },
  { name: 'book', label: 'বইয়ের নাম', field: 'bookTitle', align: 'left' },
  { name: 'date', label: 'ফেরত দেওয়ার কথা', field: 'returnDate', align: 'center' },
  { name: 'actions', label: 'অ্যাকশন', align: 'center' }
]

const loadIssuedBooks = () => {
  const allIssued = JSON.parse(localStorage.getItem('library_issued') || '[]')
  // শুধুমাত্র যেগুলো এখনো ফেরত দেওয়া হয়নি (status: 'Issued') সেগুলো দেখাবে
  issuedList.value = allIssued.filter(item => item.status === 'Issued')
}

const returnBook = (id) => {
  const allIssued = JSON.parse(localStorage.getItem('library_issued') || '[]')
  const index = allIssued.findIndex(item => item.id === id)

  if (index !== -1) {
    // স্ট্যাটাস আপডেট করা
    allIssued[index].status = 'Returned'
    allIssued[index].actualReturnDate = new Date().toLocaleDateString()

    localStorage.setItem('library_issued', JSON.stringify(allIssued))

    $q.notify({
      color: 'positive',
      message: 'বইটি সফলভাবে ফেরত নেওয়া হয়েছে!',
      icon: 'done'
    })

    loadIssuedBooks() // টেবিল রিফ্রেশ করা
  }
}

onMounted(loadIssuedBooks)
</script>
