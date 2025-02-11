<template>
    <div v-if="match" class="live-match-view p-8">
        <!-- Título -->
        <h1 class="text-2xl font-bold mb-4">{{ match.title || `${match.team1.name} vs ${match.team2.name}` }}</h1>

        <!-- Video en vivo -->
        <div v-if="match.videoUrl" class="video-container mb-8 py-4 flex justify-center">
            <iframe width="50%" height="400" :src="match.videoUrl" frameborder="0" class="rounded-xl"
                allowfullscreen></iframe>
        </div>
        <div v-else class="mb-8 text-center">
            <p>No hay video disponible para este partido.</p>
        </div>

        <!-- Estadísticas -->
        <div v-if="match.stats && match.stats.length > 0"
            class="stats-container bg-black pt-4 bg-opacity-50 rounded-xl dark:bg-gray-800 p-6 shadow-md mb-8">
            <h2 class="text-xl font-bold mb-4">Estadísticas</h2>
            <ul>
                <li v-for="(stat, index) in match.stats" :key="index" class="mb-4 flex justify-between items-center">
                    <span>{{ stat.label }}:</span>
                    <div class="flex flex-col items-center gap-2">
                        <span>{{ stat.value }}</span>
                        <div v-if="stat.label === 'Posesión'"
                            class="w-32 h-4 bg-gray-700 rounded-full overflow-hidden relative">
                            <div class="h-full bg-blue-500"
                                :style="{ width: `${getPossessionPercentage(stat.value, 'team1')}%` }"></div>
                            <div class="h-full bg-red-500 absolute top-0 right-0"
                                :style="{ width: `${getPossessionPercentage(stat.value, 'team2')}%` }"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="mb-8 text-center">
            <p>No hay estadísticas disponibles para este partido.</p>
        </div>

        <!-- Alineaciones -->
        <div v-if="match.lineups" class="lineups-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Alineación del equipo local -->
            <div class="team-lineup relative overflow-hidden rounded-lg shadow-md">
                <div class="background-layer absolute inset-0 z-0"
                    :style="{ backgroundImage: `url(${match.team1.logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                    <div class="overlay-layer flex absolute inset-0 bg-black bg-opacity-50">
                        <img :src="match.team1.logo" :alt="match.team1.name"
                            class="object-contain h-40 md:h-auto md:max-w-full md:max-h-full m-auto opacity-50 blur-sm" />
                    </div>
                </div>
                <div class="content-layer relative z-10 p-6 text-white">
                    <h3 class="text-lg font-semibold mb-2">{{ match.team1.name }}</h3>
                    <p class="text-sm mb-4">Formación: {{ match.lineups.team1?.formation || 'No disponible' }}</p>
                    <ul class="list-none p-0">
                        <li v-for="(player, index) in match.lineups.team1?.players" :key="index" class="mb-2">
                            <span>{{ player?.name || 'Jugador desconocido' }}</span>
                            <span class="float-right text-gray-300">{{ player?.position || 'Posición desconocida'
                                }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Alineación del equipo visitante -->
            <div class="team-lineup relative overflow-hidden rounded-lg shadow-md">
                <div class="background-layer absolute inset-0 z-0"
                    :style="{ backgroundImage: `url(${match.team2.logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                    <div class="overlay-layer flex absolute inset-0 bg-black bg-opacity-50">
                        <img :src="match.team2.logo" :alt="match.team2.name"
                            class="object-contain h-40 md:h-auto md:max-w-full md:max-h-full m-auto opacity-50 blur-sm" />
                    </div>
                </div>
                <div class="content-layer relative z-10 p-6 text-white">
                    <h3 class="text-lg font-semibold mb-2">{{ match.team2.name }}</h3>
                    <p class="text-sm mb-4">Formación: {{ match.lineups.team2?.formation || 'No disponible' }}</p>
                    <ul class="list-none p-0">
                        <li v-for="(player, index) in match.lineups.team2?.players" :key="index" class="mb-2">
                            <span>{{ player?.name || 'Jugador desconocido' }}</span>
                            <span class="float-right text-gray-300">{{ player?.position || 'Posición desconocida'
                                }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else class="mb-8 text-center">
            <p>No hay alineaciones disponibles para este partido.</p>
        </div>

        <!-- Noticias específicas del partido -->
        <div v-if="newsItems && newsItems.length > 0"
            class="news-container bg-black pt-4 bg-opacity-50 rounded-xl dark:bg-gray-800 p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4">Noticias relacionadas con este partido</h2>
            <div class="news-list flex flex-wrap justify-center gap-8">
                <NewsCard v-for="(news, index) in newsItems" :key="index" :news="news" />
            </div>
        </div>
        <div v-else class="mb-8 text-center">
            <p>No hay noticias disponibles para este partido.</p>
        </div>
    </div>
    <div v-else class="p-8 text-center">
        <p>Partido no encontrado.</p>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import liveMatchesData from "@/data/live.json";
import NewsCard from "@/components/Cards/NewsCard.vue";

const route = useRoute();
const matchId = route.params.id;

// Obtener el partido correspondiente al ID
const match = computed(() => {
    // Verificar si liveMatchesData es un array válido
    if (!Array.isArray(liveMatchesData) || !Array.isArray(liveMatchesData[0])) {
        console.error("Error: Datos de partidos no válidos.");
        return null;
    }

    // Acceder al primer nivel del array anidado
    const matches = liveMatchesData[0];

    // Normalizar el ID para asegurar consistencia en la comparación
    const normalizedMatchId = String(matchId).trim();

    // Buscar el partido correspondiente al ID
    const foundMatch = matches.find((match) => {
        // Asegurarse de que el partido tenga un ID y sea de tipo "match"
        if (!match || typeof match.id !== "string" || match.type !== "match") {
            console.warn("Partido inválido o no es un partido:", match);
            return false;
        }
        return String(match.id).trim() === normalizedMatchId;
    });

    // Si no se encuentra el partido, registrar un mensaje de depuración
    if (!foundMatch) {
        console.error(`No se encontró ningún partido con el ID: ${normalizedMatchId}`);
        return null;
    }

    return foundMatch;
});

// Función para calcular el porcentaje de posesión
const getPossessionPercentage = (value, team) => {
    if (!value || typeof value !== "string") {
        console.error("Valor de posesión inválido:", value);
        return 0; // Devolver 0 si el valor no es válido
    }

    // Limpiar espacios y verificar el formato
    const cleanedValue = value.trim(); // Eliminar espacios al inicio y final
    const match = cleanedValue.match(/^(\d+)%\s*-\s*(\d+)%$/); // Validar formato "X% - Y%"
    if (!match) {
        console.error("Formato de posesión inválido:", value);
        return 0; // Devolver 0 si el formato no es correcto
    }

    // Extraer los números
    const team1 = parseInt(match[1], 10); // Primer número (X)
    const team2 = parseInt(match[2], 10); // Segundo número (Y)
    const total = team1 + team2;

    if (team === "team1") {
        return (team1 / total) * 100;
    } else if (team === "team2") {
        return (team2 / total) * 100;
    }
};

// Obtener las noticias específicas del partido
const newsItems = computed(() => {
    const liveMatchNews = match.value?.news || [];
    return liveMatchNews.map((news, index) => ({
        id: `live-news-${index}`,
        title: news.title,
        description: "Noticia relacionada con el partido en vivo.",
        date: new Date().toISOString(), // Fecha actual
        image: "/public/assets/menu/equipo.jpg", // Imagen predeterminada
    }));
});
</script>

