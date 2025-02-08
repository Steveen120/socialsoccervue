<template>
    <div>
        <!-- Renderiza el componente dinámico basado en el tipo -->
        <component :is="getComponentName(tipo)" :nombre="nombre" :details="details" />
    </div>
</template>

<script>
import DetallesJugador from '../sections/shared/Jugadores.vue';
import DetallesEquipo from '../sections/shared/Equipos.vue';
import DetallesArbitro from '../sections/shared/Arbitros.vue';
import DetallesPartido from '../sections/shared/MatchResult.vue';

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
        // Devuelve el nombre del componente basado en el tipo
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