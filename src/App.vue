<template>
  <div>
    <!-- Barra de navegación -->
    <nav class="navbar">
      <div class="logo-container">
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <span class="app-name">SOCIAL SOCCER</span>
      </div>
      <!-- Items del menú centrados -->
      <ul class="nav-links">
        <li><router-link to="/inicio">Inicio</router-link></li>
        <li><router-link to="/perfil">Perfil</router-link></li>
        <li><router-link to="/jugadores">Jugadores</router-link></li>
        <li><router-link to="/equipos">Equipos</router-link></li>
        <li><router-link to="/partidos">Partidos</router-link></li>
        <li><router-link to="/resultados">Resultados</router-link></li>
        <li><router-link to="/Tabla-posiciones">Tabla de Posiciones</router-link></li>
        <li><router-link to="/competencias">Competencias</router-link></li>
        <li><router-link to="/arbitros">Árbitros</router-link></li>
      </ul>
    </nav>

    <!-- El contenido se carga dependiendo de la ruta activa -->
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';

defineComponent({});
</script>

<style scoped>
/* Estilos de la barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between; /* Hace que el logo se ponga en una esquina */
  align-items: center;
  background-color: #1c1e21; /* Color de fondo actual del navbar */
  color: white;
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Asegura que el logo esté a la izquierda */
}

.logo {
  height: 50px;
  width: auto;
}

.app-name {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
  justify-content: center; /* Centra los items en la barra */
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px; /* Cambié el tamaño del texto para hacerlo más legible */
}

.nav-links li a:hover {
  color: #32cd32;
}

.content {
  padding: 20px;
  background: #212529;  /* Fondo oscuro para que contraste bien con el navbar y demás elementos */
  min-height: 100vh;  /* Para asegurarse que cubra toda la pantalla */
}
</style>
