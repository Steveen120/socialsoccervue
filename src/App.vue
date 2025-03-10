<template>
  <div :class="{ 'dark': isDarkMode }" class="h-screen">
    <!-- Barra superior (Oculta en login y registro) -->
    <div v-if="shouldShowNavbar" class="flex justify-between p-4 bg-primary-color items-center gap-4 border border-b-2 border-primary-color">
      <div class="logo-container flex gap-4">
        <div class="w-9 h-10">
          <router-link to="/inicio" exact-active-class="active" class="flex items-center gap-2">
            <img src="./assets/images/logo.svg" alt="Logo" class="object-cover" />
          </router-link>
        </div>
        <span class="text-white">SOCIAL SOCCER</span>
      </div>
 
      <div class="flex items-center gap-4">
        <button @click="toggleSidebar"
          class="md:hidden p-2 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-color-dark transition-transform duration-300 flex">
          <font-awesome-icon :icon="isSidebarVisible ? 'times' : 'bars'" class="h-6 text-white" />
        </button>

        <div class="relative flex justify-center px-4">
          <div @click="toggleUserMenu" class="relative flex items-center gap-2 cursor-pointer">
            <span class="text-white font-bold text-lg mr-2">Bienvenido, Steveen</span>
            <font-awesome-icon icon="user" class="h-8 text-white" />
          </div>
          <transition name="slide-fade">
            <UsuarioMenu v-if="showUsuarioMenu" :isLoggedIn="isLoggedIn" @logout="handleLogout"
              class="absolute top-16 right-0 -left-8 bg-white dark:bg-gray-800 shadow-lg z-50 p-4" />
          </transition>
        </div>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div  :class="{ 'dark': isDarkMode }" class="flex h-[93%] 2xl:h-full overflow-hidden">
      <!-- Sidebar -->
      <div  v-if="shouldShowNavbar && (isSidebarVisible || (!isMobile && shouldShowSidebar))" 
        :class="[ 
          'sidebar', 
          { 'w-20': isMenuCollapsed, 'w-64': !isMenuCollapsed },
          'bg-white h-full dark:bg-bg-dark dark:text-white flex-shrink-0 transition-width duration-300 pt-4',
          { 'hidden md:block': !isSidebarVisible && isMobile }
        ]">
        <nav>
          <div>
            <div class="flex justify-center">
              <button @click="toggleMenu"
                class="p-2 rounded-md bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-color-dark">
                <font-awesome-icon :icon="isMenuCollapsed ? 'chevron-right' : 'chevron-left'" />
              </button>
            </div>
            <ul :class="[ 'nav-links', 'flex', 'flex-col', 'gap-4', { 'items-center p-8': isMenuCollapsed, 'items-start p-8': !isMenuCollapsed } ]">
              <li>
                <router-link to="/inicio" exact-active-class="active" class="flex items-center gap-2">
                  <font-awesome-icon icon="home" />
                  <span v-if="!isMenuCollapsed" class="dark:text-white">Inicio</span>
                </router-link>
              </li>
              <li @click="toggleCategoriasMenu" class="relative flex items-center gap-2 cursor-pointer">
                <font-awesome-icon icon="list" />
                <span v-if="!isMenuCollapsed" class="cursor-pointer">Categorías</span>
                <font-awesome-icon v-if="!isMenuCollapsed" :icon="showCategoriasMenu ? 'chevron-up' : 'chevron-down'" />
              </li>
              <Transition name="fade-slide">
                <CategoriasMenu v-if="showCategoriasMenu && !isMenuCollapsed" class="pl-8" />
              </Transition>
              <li v-if="isLoggedIn" @click="toggleAdministracion" class="relative flex items-center gap-2 cursor-pointer">
                <font-awesome-icon icon="user" />
                <span v-if="!isMenuCollapsed" class="cursor-pointer">Usuario</span>
                <font-awesome-icon v-if="!isMenuCollapsed" :icon="showAdministracion ? 'chevron-up' : 'chevron-down'" />
              </li>
              <Transition name="fade-slide">
                <AdministracionMenu v-if="showAdministracion && !isMenuCollapsed" class="pl-8" />
              </Transition>
              <li v-if="isLoggedIn">
                <button @click="handleLogout" class="flex items-center gap-2 mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                  <font-awesome-icon icon="sign-out-alt" />
                  <span v-if="!isMenuCollapsed" class="cursor-pointer">Cerrar Sesión</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
         <!-- Botón de modo oscuro -->
         <div class="flex justify-center">
              <div class="toggle-wrapper flex items-center gap-2 p-4">
                <div class="toggle">
                  <input id="dark-mode-toggle" type="checkbox" v-model="isDarkMode" class="hidden" />
                    <label for="dark-mode-toggle"
                    class="w-12 h-6 bg-gray-400 dark:bg-gray-600 rounded-full relative cursor-pointer">
                    <span
                      class="block w-6 h-6 bg-black dark:bg-white rounded-full shadow-md transform transition-transform duration-300"
                      :class="{ 'translate-x-6': isDarkMode }"></span>
                  </label>
                </div>
              </div>
            </div>
      </div>

      <!-- Contenido principal -->
      <div class="content text-white flex-grow p-4 md:p-12 overflow-auto">
        <router-view class="overflow-auto"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import CategoriasMenu from "./components/Menu/CategoriasMenu.vue";
import UsuarioMenu from "./components/Menu/UsuarioMenu.vue";
import AdministracionMenu from "./components/Menu/AdministracionMenu.vue";

const isLoggedIn = ref(!!localStorage.getItem('token'));
const showCategoriasMenu = ref(false);
const showUsuarioMenu = ref(false);
const showAdministracion = ref(false);
const isDarkMode = ref(false);
const isMenuCollapsed = ref(true);
const isSidebarVisible = ref(false);

const router = useRouter();
const route = useRoute(); // Obtener la ruta actual
const isMobile = ref(window.innerWidth < 768);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarVisible.value = !isSidebarVisible.value;
  }
};

const toggleMenu = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value;
};

const toggleCategoriasMenu = () => {
  showCategoriasMenu.value = !showCategoriasMenu.value;
};

const toggleUserMenu = () => {
  showUsuarioMenu.value = !showUsuarioMenu.value;
};

const toggleAdministracion = () => {
  showAdministracion.value = !showAdministracion.value;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/');
};

const shouldShowSidebar = computed(() => {
  return isSidebarVisible.value || !isMobile.value;
});

// Ocultar la barra superior en la página de login
const shouldShowNavbar = computed(() => {
  return route.path !== '/' && route.path !== '/registrar'; // Oculta en login y registro
});

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>