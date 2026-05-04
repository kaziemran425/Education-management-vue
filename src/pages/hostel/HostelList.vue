<template>
  <q-page class="q-pa-md">
    <!-- Header Section -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-indigo-10">
        <q-icon name="hotel" class="q-mr-sm" />Hostel List
      </div>
      <q-btn color="primary" icon="add" label="Add New Hostel" @click="showDialog = true" unelevated />
    </div>

    <!-- Hostel Table -->
    <q-card flat bordered class="shadow-2">
      <q-table
        :rows="hostels"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteHostel(props.row.id)">
              <q-tooltip>Delete Hostel</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Add Hostel Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px" class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Add New Hostel</div>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input v-model="form.name" label="Hostel Name" outlined dense />
          <q-select v-model="form.type" :options="['Boys', 'Girls', 'Staff']" label="Type" outlined dense />
          <q-input v-model="form.address" label="Address" outlined dense />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn label="Save Hostel" color="primary" @click="saveHostel" unelevated />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const showDialog = ref(false)
    const hostels = ref([])
    const form = reactive({ name: '', type: 'Boys', address: '' })

    const columns = [
      { name: 'name', align: 'left', label: 'Hostel Name', field: 'name', sortable: true },
      { name: 'type', align: 'center', label: 'Type', field: 'type' },
      { name: 'address', align: 'left', label: 'Address', field: 'address' },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
    ]

    // Local Storage logic
    const loadData = () => {
      const saved = localStorage.getItem('iching_hostels')
      hostels.value = saved ? JSON.parse(saved) : [
        { id: 1, name: 'Main Boys Hostel', type: 'Boys', address: 'Block A' },
        { id: 2, name: 'Staff Residence', type: 'Staff', address: 'Block C' }
      ]
    }

    const saveHostel = () => {
      if (!form.name || !form.address) {
        $q.notify({ type: 'warning', message: 'Please fill all fields' })
        return
      }
      const newHostel = { ...form, id: Date.now() }
      hostels.value.push(newHostel)
      localStorage.setItem('iching_hostels', JSON.stringify(hostels.value))
      showDialog.value = false
      Object.assign(form, { name: '', type: 'Boys', address: '' })
      $q.notify({ type: 'positive', message: 'Hostel added successfully' })
    }

    const deleteHostel = (id) => {
      hostels.value = hostels.value.filter(h => h.id !== id)
      localStorage.setItem('iching_hostels', JSON.stringify(hostels.value))
      $q.notify({ type: 'info', message: 'Hostel deleted' })
    }

    onMounted(loadData)

    return {
      hostels, columns, loading, showDialog, form,
      saveHostel, deleteHostel
    }
  }
}
</script>
