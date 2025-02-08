<template>
    <div>
<<<<<<< HEAD
        <!-- Renderiza el componente dinámico basado en el tipo -->
=======
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
        <component :is="getComponentName(tipo)" :nombre="nombre" :details="details" />
    </div>
</template>

<script>
<<<<<<< HEAD
import DetallesJugador from '../sections/shared/Jugadores.vue';
import DetallesEquipo from '../sections/shared/Equipos.vue';
import DetallesArbitro from '../sections/shared/Arbitros.vue';
import DetallesPartido from '../sections/shared/MatchResult.vue';
=======
import DetallesJugador from '../sections/Jugadores.vue';
import DetallesEquipo from '../sections/Equipos.vue';
import DetallesArbitro from '../sections/Arbitros.vue';
import DetallesPartido from '../sections/MatchResult.vue';
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1

export default {
    name: 'Detalles',
    components: {
        DetallesJugador,
        DetallesEquipo,
        DetallesArbitro,
        DetallesPartido
    },
    props: {
        nombre: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        details: {
            type: Object,
            required: true
        }
    },
    methods: {
<<<<<<< HEAD
        // Devuelve el nombre del componente basado en el tipo
=======
>>>>>>> 9af5ccbb15b8e49c9f61dadba18a788d2ed936d1
        getComponentName(tipo) {
            switch (tipo) {
                case 'jugadores':
                    return 'DetallesJugador';
                case 'equipos':
                    return 'DetallesEquipo';
                case 'arbitros':
                    return 'DetallesArbitro';
                case 'resultados':
                    return 'DetallesPartido';
                default:
                    return null;
            }
        }
    }
};
</script>