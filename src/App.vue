<template>
  <div :class="{ 'dark': isDarkMode }, 'overflow-auto' " >
    <nav class="navbar bg-white dark:bg-bg-dark dark:text-white">
      <div class="logo-container">
        <div class="w-12 h-12">
          <img src="./assets/images/logo.png" alt="Logo" class=" object-contain" />
        </div>
        <span class="app-name">SOCIAL SOCCER</span>
      </div>
      <div class="hidden md:block">
        <div class="flex gap-8">
          <ul class="nav-links">
            <li>
              <router-link to="/" exact-active-class="active">
                <span class="dark:text-white">Inicio</span>
              </router-link>
            </li>
            <li
              @mouseover="showCategoriasMenu = true"
              @mouseleave="showCategoriasMenu = false"
              class="relative"
            >
              <span class="cursor-pointer">Categorías</span>
              <CategoriasMenu
                v-if="showCategoriasMenu"
                class="absolute top-full left-0 mt-2"
              />
            </li>
            <li
              @mouseover="showUsuarioMenu = true"
              @mouseleave="showUsuarioMenu = false"
              class="relative"
            >
              <span class="cursor-pointer">Usuario</span>
              <UsuarioMenu
                v-if="showUsuarioMenu"
                :isLoggedIn="isLoggedIn"
                @logout="logout"
                class="absolute top-full left-0 mt-2"
              />
            </li>
          </ul>
          <!-- Botón de modo oscuro -->
          <div class="toggle-wrapper flex items-center gap-2">
            <div class="toggle">
              <input
                id="dark-mode-toggle"
                type="checkbox"
                v-model="isDarkMode"
                class="hidden"
              />
              <label
                for="dark-mode-toggle"
                class="w-12 h-6 bg-gray-400 dark:bg-gray-600 rounded-full relative cursor-pointer"
              >
                <span
                  class="block w-6 h-6 bg-black dark:bg-white rounded-full shadow-md transform transition-transform duration-300"
                  :class="{ 'translate-x-6': isDarkMode }"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="block md:hidden">
        <!-- <div class="flex gap-8">
          <ul class="nav-links">
            <li>
              <router-link to="/" exact-active-class="active">
                <span>Inicio</span>
              </router-link>
            </li>
            <li
              @mouseover="showCategoriasMenu = true"
              @mouseleave="showCategoriasMenu = false"
              class="relative"
            >
              <span class="cursor-pointer">Categorías</span>
              <CategoriasMenu
                v-if="showCategoriasMenu"
                class="absolute top-full left-0 mt-2"
              />
            </li>
            <li
              @mouseover="showUsuarioMenu = true"
              @mouseleave="showUsuarioMenu = false"
              class="relative"
            >
              <span class="cursor-pointer">Usuario</span>
              <UsuarioMenu
                v-if="showUsuarioMenu"
                :isLoggedIn="isLoggedIn"
                @logout="logout"
                class="absolute top-full left-0 mt-2"
              />
            </li>
          </ul>
          <div class="toggle-wrapper flex items-center gap-2">
            <div class="toggle">
              
              <input
                id="dark-mode-toggle"
                type="checkbox"
                v-model="isDarkMode"
                class="hidden"
              />
              <label
                for="dark-mode-toggle"
                class="w-12 h-6 bg-gray-400 dark:bg-gray-600 rounded-full relative cursor-pointer"
              >
                <span
                  class="block w-6 h-6 bg-black dark:bg-white rounded-full shadow-md transform transition-transform duration-300"
                  :class="{ 'translate-x-6': isDarkMode }"
                ></span>
              </label>
            </div>
          </div>
        </div> -->
      <NavbarResponsive />
      </div>
    </nav>

    <main class="content bg-gray-100 dark:bg-bg-dark dark:text-white p-4 md:p-12">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "tailwindcss/tailwind.css";
import CategoriasMenu from "./components/CategoriasMenu.vue";
import UsuarioMenu from "./components/UsuarioMenu.vue";
import NavbarResponsive from "./components/NavbarResponsive.vue";

const showCategoriasMenu = ref(false);
const showUsuarioMenu = ref(false);
const isLoggedIn = ref(false); // Cambia esto según el estado de la sesión
const isDarkMode = ref(false);

const logout = () => {
  isLoggedIn.value = false;
  // Lógica para cerrar sesión
};
</script>
