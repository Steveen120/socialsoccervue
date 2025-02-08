<template>
  <ul class="flex gap-8 nav-links-2">
    <!-- Enlace "Vivo" solo visible si el usuario está autenticado -->
    <li v-if="isUserAuthenticated">
      <router-link 
        :to="`${baseRoute}`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
        Vivo
      </router-link>
    </li>
    <!-- Enlace "Jugadores" -->
    <li>
      <router-link 
        :to="`${baseRoute}/jugadores`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-white pb-2 transition border-transparent"
      >
      <span>Jugadores</span>
      </router-link>
    </li>
    <!-- Enlace "Partidos" -->
    <li>
      <router-link 
        :to="`${baseRoute}/partidos`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color  pb-2 transition border-transparent"
      >
      <span>Partidos</span>
      </router-link>
    </li>
    <!-- Enlace "Resultados" -->
    <li>
      <router-link 
        :to="`${baseRoute}/resultados`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Resultados</span>
      </router-link>
    </li>
    <!-- Enlace "Posiciones" -->
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-completa`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Posiciones</span>
      </router-link>
    </li>
    <!-- Enlace "Árbitros" -->
    <li>
      <router-link 
        :to="`${baseRoute}/arbitros`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Árbitros</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { isAuthenticated } from '../auth';

// Define las propiedades que recibe el componente
const props = defineProps({
  division: {
    type: String,
    required: true
  }
});

// Computed property para determinar la ruta base según la división
const baseRoute = computed(() => {
  return props.division === 'primera' ? '/primera-division' : '/segunda-division';
});

// Computed property para verificar si el usuario está autenticado
const isUserAuthenticated = computed(() => {
  return isAuthenticated();
});
</script>
