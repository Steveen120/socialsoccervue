<template>
    <ul class="dropdown-menu bg-white dark:bg-bg-dark">
      <li  v-if="!isLoggedIn" class="flex items-end hover:bg-bg-cards  dark:hover:bg-bg-cards-dark">
        <router-link to="/login" exact-active-class="active" class="dark:text-white">Iniciar Sesión</router-link>
      </li>
      <li v-if="!isLoggedIn" class="flex items-end hover:bg-bg-cards  dark:hover:bg-bg-cards-dark">
        <router-link to="/registrar" exact-active-class="active" class="dark:text-white">Registrarse</router-link>
      </li>
      <li v-else>
        <router-link to="/perfil" exact-active-class="active hover:bg-bg-cards  dark:hover:bg-bg-cards-dark">Perfil</router-link>
        <a href="#" @click.prevent="$emit('logout')">Cerrar Sesión</a>
      </li>
    </ul>
  </template>
  
  <script setup>
  defineProps({
    isLoggedIn: Boolean
  });
  </script>
  