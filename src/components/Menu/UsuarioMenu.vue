<template>
  <!-- Lista de navegación del menú de usuario -->
  <ul class="absolute -ml-28 w-56 flex gap-4 flex-col text-left bg-white dark:bg-bg-dark">
    <!-- Enlace "Iniciar Sesión" visible solo si el usuario no está autenticado -->
    <li v-if="!isLoggedIn" class="flex items-end hover:bg-bg-cards dark:hover:bg-bg-cards-dark">
      <router-link to="/login" exact-active-class="active" class="dark:text-white w-full flex text-left justify-end p-4">
        Iniciar Sesión
      </router-link>
    </li>
    <!-- Enlace "Registrarse" visible solo si el usuario no está autenticado -->
    <li v-if="!isLoggedIn" class="flex items-end hover:bg-bg-cards dark:hover:bg-bg-cards-dark">
      <router-link to="/registrar" exact-active-class="active" class="dark:text-white w-full flex text-left justify-end p-4">
        Registrarse
      </router-link>
    </li>
    <!-- Enlace "Cerrar Sesión" visible solo si el usuario está autenticado -->
    <li v-else>
      <router-link to="/perfil" exact-active-class="active hover:bg-bg-cards dark:hover:bg-bg-cards-dark">
        <a href="#" @click.prevent="$emit('logout')">Cerrar Sesión</a>
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
