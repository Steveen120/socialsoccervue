import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import "tailwindcss/tailwind.css"
import './assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faList, faUser, faChevronDown, faChevronUp, faBars, faTimes, faChevronRight, faChevronLeft, faHome,   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agregar íconos a la biblioteca de Font Awesome
library.add( faList, faUser, faChevronRight, faChevronDown, faChevronUp, faBars, faTimes,  faChevronLeft, faHome,  );

// Crear la aplicación Vue
const app = createApp(App);

// Usar Vue Router
app.use(router);

// Registrar el componente FontAwesomeIcon
app.component('font-awesome-icon', FontAwesomeIcon);

// Montar la aplicación
app.mount('#app');
