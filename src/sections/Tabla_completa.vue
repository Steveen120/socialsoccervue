<template>
  <div class="background overflow-auto">
    <!-- <h1>Tabla de Posiciones</h1> -->
    <button v-if="!showTable" @click="goBack" class="p-3 font-bold text-primary-color dark:text-white bg-bg-cards dark:bg-bg-cards-dark rounded-lg cursor-pointer"> < Atrás</button>
    <Tabla v-if="showTable" :headers="headers" :data="standings" @row-click="handleRowClick" tableType="equipos" />
    <Detalles v-if="selectedItem && !showTable" :nombre="selectedItem.name" :tipo="selectedItem.type" />
  </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import Detalles from '../components/Detalles.vue';
import standingsData from '@/data/tablaCompleta.json';

export default {
  name: 'TablaDePosiciones',
  components: {
    Tabla,
    Detalles
  },
  data() {
    return {
      headers: ['#', 'Equipo', 'Nombre', 'PJ', 'G', 'E', 'P', 'DG', 'PTS'],
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
        'url': team.team.url
      })),
      selectedItem: null,
      showTable: true
    };
  },
  methods: {
    handleRowClick(item) {
      // this.$router.push(row.url);
      this.selectedItem = item;
      this.showTable = false;
    },
    goBack() {
      this.selectedItem = null;
      this.showTable = true;
    }
  }
};
</script>
