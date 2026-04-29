<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Academic Years</div>
        <div class="text-caption text-grey-7">Manage and configure your school sessions</div>
      </div>
      <q-btn 
        color="primary" 
        icon="add" 
        label="Add New Year" 
        rounded 
        unelevated 
        @click="openYearDialog()" 
      />
    </div>

    <q-card class="my-card shadow-2">
      <q-table
        title="Session List"
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="props.value === 'Active' ? 'green-1' : 'red-1'"
              :text-color="props.value === 'Active' ? 'green-9' : 'red-9'"
              size="sm"
              class="text-weight-bold"
            >
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" size="sm" @click="openYearDialog(props.row)" />
            <q-btn 
              flat 
              round 
              color="red-5" 
              icon="delete" 
              size="sm" 
              @click="deleteYear(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="formDialog" persistent>
      <q-card style="min-width: 350px; border-radius: 12px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ isEdit ? 'Update' : 'Create' }} Academic Year</div>
          <q-spacer />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-form @submit="saveYear" class="q-gutter-md">
            <q-input
              filled
              v-model="yearForm.title"
              label="Title (e.g., 2025-2026)"
              hint="Format: YYYY-YYYY"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Title is required']"
            />

            <q-select
              filled
              v-model="yearForm.status"
              :options="['Active', 'Inactive']"
              label="Status"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="grey-7" flat v-close-popup />
              <q-btn 
                :label="isEdit ? 'Update Year' : 'Save Year'" 
                color="primary" 
                type="submit" 
                unelevated 
                rounded 
              />
            </div>
          </q-form>
        </q-card-section>
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
    const rows = ref([])
    
    // Dialog control variables
    const formDialog = ref(false)
    const isEdit = ref(false)
    const currentEditId = ref(null)

    const columns = [
      { name: 'title', align: 'left', label: 'Academic Year', field: 'title', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
    ]

    // Smart Form Object
    const yearForm = reactive({
      title: '',
      status: 'Active'
    })

    // 1. Load data from Local Storage
    const loadData = () => {
      const saved = localStorage.getItem('academic_years')
      if (saved) {
        rows.value = JSON.parse(saved)
      } else {
        rows.value = [
          { id: 1, title: '2023-2024', status: 'Inactive' },
          { id: 2, title: '2024-2025', status: 'Active' }
        ]
      }
    }

    // 2. Open Dialog Function (Smart Add/Edit toggle)
    const openYearDialog = (item = null) => {
      if (item) {
        // Edit Mode
        isEdit.value = true
        currentEditId.value = item.id
        yearForm.title = item.title
        yearForm.status = item.status
      } else {
        // Add Mode
        isEdit.value = false
        yearForm.title = ''
        yearForm.status = 'Active'
      }
      formDialog.value = true
    }

    // 3. Save Logic (Handles both New and Update)
    const saveYear = () => {
      if (isEdit.value) {
        // Update existing record
        const index = rows.value.findIndex(row => row.id === currentEditId.value)
        if (index !== -1) {
          rows.value[index].title = yearForm.title
          rows.value[index].status = yearForm.status
        }
      } else {
        // Create new record
        const entry = {
          id: Date.now(),
          title: yearForm.title,
          status: yearForm.status
        }
        rows.value.push(entry)
      }

      // Save to Local Storage
      localStorage.setItem('academic_years', JSON.stringify(rows.value))
      
      formDialog.value = false
      
      $q.notify({
        color: 'positive',
        message: isEdit.value ? 'Updated Successfully!' : 'Saved Successfully!',
        icon: 'check'
      })
    }

    // 4. Delete Logic using $q.dialog template for confirmation
    const deleteYear = (id) => {
      $q.dialog({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to remove this academic year?',
        cancel: { color: 'grey-7', flat: true },
        ok: { color: 'red-5', unelevated: true, label: 'Delete' },
        persistent: true
      }).onOk(() => {
        rows.value = rows.value.filter(item => item.id !== id)
        localStorage.setItem('academic_years', JSON.stringify(rows.value))
        $q.notify({ color: 'negative', message: 'Year deleted', icon: 'delete' })
      })
    }

    onMounted(() => {
      loadData()
    })

    return {
      rows,
      columns,
      formDialog,
      isEdit,
      yearForm,
      openYearDialog,
      saveYear,
      deleteYear
    }
  }
}
</script>

<style scoped>
.my-card {
  border-radius: 8px;
}
</style>