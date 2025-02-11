<template>
  <!-- Contenedor principal que engloba toda la vista -->
  <div class="main-container-a 2xl:p-6 bg-transparent min-h-screen">
    <!-- Sección del encabezado -->
    <div class="header flex flex-col 2xl:flex-row gap-8 bg-bg-cards dark:bg-bg-dark rounded-lg shadow-lg p-6 mb-6">
      <!-- Muestra la información del árbitro seleccionado -->
      <div v-if="selectedReferee" class="profile-info flex-col md:flex-row items-center gap-6">
        <!-- Foto del árbitro -->
        <img
          :src="selectedReferee.photo"
          alt="Foto Árbitro"
          class="referee-photo rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        />
        <!-- Detalles básicos del árbitro -->
        <div class="referee-details text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ selectedReferee.name }}</h1>
          <p class="font-medium text-gray-600 dark:text-gray-300"><strong>Árbitro Profesional</strong></p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Con más de 5 años de experiencia, sin errores:
            <strong>amarillas {{ selectedReferee.yellow }}, rojas {{ selectedReferee.red }}</strong>, sin ausencias.
          </p>
        </div>
      </div>
      <!-- Muestra un mensaje si no hay árbitro seleccionado -->
      <div v-else class="profile-info flex items-center gap-6 md:flex-row">
        <img
          src="/src/assets/referee.jpg"
          alt="Foto Árbitro Predeterminada"
          class="referee-photo rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        />
        <div class="referee-details text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">seleccione un arbitro</h1>
          <p class="font-medium text-gray-600 dark:text-gray-300"><strong>Selecciona un árbitro para ver información</strong></p>
        </div>
      </div>

      <!-- Información adicional sobre el árbitro o mensaje predeterminado -->
      <div v-if="selectedReferee" class="contact-functions flex flex-col md:flex-row gap-6 w-full">
        <!-- Sección de contactos -->
        <div class="contact-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Contactos</h3>
          <p class="text-base text-gray-600 dark:text-gray-300"><i class="fas fa-envelope text-blue-500 mr-2"></i> juanperez10@gmail.com</p>
          <p class="text-base text-gray-600 dark:text-gray-300"><i class="fas fa-phone text-green-500 mr-2"></i> +593 987654321</p>
        </div>
        <!-- Sección de datos adicionales -->
        <div class="functions-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Datos Adicionales</h3>
          <p class="text-gray-600 dark:text-gray-300"><i class="fas fa-user mr-2"></i> Género: {{ selectedReferee.gender }}</p>
          <p class="text-gray-600 dark:text-gray-300"><i class="fas fa-calendar-alt mr-2"></i> Pitajes desde 2010</p>
        </div>
        <!-- Sección de funciones o roles del árbitro -->
        <div class="roles-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Funciones</h3>
          <p class="text-gray-600 dark:text-gray-300"><i class="fas fa-star mr-2"></i> {{ selectedReferee.roles.join(", ") }}</p>
        </div>
      </div>
      <!-- Mensaje predeterminado si no hay árbitro seleccionado -->
      <div v-else class="contact-functions flex flex-col md:flex-row gap-6 w-full">
        <div class="contact-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Contactos</h3>
          <p class="text-gray-600 dark:text-gray-300">Sin información de contacto.</p>
        </div>
        <div class="functions-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Datos Adicionales</h3>
          <p class="text-gray-600 dark:text-gray-300">Sin información adicional.</p>
        </div>
        <div class="roles-box bg-white dark:bg-gray-700 rounded-lg shadow-md p-5 flex-1">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Funciones</h3>
          <p class="text-gray-600 dark:text-gray-300">Sin funciones asignadas.</p>
        </div>
      </div>
    </div>

    <!-- Lista de árbitros con filtrado -->
    <div class="referees-list bg-transparent rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-white mb-4">Lista de Árbitros</h2>
      <!-- Barra de búsqueda para filtrar árbitros -->
      <div class="search-bar mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar árbitro..."
          class="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <!-- Tarjetas que representan a cada árbitro -->
      <div class="referee-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Selecciona al árbitro al hacer clic -->
        <div
          v-for="referee in filteredReferees"
          :key="referee.id"
          class="referee-card bg-bg-cards dark:bg-bg-cards-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-5"
          @click="selectReferee(referee)" 
          >
          <img :src="referee.photo" alt="Foto Árbitro" class="referee-photo w-full rounded-lg mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ referee.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">{{ referee.city }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-300">Roles: <strong>{{ referee.roles.join(", ") }}</strong></p>
          <div class="stat-box mt-4">
            <p class="text-sm text-gray-500 dark:text-gray-300"><strong>Amarillas:</strong> {{ referee.yellow }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-300"><strong>Rojas:</strong> {{ referee.red }}</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'DetallesArbitro',
  data() {
    return {
      searchQuery: "",
      selectedReferee: null,
      referees: [], // Inicialmente vacío, se llenará con los datos del JSON
    };
  },
  computed: {
    filteredReferees() {
      return this.referees.filter((referee) =>
        referee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    selectReferee(referee) {
      this.selectedReferee = referee;
    },
    async loadReferees() {
      try {
        const response = await fetch("/src/data/arbitros.json"); // Asegúrate de que la ruta sea correcta
        const data = await response.json();
        // Transformar los datos del JSON al formato esperado
        this.referees = data.arbitros.map((arbitro, index) => ({
          id: index + 1, // Generar un ID único
          photo: arbitro.foto || "/src/assets/referee.jpg",
          name: arbitro.nombre,
          city: arbitro.city,
          roles: [arbitro.funcion],
          yellow: parseInt(arbitro.tarjetas.amarillas),
          red: parseInt(arbitro.tarjetas.rojas),
          gender: arbitro.genero,
        }));
      } catch (error) {
        console.error("Error al cargar los árbitros:", error);
      }
    },
  },
  created() {
    this.loadReferees(); // Cargar los árbitros cuando el componente se cree
  },
};
</script>

<style scoped>
.main-container-a {
  max-width: 1800px; /* Ancho máximo estático */
  width: 100%; /* Ocupa el 100% del ancho disponible, pero no más del max-width */
  margin: auto;
}
.referee-photo {
  width: 100%;
  max-height: 200px;
  min-height: 200px;
  height: 200px;
  margin: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.referee-card {
  transition: transform 0.3s ease-in-out;
}
.referee-card:hover {
  transform: translateY(-10px);
}
.stat-box p {
  font-size: 0.9rem;
}
</style>