<template>
    <nav class="navbar">
     <div class="navbar-content">
       <div class="search-container">
         <input type="text" v-model="searchQuery" placeholder="Buscar..." @keyup.enter="performSearch" />
         <button @click="performSearch">
           <i class="fas fa-search"></i>
         </button>
       </div>
     </div>
   </nav>
  
  <div class="container-one">
   <h1 style="text-align: center">Encuentros Próximos</h1>
   <div class="button-container">
     <router-link class="add-button" to="/crearencuentro">Agregar Encuentro</router-link>
     <router-link class="championships-button" to="/campeonato">Ver Campeonatos</router-link>
   </div>
  
  
   <div class="container">
     <div class="card" v-for="(partido, id) in partidos" :key="id">
       <div class="date-box">
         <p style="padding-bottom: 2px; color:white;font-size: 15px;">{{ partido.equipoLocal }} vs {{ encuentro.equipoVisitante }}</p>
       </div>
       <div class="team-images">
         <img src="../assets/equipos/aucas.png" alt="Equipo A" id="equipo1" class="team-image">
         <div class="score">
           <span>{{ partido.marcadorLocal }}</span> - <span>{{ partido.marcadorVisitante }}</span>
         </div>
         <img src="../assets/equipos/Emelec.png" alt="Equipo B" id="equipo2" class="team-image">
       </div>
       <div class="hora">
         <p style="color: white;"><strong>{{ partido.hora }}</strong></p>
       </div>
       <p><strong>{{ partido.lugar }}</strong></p>
       <p>{{ partido.observaciones }}</p>
       <p>{{ partido.fecha }}</p>
  
  
       <div class="button-group">
         <router-link class="edit-button" to="/editarencuentro">Editar</router-link>
         <button class="delete-button" @click="confirmarEliminacion(index)">Eliminar</button>
       </div>
     </div>
   </div>
  
  
   <!-- Modal de confirmación -->
   <div v-if="mostrarModal" class="modal-overlay">
     <div class="modal">
       <p style="font-size: 20px;">¿Desea eliminar este encuentro?</p>
       <button @click="eliminarEncuentro(confirmarIndex)">Sí</button>
       <button @click="cerrarModal">No</button>
     </div>
   </div>
  
  
  </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  
  
  const encuentros = ref([
  { equipoLocal: 'Equipo A', equipoVisitante: 'Equipo B', fecha: '2024-07-15', lugar: 'Estadio Principal', hora: '18:00', observaciones: 'Partido de liga regular', marcadorLocal: 0, marcadorVisitante: 0 },
  { equipoLocal: 'Equipo C', equipoVisitante: 'Equipo D', fecha: '2024-07-17', lugar: 'Estadio Secundario', hora: '20:00', observaciones: 'Partido amistoso', marcadorLocal: 0, marcadorVisitante: 0 },
  { equipoLocal: 'Equipo E', equipoVisitante: 'Equipo F', fecha: '2024-07-19', lugar: 'Estadio Terciario', hora: '16:00', observaciones: 'Final de copa', marcadorLocal: 0, marcadorVisitante: 0 },
  { equipoLocal: 'Equipo E', equipoVisitante: 'Equipo F', fecha: '2024-07-19', lugar: 'Estadio Terciario', hora: '16:00', observaciones: 'Final de copa', marcadorLocal: 0, marcadorVisitante: 0 }
  ]);
  
  
  let mostrarModal = ref(false);
  let confirmarIndex = ref(null);
  
  
  function confirmarEliminacion(index) {
  confirmarIndex.value = index;
  mostrarModal.value = true;
  }
  
  
  function eliminarEncuentro(index) {
  encuentros.value.splice(index, 1);
  cerrarModal();
  }
  
  
  function cerrarModal() {
  mostrarModal.value = false;
  }
  const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
  };
  </script>
  
  
  <style scoped>
  /* Estilos CSS aquí */
  .navbar {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
  
  .navbar-content {
    display: flex;
    justify-content: center; /* Centering the content */
    align-items: center;
  }
  
  .search-container {
    display: flex;
    align-items: center;
  }
  
  .search-container input {
    padding: 5px 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    outline: none;
  }
  
  .search-container button {
    background-color: #ddd;
    border: 1px solid #ddd;
    border-left: none;
    border-radius: 0 4px 4px 0;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px; /* Adds space between input and button */
  }
  
  .search-container button:hover {
    background-color: #ccc;
  }
  
  .search-container button i {
    color: #555;
  }
  
  .body {
   font-family: Arial, sans-serif;
   background-color: #f4f4f4;
   margin: 0;
   padding: 20px;
  }
  .button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  }
  
  
  .add-button {
  background-color: #0d9488; /* Verde */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  }
  
  
  .championships-button {
  background-color: #008CBA; /* Azul */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  }
  
  
  
  
  .date-box {
  background-color: #001529;
  padding-top:1px;
  color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  
  .hora {
  background-color: #001529;
  color: white;
  width: 20%;
  margin: 0 auto;
  border-radius: 4px;
  }
  .score {
  font-size: 2.5em;
  font-weight: bold;
  margin: 0;
  }
  
  
  .container-one{
  max-width:90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .container {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   gap: 20px;
  }
  
  
  .card {
   background-color: #eeecec;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   padding: 0 0 20px 0;
   margin-bottom: 1em;
   max-width: 40%;
   width: 100%;
   text-align: center;
  }
  
  
  .team-images {
   display: flex;
   justify-content: space-around;
   margin-bottom: 10px;
  }
  
  
  .team-image {
   width: 70px;
   height: 70px;
   border-radius: 50%;
   object-fit: cover;
  }
  
  
  
  
  
  
  .card h2 {
   margin-top: 0;
  }
  
  
  .button-group {
   display: flex;
   justify-content: space-around;
   margin-top: 10px;
  }
  
  
  .edit-button,
  .delete-button {
   background-color: #007bff;
   color: white;
   border: none;
   width: 30%;
   border-radius: 4px;
   padding: 10px 20px;
   cursor: pointer;
   text-decoration: none;
   transition: background-color 0.3s;
  }
  
  
  /* Estilos para el modal */
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  }
  
  
  .modal {
  background-color: white;
  padding: 20px;
  font-size: 1.5em;
  line-height: 2;
  border-radius: 10px;
  text-align: center;
  }
  
  
  .modal button {
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 7px;
  }
  
  
  .modal button:hover {
  background-color: #1762a3;
  }
  </style>