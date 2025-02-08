<template>
  <ul class="flex gap-8 nav-links-2">
<<<<<<< HEAD
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
=======
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-jugadores`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Jugadores</span>
        
      </router-link>
    </li>
    <!-- <li>
      <router-link 
        :to="`${baseRoute}/equipos`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
        Equipos
      </router-link>
    </li> -->
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
    <li>
      <router-link 
        :to="`${baseRoute}/partidos`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color  pb-2 transition border-transparent"
      >
      <span>Partidos</span>
<<<<<<< HEAD
      </router-link>
    </li>
    <!-- Enlace "Resultados" -->
=======
        
      </router-link>
    </li>
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
    <li>
      <router-link 
        :to="`${baseRoute}/resultados`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Resultados</span>
<<<<<<< HEAD
      </router-link>
    </li>
    <!-- Enlace "Posiciones" -->
=======
        
      </router-link>
    </li>
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-completa`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
<<<<<<< HEAD
      <span>Posiciones</span>
      </router-link>
    </li>
    <!-- Enlace "Árbitros" -->
    <li>
      <router-link 
        :to="`${baseRoute}/arbitros`" 
=======
      <!-- <span class="hidden md:block">Tabla de Posiciones</span> -->
      <span>Posiciones</span>
      </router-link>
    </li>
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-arbitros`" 
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Árbitros</span>
<<<<<<< HEAD
=======
        
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
<<<<<<< HEAD
import { isAuthenticated } from '../auth';

// Define las propiedades que recibe el componente
=======

>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
const props = defineProps({
  division: {
    type: String,
    required: true
  }
});

<<<<<<< HEAD
// Computed property para determinar la ruta base según la división
const baseRoute = computed(() => {
  return props.division === 'primera' ? '/primera-division' : '/segunda-division';
});

// Computed property para verificar si el usuario está autenticado
const isUserAuthenticated = computed(() => {
  return isAuthenticated();
});
</script>
=======
const baseRoute = computed(() => {
  return props.division === 'primera' ? '/primera-division' : '/segunda-division';
});
</script>

<style scoped>

</style>
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
