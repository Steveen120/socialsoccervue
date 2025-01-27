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
        <div class="formulario-deslizante">
          <div class="formulario-anadir">
            <h3>Añadir Estadísticas</h3>
            <form @submit.prevent="guardarEstadisticas">
              <div v-for="(valor, llave) in nuevaEstadistica" :key="llave" class="form-group">
                <label :for="llave">{{ formLabels[llave] }}:</label>
                <input
                  v-model="nuevaEstadistica[llave]"
                  :id="llave"
                  :type="inputTypes[llave]"
                  required
                />
              </div>
              <div class="form-buttons">
                <button type="submit" class="btn-guardar">Guardar</button>
                <button type="button" @click="mostrarFormulario = false" class="btn-cancelar">Cancelar</button>
              </div>
            </form>
          </div>
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

    <!-- Rendimiento -->
    <div class="rendimiento-grafico">
      <h3>Rendimiento</h3>
      <canvas id="rendimientoChart"></canvas>
    </div>

    <!-- Comparación de Equipos -->
    <div class="comparacion-equipos">
      <h3>Comparación de Equipos</h3>
      <div class="comparacion">
        <div class="equipo-comparacion" v-for="(equipo, index) in equipos" :key="index">
          <img :src="equipo.escudo" alt="Escudo del equipo" class="escudo-comparacion" />
          <h4>{{ equipo.nombre }}</h4>
          <p><strong>Tarjetas Amarillas:</strong> {{ equipo.tar_amarrillas }}</p>
          <p><strong>Tarjetas Rojas:</strong> {{ equipo.tar_roja }}</p>
          <p><strong>Goles:</strong> {{ equipo.goles }}</p>
          <p><strong>Porcentaje de Posesión:</strong> {{ equipo.posecion }}%</p>
          <p><strong>Tiros Totales:</strong> {{ equipo.tiros_totales }}</p>
          <p><strong>Tiros a Puerta:</strong> {{ equipo.tiros_apuerta }}</p>
          <p><strong>Tiros Desviados:</strong> {{ equipo.tiros_desviados }}</p>
          <p><strong>Tiros de Esquina:</strong> {{ equipo.tiros_esquina }}</p>
          <p><strong>Salvadas del Portero:</strong> {{ equipo.salvadas_portero }}</p>
          <p><strong>Total de Pases:</strong> {{ equipo.pases }}</p>
          <p><strong>Fueras de Juego:</strong> {{ equipo.fuera_juego }}</p>
          <p><strong>Goles Esperados:</strong> {{ equipo.goles_esperados }}</p>
          <p><strong>Faltas Cometidas:</strong> {{ equipo.faltas_cometidas }}</p>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const equipos = ref([
  { id: 1, nombre: 'Macara', escudo: 'src/assets/equipos/macara.png', tar_amarrillas: '3', tar_roja: '0', goles: 3, posecion: 55, tiros_totales: 10, tiros_apuerta: 7, tiros_desviados: 3, tiros_esquina: 4, salvadas_portero: 5, pases: 120, fuera_juego: 2, goles_esperados: 1.5, faltas_cometidas: 15 },
  { id: 2, nombre: 'Deportivo Cuenca', escudo: 'src/assets/equipos/cuenca.png', tar_amarrillas: '1', tar_roja: '1', goles: 1, posecion: 45, tiros_totales: 9, tiros_apuerta: 5, tiros_desviados: 4, tiros_esquina: 6, salvadas_portero: 4, pases: 110, fuera_juego: 1, goles_esperados: 1.0, faltas_cometidas: 10 },
]);

const mostrarFormulario = ref(false);
const nuevaEstadistica = ref({
  tar_amarrillas: '',
  tar_roja: '',
  goles: '',
  posecion: '',
  tiros_totales: '',
  tiros_apuerta: '',
  tiros_desviados: '',
  pases: '',
  tiros_esquina: '',
  fuera_juego: '',
  goles_esperados: '',
  salvadas_portero: '',
  faltas_cometidas: '',
  id_partidos: '',
});

const formLabels = {
  tar_amarrillas: 'Tarjetas Amarillas',
  tar_roja: 'Tarjetas Rojas',
  goles: 'Goles',
  posecion: 'Posesión',
  tiros_totales: 'Tiros Totales',
  tiros_apuerta: 'Tiros a Puerta',
  tiros_desviados: 'Tiros Desviados',
  pases: 'Pases',
  tiros_esquina: 'Tiros de Esquina',
  fuera_juego: 'Fueras de Juego',
  goles_esperados: 'Goles Esperados',
  salvadas_portero: 'Salvadas del Portero',
  faltas_cometidas: 'Faltas Cometidas',
  id_partidos: 'ID Partidos'
};

const inputTypes = {
  tar_amarrillas: 'text',
  tar_roja: 'text',
  goles: 'number',
  posecion: 'number',
  tiros_totales: 'number',
  tiros_apuerta: 'number',
  tiros_desviados: 'number',
  pases: 'number',
  tiros_esquina: 'number',
  fuera_juego: 'number',
  goles_esperados: 'number',
  salvadas_portero: 'number',
  faltas_cometidas: 'number',
  id_partidos: 'number'
};

const escudoUrl = ref(null);

const guardarEstadisticas = () => {
  const nuevaEstadisticaDatos = {
    id: equipos.value.length + 1,
    ...nuevaEstadistica.value,
  };

  equipos.value.push(nuevaEstadisticaDatos);
  mostrarFormulario.value = false;
  Object.keys(nuevaEstadistica.value).forEach(key => {
    nuevaEstadistica.value[key] = '';
  });
  escudoUrl.value = null; // Limpiar la imagen cargada
  actualizarGrafico(); // Actualiza el gráfico con los nuevos datos
};

const actualizarGrafico = () => {
  const ctx = document.getElementById('rendimientoChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Partido 1', 'Partido 2', 'Partido 3', 'Partido 4', 'Partido 5'],
      datasets: equipos.value.map(equipo => ({
        label: equipo.nombre,
        data: [55, 50, 60, 45, 65], // Datos ficticios, reemplaza con datos actualizados
        borderColor: equipo.id === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
        backgroundColor: equipo.id === 1 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(153, 102, 255, 0.2)',
      })),
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
};

onMounted(() => {
  actualizarGrafico(); // Inicializa el gráfico al montar el componente
});

const searchQuery = ref('');

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


.boton-anadir {
  display: block;
  width: 200px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.boton-anadir:hover {
  background-color: #0056b3;
}

.formulario-anadir-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.formulario-deslizante {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  overflow-y: auto;
  max-height: 80%;
}

.formulario-anadir {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.escudo {
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.form-buttons button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-guardar {
  background-color: #28a745;
  color: white;
}

.btn-guardar:hover {
  background-color: #218838;
}

.btn-cancelar {
  background-color: #dc3545;
  color: white;
}

.btn-cancelar:hover {
  background-color: #c82333;
}

.escudo-marcador-contenedor {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}

.equipo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.equipo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.marcador {
  font-size: 2rem;
}

.rendimiento-grafico, .comparacion-equipos {
  margin: 20px;
}

.comparacion {
  display: flex;
  justify-content: space-around;
}

.equipo-comparacion {
  text-align: center;
}

.equipo-comparacion img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
