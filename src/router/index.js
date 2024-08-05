import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Jugador from '../views/jugador.vue';
import EstadisticasJugador from '@/views/estadisticasJugador.vue'; // Asegúrate de que esta ruta sea correcta
import Inicio from '../components/Inicio.vue';
import GestionDeEquipos from '../components/GestionDeEquipos.vue';
import RegistrosDeResultados from '../components/RegistrosDeResultados.vue';
import Campeonato from '../views/campeonato.vue';
import CerrarSesion from '../components/CerrarSesion.vue';
import CrearEquipo from '../components/CrearEquipo.vue';
import Encuentros from '../components/Encuentros.vue';
import Encuentrosform from '../components/Encuentrosform.vue';
import EstadisticasEquipo from '../components/EstadisticasEquipo.vue';
import EstadisticasPartidos from '../components/EstadisticasPartidos.vue';
import PlayerList from '../components/PlayerList.vue';
import ProfileList from '../components/ProfileList.vue';
import Perfil from '../components/Perfil.vue';
import Equipo from '@/components/Equipo.vue';
import detalleCampeonato from '../views/detalleCampeonato.vue';
import Editarencuentros from '@/components/Editarencuentros.vue';
import Arbitro from '@/views/arbitro.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/jugador',
    name: 'jugador',
    component: Jugador,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/estadisticas-Jugador',
    name: 'estadisticas-Jugador',
    component: EstadisticasJugador,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/Inicio',
    name: 'home',
    component: Inicio,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/crearequipo',
    name: 'crearequipo',
    component: CrearEquipo,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/equipo',
    name: 'equipo',
    component: Equipo,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/equipos',
    name: 'equipos',
    component: GestionDeEquipos,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/resultados',
    name: 'resultados',
    component: RegistrosDeResultados,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/campeonato',
    name: 'campeonato',
    component: Campeonato,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  
  {
    path: '/detalle-campeonato',
    name: 'detalle-campeonato',
    component: detalleCampeonato,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },

  {
    path: '/cerrar-sesion',
    name: 'cerrar-sesion',
    component: CerrarSesion,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/encuentros',
    name: 'encuentros',
    component: Encuentros,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/crearencuentro',
    name: 'crearencuentro',
    component: Encuentrosform,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/editarencuentro',
    name: 'editarencuentro',
    component: Editarencuentros,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/estadisticas-equipo',
    name: 'estadisticas-equipo',
    component: EstadisticasEquipo,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/estadisticas-partidos',
    name: 'estadisticas-partidos',
    component: EstadisticasPartidos,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/estadisticas-jugador',
    name: 'estadisticas-jugador',
    component: PlayerList,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfileList,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/arbitros',
    name: 'arbitro',
    component: Arbitro,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn');

  // Permitir acceso a la página de inicio de sesión sin autenticación
  if (to.name === 'login') {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'login' }); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
  } else {
    next();
  }
});

export default router;

