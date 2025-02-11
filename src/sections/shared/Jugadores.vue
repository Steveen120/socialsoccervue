<template>
  <div class="main-container-players 2xl:p-6 bg-transparent min-h-screen">
    <!-- Header Section -->
    <div class="header flex flex-col 2xl:flex-row gap-8 bg-bg-cards dark:bg-bg-dark rounded-lg shadow-lg p-6 mb-6">
      <!-- Player Info Section -->
      <div v-if="selectedPlayer" class="player-info flex w-full flex-col md:flex-row items-center gap-6">
        <img
          :src="selectedPlayer.photo"
          alt="Foto Jugador"
          class="player-photo rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        />
        <div class="player-details flex gap-8 text-center md:text-left">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ selectedPlayer.name }}</h1>
          </div>
          <div>
            <p class="font-medium text-gray-600 dark:text-gray-300">
              <strong>{{ selectedPlayer.position }}</strong> - {{ selectedPlayer.team }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ selectedPlayer.description }}</p>
          </div>
        </div>
      </div>
      <div v-else class="player-info flex items-center gap-6 md:flex-row">
        <img
          src="/public/assets/menu/partidos.jpg"
          alt="Foto Jugador Predeterminada"
          class="player-photo rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        />
        <div class="player-details flex gap-8 items-center text-center md:text-left">
          <span class="text-3xl font-bold text-gray-800 dark:text-white">Ningún jugador seleccionado</span>
          <p class="font-medium text-gray-600 dark:text-gray-300">
            <strong>Selecciona un jugador para ver información</strong>
          </p>
        </div>
      </div>
      <!-- Additional Info Sections -->
      <div v-if="selectedPlayer" class="additional-info flex gap-6 w-full">
        <!-- General Info -->
        <div class="info-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Datos Generales</h3>
          <p class="text-gray-600 dark:text-gray-300"><i class="fas fa-user mr-2"></i> Género: {{ selectedPlayer.gender }}</p>
          <p class="text-gray-600 dark:text-gray-300"><i class="fas fa-map-marker-alt mr-2"></i> Ciudad: {{ selectedPlayer.city }}</p>
        </div>
        <!-- Stats -->
        <div class="info-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Estadísticas</h3>
          <p class="text-gray-600 dark:text-gray-300"><strong>Goles:</strong> {{ selectedPlayer.goals }}</p>
          <p class="text-gray-600 dark:text-gray-300"><strong>Asistencias:</strong> {{ selectedPlayer.assists }}</p>
          <p class="text-gray-600 dark:text-gray-300"><strong>Partidos:</strong> {{ selectedPlayer.matches }}</p>
        </div>
        <!-- Achievements -->
        <div class="info-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Premios y Logros</h3>
          <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300">
            <li v-for="(achievement, index) in selectedPlayer.achievements" :key="index">
              {{ achievement }}
            </li>
          </ul>
          <p v-if="!selectedPlayer.achievements.length" class="text-gray-600 dark:text-gray-300">Sin premios o logros registrados.</p>
        </div>
      </div>
    </div>
    <!-- Filterable Players List -->
    <div class="players-list bg-transparent rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Lista de Jugadores</h2>
      <!-- Search Bar -->
      <div class="search-bar mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar jugador..."
          class="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <!-- Players Cards -->
      <div class="player-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="player in filteredPlayers"
          :key="player.id"
          class="player-card bg-bg-cards dark:bg-bg-cards-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-5"
          @click="selectPlayer(player)"
        >
        <div class="w-full flex justify-center">
          <img :src="player.photo" alt="Foto Jugador" class="player-photo-card w-full rounded-lg mb-4" />
        </div>
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ player.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Equipo: {{ player.team }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-300">Posición: {{ player.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetallesJugador",
  data() {
    return {
      searchQuery: "", // Consulta de búsqueda para filtrar jugadores
      selectedPlayer: null, // Jugador seleccionado para mostrar detalles
      players: [], // Lista de jugadores, inicialmente vacía, se llenará con los datos del JSON
    };
  },
  computed: {
    // Filtra los jugadores según la consulta de búsqueda
    filteredPlayers() {
      return this.players.filter((player) =>
        player.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // Selecciona un jugador y muestra sus detalles
    selectPlayer(player) {
      this.selectedPlayer = player;
    },
    // Carga los datos de los jugadores desde un archivo JSON
    async loadPlayers() {
      try {
        const response = await fetch("/src/data/jugadores.json");
        const data = await response.json();
        this.players = data.jugadores.map((jugador, index) => ({
          id: index + 1,
          photo: jugador.foto || "/public/assets/menu/partidos.jpg",
          name: jugador.name,
          team: jugador.team,
          position: jugador.position,
          goals: jugador.goals,
          assists: jugador.assists,
          matches: jugador.matches,
          city: jugador.city,
          gender: jugador.gender,
          description: jugador.description || "Sin descripción disponible.",
          achievements: jugador.achievements || [],
        }));
      } catch (error) {
        console.error("Error al cargar los jugadores:", error);
      }
    },
  },
  created() {
    // Carga los jugadores cuando el componente es creado
    this.loadPlayers();
  },
};
</script>

<style scoped>
.main-container-players {
  max-width: 1800px;
  width: 100%;
  margin: auto;
}
.player-photo {
  width: 100%;
  max-height: 200px;
  min-width: 400px;
  max-width: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.player-photo-card {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.player-card {
  transition: transform 0.3s ease-in-out;
}
.player-card:hover {
  transform: translateY(-10px);
}

.info-box{
  min-width: 200px;
}
</style>
