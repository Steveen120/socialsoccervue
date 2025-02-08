<template>
    <div class="background overflow-auto">
        <!-- <h1>Jugadores</h1> -->
        <button v-if="!showTable" @click="goBack" class="p-3 font-bold text-primary-color dark:text-white bg-bg-cards dark:bg-bg-cards-dark rounded-lg cursor-pointer"> < Atrás</button>
        <Tabla v-if="showTable" :headers="headers" :data="jugadoresData" @row-click="handleRowClick"
            tableType="jugadores" />
        <Detalles v-if="selectedItem && !showTable" :nombre="selectedItem.name" :tipo="selectedItem.type" />
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import Detalles from '../components/Detalles.vue';
import jugadoresData from '@/data/jugadores.json';

export default {
    name: 'TablaDeJugadores',
    components: {
        Tabla,
        Detalles
    },
    data() {
        return {
            headers: ['Nombre', 'Equipo', 'Posición', 'Goles', 'Asistencias', 'Partidos'],
            jugadoresData: jugadoresData.jugadores.map(jugador => ({
                'Nombre': jugador.name,
                'Equipo': jugador.team,
                'Posición': jugador.position,
                'Goles': jugador.goals,
                'Asistencias': jugador.assists,
                'Partidos': jugador.matches,
                'url': jugador.url
            })),
            selectedItem: null,
            showTable: true
        };
    },
    methods: {
        handleRowClick(item) {
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

<style scoped>


</style>