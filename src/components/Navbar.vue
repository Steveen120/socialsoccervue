<template>
  <ul class="flex gap-8 nav-links-2">
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
    <li>
      <router-link 
        :to="`${baseRoute}/partidos`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color  pb-2 transition border-transparent"
      >
      <span>Partidos</span>
        
      </router-link>
    </li>
    <li>
      <router-link 
        :to="`${baseRoute}/resultados`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <span>Resultados</span>
        
      </router-link>
    </li>
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-completa`" 
        exact-active-class="active-link"
        class="hover:border-b-2 hover:border-primary-color pb-2 transition border-transparent"
      >
      <!-- <span class="hidden md:block">Tabla de Posiciones</span> -->
      <span>Posiciones</span>
      </router-link>
    </li>
    <li>
      <router-link 
        :to="`${baseRoute}/tabla-arbitros`" 
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

const props = defineProps({
  division: {
    type: String,
    required: true
  }
});

const baseRoute = computed(() => {
  return props.division === 'primera' ? '/primera-division' : '/segunda-division';
});
</script>

<style scoped>

</style>
