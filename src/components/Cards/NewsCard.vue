<template>
    <div class="news-card relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
      <!-- Imagen con efecto de zoom -->
      <div class="image-container">
        <img :src="news.image" :alt="news.title" class="news-image w-full h-48 object-cover transition-transform duration-300">
      </div>
  
      <!-- Contenido -->
      <div class="p-5 flex flex-col gap-2">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {{ news.title }}
        </h3>
        
        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ news.description }}
        </p>
        
        <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
          📅 Publicado el: <span class="font-semibold">{{ formatDate(news.date) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  // Define las propiedades del componente
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
  /* Contenedor con efecto hover */
  .news-card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .news-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  /* Imagen con efecto de zoom */
  .image-container {
    overflow: hidden;
  }
  
  .news-image:hover {
    transform: scale(1.1);
  }
  </style>
  
