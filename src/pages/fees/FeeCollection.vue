<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Fee Management System</div>
        <div class="text-caption text-grey-8">Collect fees, manage invoices, and track dues.</div>
      </div>
    </div>

    <q-card class="shadow-2 border-radius-10">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="setup" icon="settings" label="Fee Setup" />
        <q-tab name="collection" icon="payments" label="Fee Collection" />
        <q-tab name="duelist" icon="list_alt" label="Due List" />
        <q-tab name="reports" icon="summarize" label="Fee Report" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-white">
        
        <q-tab-panel name="setup">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-card bordered flat class="q-pa-md">
                <div class="text-subtitle1 text-weight-bold q-mb-md">Define New Fee Type</div>
                <q-form @submit="saveFeeType" class="q-gutter-md">
                  <q-input filled v-model="feeForm.name" label="Fee Name (e.g. Tuition Fee)" dense />
                  <q-input filled v-model.number="feeForm.amount" type="number" label="Amount" dense />
                  <q-btn label="Add Fee Type" color="primary" type="submit" unelevated class="full-width" />
                </q-form>
              </q-card>
            </div>
            <div class="col-12 col-md-8">
              <q-table :rows="feeTypes" :columns="feeTypeCols" flat bordered row-key="name" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="collection">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-5">
              <div class="text-h6 q-mb-md">Search Student</div>
              <q-input filled v-model="searchID" label="Student ID" @keyup.enter="findStudent" dense>
                <template v-slot:append><q-icon name="search" /></template>
              </q-input>

              <div v-if="selectedStudent" class="q-mt-lg animate-fade">
                <q-card bordered flat class="bg-blue-1">
                  <q-card-section>
                    <div class="text-subtitle2">Student: <b>{{ selectedStudent.name }}</b></div>
                    <div class="text-caption">Class: {{ selectedStudent.class }} | Section: {{ selectedStudent.section }}</div>
                  </q-card-section>
                </q-card>

                <q-select 
                  class="q-mt-md" filled v-model="invoiceForm.feeType" 
                  :options="feeTypes" option-label="name" label="Select Fee Type" dense 
                />
                <q-btn 
                  label="Generate & Collect" 
                  color="green" 
                  icon="receipt" 
                  class="full-width q-mt-md" 
                  unelevated 
                  @click="generateInvoice"
                />
              </div>
            </div>
            
            <div class="col-12 col-md-7">
              <div class="text-subtitle1 text-weight-bold">Recent Invoices</div>
              <q-table :rows="invoices" :columns="invoiceCols" flat bordered />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="duelist">
          <q-table :rows="dueList" :columns="dueCols" flat bordered>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn size="sm" color="orange" label="Send Reminder" unelevated />
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="reports">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-4">
              <q-card class="bg-green-6 text-white text-center q-pa-md">
                <div class="text-h4 text-weight-bolder">৳ {{ totalCollected }}</div>
                <div>Total Collected</div>
              </q-card>
            </div>
            <div class="col-12 col-sm-4">
              <q-card class="bg-red-5 text-white text-center q-pa-md">
                <div class="text-h4 text-weight-bolder">৳ {{ totalPending }}</div>
                <div>Total Dues</div>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const tab = ref('collection')
    const searchID = ref('')
    const selectedStudent = ref(null)

    // Data Sources
    const feeTypes = ref([])
    const invoices = ref([])
    const dueList = ref([])

    const feeForm = reactive({ name: '', amount: 0 })
    const invoiceForm = reactive({ feeType: null })

    // Columns Configuration
    const feeTypeCols = [
      { name: 'name', label: 'Fee Type', field: 'name', align: 'left' },
      { name: 'amount', label: 'Amount (৳)', field: 'amount', align: 'right' }
    ]

    const invoiceCols = [
      { name: 'id', label: 'Invoice #', field: 'id', align: 'left' },
      { name: 'student', label: 'Student', field: 'student', align: 'left' },
      { name: 'type', label: 'Type', field: 'type', align: 'left' },
      { name: 'amount', label: 'Amount', field: 'amount' },
      { name: 'date', label: 'Date', field: 'date' }
    ]

    const dueCols = [
      { name: 'student', label: 'Student Name', field: 'name', align: 'left' },
      { name: 'class', label: 'Class', field: 'class' },
      { name: 'due', label: 'Due Amount', field: 'dueAmount', align: 'right' },
      { name: 'action', label: 'Action', field: 'action' }
    ]

    // 1. Persistence Logic
    const loadAllData = () => {
      feeTypes.value = JSON.parse(localStorage.getItem('fee_types') || '[]')
      invoices.value = JSON.parse(localStorage.getItem('fee_invoices') || '[]')
      dueList.value = [
        { id: 1, name: 'Tanvir Ahmed', class: 'Class 10', dueAmount: 5000 },
        { id: 2, name: 'Sumaiya Akter', class: 'Class 9', dueAmount: 1200 }
      ]
    }

    const saveFeeType = () => {
      feeTypes.value.push({ ...feeForm })
      localStorage.setItem('fee_types', JSON.stringify(feeTypes.value))
      feeForm.name = ''; feeForm.amount = 0
      $q.notify({ color: 'positive', message: 'Fee Type added!' })
    }

    // 2. Search Student Simulation
    const findStudent = () => {
      // In real integration, search from your registered_students localstorage
      selectedStudent.value = { id: searchID.value, name: 'Imran Hossain', class: 'Class 10', section: 'A' }
    }

    // 3. Invoice Generation
    const generateInvoice = () => {
      if (!invoiceForm.feeType) return
      const newInvoice = {
        id: 'INV-' + Date.now().toString().slice(-5),
        student: selectedStudent.value.name,
        type: invoiceForm.feeType.name,
        amount: invoiceForm.feeType.amount,
        date: new Date().toLocaleDateString()
      }
      invoices.value.unshift(newInvoice)
      localStorage.setItem('fee_invoices', JSON.stringify(invoices.value))
      $q.notify({ color: 'green', icon: 'print', message: 'Invoice Generated & Data Saved!' })
    }

    // 4. Report Calculations
    const totalCollected = computed(() => invoices.value.reduce((sum, item) => sum + item.amount, 0))
    const totalPending = computed(() => dueList.value.reduce((sum, item) => sum + item.dueAmount, 0))

    onMounted(loadAllData)

    return {
      tab, searchID, selectedStudent, feeForm, invoiceForm,
      feeTypes, invoices, dueList,
      feeTypeCols, invoiceCols, dueCols,
      saveFeeType, findStudent, generateInvoice,
      totalCollected, totalPending
    }
  }
}
</script>

<style scoped>
.border-radius-10 { border-radius: 10px; }
.animate-fade { animation: fadeIn 0.5s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>