<template>
    <!-- Lista de navegación del menú de categorías -->
    <ul class="dropdown-menu bg-gradient-to-r from-[#2d3748] to-[#1a202c] dark:bg-gradient-to-r dark:from-[#1a202c] dark:to-[#2d3748] rounded-lg shadow-md">
      <!-- Opción "Primera División" -->
      <li class="hover:bg-[#3b4a58] dark:hover:bg-[#3b4a58] transition-all duration-200 ease-in-out rounded-md"
          @mouseover="showDivisionMenu = 'primera'" 
          @mouseleave="showDivisionMenu = null">
        <router-link to="/primera-division" class="text-gray-200 dark:text-white p-3 block">
          Primera División
        </router-link>
      </li>
      <!-- Opción "Segunda División" -->
      <li class="hover:bg-[#3b4a58] dark:hover:bg-[#3b4a58] transition-all duration-200 ease-in-out rounded-md"
          @mouseover="showDivisionMenu = 'segunda'" 
          @mouseleave="showDivisionMenu = null">
        <router-link to="/segunda-division" class="text-gray-200 dark:text-white p-3 block">
          Segunda División
        </router-link>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado para controlar la visibilidad del submenú de divisiones
  const showDivisionMenu = ref(null);
  </script>
  
  <style scoped>
  /* Estilo general del menú */
  .dropdown-menu {
    width: 250px;
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  /* Estilo de las opciones del menú */
  li {
    cursor: pointer;
  }
  
  /* Transición suave en el hover */
  li:hover {
    background-color: #3b4a58;
    color: white;
  }
  
  /* Estilos de texto */
  .text-gray-200 {
    color: #edf2f7;
  }
  
  .dark .text-white {
    color: #ffffff;
  }
  
  /* Suavizado en las transiciones */
  .transition-all {
    transition: all 0.2s ease-in-out;
  }
  </style>
  
