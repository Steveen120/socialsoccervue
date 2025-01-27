<template>
    <div>
      <!-- Vista del Equipo -->
      <div class="Equipo">
        <!-- Sección del encabezado -->
        <div class="header">
          <div class="imgEscudo">
            <div class="equipo-img">
              <img :src="equipo.escudo" alt="imagen escudo" />
            </div>
          </div>
          <div class="nombre">
            <h1>EQUIPO</h1>
            <hr />
            <h1>NOMBRE DEL EQUIPO</h1>
            <p><strong>{{ equipo.nombre }}</strong></p>
          </div>
        </div>
  
        <!-- Información del equipo -->
        <div class="infoEquipo">
          <div class="entrenador">
            <h2>Entrenador</h2>
            <p><strong>{{ equipo.nombre_entrenador }}</strong></p>
          </div>
        </div>
  
        <!-- Botones de editar y eliminar -->
        <div class="acciones">
          <button @click="mostrarModal = true">Editar</button>
          <button @click="eliminarEquipo">Eliminar</button>
        </div>
      </div>
  
      <!-- Modal para editar equipo -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="mostrarModal = false">&times;</span>
          <h1>EDITAR EQUIPO</h1>
          <form @submit.prevent="submitForm" class="form-container">
            <div class="form-group">
              <label for="teamName">NOMBRE DEL EQUIPO:</label>
              <input type="text" v-model="equipo.nombre" id="teamName" required />
            </div>
            <div class="form-group">
              <label for="coachName">NOMBRE DEL ENTRENADOR:</label>
              <input type="text" v-model="equipo.nombre_entrenador" id="coachName" required />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn save">Guardar cambios</button>
              <button type="button" class="btn cancel" @click="mostrarModal = false">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../pluggins/axios'; // Importa Axios
  
  export default {
    data() {
      return {
        mostrarModal: false,
        equipo: {
          escudo: "",
          nombre: "",
          nombre_entrenador: "",
          id_campeonato: "",
        },
        equipoId: 1, // Reemplaza con el ID del equipo que estás editando
      };
    },
    created() {
      this.fetchEquipo();
    },
    methods: {
      async fetchEquipo() {
        try {
          const response = await axios.get(`/equipos/${this.equipoId}`);
          this.equipo = response.data;
        } catch (error) {
          console.error('Error al obtener los datos del equipo:', error);
        }
      },
      async submitForm() {
        try {
          await axios.put(`/equipos/${this.equipoId}`, this.equipo);
          console.log("Equipo actualizado:", this.equipo);
          this.mostrarModal = false;
        } catch (error) {
          console.error('Error al actualizar el equipo:', error);
        }
      },
      async eliminarEquipo() {
        try {
          await axios.delete(`/equipos/${this.equipoId}`);
          alert("Equipo eliminado");
          // Redirige o realiza alguna otra acción después de eliminar el equipo
        } catch (error) {
          console.error('Error al eliminar el equipo:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .Equipo {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .header,
  .infoEquipo,
  .acciones {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center; /* Center all items horizontally */
  }
  
  .equipo-img {
    margin-right: 20px; /* Adds margin to the right of the image for spacing */
  }
  
  .equipo-img img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
  
  .nombre {
    text-align: center;
    margin: 0 20px;
  }
  
  .nombre h1 {
    margin: 5px 0;
  }
  
  hr {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 10px 0;
  }
  
  .infoEquipo {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center content vertically */
    justify-content: center; /* Center content horizontally */
  }
  
  .entrenador {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .acciones {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #00acac;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #009999;
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-content .close {
    float: right;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  .modal-content h1 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
  }
  
  .btn {
    background-color: #00acac;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn.save {
    background-color: #00acac;
  }
  
  .btn.save:hover {
    background-color: #009999;
  }
  
  .btn.cancel {
    background-color: #f44336;
  }
  
  .btn.cancel:hover {
    background-color: #d32f2f;
  }
  </style>
  