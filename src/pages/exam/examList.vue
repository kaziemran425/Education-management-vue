<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Examination Management</div>
        <div class="text-caption text-grey-7">Schedule, monitor, and manage school examinations</div>
      </div>
      <q-btn
        color="primary"
        icon="add_circle"
        label="Create Exam"
        rounded
        unelevated
        @click="openExamDialog()"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-4" v-for="stat in examStats" :key="stat.title">
        <q-card class="stat-card border-radius-10">
          <q-card-section class="row items-center no-wrap">
            <q-avatar :icon="stat.icon" :color="stat.color + '-1'" :text-color="stat.color" />
            <div class="q-ml-md">
              <div class="text-h6 text-weight-bolder">{{ stat.value }}</div>
              <div class="text-caption text-grey">{{ stat.title }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="shadow-5 border-radius-10 overflow-hidden">
      <q-table
        :rows="exams"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Exam...">
            <template v-slot:append><q-icon name="search" /></template>
          </q-input>
        </template>

        <template v-slot:body-cell-startDate="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="today" class="q-mr-xs text-blue" />
              {{ props.row.startDate }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-endDate="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="event_available" class="q-mr-xs text-red" />
              {{ props.row.endDate }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="text-center">
            <q-badge
              :color="getStatusColor(props.row.status)"
              class="q-px-sm q-py-xs text-weight-bold"
              rounded
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" size="sm" @click="openExamDialog(props.row)">
              <q-tooltip>Edit Schedule</q-tooltip>
            </q-btn>
            <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteExam(props.row.id)">
              <q-tooltip>Cancel Exam</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="examDialog" persistent transition-show="slide-up" transition-hide="slide-down">
      <q-card style="width: 500px; max-width: 90vw; border-radius: 20px;">
        <q-card-section class="bg-primary text-white text-center q-pb-lg">
          <div class="text-h6">{{ isEdit ? 'Update Exam Schedule' : 'New Exam Schedule' }}</div>
          <q-btn icon="close" flat round dense v-close-popup class="absolute-top-right q-ma-sm" />
        </q-card-section>

        <q-card-section class="q-pa-xl">
          <q-form @submit="saveExam" class="q-gutter-y-md">
            <q-input outlined v-model="form.title" label="Exam Title" dense :rules="[val => !!val || 'Title required']" />

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-select outlined v-model="form.class" :options="['Class 9', 'Class 10', 'Class 11', 'Class 12']" label="Class" dense />
              </div>
              <div class="col-12 col-sm-6">
                <q-select outlined v-model="form.term" :options="['1st Term', 'Mid Term', 'Final Exam']" label="Exam Term" dense />
              </div>
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input outlined v-model="form.startDate" mask="date" label="Start Date" dense>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.startDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-6">
                <q-input outlined v-model="form.endDate" mask="date" label="End Date" dense>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.endDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <q-select outlined v-model="form.status" :options="['Upcoming', 'Ongoing', 'Completed']" label="Status" dense />

            <div class="row justify-center q-mt-lg">
              <q-btn label="Confirm Exam Schedule" color="primary" type="submit" unelevated rounded padding="sm xl" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    // State Variables
    const exams = ref([])
    const filter = ref('')
    const examDialog = ref(false)
    const isEdit = ref(false)
    const currentId = ref(null)

    const form = reactive({
      title: '',
      class: 'Class 10',
      term: 'Final Exam',
      startDate: '',
      endDate: '',
      status: 'Upcoming'
    })

    const columns = [
      { name: 'title', align: 'left', label: 'Exam Title', field: 'title', sortable: true },
      { name: 'class', align: 'left', label: 'Class', field: 'class' },
      { name: 'term', align: 'left', label: 'Term', field: 'term' },
      { name: 'startDate', align: 'left', label: 'Start Date', field: 'startDate', sortable: true },
      { name: 'endDate', align: 'left', label: 'End Date', field: 'endDate', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status' },
      { name: 'actions', align: 'right', label: 'Actions' }
    ]

    // Methods
    const loadData = () => {
      const data = localStorage.getItem('school_exams')
      if (data) {
        exams.value = JSON.parse(data)
      } else {
        // Updated Mock Data with End Dates
        exams.value = [
          { id: 1, title: 'Annual Examination 2026', class: 'Class 10', term: 'Final Exam', startDate: '2026/05/15', endDate: '2026/05/30', status: 'Upcoming' },
          { id: 2, title: 'Mid-Term Evaluation', class: 'Class 12', term: 'Mid Term', startDate: '2026/04/10', endDate: '2026/04/20', status: 'Ongoing' }
        ]
        saveToLocalStorage()
      }
    }

    const saveToLocalStorage = () => {
      localStorage.setItem('school_exams', JSON.stringify(exams.value))
    }

    const openExamDialog = (exam = null) => {
      if (exam) {
        isEdit.value = true
        currentId.value = exam.id
        Object.assign(form, exam)
      } else {
        isEdit.value = false
        form.title = ''; form.startDate = ''; form.endDate = ''; form.status = 'Upcoming'
      }
      examDialog.value = true
    }

    const saveExam = () => {
      if (isEdit.value) {
        const index = exams.value.findIndex(e => e.id === currentId.value)
        if (index !== -1) exams.value[index] = { ...form, id: currentId.value }
      } else {
        exams.value.push({ ...form, id: Date.now() })
      }

      saveToLocalStorage()
      examDialog.value = false
      $q.notify({ color: 'positive', message: 'Exam Schedule Saved', icon: 'check' })
    }

    const deleteExam = (id) => {
      $q.dialog({
        title: 'Delete Exam',
        message: 'This will remove the schedule permanently. Proceed?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        exams.value = exams.value.filter(e => e.id !== id)
        saveToLocalStorage()
        $q.notify({ color: 'negative', message: 'Schedule Deleted' })
      })
    }

    const getStatusColor = (status) => {
      if (status === 'Upcoming') return 'blue'
      if (status === 'Ongoing') return 'orange'
      return 'green'
    }

    const examStats = computed(() => [
      { title: 'Total Exams', value: exams.value.length, icon: 'assignment', color: 'primary' },
      { title: 'Upcoming', value: exams.value.filter(e => e.status === 'Upcoming').length, icon: 'schedule', color: 'blue' },
      { title: 'Ongoing', value: exams.value.filter(e => e.status === 'Ongoing').length, icon: 'play_circle', color: 'orange' }
    ])

    onMounted(loadData)

    return {
      exams,
      columns,
      filter,
      examDialog,
      isEdit,
      form,
      examStats,
      getStatusColor,
      openExamDialog,
      saveExam,
      deleteExam
    }
  }
}
</script>

<style scoped>
.border-radius-10 { border-radius: 10px; }
.stat-card {
  transition: transform 0.3s;
  border-left: 5px solid #1976d2;
}
.stat-card:hover { transform: translateY(-5px); }
.absolute-top-right { position: absolute; top: 0; right: 0; }
</style>
