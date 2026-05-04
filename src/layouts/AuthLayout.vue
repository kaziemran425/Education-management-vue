<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="auth-bg flex flex-center">
        <transition enter-active-class="animated fadeIn" appear>
          <router-view />
        </transition>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.auth-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
