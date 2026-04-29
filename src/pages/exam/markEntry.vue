<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Student Mark Entry</div>
        <div class="text-caption text-grey-7">Select criteria and enter marks for students</div>
      </div>
    </div>

    <q-card class="q-mb-lg border-radius-10 shadow-2">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-3">
            <q-select
              filled v-model="filters.exam"
              :options="examOptions"
              label="Select Exam"
              dense
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              filled v-model="filters.class"
              :options="classOptions"
              label="Select Class"
              dense
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              filled v-model="filters.subject"
              :options="subjectOptions"
              label="Select Subject"
              dense
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-btn
              color="primary"
              label="Load Students"
              class="full-width"
              icon="search"
              unelevated
              @click="loadStudentList"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card v-if="studentList.length > 0" class="shadow-5 border-radius-10 overflow-hidden">
      <q-card-section class="bg-primary text-white row items-center">
        <div class="text-subtitle1">Marking Sheet: {{ filters.subject }}</div>
        <q-spacer />
        <q-btn
          color="white"
          text-color="primary"
          label="Save All Marks"
          icon="save"
          unelevated
          @click="saveMarks"
        />
      </q-card-section>

      <q-table
        :rows="studentList"
        :columns="columns"
        row-key="id"
        flat
        bordered
        hide-pagination
        :pagination="{ rowsPerPage: 0 }"
      >
        <template v-slot:body-cell-obtainedMarks="props">
          <q-td :props="props">
            <q-input
              v-model.number="props.row.obtainedMarks"
              type="number"
              outlined
              dense
              input-class="text-center text-weight-bold"
              style="max-width: 100px; margin: 0 auto"
              suffix="/ 100"
              @update:model-value="calculateGrade(props.row)"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-grade="props">
          <q-td :props="props" class="text-center">
            <q-chip
              :color="getGradeColor(props.row.grade)"
              text-color="white"
              size="sm"
              class="text-weight-bolder"
            >
              {{ props.row.grade || 'N/A' }}
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <div v-else class="column flex-center q-pa-xl text-grey-6">
      <q-icon name="menu_book" size="100px" />
      <div class="text-h6">Select filters to display students</div>
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
      class: '',
      subject: ''
    })

    const studentList = ref([])

    // Options for integration (Ideally these come from your other pages/localstorage)
    const examOptions = ['Annual Exam 2026', 'Mid Term', 'Monthly Test']
    const classOptions = ['Class 9', 'Class 10', 'Class 11']
    const subjectOptions = ['Mathematics', 'English', 'Physics', 'Chemistry']

    const columns = [
      { name: 'roll', align: 'left', label: 'Roll No', field: 'roll', sortable: true },
      { name: 'name', align: 'left', label: 'Student Name', field: 'name', sortable: true },
      { name: 'obtainedMarks', align: 'center', label: 'Obtained Marks', field: 'obtainedMarks' },
      { name: 'grade', align: 'center', label: 'Grade', field: 'grade' }
    ]

    // 2. Methods
    const loadStudentList = () => {
      if (!filters.exam || !filters.class || !filters.subject) {
        $q.notify({ color: 'warning', message: 'Please select all filters' })
        return
      }

      const storageKey = `marks_${filters.exam}_${filters.class}_${filters.subject}`
      const savedData = localStorage.getItem(storageKey)

      if (savedData) {
        studentList.value = JSON.parse(savedData)
      } else {
        // Mock Data: In real integration, pull from your StudentList localstorage
        studentList.value = [
          { id: 1, roll: '101', name: 'Tanvir Ahmed', obtainedMarks: 0, grade: 'F' },
          { id: 2, roll: '102', name: 'Nusrat Jahan', obtainedMarks: 0, grade: 'F' },
          { id: 3, roll: '103', name: 'Mehedi Hasan', obtainedMarks: 0, grade: 'F' }
        ]
      }
    }

    const calculateGrade = (row) => {
      const marks = row.obtainedMarks
      if (marks >= 80) row.grade = 'A+'
      else if (marks >= 70) row.grade = 'A'
      else if (marks >= 60) row.grade = 'A-'
      else if (marks >= 50) row.grade = 'B'
      else if (marks >= 40) row.grade = 'C'
      else if (marks >= 33) row.grade = 'D'
      else row.grade = 'F'
    }

    const getGradeColor = (grade) => {
      if (grade === 'A+' || grade === 'A') return 'green'
      if (grade === 'F') return 'red'
      return 'orange'
    }

    const saveMarks = () => {
      const storageKey = `marks_${filters.exam}_${filters.class}_${filters.subject}`
      localStorage.setItem(storageKey, JSON.stringify(studentList.value))

      $q.notify({
        color: 'positive',
        message: 'Marks saved successfully to Local Storage',
        icon: 'cloud_done'
      })
    }

    return {
      filters,
      studentList,
      examOptions,
      classOptions,
      subjectOptions,
      columns,
      loadStudentList,
      calculateGrade,
      getGradeColor,
      saveMarks
    }
  }
}
</script>

<style scoped>
.border-radius-10 { border-radius: 10px; }
</style>
