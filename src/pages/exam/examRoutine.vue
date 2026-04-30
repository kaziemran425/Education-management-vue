<template>
  <q-page class="q-pa-md bg-grey-2">
    <!-- Header Section -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">
          Exam Routine / Timetable
        </div>
        <div class="text-caption text-grey-7">
          Organize and manage subject-wise exam schedules
        </div>
      </div>
      <q-btn
        color="primary"
        icon="calendar_month"
        label="Add Schedule"
        rounded
        unelevated
        @click="openRoutineDialog()"
      />
    </div>

    <!-- Selection Filters -->
    <q-card class="q-mb-lg border-radius-10 shadow-2">
      <q-card-section>
        <div class="row q-col-gutter-md items-end">
          <div class="col-12 col-sm-4">
            <q-select
              filled
              v-model="filters.exam"
              :options="examOptions"
              label="Select Exam"
              dense
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-select
              filled
              v-model="filters.class"
              :options="classOptions"
              label="Select Class"
              dense
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-btn
              color="secondary"
              label="Load Routine"
              class="full-width"
              icon="refresh"
              unelevated
              @click="loadRoutine"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Routine Table -->
    <q-card
      v-if="routineList.length > 0"
      class="shadow-5 border-radius-10 overflow-hidden"
    >
      <q-table
        :rows="routineList"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- Time Column -->
        <template v-slot:body-cell-time="props">
          <q-td :props="props">
            <q-chip outline color="primary" icon="schedule" size="sm">
              {{ props.row.startTime }} - {{ props.row.endTime }}
            </q-chip>
          </q-td>
        </template>

        <!-- Venue/Room Badge -->
        <template v-slot:body-cell-room="props">
          <q-td :props="props" class="text-center">
            <q-badge color="grey-3" text-color="grey-9" class="q-pa-xs">
              <q-icon name="apartment" class="q-mr-xs" />
              {{ props.row.building }}, {{ props.row.hall }} (ID: {{ props.row.studentId }})
            </q-badge>
          </q-td>
        </template>

        <!-- Action Buttons -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right q-gutter-x-sm">
            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              size="sm"
              @click="openRoutineDialog(props.row)"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="deleteRoutine(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- No Data Placeholder -->
    <div v-else class="column flex-center q-pa-xl text-grey-5">
      <q-icon name="event_busy" size="100px" />
      <div class="text-h6">No routine found. Please add a schedule.</div>
    </div>

    <!-- ROUTINE ENTRY DIALOG -->
    <q-dialog
      v-model="routineDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 500px; max-width: 95vw; border-radius: 20px">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">
            {{ isEdit ? "Edit Schedule" : "New Exam Schedule" }}
          </div>
          <q-spacer />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-lg q-gutter-y-md">
          <q-form @submit="saveRoutine">
            <q-select
              outlined
              v-model="form.subject"
              :options="subjectOptions"
              label="Subject Name"
              dense
              class="q-mb-md"
              :rules="[val => !!val || 'Subject is required']"
            />

            <q-input
              outlined
              v-model="form.date"
              mask="date"
              label="Exam Date"
              dense
              class="q-mb-md"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <div class="row q-col-gutter-sm q-mb-md">
              <div class="col-6">
                <q-input
                  outlined
                  v-model="form.startTime"
                  label="Start Time"
                  dense
                  type="time"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  v-model="form.endTime"
                  label="End Time"
                  dense
                  type="time"
                />
              </div>
            </div>

            <div class="row q-col-gutter-sm q-mb-md">
              <div class="col-6">
                <q-select
                  outlined
                  v-model="form.building"
                  :options="buildingOptions"
                  label="Building Name"
                  dense
                />
              </div>
              <div class="col-6">
                <q-select
                  outlined
                  v-model="form.hall"
                  :options="hallOptions"
                  label="Hall Name"
                  dense
                />
              </div>
            </div>

            <q-input
              v-model="form.studentId"
              type="text"
              label="ID Number"
              outlined
              dense
              class="q-mb-lg"
              placeholder="Enter ID Number"
            />

            <div class="row justify-center">
              <q-btn
                label="Save Schedule"
                color="primary"
                type="submit"
                unelevated
                rounded
                padding="sm xl"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    const filters = reactive({
      exam: "Annual Exam 2026",
      class: "Class 10",
    });

    const routineList = ref([]);
    const routineDialog = ref(false);
    const isEdit = ref(false);
    const currentId = ref(null);

    const examOptions = ["Annual Exam 2026", "Mid Term", "Monthly Test"];
    const classOptions = ["Class 9", "Class 10", "Class 11", "Class 12"];
    const subjectOptions = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "History"];
    const buildingOptions = ["Main Building", "Science Block", "Admin Building", "Arts Annex"];
    const hallOptions = ["Hall-A", "Hall-B", "Room 101", "Room 202", "Auditorium", "Lab-1"];

    const form = reactive({
      subject: "",
      date: "",
      startTime: "10:00",
      endTime: "13:00",
      building: "",
      hall: "",
      studentId: ""
    });

    const columns = [
      { name: "date", align: "left", label: "Date", field: "date", sortable: true },
      { name: "subject", align: "left", label: "Subject", field: "subject", sortable: true },
      { name: "time", align: "center", label: "Time Slot", field: "startTime" },
      { name: "room", align: "center", label: "Venue Details", field: "studentId" },
      { name: "actions", align: "right", label: "Actions" },
    ];

    const loadRoutine = () => {
      const storageKey = `routine_${filters.exam}_${filters.class}`;
      const saved = localStorage.getItem(storageKey);
      routineList.value = saved ? JSON.parse(saved) : [];
    };

    const saveToLocal = () => {
      const storageKey = `routine_${filters.exam}_${filters.class}`;
      localStorage.setItem(storageKey, JSON.stringify(routineList.value));
    };

    const openRoutineDialog = (item = null) => {
      if (item) {
        isEdit.value = true;
        currentId.value = item.id;
        Object.assign(form, item);
      } else {
        isEdit.value = false;
        form.subject = "";
        form.date = "";
        form.startTime = "10:00";
        form.endTime = "13:00";
        form.building = "";
        form.hall = "";
        form.studentId = "";
      }
      routineDialog.value = true;
    };

    const saveRoutine = () => {
      if (!form.subject || !form.date || !form.building || !form.hall) {
        $q.notify({
          color: "warning",
          message: "Required fields are missing",
        });
        return;
      }

      if (isEdit.value) {
        const index = routineList.value.findIndex(r => r.id === currentId.value);
        if (index !== -1) routineList.value[index] = { ...form, id: currentId.value };
      } else {
        routineList.value.push({ ...form, id: Date.now() });
      }

      saveToLocal();
      routineDialog.value = false;
      $q.notify({
        color: "positive",
        message: "Routine Saved Successfully",
        icon: "done",
      });
    };

    const deleteRoutine = (id) => {
      $q.dialog({
        title: "Delete Schedule",
        message: "Remove this exam from the routine?",
        cancel: true,
      }).onOk(() => {
        routineList.value = routineList.value.filter(r => r.id !== id);
        saveToLocal();
      });
    };

    onMounted(loadRoutine);

    return {
      filters,
      routineList,
      routineDialog,
      isEdit,
      form,
      examOptions,
      classOptions,
      subjectOptions,
      buildingOptions,
      hallOptions,
      columns,
      loadRoutine,
      openRoutineDialog,
      saveRoutine,
      deleteRoutine,
    };
  },
};
</script>

<style scoped>
.border-radius-10 {
  border-radius: 10px;
}
</style>
