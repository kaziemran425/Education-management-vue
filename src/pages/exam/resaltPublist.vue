<template>
  <q-page class="q-pa-md bg-grey-2">
    <!-- Header Section -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Result Publication</div>
        <div class="text-caption text-grey-7">Finalize and publish student results for public viewing</div>
      </div>
    </div>

    <!-- Selection Filters -->
    <q-card class="q-mb-lg border-radius-10 shadow-2">
      <q-card-section>
        <div class="row q-col-gutter-md items-end">
          <div class="col-12 col-sm-4">
            <q-select
              filled v-model="filters.exam"
              :options="examOptions"
              label="Select Examination"
              dense
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-select
              filled v-model="filters.class"
              :options="classOptions"
              label="Select Class"
              dense
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn
              color="primary"
              label="Generate Result Preview"
              class="full-width"
              icon="analytics"
              unelevated
              @click="generatePreview"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Result Preview Table -->
    <q-card v-if="resultRows.length > 0" class="shadow-5 border-radius-10 overflow-hidden">
      <q-card-section class="bg-dark text-white row items-center">
        <div class="text-subtitle1">Preview: {{ filters.exam }} ({{ filters.class }})</div>
        <q-spacer />
        <q-btn
          color="green"
          label="Publish Official Result"
          icon="cloud_upload"
          unelevated
          @click="publishResult"
        />
      </q-card-section>

      <q-table
        :rows="resultRows"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- GPA Column with Smart Badge -->
        <template v-slot:body-cell-gpa="props">
          <q-td :props="props" class="text-center">
            <q-chip
              :color="props.row.gpa >= 2.0 ? 'blue-1' : 'red-1'"
              :text-color="props.row.gpa >= 2.0 ? 'blue-9' : 'red-9'"
              class="text-weight-bolder"
            >
              {{ props.row.gpa.toFixed(2) }}
            </q-chip>
          </q-td>
        </template>

        <!-- Final Grade Column -->
        <template v-slot:body-cell-finalGrade="props">
          <q-td :props="props" class="text-center">
            <q-badge
              :color="getGradeColor(props.row.finalGrade)"
              class="q-px-md q-py-xs text-weight-bolder"
              rounded
            >
              {{ props.row.finalGrade }}
            </q-badge>
          </q-td>
        </template>

        <!-- Status Column -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="text-center">
            <q-icon
              :name="props.row.status === 'Passed' ? 'check_circle' : 'cancel'"
              :color="props.row.status === 'Passed' ? 'green' : 'red'"
              size="sm"
            />
            {{ props.row.status }}
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Placeholder -->
    <div v-else class="column flex-center q-pa-xl text-grey-5">
      <q-icon name="publish" size="100px" />
      <div class="text-h6">Select Exam and Class to generate results</div>
    </div>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    // 1. Data State
    const filters = reactive({
      exam: '',
      class: ''
    })

    const resultRows = ref([])

    // Hardcoded for integration; these should ideally come from your 'Exam' and 'Class' pages
    const examOptions = ['Annual Exam 2026', 'Mid Term', 'Final Exam']
    const classOptions = ['Class 9', 'Class 10', 'Class 11']

    const columns = [
      { name: 'roll', align: 'left', label: 'Roll No', field: 'roll', sortable: true },
      { name: 'name', align: 'left', label: 'Student Name', field: 'name', sortable: true },
      { name: 'totalMarks', align: 'center', label: 'Total Marks', field: 'totalMarks', sortable: true },
      { name: 'gpa', align: 'center', label: 'GPA', field: 'gpa', sortable: true },
      { name: 'finalGrade', align: 'center', label: 'Grade', field: 'finalGrade' },
      { name: 'status', align: 'center', label: 'Result', field: 'status' }
    ]

    // 2. Methods
    const generatePreview = () => {
      if (!filters.exam || !filters.class) {
        $q.notify({ color: 'warning', message: 'Please select Exam and Class' })
        return
      }

      // Logic: In a real system, this would pull data from 'markEntry' LocalStorage
      // and calculate the average. Here is a smart mock:
      resultRows.value = [
        { id: 1, roll: '101', name: 'Tanvir Ahmed', totalMarks: 450, gpa: 4.50, finalGrade: 'A', status: 'Passed' },
        { id: 2, roll: '102', name: 'Nusrat Jahan', totalMarks: 485, gpa: 5.00, finalGrade: 'A+', status: 'Passed' },
        { id: 3, roll: '103', name: 'Mehedi Hasan', totalMarks: 180, gpa: 1.50, finalGrade: 'F', status: 'Failed' }
      ]
    }

    const getGradeColor = (grade) => {
      const colors = { 'A+': 'green-9', 'A': 'green-7', 'A-': 'green-5', 'B': 'blue', 'C': 'orange', 'D': 'grey', 'F': 'red' }
      return colors[grade] || 'black'
    }

    const publishResult = () => {
      $q.dialog({
        title: 'Confirm Publication',
        message: `Are you sure you want to publish results for ${filters.exam}? This will be visible to students.`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        const publishKey = `published_${filters.exam}_${filters.class}`
        const publishData = {
          exam: filters.exam,
          class: filters.class,
          publishDate: new Date().toLocaleString(),
          results: resultRows.value
        }

        localStorage.setItem(publishKey, JSON.stringify(publishData))

        $q.notify({
          color: 'positive',
          message: 'Results published successfully!',
          icon: 'done_all'
        })
      })
    }

    return {
      filters,
      resultRows,
      examOptions,
      classOptions,
      columns,
      generatePreview,
      getGradeColor,
      publishResult
    }
  }
}
</script>

<style scoped>
.border-radius-10 { border-radius: 10px; }
</style>
