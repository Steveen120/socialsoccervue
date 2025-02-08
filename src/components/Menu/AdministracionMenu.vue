<template>
    <!-- Lista de navegación del menú de administración -->
    <ul class="dropdown-menu bg-white dark:bg-bg-dark">
        <!-- Opción "Perfil" visible solo si el usuario no está autenticado -->
        <li v-if="!isLoggedIn" class="hover:bg-bg-cards dark:hover:bg-bg-cards-dark">
            <router-link to="/perfil" class="dark:text-white">Perfil</router-link>
        </li>
    </ul>
</template>

<script setup>
defineProps({
    // Propiedad 'isLoggedIn' para determinar si el usuario está autenticado
    isLoggedIn: Boolean
});
</script>

<style scoped>
/* Estilos específicos para el contenedor del menú de administración */
.administracion-menu-container {
    max-width: 300px;
    margin: 0 auto;
}
</style>