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
  <div class="estadisticas-equipo">
    <h1>Estadísticas de Equipos</h1>
    <!-- Gráfico de rendimiento general de todos los equipos -->
    <div class="grafico-general">
      <h3>Gráfico de Rendimiento General</h3>
      <canvas id="grafico-general" width="400" height="200"></canvas>
    </div>
    <div class="stats-container">
      <!-- Integración del cuadro de estadísticas del equipo -->
      <div v-for="equipo in equipos" :key="equipo.id" class="equipo-card">
        <div class="info-container">
          <div class="escudo-container">
            <img :src="equipo.escudo" alt="Escudo del equipo" class="escudo">
          </div>
          <div class="marcador">
            <h2>{{ equipo.nombre }}</h2>
            <h3>{{ equipo.golesFavor }} - {{ equipo.golesContra }}</h3>
          </div>
          <div class="rendimiento">
            <h3>Rendimiento</h3>
            <p><strong>Partidos Jugados:</strong> {{ equipo.partidosJugados }}</p>
            <p><strong>Victorias:</strong> {{ equipo.victorias }}</p>
            <p><strong>Derrotas:</strong> {{ equipo.derrotas }}</p>
            <p><strong>Empates:</strong> {{ equipo.empates }}</p>
          </div>
          <div class="formacion">
            <h3>Formación</h3>
            <p><strong>Formación del equipo:</strong> {{ equipo.formacion }}</p>
          </div>
          <div class="estadisticas">
            <h3>Estadísticas</h3>
            <p><strong>Goles a Favor:</strong> {{ equipo.golesFavor }}</p>
            <p><strong>Goles en Contra:</strong> {{ equipo.golesContra }}</p>
          </div>
          <!-- Botones de eliminar y editar -->
          <div class="button-container">
            <button @click="editarEquipo(equipo)" class="edit-button">Editar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón para mostrar el formulario -->
    <button @click="toggleForm" class="toggle-form-button">
      {{ mostrarFormulario ? 'Cerrar Formulario' : 'Añadir Estadística del Encuentro' }}
    </button>
    <!-- Formulario para añadir o editar estadística -->
    <div v-if="mostrarFormulario" class="form-overlay">
      <div class="form-container">
        <button @click="toggleForm" class="cancel-button">Cancelar</button>
        <form @submit.prevent="guardarEstadistica">
          <div>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="nuevoEquipo.nombre" required>
          </div>
          <div>
            <label for="escudo">Escudo (PNG)</label>
            <input type="file" id="escudo" @change="cargarEscudo" accept="image/png" required>
          </div>
          <div>
            <label for="partidosJugados">Partidos</label>
            <input type="number" id="partidosJugados" v-model="nuevoEquipo.partidosJugados" required>
          </div>
          <div>
            <label for="victorias">Victorias</label>
            <input type="number" id="victorias" v-model="nuevoEquipo.victorias" required>
          </div>
          <div>
            <label for="derrotas">Derrotas</label>
            <input type="number" id="derrotas" v-model="nuevoEquipo.derrotas" required>
          </div>
          <div>
            <label for="empates">Empates</label>
            <input type="number" id="empates" v-model="nuevoEquipo.empates" required>
          </div>
          <div>
            <label for="golesFavor">Goles Favor</label>
            <input type="number" id="golesFavor" v-model="nuevoEquipo.golesFavor" required>
          </div>
          <div>
            <label for="golesContra">Goles Contra</label>
            <input type="number" id="golesContra" v-model="nuevoEquipo.golesContra" required>
          </div>
          <div>
            <label for="formacion">Formación</label>
            <input type="text" id="formacion" v-model="nuevoEquipo.formacion" required>
          </div>
          <button type="submit" class="submit-button">{{ editando ? 'Actualizar' : 'Añadir' }}</button>
        </form>
      </div>
    </div>
    <!-- Alertas -->
    <div v-if="alerta.visible" :class="`alert ${alerta.tipo}`">
      {{ alerta.mensaje }}
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const equipos = ref([
  {
    id: 1,
    nombre: 'Auncas',
    escudo: 'src/assets/equipos/aucas.png',
    partidosJugados: 10,
    victorias: 6,
    derrotas: 2,
    empates: 2,
    golesFavor: 20,
    golesContra: 10,
    formacion: '4-4-2'
  },
  {
    id: 2,
    nombre: 'IDV ',
    escudo: 'src/assets/equipos/IDV.png',
    partidosJugados: 10,
    victorias: 5,
    derrotas: 3,
    empates: 2,
    golesFavor: 18,
    golesContra: 12,
    formacion: '4-3-3'
  }
]);

const mostrarFormulario = ref(false);
const nuevoEquipo = ref({
  id: null,
  nombre: '',
  escudo: '',
  partidosJugados: 0,
  victorias: 0,
  derrotas: 0,
  empates: 0,
  golesFavor: 0,
  golesContra: 0,
  formacion: ''
});

const searchQuery = ref('');

const alerta = ref({
  visible: false,
  mensaje: '',
  tipo: '' // 'success' or 'error'
});

const editando = ref(false);

const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
};

const toggleForm = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
  if (!mostrarFormulario.value) {
    // Reset form when closing
    resetFormulario();
  }
};

const eliminarEquipo = (id) => {
  equipos.value = equipos.value.filter(equipo => equipo.id !== id);
  mostrarAlerta('Equipo eliminado exitosamente', 'success');
};

const editarEquipo = (equipo) => {
  nuevoEquipo.value = { ...equipo };
  editando.value = true;
  mostrarFormulario.value = true;
};

const guardarEstadistica = () => {
  if (editando.value) {
    const index = equipos.value.findIndex(equipo => equipo.id === nuevoEquipo.value.id);
    if (index !== -1) {
      equipos.value[index] = { ...nuevoEquipo.value };
    }
    mostrarAlerta('Equipo actualizado exitosamente', 'success');
  } else {
    equipos.value.push({ ...nuevoEquipo.value, id: Date.now() });
    mostrarAlerta('Equipo añadido exitosamente', 'success');
  }
  resetFormulario();
  mostrarFormulario.value = false;
};

const resetFormulario = () => {
  nuevoEquipo.value = {
    id: null,
    nombre: '',
    escudo: '',
    partidosJugados: 0,
    victorias: 0,
    derrotas: 0,
    empates: 0,
    golesFavor: 0,
    golesContra: 0,
    formacion: ''
  };
  editando.value = false;
};

const mostrarAlerta = (mensaje, tipo) => {
  alerta.value = { visible: true, mensaje, tipo };
  setTimeout(() => {
    alerta.value.visible = false;
  }, 3000); // Mostrar la alerta por 3 segundos
};

onMounted(() => {
  // Gráfico de rendimiento general
  const ctxGeneral = document.getElementById('grafico-general').getContext('2d');
  const generalChart = new Chart(ctxGeneral, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Etiquetas estáticas
      datasets: [{
        label: 'Rendimiento General',
        data: [30, 45, 20, 50, 35], // Datos simulados
        borderColor: randomColor(),
        backgroundColor: 'transparent',
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  watch(equipos, (newEquipos) => {
    // Actualizar el gráfico con datos de los equipos
    generalChart.data.labels = newEquipos.map(equipo => equipo.nombre); // Etiquetas de equipos
    generalChart.data.datasets[0].data = newEquipos.map(equipo => equipo.golesFavor); // Datos de golesFavor
    generalChart.update();
  }, { immediate: true });
});

const cargarEscudo = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    nuevoEquipo.value.escudo = e.target.result;
  };
  reader.readAsDataURL(file);
};

function randomColor() {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
}
</script>
<style scoped>
/* Estilos actuales */
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

.estadisticas-equipo {
  padding: 20px;
}

h1 {
  color: #001529;
  text-align: center;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.equipo-card {
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.escudo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.escudo {
  max-width: 100px;
  max-height: 100px;
}

.marcador, .rendimiento, .formacion, .estadisticas {
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.delete-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
}

.delete-button:hover {
  background-color: #c0392b;
}

.edit-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
}

.edit-button:hover {
  background-color: #2980b9;
}

.toggle-form-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #001529;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px; /* Ajustado para hacerlo más pequeño */
  position: relative;
}

.cancel-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

form div {
  margin-bottom: 10px; /* Reducido el margen para hacerlo más compacto */
}

label {
  display: block;
  margin-bottom: 3px;
}

input[type="text"], input[type="number"], input[type="file"] {
  width: 100%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}

/* Estilos para las alertas */
.alert {
  padding: 15px;
  border-radius: 4px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 300px;
  width: 100%;
  color: #fff;
  font-size: 16px;
}

.alert.success {
  background-color: #28a745;
}

.alert.error {
  background-color: #dc3545;
}
</style>
