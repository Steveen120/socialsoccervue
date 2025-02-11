<template>
  <div class="administracion-container p-4 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 dark:text-white">Administración</h2>
    <!-- Navegación para cambiar entre vistas -->
    <nav class="mb-8">
      <ul class="flex gap-4">
        <li @click="currentView = 'jugadores'" :class="{ 'active': currentView === 'jugadores' }"
          class="cursor-pointer p-2 rounded-md dark:hover:bg-gray-600">Jugadores</li>
        <li @click="currentView = 'equipos'" :class="{ 'active': currentView === 'equipos' }"
          class="cursor-pointer p-2 rounded-md dark:hover:bg-gray-600">Equipos</li>
        <li @click="currentView = 'arbitros'" :class="{ 'active': currentView === 'arbitros' }"
          class="cursor-pointer p-2 rounded-md dark:hover:bg-gray-600">Árbitros</li>
      </ul>
    </nav>
    <!-- Botones para agregar nuevos elementos -->
    <div class="flex justify-end mb-4">
      <Button v-if="currentView === 'equipos'" label="Agregar Equipo" @click="openModal('team')" />
      <Button v-if="currentView === 'jugadores'" label="Agregar Jugador" @click="openModal('player')" />
      <Button v-if="currentView === 'arbitros'" label="Agregar Árbitro" @click="openModal('referee')" />
    </div>
    <!-- Tablas de datos -->
    <Tabla v-if="currentView === 'jugadores'" :headers="['Nombre', 'Equipo', 'Posición']"
      :data="jugadores" tableType="jugadores" @edit="editItem" @delete="deleteItem" />
    <Tabla v-if="currentView === 'equipos'" :headers="['Nombre', 'Ciudad', 'Estadio']" :data="equipos"
      tableType="equipos" @edit="editItem" @delete="deleteItem" />
    <Tabla v-if="currentView === 'arbitros'" :headers="['Nombre', 'Experiencia', 'Partidos Arbitrados']"
      :data="arbitros" tableType="arbitros" @edit="editItem" @delete="deleteItem" />
    <!-- Modal -->
    <Modal :isVisible="isModalVisible" :title="modalTitle" :component="modalComponent" :data="currentItem" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';
import Tabla from '../components/Tabla.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import TeamForm from '../components/Forms/EquipoForm.vue';
import PlayerForm from '../components/Forms/JugadorForm.vue';
import RefereeForm from '../components/Forms/ArbitroForm.vue';
import EditTeamForm from '../components/Forms/EditarEquipoForm.vue';
import EditPlayerForm from '../components/Forms/EditarJugadorForm.vue';
import EditRefereeForm from '../components/Forms/EditarArbitroForm.vue';

// Estado para controlar la vista actual
const currentView = ref('jugadores');

// Datos de jugadores, equipos y árbitros
const jugadores = ref([
  { id: 1, Nombre: 'Jugador 1', Equipo: 'Equipo A', Posición: 'Delantero', Acciones: ['editar', 'eliminar'] },
  { id: 2, Nombre: 'Jugador 2', Equipo: 'Equipo B', Posición: 'Defensa', Acciones: ['editar', 'eliminar'] },
]);
const equipos = ref([
  { id: 1, Nombre: 'Equipo A', Ciudad: 'Ciudad A', Estadio: 'Estadio A', Acciones: ['editar', 'eliminar'] },
  { id: 2, Nombre: 'Equipo B', Ciudad: 'Ciudad B', Estadio: 'Estadio B', Acciones: ['editar', 'eliminar'] },
]);
const arbitros = ref([
  { id: 1, Nombre: 'Árbitro 1', Experiencia: '5 años', 'Partidos Arbitrados': 50, Acciones: ['editar', 'eliminar'] },
  { id: 2, Nombre: 'Árbitro 2', Experiencia: '3 años', 'Partidos Arbitrados': 30, Acciones: ['editar', 'eliminar'] },
]);

// Estado para controlar la visibilidad del modal y su contenido
const isModalVisible = ref(false);
const modalTitle = ref('');
const modalComponent = ref(null);
const currentItem = ref(null);

// Función para abrir el modal de agregar
const openModal = (type) => {
  switch (type) {
    case 'team':
      modalTitle.value = 'Agregar Equipo';
      modalComponent.value = markRaw(TeamForm); // Marca el componente como no reactivo
      break;
    case 'player':
      modalTitle.value = 'Agregar Jugador';
      modalComponent.value = markRaw(PlayerForm); // Marca el componente como no reactivo
      break;
    case 'referee':
      modalTitle.value = 'Agregar Árbitro';
      modalComponent.value = markRaw(RefereeForm); // Marca el componente como no reactivo
      break;
  }
  isModalVisible.value = true;
};

// Función para abrir el modal de edición
const editItem = (item, type) => {
  currentItem.value = item; // Almacena el elemento seleccionado
  switch (type) {
    case 'equipos':
      modalTitle.value = 'Editar Equipo';
      modalComponent.value = markRaw(EditTeamForm);
      break;
    case 'jugadores':
      modalTitle.value = 'Editar Jugador';
      modalComponent.value = markRaw(EditPlayerForm);
      break;
    case 'arbitros':
      modalTitle.value = 'Editar Árbitro';
      modalComponent.value = markRaw(EditRefereeForm);
      break;
  }
  isModalVisible.value = true;
};

// Función para eliminar un elemento
const deleteItem = (item, type) => {
  if (confirm(`¿Estás seguro de que deseas eliminar este ${type}?`)) {
    switch (type) {
      case 'team':
        equipos.value = equipos.value.filter(equipo => equipo.id !== item.id);
        break;
      case 'player':
        jugadores.value = jugadores.value.filter(jugador => jugador.id !== item.id);
        break;
      case 'referee':
        arbitros.value = arbitros.value.filter(arbitro => arbitro.id !== item.id);
        break;
    }
  }
};

// Función para cerrar el modal
const closeModal = () => {
  isModalVisible.value = false;
  modalComponent.value = null;
};
</script>

<style scoped>
.active {
  background-color: var(--primary-color);
  color: white;
}
</style>