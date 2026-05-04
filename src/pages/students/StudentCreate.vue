<template>
  <q-page class="q-pa-md">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6">Quick Student Entry</div>
      </q-card-section>
      <q-card-section>
         <div class="text-center text-grey-6">Use Admission form for detailed entry.</div>
         <q-btn flat label="Go to Admission" color="primary" to="/admin/students/add" class="full-width q-mt-md" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>
