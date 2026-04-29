<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold text-primary">Class & Schedule Manager</div>
        <div class="text-caption text-grey-7">Configure Classes, Sections, Subjects, and Timetables</div>
      </div>
      <q-btn 
        color="primary" 
        icon="add_circle" 
        label="Add New Class" 
        rounded 
        unelevated 
        @click="openClassDialog()" 
      />
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="cls in classes" :key="cls.id" class="col-12 col-md-6">
        <q-card class="class-card shadow-3">
          <q-card-section class="bg-primary text-white row items-center">
            <div class="text-h6">{{ cls.className }}</div>
            <q-spacer />
            <q-btn flat round icon="edit" size="sm" @click="openClassDialog(cls)" />
            <q-btn flat round icon="delete" size="sm" @click="deleteClass(cls.id)" />
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-5">
                <div class="text-subtitle2 text-weight-bold">Sections</div>
                <div class="q-gutter-xs q-mb-md">
                  <q-chip v-for="s in cls.sections" :key="s" size="xs" color="blue-1" text-color="blue-9">{{ s }}</q-chip>
                </div>
                <div class="text-subtitle2 text-weight-bold">Subjects</div>
                <div class="text-caption">{{ cls.subjects.join(', ') || 'N/A' }}</div>
              </div>

              <div class="col-12 col-sm-7 border-left q-pl-md">
                <div class="text-subtitle2 text-weight-bold">Class Schedule</div>
                <q-list dense v-if="cls.schedules.length">
                  <q-item v-for="(sch, index) in cls.schedules" :key="index" class="q-pa-none min-height-unset">
                    <q-item-section side>
                      <q-icon name="schedule" size="12px" color="orange" />
                    </q-item-section>
                    <q-item-section>
                      <div class="text-caption">
                        <span class="text-weight-medium">{{ sch.day }}:</span> {{ sch.subject }} ({{ sch.time }})
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div v-else class="text-caption text-italic text-grey-6">No schedule set.</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="classDialog" persistent full-width max-width="800px">
      <q-card style="border-radius: 15px;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ isEdit ? 'Update Class Details' : 'Register New Class' }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-form @submit="saveClass">
            <div class="row q-col-gutter-lg">
              <div class="col-12 col-md-5 q-gutter-y-md">
                <q-input filled v-model="form.className" label="Class Name" :rules="[val => !!val || 'Required']" dense />
                
                <q-select
                  filled v-model="form.sections" label="Sections" 
                  multiple use-input use-chips hide-dropdown-icon 
                  new-value-mode="add-unique" hint="Type & press Enter" dense
                />

                <q-select
                  filled v-model="form.subjects" label="Subjects" 
                  multiple use-input use-chips hide-dropdown-icon 
                  new-value-mode="add-unique" hint="Type & press Enter" dense
                />
              </div>

              <div class="col-12 col-md-7">
                <div class="text-subtitle1 text-weight-bold q-mb-sm">Weekly Schedule</div>
                <div class="row q-col-gutter-xs q-mb-sm">
                  <div class="col-4"><q-select dense filled v-model="tempSch.day" :options="days" label="Day" /></div>
                  <div class="col-4">
                    <q-select dense filled v-model="tempSch.subject" :options="form.subjects" label="Subject" 
                      :disable="!form.subjects.length" />
                  </div>
                  <div class="col-3"><q-input dense filled v-model="tempSch.time" label="Time" placeholder="9:00 AM" /></div>
                  <div class="col-1"><q-btn icon="add" color="green" flat round @click="addToSchedule" /></div>
                </div>

                <q-scroll-area style="height: 150px;" class="bg-grey-1 rounded-borders q-pa-sm">
                  <div v-for="(s, i) in form.schedules" :key="i" class="row items-center q-mb-xs bg-white q-pa-xs shadow-1 rounded-borders">
                    <div class="col text-caption"><b>{{ s.day }}</b>: {{ s.subject }} at {{ s.time }}</div>
                    <q-btn icon="close" size="xs" color="red" flat round @click="form.schedules.splice(i, 1)" />
                  </div>
                </q-scroll-area>
              </div>
            </div>

            <div class="row justify-end q-mt-xl q-gutter-x-sm">
              <q-btn label="Cancel" color="grey-7" flat v-close-popup />
              <q-btn :label="isEdit ? 'Update' : 'Save'" color="primary" type="submit" unelevated rounded />
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
    const classes = ref([])
    const classDialog = ref(false)
    const isEdit = ref(false)
    const editId = ref(null)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const form = reactive({
      className: '',
      sections: [],
      subjects: [],
      schedules: []
    })

    const tempSch = reactive({ day: 'Monday', subject: '', time: '' })

    const loadData = () => {
      const saved = localStorage.getItem('school_master_classes')
      if (saved) classes.value = JSON.parse(saved)
    }

    const openClassDialog = (item = null) => {
      if (item) {
        isEdit.value = true; editId.value = item.id;
        Object.assign(form, JSON.parse(JSON.stringify(item)))
      } else {
        isEdit.value = false;
        form.className = ''; form.sections = []; form.subjects = []; form.schedules = [];
      }
      classDialog.value = true
    }

    const addToSchedule = () => {
      if (!tempSch.subject || !tempSch.time) {
        $q.notify({ message: 'Select Subject and Time', color: 'warning' }); return;
      }
      form.schedules.push({ ...tempSch });
      tempSch.time = '';
    }

    const saveClass = () => {
      if (isEdit.value) {
        const index = classes.value.findIndex(c => c.id === editId.value)
        classes.value[index] = { ...form, id: editId.value }
      } else {
        classes.value.push({ ...form, id: Date.now() })
      }
      localStorage.setItem('school_master_classes', JSON.stringify(classes.value))
      classDialog.value = false
      $q.notify({ color: 'positive', message: 'Class & Schedule Saved!' })
    }

    const deleteClass = (id) => {
      $q.dialog({ title: 'Delete', message: 'Delete this class?', cancel: true })
        .onOk(() => {
          classes.value = classes.value.filter(c => c.id !== id)
          localStorage.setItem('school_master_classes', JSON.stringify(classes.value))
        })
    }

    onMounted(loadData)

    return {
      classes, classDialog, isEdit, form, tempSch, days,
      openClassDialog, saveClass, deleteClass, addToSchedule
    }
  }
}
</script>

<style scoped>
.class-card { border-radius: 12px; }
.border-left { border-left: 1px solid #e0e0e0; }
.min-height-unset { min-height: unset; }
</style>  