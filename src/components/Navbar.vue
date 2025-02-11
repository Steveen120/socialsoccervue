<template>
  <nav class="relative">
    <ul class="flex gap-6 text-lg font-semibold">
      <!-- Vivo (Solo si autenticado) -->
      <li v-if="isUserAuthenticated">
        <router-link :to="`${baseRoute}`" class="nav-button">
          🔴 Vivo
        </router-link>
      </li>

      <!-- Jugadores -->
      <li>
        <router-link :to="`${baseRoute}/jugadores`" class="nav-button">
          ⚽ Jugadores
        </router-link>
      </li>

      <!-- Partidos -->
      <li>
        <router-link :to="`${baseRoute}/partidos`" class="nav-button">
          📅 Partidos
        </router-link>
      </li>

      <!-- Resultados -->
      <li>
        <router-link :to="`${baseRoute}/resultados`" class="nav-button">
          ✅ Resultados
        </router-link>
      </li>

      <!-- Posiciones -->
      <li>
        <router-link :to="`${baseRoute}/tabla-completa`" class="nav-button">
          📈 Posiciones
        </router-link>
      </li>

      <!-- Árbitros -->
      <li>
        <router-link :to="`${baseRoute}/arbitros`" class="nav-button">
          👨‍⚖️ Árbitros
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { isAuthenticated } from '../auth';

const props = defineProps({
  division: {
    type: String,
    required: true
  }
});

const baseRoute = computed(() => {
  return props.division === 'primera' ? '/primera-division' : '/segunda-division';
});

const isUserAuthenticated = computed(() => {
  return isAuthenticated();
});
</script>

<style scoped>
/* Diseño base */
.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 20px; /* Bordes más redondeados para un look más suave */
  font-weight: 600;
  color: #edf2f7; /* Color claro similar al del marcador */
  background: linear-gradient(145deg, #3b4a58, #2d3748); /* Sutil cambio en el gradiente para más profundidad */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  text-transform: capitalize; /* Primera letra en mayúsculas */
}

/* Efecto hover con profundidad y transición suave de colores */
.nav-button:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #1a202c, #3b4a58);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

/* Modo oscuro */
.dark .nav-button {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.dark .nav-button:hover {
  background: linear-gradient(145deg, #0f172a, #1e293b);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Estilos del texto */
.nav-button svg {
  font-size: 1.5rem; /* Iconos más grandes para mejor visibilidad */
  transition: transform 0.3s ease;
}

/* Animación al hacer hover sobre los iconos */
.nav-button:hover svg {
  transform: rotate(15deg); /* Rotación suave del ícono al pasar el cursor */
}

/* Estilo de la lista de navegación */
nav ul {
  display: flex;
  gap: 24px;
  margin-top: 1rem; /* Separación del contenido superior */
}

/* Mejorar la experiencia en dispositivos móviles */
@media (max-width: 768px) {
  .nav-button {
    font-size: 1rem;
    padding: 10px 16px;
  }

  nav ul {
    gap: 16px;
  }
}
</style>
