<template>
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
  <div class="gestion-jugadores">
    
    <h1>Gestión de Jugadores</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nombre">Nombre del Jugador:</label>
        <input type="text" id="nombre" v-model="jugador.nombre" required>
      </div>
      <div class="form-group">
        <label for="posicion">Posición:</label>
        <input type="text" id="posicion" v-model="jugador.posicion" required>
      </div>
      <div class="form-group">
        <label for="equipo">Equipo:</label>
        <input type="text" id="equipo" v-model="jugador.equipo" required>
      </div>
      <button type="submit">Guardar</button>
    </form>
    <div class="jugadores-lista">
      <h2>Lista de Jugadores</h2>
      <ul>
        <li v-for="jugador in jugadores" :key="jugador.id">{{ jugador.nombre }} - {{ jugador.posicion }} ({{ jugador.equipo }})</li>
      </ul>
    </div>
    <div class="player-statistics">
      <h2 class="section-title">Estadísticas del Jugador</h2>
      <div class="stats-grid">
        <div class="stat" v-for="stat in playerStats" :key="stat.name">
          <span class="stat-name">{{ stat.name }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const jugador = ref({
  nombre: '',
  posicion: '',
  equipo: ''
});

const jugadores = ref([
  { id: 1, nombre: 'Jugador 1', posicion: 'Delantero', equipo: 'Equipo A' },
  { id: 2, nombre: 'Jugador 2', posicion: 'Defensa', equipo: 'Equipo B' }
]);

const submitForm = () => {
  jugadores.value.push({ ...jugador.value, id: jugadores.value.length + 1 });
  jugador.value = { nombre: '', posicion: '', equipo: '' };
};

const playerStats = ref([
  { name: 'Ataque', value: '85' },
  { name: 'Velocidad', value: '90' },
  { name: 'Potencia de Tiro', value: '88' },
  { name: 'Resistencia', value: '80' },
  { name: 'Control de Balón', value: '92' },
  { name: 'Agresión', value: '70' },
  { name: 'Pase Corto', value: '85' },
  { name: 'Pase Largo', value: '78' },
  { name: 'Dribbling', value: '89' },
  { name: 'Agilidad', value: '93' },
  { name: 'Equilibrio', value: '85' }
]);
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
  justify-content: flex-end;
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
}

.search-container button:hover {
  background-color: #ccc;
}

.search-container button i {
  color: #555;
}
.gestion-jugadores {
  padding: 20px;
}

h1, h2 {
  color: #001529;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #595959;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

button {
  background-color: #001529;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1890ff;
}

.jugadores-lista {
  margin-top: 20px;
}

.jugadores-lista ul {
  list-style-type: none;
  padding: 0;
}

.jugadores-lista li {
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  color: #595959;
}

.player-statistics {
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  color: #001529;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.stat {
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-name {
  font-weight: bold;
}

.stat-value {
  margin-top: 5px;
  font-size: 20px;
  color: #1890ff;
}
</style>
