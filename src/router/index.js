import { createRouter, createWebHistory } from 'vue-router';

// Componentes según la estructura proporcionada
import Arbitro from '../components/Arbitros.vue';
import Competencias from '../components/Competencias.vue';
import Equipos from '../components/Equipos.vue';
import Inicio from '../components/Inicio.vue';
import Jugadores from '../components/Jugadores.vue';
import Partidos from '../components/Partidos.vue';
import Perfil from '../components/Perfil.vue';
import Resultados from '../components/Resultados.vue';
import TablaDePosiciones from '../components/Tabla_de_posiciones.vue';

const routes = [

  {
    path: '/Jugadores',
    name: 'Jugadores',
    component: Jugadores,
    meta: { requiresAuth: true } // Ruta que requiere autenticación
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: Inicio,
    meta: { requiresAuth: true }
  },
  {
    path: '/Arbitros',
    name: 'Arbitros',
    component: Arbitro,
    meta: { requiresAuth: true }
  },
  {
    path: '/Competencias',
    name: 'Competencias',
    component: Competencias,
    meta: { requiresAuth: true }
  },
  {
    path: '/Equipos',
    name: 'Equipos',
    component: Equipos,
    meta: { requiresAuth: true }
  },
  {
    path: '/Partidos',
    name: 'Partidos',
    component: Partidos,
    meta: { requiresAuth: true }
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  },
  {
    path: '/Resultados',
    name: 'Resultados',
    component: Resultados,
    meta: { requiresAuth: true }
  },
  {
    path: '/Tabla-posiciones',
    name: 'Tabla-posiciones',
    component: TablaDePosiciones,
    meta: { requiresAuth: true }
  },


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Protección de rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn');
  
  if (to.name === 'login') {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'login' }); // Redirigir a login si no está autenticado
  } else {
    next();
  }
});

export default router;
