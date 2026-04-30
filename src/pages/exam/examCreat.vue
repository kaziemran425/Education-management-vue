<template>
  <q-page padding class="bg-grey-1">
    <div class="row q-col-gutter-md justify-center">
      <div class="col-12 col-md-8">
        <q-card flat bordered class="shadow-2">
          <q-card-section class="bg-primary text-white row items-center">
            <q-icon name="assignment" size="sm" class="q-mr-sm" />
            <div class="text-h6">নতুন পরীক্ষা তৈরি করুন (Create Exam)</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-form @submit="saveExam" class="q-gutter-md">
              <div class="row q-col-gutter-sm">
                <!-- Exam Title -->
                <div class="col-12">
                  <q-input
                    v-model="examData.title"
                    label="পরীক্ষার নাম (উদা: বার্ষিক পরীক্ষা ২০২৬)"
                    outlined
                    dense
                    :rules="[val => !!val || 'নাম আবশ্যক']"
                  />
                </div>

                <!-- Academic Year & Term -->
                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="examData.year"
                    :options="['2025', '2026', '2027']"
                    label="শিক্ষাবর্ষ"
                    outlined
                    dense
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="examData.term"
                    :options="['1st Term', 'Mid Term', 'Final Exam']"
                    label="টার্ম"
                    outlined
                    dense
                  />
                </div>

                <!-- Start & End Date -->
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="examData.startDate"
                    label="শুরু হওয়ার তারিখ"
                    type="date"
                    outlined
                    dense
                    stack-label
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="examData.endDate"
                    label="শেষ হওয়ার তারিখ"
                    type="date"
                    outlined
                    dense
                    stack-label
                  />
                </div>

                <!-- Description -->
                <div class="col-12">
                  <q-input
                    v-model="examData.note"
                    label="বিশেষ নোট (ঐচ্ছিক)"
                    type="textarea"
                    outlined
                    dense
                    rows="3"
                  />
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn label="রিসেট" color="grey-7" flat class="q-mr-sm" type="reset" />
                <q-btn label="পরীক্ষা সেভ করুন" color="primary" icon="save" type="submit" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ExamCreate',
  setup() {
    const $q = useQuasar()
    const examData = ref({
      id: null,
      title: '',
      year: '2026',
      term: 'Final Exam',
      startDate: '',
      endDate: '',
      note: '',
      createdAt: new Date().toISOString()
    })

    const saveExam = () => {
      try {
        // Local Storage থেকে আগের ডাটা আনা
        const existingExams = JSON.parse(localStorage.getItem('exams') || '[]')

        // নতুন আইডি জেনারেট করা
        examData.value.id = Date.now()

        // নতুন ডাটা পুশ করা
        existingExams.push({ ...examData.value })

        // Local Storage এ সেভ করা
        localStorage.setItem('exams', JSON.stringify(existingExams))

        $q.notify({
          color: 'positive',
          message: 'পরীক্ষা সফলভাবে তৈরি করা হয়েছে!',
          icon: 'check_circle'
        })

        // ফর্ম রিসেট করা
        examData.value = { title: '', year: '2026', term: 'Final Exam', startDate: '', endDate: '', note: '' }
      } catch (error) {
        $q.notify({ color: 'negative', message: 'ডাটা সেভ করতে সমস্যা হয়েছে।' })
      }
    }

    return {
      examData,
      saveExam
    }
  }
})
</script>
