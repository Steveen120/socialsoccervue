<template>
    <div class="block md:hidden" :class="{ 'dark': isDarkMode }">
        <!-- Botón de menú hamburguesa -->
        <button @click="toggleMenu"
            class="p-2 rounded-md bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-color-dark">
            <!-- Icono del botón hamburguesa -->
            <svg xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700 dark:text-gray-300 transition-transform duration-300"
                :class="{ 'rotate-90': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Menú desplegable -->
        <div v-if="isMenuOpen"
            class="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-500"
            :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }">
            <ul class="nav-links flex flex-col gap-4 p-4">
                <!-- Enlace "Inicio" -->
                <li>
                    <router-link to="/" exact-active-class="active" @click="closeMenu">
                        <span>Inicio</span>
                    </router-link>
                </li>

                <!-- Categorías -->
                <li @mouseover="showCategoriasMenu = true" @mouseleave="showCategoriasMenu = false" class="relative">
                    <span class="cursor-pointer">Categorías</span>
                    <CategoriasMenu v-if="showCategoriasMenu"
                        class="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg z-50" />
                </li>

                <!-- Usuario -->
                <li @mouseover="showUsuarioMenu = true" @mouseleave="showUsuarioMenu = false" class="relative">
                    <span class="cursor-pointer">Usuario</span>
                    <UsuarioMenu v-if="showUsuarioMenu" :isLoggedIn="isLoggedIn" @logout="logout"
                        class="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg z-50" />
                </li>
            </ul>

            <!-- Botón de modo oscuro -->
            <div class="toggle-wrapper flex items-center gap-2 px-4">
                <div class="toggle">
                    <input id="dark-mode-toggle" type="checkbox" v-model="isDarkMode" class="hidden" />
                    <label for="dark-mode-toggle"
                        class="w-12 h-6 bg-gray-400 dark:bg-gray-600 rounded-full relative cursor-pointer">
                        <span
                            class="block w-6 h-6 bg-black dark:bg-white rounded-full shadow-md transform transition-transform duration-300 toggle-circle dark:translate-x-6"
                            :class="{ 'translate-x-6': isDarkMode }"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CategoriasMenu from './CategoriasMenu.vue';
import UsuarioMenu from './UsuarioMenu.vue';

// Controla si el menú hamburguesa está abierto
const isMenuOpen = ref(false);

// Estados para submenús
const showCategoriasMenu = ref(false);
const showUsuarioMenu = ref(false);

// Estado de sesión del usuario
const isLoggedIn = ref(false); // Cambia esto según tu lógica de sesión

// Controla el modo oscuro
const isDarkMode = ref(false);

// Alterna el estado del menú hamburguesa
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Cierra el menú hamburguesa
const closeMenu = () => {
    isMenuOpen.value = false;
};

// Lógica para cerrar sesión
const logout = () => {
    isLoggedIn.value = false;
    // Añade aquí la lógica de logout
};
</script>