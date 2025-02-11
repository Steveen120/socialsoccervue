<template>
    <!-- Lista de navegación del menú de administración -->
    <ul class="dropdown-menu bg-gradient-to-r from-[#2d3748] to-[#1a202c] dark:bg-gradient-to-r dark:from-[#1a202c] dark:to-[#2d3748] rounded-lg shadow-md">
      <!-- Opción "Perfil" visible solo si el usuario no está autenticado -->
      <li v-if="!isLoggedIn" class="hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-200 ease-in-out rounded-md">
        <router-link to="/perfil" class="text-gray-200 dark:text-white p-3 block">
          Perfil
        </router-link>
      </li>
    </ul>
  </template>
  
  <script setup>
  defineProps({
    // Propiedad 'isLoggedIn' para determinar si el usuario está autenticado
    isLoggedIn: Boolean
  });
  </script>
  
  <style scoped>
  /* Estilo general del menú de administración */
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
  
  /* Efecto hover en la opción de "Perfil" */
  li:hover {
    background-color: #38a169;
    color: white;
  }
  
  /* Estilo de texto */
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
  
