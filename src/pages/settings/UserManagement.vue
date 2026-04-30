<template>
  <q-page padding class="bg-grey-1">
    <q-card flat bordered>
      <!-- Header Section -->
      <q-card-section class="bg-indigo-7 text-white row items-center">
        <q-icon name="manage_accounts" size="sm" class="q-mr-sm" />
        <div class="text-h6">ইউজার ম্যানেজমেন্ট (User Management)</div>
      </q-card-section>

      <!-- Add User Section -->
      <q-card-section>
        <q-form @submit.prevent="addUser" class="row q-col-gutter-sm items-end">
          <div class="col-12 col-sm-4">
            <q-input
              v-model="newUser.username"
              label="ইউজার নেম"
              outlined
              dense
              :rules="[val => !!val || 'ইউজার নেম আবশ্যক']"
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              v-model="newUser.role"
              :options="['Admin', 'Teacher', 'Staff', 'Accountant']"
              label="রোল সিলেক্ট করুন"
              outlined
              dense
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-input
              v-model="newUser.password"
              type="password"
              label="পাসওয়ার্ড"
              outlined
              dense
              :rules="[val => !!val || 'পাসওয়ার্ড আবশ্যক']"
            />
          </div>
          <div class="col-12 col-sm-2">
            <q-btn
              color="indigo-7"
              icon="person_add"
              label="যোগ করুন"
              type="submit"
              class="full-width q-mb-md"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <!-- User Table -->
      <q-card-section>
        <q-table
          :rows="users"
          :columns="columns"
          flat
          bordered
          row-key="id"
          no-data-label="কোনো ইউজার পাওয়া যায়নি"
        >
          <template v-slot:body-cell-role="props">
            <q-td :props="props">
              <q-badge :color="getRoleColor(props.row.role)">
                {{ props.row.role }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                size="sm"
                @click="deleteUser(props.row.id)"
              >
                <q-tooltip>ডিলিট করুন</q-tooltip>
              </q-btn>
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
const users = ref([])
const newUser = ref({ username: '', role: 'Teacher', password: '' })

const columns = [
  { name: 'username', label: 'ইউজার নেম', field: 'username', align: 'left', sortable: true },
  { name: 'role', label: 'রোল', field: 'role', align: 'center', sortable: true },
  { name: 'actions', label: 'অ্যাকশন', align: 'right' }
]

// ডাটা লোড করা
const loadUsers = () => {
  const data = localStorage.getItem('system_users')
  users.value = data ? JSON.parse(data) : []
}

// ইউজার যোগ করা
const addUser = () => {
  if (!newUser.value.username || !newUser.value.password) return

  const userEntry = {
    ...newUser.value,
    id: Date.now()
  }

  users.value.push(userEntry)
  localStorage.setItem('system_users', JSON.stringify(users.value))

  // ফর্ম রিসেট
  newUser.value = { username: '', role: 'Teacher', password: '' }

  $q.notify({
    color: 'positive',
    message: 'নতুন ইউজার সফলভাবে তৈরি হয়েছে',
    icon: 'check'
  })
}

// ইউজার ডিলিট করা
const deleteUser = (id) => {
  $q.dialog({
    title: 'নিশ্চিত করুন',
    message: 'আপনি কি এই ইউজারটি ডিলিট করতে চান?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    users.value = users.value.filter(u => u.id !== id)
    localStorage.setItem('system_users', JSON.stringify(users.value))
    $q.notify({ color: 'orange', message: 'ইউজার ডিলিট করা হয়েছে' })
  })
}

// রোলের কালার নির্ধারণ
const getRoleColor = (role) => {
  switch (role) {
    case 'Admin': return 'red'
    case 'Teacher': return 'blue'
    case 'Accountant': return 'orange'
    default: return 'green'
  }
}

onMounted(loadUsers)
</script>
