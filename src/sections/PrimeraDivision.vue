<template>
  <div class="grid gap-8">
    <!-- Título de la sección -->
    <h1 class="flex w-full justify-center md:justify-start">PRIMERA DIVISION</h1>
    
    <!-- Contenedor del Navbar con scroll horizontal en pantallas pequeñas -->
    <div class="overflow-x-auto overflow-y-hidden md:overflow-visible p-4">
      <Navbar division="primera" />
    </div>
    
    <!-- Contenedor del router-view para cargar componentes dinámicamente -->
    <router-view class="p-4 md:p-0 xl:p-8 ">
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
import Navbar from '../components/Navbar.vue'; // Importa el componente Navbar
import LandingPage from '../components/LandingPage.vue'; // Importa el componente LandingPage
import { ref } from 'vue'; // Importa ref desde Vue para crear referencias reactivas

// Define una referencia reactiva para la división
const division = ref('Primera División');
</script>