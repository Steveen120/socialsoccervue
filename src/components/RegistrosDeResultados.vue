<template>
  <ion-content>
    <nav class="navbar">
      <div class="navbar-content">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar..."
            @keyup.enter="performSearch"
          />
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Botón para añadir estadísticas -->
    <div class="contenedor-boton-formulario">
      <button @click="mostrarFormulario = true" class="boton-anadir">
        Añadir Estadísticas
      </button>

      <!-- Formulario para añadir estadísticas -->
      <div v-if="mostrarFormulario" class="formulario-anadir-overlay">
        <div class="formulario-anadir">
          <h3>Añadir Estadísticas</h3>
          <form @submit.prevent="guardarEstadisticas">
            <div class="form-group">
              <label for="Nombre">Nombre del Equipo:</label>
              <input v-model="nuevaEstadistica.Nombre" id="Nombre" type="text" required />
            </div>
            
            <div class="form-group">
              <label for="Escudo">Escudo del Equipo:</label>
              <input type="file" id="Escudo" @change="handleFileChange" accept="image/*" required />
              <!-- Mostrar imagen si se ha cargado un escudo -->
              <img v-if="escudoUrl" :src="escudoUrl" alt="Escudo del equipo" class="escudo" />
            </div>
            
            <div class="form-group">
              <label for="PTOS">PTOS:</label>
              <input v-model="nuevaEstadistica.Puntos" id="PTOS" type="number" required />
            </div>
            <div class="form-group">
              <label for="PJ">PJ:</label>
              <input v-model="nuevaEstadistica.PartidosJugados" id="PJ" type="number" required />
            </div>
            <div class="form-group">
              <label for="G">G:</label>
              <input v-model="nuevaEstadistica.Ganados" id="G" type="number" required />
            </div>
            <div class="form-group">
              <label for="E">E:</label>
              <input v-model="nuevaEstadistica.Empatados" id="E" type="number" required />
            </div>
            <div class="form-group">
              <label for="P">P:</label>
              <input v-model="nuevaEstadistica.Perdidos" id="P" type="number" required />
            </div>
            <div class="form-group">
              <label for="GF">GF:</label>
              <input v-model="nuevaEstadistica.GolesFavor" id="GF" type="number" required />
            </div>
            <div class="form-group">
              <label for="GC">GC:</label>
              <input v-model="nuevaEstadistica.GolesContra" id="GC" type="number" required />
            </div>
            <div class="form-group">
              <label for="GD">GD:</label>
              <input v-model="nuevaEstadistica.DiferenciaGoles" id="GD" type="number" required />
            </div>
            
            <button type="submit" class="btn-guardar">Guardar</button>
            <button type="button" @click="mostrarFormulario = false" class="btn-cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Escudo y Marcador -->
    <div class="escudo-marcador-contenedor">
      <div class="equipo">
        <img :src="equipos[0].escudo" alt="Escudo del equipo" class="escudo" />
        <h2>{{ equipos[0].nombre }}</h2>
      </div>
      <div class="marcador">
        <h2>{{ equipos[0].golesFavor }} - {{ equipos[1].golesFavor }}</h2>
      </div>
      <div class="equipo">
        <img :src="equipos[1].escudo" alt="Escudo del equipo" class="escudo" />
        <h2>{{ equipos[1].nombre }}</h2>
      </div>
    </div>

    <!-- Tabla de Posiciones -->
    <div class="tabla-posiciones">
      <h3>Tabla de Posiciones</h3>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>PTOS</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>GF</th>
            <th>GC</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(equipo, index) in equipos" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ equipo.nombre }}</td>
            <td>{{ equipo.puntos }}</td>
            <td>{{ equipo.partidosJugados }}</td>
            <td>{{ equipo.ganados }}</td>
            <td>{{ equipo.empate }}</td>
            <td>{{ equipo.perdidos }}</td>
            <td>{{ equipo.golesFavor }}</td>
            <td>{{ equipo.golesContra }}</td>
            <td>{{ equipo.diferenciaGoles }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </ion-content>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const equipos = ref([
  { id: 1, nombre: 'Macara', escudo: 'src/assets/equipos/macara.png', golesFavor: 3, golesContra: 1, puntos: 10, partidosJugados: 5, ganados: 3, empate: 1, perdidos: 1, diferenciaGoles: 2 },
  { id: 2, nombre: 'Deportivo Cuenca', escudo: 'src/assets/equipos/cuenca.png', golesFavor: 1, golesContra: 3, puntos: 5, partidosJugados: 5, ganados: 1, empate: 2, perdidos: 2, diferenciaGoles: -2 },
]);

const mostrarFormulario = ref(false);
const nuevaEstadistica = ref({
  Nombre: '',
  Escudo: '',
  Puntos: '',
  PartidosJugados: '',
  Ganados: '',
  Empatados: '',
  Perdidos: '',
  GolesFavor: '',
  GolesContra: '',
  DiferenciaGoles: '',
});

const escudoUrl = ref(null);

const guardarEstadisticas = () => {
  const nuevoEquipo = {
    ...nuevaEstadistica.value,
    escudo: escudoUrl.value || 'src/assets/equipos/default.png',
  };
  equipos.value.push(nuevoEquipo);
  mostrarFormulario.value = false;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      escudoUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
/* Estilo para el navbar */
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

/* Estilo para el botón de añadir estadísticas */
.contenedor-boton-formulario {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.boton-anadir {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.boton-anadir:hover {
  background-color: #0056b3;
}

/* Estilo para el formulario */
.formulario-anadir-overlay {
  position: fixed;
  top: 0;
  left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}

.formulario-anadir {
background-color: white;
padding: 20px;
border-radius: 10px;
max-height: 90%;
overflow-y: auto;
}

.formulario-anadir h3 {
margin-top: 0;
}

.form-group {
margin-bottom: 15px;
}

.form-group label {
display: block;
margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
width: 100%;
padding: 10px;
border: 1px solid #ddd;
border-radius: 5px;
outline: none;
}

.btn-guardar {
background-color: #007bff;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
}

.btn-cancelar {
background-color: #dc3545;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
margin-left: 10px;
}

.escudo {
width: 50px;
height: 50px;
margin-top: 10px;
}

/* Estilo para el contenedor de escudo y marcador */
.escudo-marcador-contenedor {
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 20px;
}

.equipo {
text-align: center;
}

.equipo img {
width: 100px;
height: 100px;
}

.marcador h2 {
font-size: 24px;
font-weight: bold;
}

/* Estilo para la tabla de posiciones */
.tabla-posiciones {
margin-top: 20px;
}

.tabla-posiciones h3 {
text-align: center;
}

.tabla-posiciones table {
width: 100%;
border-collapse: collapse;
}

.tabla-posiciones th,
.tabla-posiciones td {
border: 1px solid #ddd;
padding: 8px;
text-align: center;
}

.tabla-posiciones th {
background-color: #f2f2f2;
}
</style>