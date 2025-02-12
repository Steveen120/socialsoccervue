<template>
  <div class="background overflow-auto">
    <!-- Botón para volver a la tabla de posiciones -->
    
    <!-- Componente de la tabla de posiciones -->
    <Tabla v-if="showTable" :headers="headers" :data="standings" @row-click="handleRowClick" tableType="equipos" />
    <!-- Componente de detalles del equipo seleccionado -->
    <Detalles v-if="selectedItem && !showTable" :nombre="selectedItem.name" :details="selectedItem" :tipo="selectedItem.type" />
  </div>
</template>

<script>
import Tabla from '../components/Tabla.vue'; // Importa el componente Tabla
import Detalles from '../components/Detalles.vue'; // Importa el componente Detalles
import standingsData from '@/data/tablaCompleta.json'; // Importa los datos de la tabla de posiciones desde un archivo JSON

export default {
  name: 'TablaDePosiciones',
  components: {
    Tabla,
    Detalles
  },
  data() {
    return {
      headers: ['#', 'Equipo', 'Nombre', 'PJ', 'G', 'E', 'P', 'DG', 'PTS'], // Encabezados de la tabla
      standings: standingsData.standings.map(team => ({
        '#': team.position,
        'Equipo': team.team.logo,
        'Nombre': team.team.name,
        'PJ': team.played,
        'G': team.won,
        'E': team.drawn,
        'P': team.lost,
        'DG': team.goalDifference,
        'PTS': team.points,
        // 'url': team.team.url
      })), // Datos de la tabla de posiciones
      selectedItem: null, // Elemento seleccionado para mostrar detalles
      showTable: true // Estado para controlar si se muestra la tabla de posiciones o los detalles
    };
  },
  methods: {
    // Maneja el clic en una fila de la tabla para mostrar los detalles del equipo
    handleRowClick(item) {
      // this.$router.push(row.url);
      this.selectedItem = item;
      this.showTable = false;
    },
    // Vuelve a la tabla de posiciones desde los detalles del equipo
    goBack() {
      this.selectedItem = null;
      this.showTable = true;
    }
  }
};
</script>
