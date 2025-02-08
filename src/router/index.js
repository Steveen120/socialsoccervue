import { createRouter, createWebHistory } from 'vue-router';

// Importación de componentes
import Arbitro from '../sections/shared/Arbitros.vue';
import Equipos from '../sections/shared/Equipos.vue';
import Inicio from '../sections/Inicio.vue';
import Jugadores from '../sections/shared/Jugadores.vue';
import Partidos from '../sections/Partidos.vue';
import Perfil from '../sections/Perfil.vue';
import Resultados from '../sections/Resultados.vue';
import TablaCompleta from '@/sections/Tabla_completa.vue';
import Login from '../sections/Login.vue';
import PrimeraDivision from '@/sections/PrimeraDivision.vue';
import SegundaDivision from '@/sections/SegundaDivision.vue';
import Register from '@/sections/Register.vue';
import Administracion from '@/sections/Administracion.vue';
import LiveMatchView from '@/sections/shared/LiveMatchView.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio, meta: { requiresAuth: true } },
  { path: '/administracion', name: 'Administracion', component: Administracion },
  { path: '/perfil', name: 'Perfil', component: Perfil },
  { path: '/login', name: 'login', component: Login },
  { path: '/registrar', name: 'Regiter', component: Register},

  // Primera División
  {
    path: '/primera-division',
    name: 'PrimeraDivision',
    component: PrimeraDivision,
    meta: { requiresAuth: true },
    children: [
      { path: 'jugadores', name: 'JugadoresPrimera', component: Jugadores },
      { path: 'equipos', name: 'EquiposPrimera', component: Equipos },
      { path: 'partidos', name: 'PartidosPrimera', component: Partidos },
      { path: 'resultados', name: 'ResultadosPrimera', component: Resultados },
      // { path: 'tabla-posiciones', name: 'TablaPosicionesPrimera', component: TablaDePosiciones },
      { path: 'tabla-completa', name: 'TablaCompletaPrimera', component: TablaCompleta},
      { path: 'arbitros', name: 'ArbitrosPrimera', component: Arbitro },
      {
        path: "/partido-en-vivo/:id", // Ruta dinámica con el ID del partido
        name: "LiveMatchPrimera",
        component: LiveMatchView,
        props: true, // Pasar el ID como prop al componente
      },
    ],
  },

  // Segunda División
  {
    path: '/segunda-division',
    name: 'SegundaDivision',
    component: SegundaDivision,
    meta: { requiresAuth: true },
    children: [
      { path: 'jugadores', name: 'JugadoresSegunda', component: Jugadores },
      { path: 'equipos', name: 'EquiposSegunda', component: Equipos },
      { path: 'partidos', name: 'PartidosSegunda', component: Partidos },
      { path: 'resultados', name: 'ResultadosSegunda', component: Resultados },
      // { path: 'tabla-posiciones', name: 'TablaPosicionesSegunda', component: TablaDePosiciones },
      { path: 'tabla-completa', name: 'TablaCompletaSegunda', component: TablaCompleta},
      { path: 'arbitros', name: 'ArbitrosSegunda', component: Arbitro },
      {
        path: "/partido-en-vivo/:id", // Ruta dinámica con el ID del partido
        name: "LiveMatchSegunda",
        component: LiveMatchView,
        props: true, // Pasar el ID como prop al componente
      },

    ],
  },
];

// Crear el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
