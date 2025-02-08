<template>
    <!-- Lista de navegación del menú de categorías -->
    <ul class="dropdown-menu bg-white dark:bg-bg-dark">
        <!-- Opción "Primera División" -->
        <li class="hover:bg-bg-cards dark:hover:bg-bg-cards-dark" 
            @mouseover="showDivisionMenu = 'primera'" 
            @mouseleave="showDivisionMenu = null">
            <router-link to="/primera-division" class="dark:text-white">Primera División</router-link>
        </li>
        <!-- Opción "Segunda División" -->
        <li class="hover:bg-bg-cards dark:hover:bg-bg-cards-dark" 
            @mouseover="showDivisionMenu = 'segunda'" 
            @mouseleave="showDivisionMenu = null">
            <router-link to="/segunda-division" class="dark:text-white">Segunda División</router-link>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../Navbar.vue';

// Estado para controlar la visibilidad del submenú de divisiones
const showDivisionMenu = ref(null);
</script>
