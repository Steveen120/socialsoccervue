<template>
    <router-link :to="`/partido-en-vivo/${match.id}`"
        class="match-card block dark:bg-bg-cards-dark rounded-xl text-black dark:text-white relative overflow-hidden h-64 w-full lg:w-1/3 2xl:w-[30%]"
        v-if="match && match.team1 && match.team2">
        <!-- Fondo -->
        <div class="absolute inset-0 z-0 h-64 flex justify-center md:items-start md:-m-4">
            <div class="flex flex-col justify-center md:grid grid-cols-2 w-auto items-center md:items-start">
                <img :src="match.team1.logo" :alt="match.team1.name"
                    class="object-contain h-40 md:h-auto md:max-w-full md:max-h-full m-auto opacity-50" />
                <img :src="match.team2.logo" :alt="match.team2.name"
                    class="object-contain h-40 md:h-auto md:max-w-full md:max-h-full m-auto opacity-50" />
            </div>
        </div>

        <!-- Información del partido (overlay) -->
        <div
            class="info-layer absolute inset-0 z-10 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300">
            <div class="flex justify-between items-center">
                <span class="league text-sm text-white">{{ match.league }}</span>
            </div>
            <div class="md:grid flex flex-col text-white grid-cols-[60%_30%] md:gap-4 px-2 md:py-4 w-full">
                <div class="md:border-r md:border-gray-300 w-full">
                    <div class="team-section">
                        <div class="team flex items-center gap-2">
                            <img :src="match.team1.logo" :alt="match.team1.name" class="team-logo w-8 h-8" />
                            <span class="team-name text-sm">{{ match.team1.name }}</span>
                        </div>
                    </div>
                    <div class="team-section">
                        <div class="team flex items-center gap-2">
                            <img :src="match.team2.logo" :alt="match.team2.name" class="team-logo w-8 h-8" />
                            <span class="team-name text-sm">{{ match.team2.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full">
                    <span class="text-sm md:text-base">{{ match.date }}</span>
                </div>
            </div>
        </div>

        <!-- Contenido visible por defecto -->
        <div class="default-content relative z-20">
            <div class="flex justify-between items-center">
                <span class="league text-sm text-gray-500">{{ match.league }}</span>
                <div>
                    <span class="league text-sm font-bold text-primary-color">{{ match.time }}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
defineProps({
    match: {
        type: Object,
        required: true,
    },
    isInicio: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.info-layer {
    opacity: 0;
}

.match-card:hover .info-layer {
    opacity: 1;
    /* Mostrar el overlay al hacer hover */
}

.default-content {
    transition: opacity 0.3s ease-in-out;
}

.match-card:hover .default-content {
    opacity: 0;
    /* Ocultar el contenido predeterminado al hacer hover */
}

/* Estilo para el router-link */
.match-card {
    text-decoration: none;
    /* Eliminar subrayado */
    color: inherit;
    /* Mantener el color del texto */
}
</style>