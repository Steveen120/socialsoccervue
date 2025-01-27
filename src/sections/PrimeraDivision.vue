<template>
  <div class="grid gap-8">
    <h1 class="flex w-full justify-center md:justify-start">PRIMERA DIVISION</h1>
    <div class="overflow-x-auto overflow-y-hidden md:overflow-visible p-4">
      <Navbar division="primera" />
    </div>
    <router-view>
      <template v-slot="{ Component }">
        <component 
          :is="Component || LandingPage" 
          :division="division" 
        />
      </template>
    </router-view>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import LandingPage from '../components/LandingPage.vue';
import { ref } from 'vue';

const division = ref('Primera División');
</script>