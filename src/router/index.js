import { createRouter, createWebHistory } from 'vue-router';

// Importación de componentes
import Arbitro from '../sections/Arbitros.vue';
import Competencias from '../components/Competencias.vue';
import Equipos from '../sections/Equipos.vue';
import Inicio from '../sections/Inicio.vue';
import Jugadores from '../sections/Jugadores.vue';
import Partidos from '../sections/Partidos.vue';
import Perfil from '../components/Perfil.vue';
import Resultados from '../sections/Resultados.vue';
import TablaDePosiciones from '../components/Tabla_de_posiciones.vue';
import InformacionJu from '../components/informacionJu.vue';
import Resultadosequip from '@/sections/MatchResult.vue';
import TablaCompleta from '@/sections/Tabla_completa.vue';
import Login from '../sections/Login.vue';
import PrimeraDivision from '@/sections/PrimeraDivision.vue';
import SegundaDivision from '@/sections/SegundaDivision.vue';
import TablaJugadores from '@/sections/TablaJugadores.vue';
import TablaArbitros from '@/sections/TablaArbitros.vue';
import Register from '@/sections/Register.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio, meta: { requiresAuth: true } },
  { path: '/competencias', name: 'Competencias', component: Competencias, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'Perfil', component: Perfil, meta: { requiresAuth: true } },
  { path: '/informacion-ju', name: 'InformacionJugador', component: InformacionJu, meta: { requiresAuth: true } },
  // { path: '/resultadosequip', name: 'Resultadosequip', component: Resultadosequip},
  // { path: '/tabla-completa', name: 'TablaCompleta', component: TablaCompleta, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/registrar', name: 'Regiter', component: Register},

  // Primera División
  {
    path: '/primera-division',
    name: 'PrimeraDivision',
    component: PrimeraDivision,
    meta: { requiresAuth: true },
    children: [
      { path: 'tabla-jugadores', name: 'TablaJugadoresPrimera', component: TablaJugadores},
      { path: 'tabla-arbitros', name: 'TablaArbitrosPrimera', component: TablaArbitros},
      { path: 'jugadores', name: 'JugadoresPrimera', component: Jugadores },
      { path: 'equipos', name: 'EquiposPrimera', component: Equipos },
      { path: 'partidos', name: 'PartidosPrimera', component: Partidos },
      { path: 'resultados', name: 'ResultadosPrimera', component: Resultados },
      // { path: 'tabla-posiciones', name: 'TablaPosicionesPrimera', component: TablaDePosiciones },
      { path: 'tabla-completa', name: 'TablaCompletaPrimera', component: TablaCompleta},
      { path: 'arbitros', name: 'ArbitrosPrimera', component: Arbitro },
    ],
  },

  // Segunda División
  {
    path: '/segunda-division',
    name: 'SegundaDivision',
    component: SegundaDivision,
    meta: { requiresAuth: true },
    children: [
      { path: 'tabla-jugadores', name: 'TablaJugadoresSegunda', component: TablaJugadores},
      { path: 'tabla-arbitros', name: 'TablaArbitrosSegunda', component: TablaArbitros},
      { path: 'jugadores', name: 'JugadoresSegunda', component: Jugadores },
      { path: 'equipos', name: 'EquiposSegunda', component: Equipos },
      { path: 'partidos', name: 'PartidosSegunda', component: Partidos },
      { path: 'resultados', name: 'ResultadosSegunda', component: Resultados },
      // { path: 'tabla-posiciones', name: 'TablaPosicionesSegunda', component: TablaDePosiciones },
      { path: 'tabla-completa', name: 'TablaCompletaSegunda', component: TablaCompleta},
      { path: 'arbitros', name: 'ArbitrosSegunda', component: Arbitro },
    ],
  },
];

// Crear el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
