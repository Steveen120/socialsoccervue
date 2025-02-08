<template>
  <div class="landing-page">
    <!-- Encabezado -->
    <span class="text-xl md:text-4xl">Bienvenido a la {{ division }}</span>
    <p>Seleccione una opción del menú para comenzar.</p>

    <!-- Sección de partidos en vivo -->
    <section v-if="liveMatches && liveMatches.length > 0 && isUserAuthenticated" class="live-matches-section">
      <h3 class="text-lg text-white font-bold mb-4">Partidos en Vivo</h3>
      <div class="match-list flex flex-wrap pb-16 justify-center gap-8">
        <LiveMatchCard
          v-for="(match, index) in liveMatches"
          :key="index"
          :match="match"
        />
      </div>
    </section>
    <!-- Mensaje si no hay partidos en vivo -->
    <section v-else class="no-live-matches">
      <p>No hay partidos en vivo disponibles en este momento.</p>
    </section>

    <!-- Sección de noticias -->
    <section v-if="newsItems && newsItems.length > 0" class="news-section">
      <h3 class="text-lg text-white font-bold mb-4">Noticias Recientes</h3>
      <div class="news-list flex flex-wrap justify-center gap-8">
        <NewsCard
          v-for="(news, index) in newsItems"
          :key="index"
          :news="news"
        />
      </div>
    </section>
    <!-- Mensaje si no hay noticias -->
    <section v-else class="no-news">
      <p>No hay noticias disponibles en este momento.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LiveMatchCard from "@/components/Cards/LiveMatchCard.vue";
import NewsCard from "@/components/Cards/NewsCard.vue";
import liveMatchesData from "@/data/live.json";
import { isAuthenticated } from '../auth';

const isUserAuthenticated = computed(() => {
  return isAuthenticated();
});

// Props
const props = defineProps({
  division: {
    type: String,
    required: true,
  },
});

// Función para normalizar nombres (convertir a minúsculas y eliminar espacios)
const normalizeName = (name) => {
  return name.trim().toLowerCase();
};

// Filtrar partidos en vivo por división
const liveMatches = computed(() => {
  // Verificar si liveMatchesData es un array válido
  if (!Array.isArray(liveMatchesData) || !Array.isArray(liveMatchesData[0])) {
    console.error("Error: Datos de partidos no válidos.");
    return [];
  }

  // Normalizar el nombre de la división seleccionada
  const normalizedDivision = normalizeName(props.division);

  // Filtrar partidos por división y estado "En Vivo"
  const filteredMatches = liveMatchesData[0].filter((item) => {
    // Solo procesar elementos de tipo "match"
    if (item.type !== "match") return false;

    // Asegurarse de que match.league y match.status existan
    if (!item.league || !item.status) {
      console.warn("Partido con datos incompletos:", item);
      return false;
    }

    // Normalizar el nombre de la liga del partido
    const normalizedLeague = normalizeName(item.league);

    // Comparar la división y el estado del partido
    return (
      normalizedLeague === normalizedDivision && item.status === "En Vivo"
    );
  });

  // Si no hay partidos filtrados, registrar un mensaje de depuración
  if (filteredMatches.length === 0) {
    console.debug(
      `No se encontraron partidos en vivo para la división: ${props.division}`
    );
  }

  return filteredMatches;
});

// Función para extraer noticias relacionadas con los partidos en vivo
const newsItems = computed(() => {
  // Obtener todas las noticias del archivo JSON
  const allNews = liveMatchesData[0].filter((item) => item.type === "news");

  // Combinar noticias generales con noticias específicas de los partidos en vivo
  const liveMatchNews = liveMatches.value.flatMap((match) => match.news || []);

  // Transformar las noticias en objetos con propiedades consistentes
  return [
    ...allNews.map((news) => ({
      id: news.id,
      title: news.title,
      description: news.description,
      date: news.date,
      image: news.image,
    })),
    ...liveMatchNews.map((news, index) => ({
      id: `live-news-${index}`,
      title: news.title,
      description: "Noticia relacionada con el partido en vivo.",
      date: new Date().toISOString(), // Fecha actual
      image: "/public/assets/menu/equipo.jpg", // Imagen predeterminada
    })),
  ];
});
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 2rem;
}

.landing-page h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.landing-page p {
  font-size: 1.25rem;
}

/* Estilos para la sección de partidos en vivo */
.live-matches-section {
  margin-top: 2rem;
  text-align: left;
}

.no-live-matches {
  margin-top: 2rem;
  font-style: italic;
}

/* Estilos para la sección de noticias */
.news-section {
  margin-top: 2rem;
  text-align: left;
}

.no-news {
  margin-top: 2rem;
  font-style: italic;
}
</style>