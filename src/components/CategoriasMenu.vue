<template>
    <ul class="dropdown-menu bg-white dark:bg-bg-dark">
      <li class="hover:bg-bg-cards  dark:hover:bg-bg-cards-dark" @mouseover="showDivisionMenu = 'primera'" @mouseleave="showDivisionMenu = null">
        <router-link to="/primera-division" class="dark:text-white" >Primera División</router-link>
        <!-- <Navbar v-if="showDivisionMenu === 'primera'" /> -->
      </li>
      <li class="hover:bg-bg-cards  dark:hover:bg-bg-cards-dark" @mouseover="showDivisionMenu = 'segunda'" @mouseleave="showDivisionMenu = null">
        <router-link to="/segunda-division" class="dark:text-white" >Segunda División</router-link>
        <!-- <Navbar v-if="showDivisionMenu === 'segunda'" /> -->
      </li>
    </ul>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Navbar from './Navbar.vue';
  
  const showDivisionMenu = ref(null);
  </script>
  