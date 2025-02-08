<template>
    <div class="news-card rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
        <!-- Imagen -->
        <img :src="news.image" :alt="news.title" class="w-full h-48 object-cover" />

        <!-- Contenido -->
        <div class="p-4">
            <h3 class="text-lg font-bold text-black dark:text-white">{{ news.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ news.description }}</p>
            <div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Publicado el: {{ formatDate(news.date) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define las propiedades que recibe el componente
defineProps({
    news: {
        type: Object,
        required: true,
    },
});

// Función para formatear la fecha
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
/* Estilos para la tarjeta de noticias */
.news-card {
    transition: transform 0.3s ease-in-out;
}

/* Efecto de escala al pasar el mouse sobre la tarjeta */
.news-card:hover {
    transform: scale(1.05);
}
</style>