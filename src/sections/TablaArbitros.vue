<template>
    <div class="background overflow-auto">
        <!-- <h1>Jugadores</h1> -->
        <button v-if="!showTable" @click="goBack" class="p-3 font-bold text-primary-color dark:text-white bg-bg-cards dark:bg-bg-cards-dark rounded-lg cursor-pointer"> < Atrás</button>
        <Tabla v-if="showTable" :headers="headers" :data="arbitrosData" @row-click="handleRowClick" tableType="arbitros" />
        <Detalles v-if="selectedItem" :nombre="selectedItem.name" :tipo="selectedItem.type" />
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import Detalles from '../components/Detalles.vue';
import arbitrosData from '@/data/arbitros.json';

export default {
    name: 'TablaDeArbitros',
    components: {
        Tabla,
        Detalles
    },
    data() {
        return {
            headers: ['Nombre', 'Ciudad', 'Funcion', 'Pitajes', 'Genero', 'Tarjetas'],
            arbitrosData: arbitrosData.arbitros.map(arbitro => ({
                'Nombre': arbitro.nombre,
                'Ciudad': arbitro.ciudad,
                'Funcion': arbitro.funcion,
                'Pitajes': arbitro.pitajes,
                'Genero': arbitro.genero,
                'Tarjetas': {
                    'Amarillas': arbitro.tarjetas.amarillas,
                    'Rojas': arbitro.tarjetas.rojas
                },
                'url': arbitro.url
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