<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-primary">
          Student Management
        </div>
        <div class="text-caption text-grey-7">
          Comprehensive list of all enrolled students
        </div>
      </div>
      <q-btn
        color="primary"
        icon="person_add"
        label="Add Student"
        rounded
        unelevated
        @click="openEditDialog()"
      />
    </div>

    <q-card class="shadow-5 border-radius-10">
      <q-table
        :rows="students"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search Students..."
          >
            <template v-slot:append><q-icon name="search" /></template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right q-gutter-x-sm">
            <q-btn
              flat
              round
              color="info"
              icon="visibility"
              size="sm"
              @click="viewProfile(props.row)"
            >
              <q-tooltip>View Profile</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              size="sm"
              @click="openEditDialog(props.row)"
            >
              <q-tooltip>Edit Student</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="deleteStudent(props.row.id)"
            >
              <q-tooltip>Delete Record</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog
      v-model="viewDialog"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 450px; border-radius: 20px" class="q-pb-md">
        <q-card-section
          class="bg-info text-white text-center q-pb-xl relative-position"
        >
          <div class="text-h6">Student Profile</div>
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="absolute-top-right q-ma-sm"
          />
        </q-card-section>

        <q-card-section class="text-center" style="margin-top: -60px">
          <q-avatar size="120px" class="shadow-10 bg-white">
            <img
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.name}`"
            />
          </q-avatar>
          <div class="text-h5 text-weight-bold q-mt-md">
            {{ selectedStudent.name }}
          </div>
          <q-badge
            :color="selectedStudent.status === 'Active' ? 'green' : 'red'"
            class="q-mb-md q-px-md"
          >
            {{ selectedStudent.status }}
          </q-badge>

          <q-list bordered separator class="rounded-borders text-left q-mx-md">
            <q-item>
              <q-item-section avatar
                ><q-icon name="tag" color="info"
              /></q-item-section>
              <q-item-section>
                <q-item-label caption>Roll Number</q-item-label>
                <q-item-label class="text-weight-bold">{{
                  selectedStudent.roll
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="class" color="info"
              /></q-item-section>
              <q-item-section>
                <q-item-label caption>Class</q-item-label>
                <q-item-label class="text-weight-bold">{{
                  selectedStudent.class
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mail" color="info"
              /></q-item-section>
              <q-item-section>
                <q-item-label caption>Email Address</q-item-label>
                <q-item-label>{{
                  selectedStudent.email || "N/A"
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="editDialog"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 500px; max-width: 95vw; border-radius: 20px">
        <q-card-section class="bg-primary text-white text-center q-pb-xl">
          <div class="text-h6 q-mb-md">
            {{ isEdit ? "Update Student Record" : "Enroll New Student" }}
          </div>
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="absolute-top-right q-ma-sm"
          />
        </q-card-section>

        <q-card-section class="text-center" style="margin-top: -50px">
          <q-avatar size="100px" class="shadow-10 bg-white">
            <img
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || 'default'}`"
            />
          </q-avatar>
        </q-card-section>

        <q-card-section class="q-px-xl q-pb-md">
          <q-form @submit="saveStudent" class="q-gutter-y-md">
            <q-input
              outlined
              v-model="form.name"
              label="Full Name *"
              dense
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
            <q-input
              outlined
              v-model="form.roll"
              label="Roll Number *"
              dense
              :rules="[(val) => !!val || 'Required']"
            />

            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-select
                  outlined
                  v-model="form.class"
                  :options="classList"
                  label="Class"
                  dense
                />
              </div>
              <div class="col-6">
                <q-select
                  outlined
                  v-model="form.status"
                  :options="['Active', 'Inactive']"
                  label="Status"
                  dense
                />
              </div>
            </div>

            <q-input
              outlined
              v-model="form.email"
              label="Email Address"
              dense
              type="email"
            />

            <div class="row justify-center q-mt-lg">
              <q-btn
                label="Save Changes"
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

    // State Variables
    const students = ref([]);
    const filter = ref("");
    const editDialog = ref(false);
    const viewDialog = ref(false);
    const isEdit = ref(false);
    const currentId = ref(null);
    const selectedStudent = ref({});
    const classList = ["Class 9", "Class 10", "Class 11", "Class 12"];

    const form = reactive({
      name: "",
      roll: "",
      class: "Class 10",
      email: "",
      status: "Active",
    });

    const columns = [
      {
        name: "name",
        align: "left",
        label: "Student Name",
        field: "name",
        sortable: true,
      },
      { name: "roll", align: "left", label: "Roll", field: "roll" },
      { name: "class", align: "left", label: "Class", field: "class" },
      { name: "actions", align: "right", label: "Actions" },
    ];

    // Initialize/Load Data
    const loadData = () => {
      const data = localStorage.getItem("school_students");
      if (data) {
        students.value = JSON.parse(data);
      }
    };

    // Toggle Dialogs
    const openEditDialog = (student = null) => {
      if (student) {
        isEdit.value = true;
        currentId.value = student.id;
        Object.assign(form, student);
      } else {
        isEdit.value = false;
        form.name = "";
        form.roll = "";
        form.class = "Class 10";
        form.email = "";
        form.status = "Active";
      }
      editDialog.value = true;
    };

    const viewProfile = (student) => {
      selectedStudent.value = student;
      viewDialog.value = true;
    };

    // Save Logic
    const saveStudent = () => {
      if (isEdit.value) {
        const index = students.value.findIndex((s) => s.id === currentId.value);
        if (index !== -1)
          students.value[index] = { ...form, id: currentId.value };
      } else {
        students.value.push({ ...form, id: Date.now() });
      }

      localStorage.setItem("school_students", JSON.stringify(students.value));
      editDialog.value = false;
      $q.notify({
        color: "positive",
        message: "Data Saved Successfully",
        icon: "check",
      });
    };

    // Delete Logic
    const deleteStudent = (id) => {
      $q.dialog({
        title: "Delete Student",
        message: "This action cannot be undone. Confirm?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        students.value = students.value.filter((s) => s.id !== id);
        localStorage.setItem("school_students", JSON.stringify(students.value));
        $q.notify({ color: "negative", message: "Student Deleted" });
      });
    };

    onMounted(loadData);

    // Return to Template
    return {
      students,
      columns,
      filter,
      editDialog,
      viewDialog,
      isEdit,
      form,
      classList,
      selectedStudent,
      openEditDialog,
      viewProfile,
      saveStudent,
      deleteStudent,
    };
  },
};
</script>

<style scoped>
.border-radius-10 {
  border-radius: 10px;
}
.absolute-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.rounded-borders {
  border-radius: 8px;
}
</style>
