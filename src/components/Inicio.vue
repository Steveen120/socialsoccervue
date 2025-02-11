<template>
  <div class="Inicio">
    <!-- Navbar con icono de búsqueda -->
    <nav class="navbar">
      <div class="navbar-content">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Buscar..." @keyup.enter="performSearch" />
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Encabezado con información del próximo partido -->
    <div class="header-card">
      <h2 class="section-title">Próximo Partido</h2>
      <div class="match-info-card">
        <div class="team-card">
          <img :src="matchData.team1.logo" alt="Escudo del Equipo 1" class="team-logo" />
          <span class="team-name">{{ matchData.team1.name }}</span>
        </div>
        <span class="vs-text">Vs</span>
        <div class="team-card">
          <img :src="matchData.team2.logo" alt="Escudo del Equipo 2" class="team-logo" />
          <span class="team-name">{{ matchData.team2.name }}</span>
        </div>
        <div class="match-time-card">
          <span class="match-date">{{ matchData.date }}</span>
          <span class="match-hour">{{ matchData.time }}</span>
        </div>
      </div>
    </div>

    <!-- Contenedor para partidos en vivo -->
    <div class="live-matches-card">
      <h2 class="section-title">Partido en Vivo</h2>
      <div class="live-match-card">
        <div class="team-card">
          <img :src="liveMatch.team1.logo" alt="Escudo del Equipo 1" class="team-logo" />
          <span class="team-name">{{ liveMatch.team1.name }}</span>
        </div>
        <span class="vs-text">Vs</span>
        <div class="team-card">
          <img :src="liveMatch.team2.logo" alt="Escudo del Equipo 2" class="team-logo" />
          <span class="team-name">{{ liveMatch.team2.name }}</span>
        </div>
        <div class="match-time-card">
          <span class="match-date">{{ liveMatch.date }}</span>
          <span class="match-hour">{{ liveMatch.time }}</span>
        </div>
      </div>
    </div>

    <!-- Contenido adicional con opciones de visualización -->
    <div class="content">
      <h2 class="section-title">Información Adicional</h2>
      <div class="options-card">
        <ul>
          <li @click="toggleLastMatchBar">Ver Último Partido</li>
          <li @click="toggleNextMatchBar">Próximo Partido</li>
          <li @click="toggleAddMatchForm">Agregar Próximo Partido</li>
        </ul>
      </div>

      <!-- Barra horizontal para mostrar el último partido -->
      <div v-if="showLastMatchBar" class="info-cards-container">
        <div class="info-card last-match-card">
          <div class="team-card">
            <img :src="lastMatch.team1.logo" alt="Escudo del Equipo 1" class="team-logo" />
            <span class="team-name">{{ lastMatch.team1.name }}</span>
          </div>
          <div class="match-details-card">
            <span class="goals">{{ lastMatch.team1Score }} - {{ lastMatch.team2Score }}</span>
            <span class="full-time">{{ lastMatch.fullTime ? 'Tiempo Completo' : 'Tiempo Suplementario' }}</span>
            <span class="match-date">{{ lastMatch.date }}</span>
            <span class="match-hour">{{ lastMatch.time }}</span>
          </div>
          <div class="team-card">
            <img :src="lastMatch.team2.logo" alt="Escudo del Equipo 2" class="team-logo" />
            <span class="team-name">{{ lastMatch.team2.name }}</span>
          </div>
        </div>
      </div>

      <!-- Barra horizontal para mostrar el próximo partido -->
      <div v-if="showNextMatchBar" class="info-cards-container">
        <div class="info-card next-match-card">
          <div class="team-card">
            <img :src="matchData.team1.logo" alt="Escudo del Equipo 1" class="team-logo" />
            <span class="team-name">{{ matchData.team1.name }}</span>
          </div>
          <div class="match-details-card">
            <span class="match-date">{{ matchData.date }}</span>
            <span class="match-hour">{{ matchData.time }}</span>
          </div>
          <div class="team-card">
            <img :src="matchData.team2.logo" alt="Escudo del Equipo 2" class="team-logo" />
            <span class="team-name">{{ matchData.team2.name }}</span>
          </div>
        </div>
      </div>

      <!-- Lista de partidos futuros -->
      <div v-if="futureMatches.length" class="future-matches-container">
        <h2 class="section-title">Próximos Partidos Agregados</h2>
        <div class="info-cards-container">
          <div v-for="match in futureMatches" :key="match.id" class="info-card next-match-card">
            <div class="team-card">
              <img :src="match.team1.logo" alt="Escudo del Equipo 1" class="team-logo" />
              <span class="team-name">{{ match.team1.name }}</span>
            </div>
            <div class="match-details-card">
              <span class="match-date">{{ match.date }}</span>
              <span class="match-hour">{{ match.time }}</span>
            </div>
            <div class="team-card">
              <img :src="match.team2.logo" alt="Escudo del Equipo 2" class="team-logo" />
              <span class="team-name">{{ match.team2.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para agregar un próximo partido -->
      <div v-if="showAddMatchForm" class="modal-overlay" @click.self="toggleAddMatchForm">
        <div class="modal-content">
          <h2 class="section-title">Agregar Próximo Partido</h2>
          <form @submit.prevent="addMatch">
            <div class="form-group">
              <label for="team1-name">Nombre del Equipo 1:</label>
              <input v-model="newMatch.team1.name" type="text" id="team1-name" required />
              <label for="team1-logo">Logo del Equipo 1 (PNG):</label>
              <input @change="handleFileUpload($event, 'team1')" type="file" id="team1-logo" accept="image/png" required />
            </div>
            <div class="form-group">
              <label for="team2-name">Nombre del Equipo 2:</label>
              <input v-model="newMatch.team2.name" type="text" id="team2-name" required />
              <label for="team2-logo">Logo del Equipo 2 (PNG):</label>
              <input @change="handleFileUpload($event, 'team2')" type="file" id="team2-logo" accept="image/png" required />
            </div>
            <div class="form-group">
              <label for="match-date">Fecha:</label>
              <input v-model="newMatch.date" type="date" id="match-date" required />
              <label for="match-time">Hora:</label>
              <input v-model="newMatch.time" type="time" id="match-time" required />
            </div>
            <button type="submit">Agregar Partido</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

// Datos de ejemplo para los partidos
const matchData = ref({
  team1: { name: 'Liga De Quito', logo: 'src/assets/equipos/LDU.png' },
  team2: { name: 'Independiente del Valle', logo: 'src/assets/equipos/IDV.png' },
  date: '2024-07-12',
  time: '18:00'
});

const liveMatch = ref({
  team1: { name: 'Aucas', logo: 'src/assets/equipos/aucas.png' },
  team2: { name: 'El Nacional', logo: 'src/assets/equipos/nacional.png' },
  date: '2024-07-13',
  time: '15:00'
});

const lastMatch = ref({
  team1: { name: 'Emelec', logo: 'src/assets/equipos/Emelec.png' },
  team2: { name: 'Barcelona', logo: 'src/assets/equipos/Barcelona.png' },
  team1Score: 2,
  team2Score: 2,
  fullTime: true,
  date: '2024-07-11',
  time: '19:00'
});

const futureMatches = ref([]);
const showLastMatchBar = ref(false);
const showNextMatchBar = ref(false);
const showAddMatchForm = ref(false);

const newMatch = ref({
  team1: { name: '', logo: '' },
  team2: { name: '', logo: '' },
  date: '',
  time: ''
});

const searchQuery = ref('');

const toggleLastMatchBar = () => {
  showLastMatchBar.value = !showLastMatchBar.value;
};

const toggleNextMatchBar = () => {
  showNextMatchBar.value = !showNextMatchBar.value;
};

const toggleAddMatchForm = () => {
  showAddMatchForm.value = !showAddMatchForm.value;
};

const handleFileUpload = (event, team) => {
  const file = event.target.files[0];
  if (file && file.type === 'image/png') {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (team === 'team1') {
        newMatch.value.team1.logo = e.target.result;
      } else {
        newMatch.value.team2.logo = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('Por favor, sube un archivo PNG.');
  }
};

const addMatch = () => {
  futureMatches.value.push({
    ...newMatch.value,
    id: Date.now()
  });

  // Limpiar el formulario después de agregar el partido
  newMatch.value = {
    team1: { name: '', logo: '' },
    team2: { name: '', logo: '' },
    date: '',
    time: ''
  };

  showAddMatchForm.value = false;
};

const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
};
</script>
<style scoped>
.navbar {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.navbar-content {
  display: flex;
  justify-content: center; /* Centering the content */
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-container button {
  background-color: #ddd;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px; /* Adds space between input and button */
}

.search-container button:hover {
  background-color: #ccc;
}

.search-container button i {
  color: #555;
}

/* Estilos generales */
.Inicio {
  padding: 20px;
  background-color: #f0f2f5;
}

/* Estilos para las tarjetas horizontales */
.header-card,
.live-matches-card,
.info-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Estilos para las tarjetas de información en horizontal */
.info-cards-container {
  display: flex;
  overflow-x: auto; /* Permitir desplazamiento horizontal si es necesario */
  gap: 15px; /* Espaciado entre tarjetas */
}

.info-card {
  flex: 1;
  min-width: 300px; /* Ancho mínimo para las tarjetas */
}

/* Estilos para la información del partido en la tarjeta */
.match-info-card,
.live-match-card,
.last-match-card,
.next-match-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-card {
  display: flex;
  align-items: center;
}

.team-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.team-name {
  font-size: 1.2em;
}

.vs-text {
  font-size: 1.5em;
  font-weight: bold;
}

.match-time-card,
.match-details-card {
  text-align: center;
}

.match-date,
.match-hour,
.goals,
.full-time {
  display: block;
  font-size: 14px;
  color: #333;
}

/* Estilos para las opciones */
.options-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.options-card ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.options-card ul li {
  padding: 10px 20px;
  background-color: #00acac;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.options-card ul li:hover {
  background-color: #40a9ff;
}

/* Estilos para el título de sección */
.section-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="time"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.header-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Añadir margen superior para mover la tarjeta hacia abajo */
  margin-top: 30px; /* Ajusta este valor según tus necesidades */
}
</style>
