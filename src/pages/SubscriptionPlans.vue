<template>
  <q-page padding class="bg-grey-2 flex flex-center">
    <div class="row q-col-gutter-lg justify-center full-width" style="max-width: 1200px">
      <div v-for="plan in plans" :key="plan.name" class="col-12 col-md-4">
        <q-card flat bordered class="text-center q-pa-lg" :class="plan.featured ? 'bg-primary text-white shadow-10 scale-110' : 'bg-white'">
          <div class="text-h5 text-weight-bold">{{ plan.name }}</div>
          <div class="text-h3 q-my-md">৳{{ plan.price }}<span class="text-subtitle1">/মাস</span></div>
          <q-separator :dark="plan.featured" class="q-my-md" />
          <q-list dense>
            <q-item v-for="feature in plan.features" :key="feature">
              <q-item-section avatar><q-icon name="check" :color="plan.featured ? 'white' : 'green'" /></q-item-section>
              <q-item-section>{{ feature }}</q-item-section>
            </q-item>
          </q-list>
          <q-btn :color="plan.featured ? 'white' : 'primary'" :text-color="plan.featured ? 'primary' : 'white'" label="প্যাকেজ কিনুন" class="full-width q-mt-lg" @click="subscribe(plan)" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const plans = [
  { name: 'Basic', price: 500, features: ['১০০ শিক্ষার্থী', 'উপস্থিতি', 'রিপোর্ট'], featured: false },
  { name: 'Premium', price: 1500, features: ['৫০০ শিক্ষার্থী', 'পরীক্ষা ম্যানেজমেন্ট', 'অ্যাকাউন্টিং'], featured: true },
  { name: 'Enterprise', price: 5000, features: ['আনলিমিটেড শিক্ষার্থী', 'কাস্টম ডোমেইন', '২৪/৭ সাপোর্ট'], featured: false }
]
const subscribe = (plan) => {
  localStorage.setItem('active_plan', JSON.stringify(plan))
  alert(`${plan.name} প্যাকেজটি সিলেক্ট করা হয়েছে!`)
}
</script>
