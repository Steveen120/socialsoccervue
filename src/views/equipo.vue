<template>
    <nav class="navbar">
      <div class="navbar-content">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar..."
            @keyup.enter="performSearch"
          />
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  
    <div class="equipos-table-container">
      <div class="equipos-table">
        <h2>Lista de Equipos</h2>
  
        <!-- Mostrar mensaje cuando la lista está vacía -->
        <div v-if="filteredEquipos.length === 0" class="empty-message">
          La lista de equipos está vacía.
        </div>
  
        <!-- Tabla de equipos -->
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha de Creación</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipo in filteredEquipos" :key="equipo.id">
              <td>{{ equipo.id }}</td>
              <td>{{ equipo.nombre_de_equipo }}</td>
              <td>{{ equipo.fecha_de_creacion }}</td>
              <td>
                <img :src="equipo.foto_de_equipo" alt="Imagen del Equipo" class="equipo-imagen" />
              </td>
              <td>
                <button class="btn edit" @click="editEquipo(equipo)">Editar</button>
                <button class="btn delete" @click="deleteEquipo(equipo.id)">Eliminar</button>
                <button class="btn view" @click="viewEquipo(equipo.id)">Ver Equipo</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn add" @click="mostrarFormulario">Agregar Equipo</button>
      </div>
  
      <!-- Alertas -->
      <div v-if="alertMessage" class="alert" :class="alertType">
        {{ alertMessage }}
      </div>
  
      <!-- Modal de creación/edición de equipo -->
      <div v-if="formularioVisible" class="modal-overlay">
        <div class="modal-content">
          <span class="close" @click="ocultarFormulario">&times;</span>
          <div class="form-container">
            <h1>{{ modalTitle }}</h1>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="teamName">Nombre del Equipo:</label>
                <input
                  type="text"
                  v-model="modalEquipo.nombre_de_equipo"
                  id="teamName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="fechaDeCreacion">Fecha de Creación:</label>
                <input
                  type="date"
                  v-model="modalEquipo.fecha_de_creacion"
                  id="fechaDeCreacion"
                  required
                />
              </div>
              <div class="form-group">
                <label for="teamPhotoUrl">Foto del Equipo:</label>
                <input
                  type="url"
                  v-model="modalEquipo.foto_equipo"
                  id="teamPhotoUrl"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
                <div v-if="modalEquipo.foto_equipo" class="image-preview">
                  <img :src="modalEquipo.foto_equipo" alt="Preview Team Photo" />
                </div>
              </div>
              <div class="form-actions">
                <button class="btn save" type="submit">Guardar</button>
                <button class="btn cancel" type="button" @click="ocultarFormulario">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import instance from "@/pluggins/axios";
  import { useRouter } from "vue-router";
  
  export default {
    name: "Equipos",
    data() {
      return {
        equipos: [],
        searchQuery: "",
        formularioVisible: false,
        modalTitle: "",
        modalEquipo: {
          nombre_de_equipo: "",
          fecha_de_creacion: "",
          foto_equipo: "",
        },
        csrfToken: "", // Store CSRF token
        alertMessage: "", // Message for alerts
        alertType: "", // Type of alert (success, error)
      };
    },
    async mounted() {
      try {
        const response = await instance.get("/"); // Initial call to get CSRF token
        this.csrfToken = response.data.csrfToken;
        instance.defaults.headers.common["X-CSRF-Token"] = this.csrfToken;
        await this.fetchEquipos();
      } catch (error) {
        console.error("Error al obtener el token CSRF o los equipos:", error);
      }
    },
    computed: {
      filteredEquipos() {
        if (this.searchQuery.trim() === "") {
          return this.equipos;
        }
        return this.equipos.filter((equipo) =>
          equipo.nombre
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchEquipos() {
        try {
          const response = await instance.get("/equipos");
          this.equipos = response.data;
        } catch (error) {
          console.error("Error al obtener equipos:", error);
        }
      },
      performSearch() {
        // La búsqueda se maneja automáticamente por la propiedad computada
      },
      mostrarFormulario() {
        this.modalTitle = "Agregar Equipo";
        this.modalEquipo = {
          id: null,
          nombre_de_equipo: "",
          fecha_de_creacion: "",
          foto_equipo: "",
        };
        this.formularioVisible = true;
      },
      async submitForm() {
        try {
          if (this.modalEquipo.id === null) {
            await instance.post("/equipos", this.modalEquipo);
            this.alertMessage = "Equipo agregado exitosamente.";
            this.alertType = "success";
          } else {
            await instance.put(
              `/equipos/${this.modalEquipo.id}`,
              this.modalEquipo
            );
            this.alertMessage = "Equipo actualizado exitosamente.";
            this.alertType = "success";
          }
          await this.fetchEquipos();
          this.ocultarFormulario();
        } catch (error) {
          console.error("Error al guardar el equipo:", error);
          this.alertMessage = "Error al guardar el equipo.";
          this.alertType = "error";
        } finally {
          // Clear alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = "";
            this.alertType = "";
          }, 3000);
        }
      },
      async editEquipo(equipo) {
        this.modalTitle = "Editar Equipo";
        this.modalEquipo = { ...equipo };
        this.formularioVisible = true;
      },
      async deleteEquipo(id) {
        try {
          await instance.delete(`/equipos/${id}`);
          this.equipos = this.equipos.filter((equipo) => equipo.id !== id);
          this.alertMessage = "Equipo eliminado exitosamente.";
          this.alertType = "success";
        } catch (error) {
          console.error("Error al eliminar el equipo:", error);
          this.alertMessage = "Error al eliminar el equipo.";
          this.alertType = "error";
        } finally {
          // Clear alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = "";
            this.alertType = "";
          }, 3000);
        }
      },
      viewEquipo(id) {
        const router = useRouter();
        router.push(`/detalle-equipo/${id}`);
      },
      ocultarFormulario() {
        this.formularioVisible = false;
      },
    },
  };
  </script>
 <style scoped>
 /* Estilos para el navbar */
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
 
 /* Estilos para la tabla de equipos */
 .equipos-table-container {
   display: flex;
   justify-content: center;
   align-items: flex-start;
   padding: 20px;
 }
 
 .equipos-table {
   width: 100%;
   max-width: 1000px; /* Ajustar el tamaño máximo de la tabla */
   overflow-x: auto; /* Permitir desplazamiento horizontal */
 }
 
 .equipos-table h2 {
   text-align: center;
   margin-bottom: 20px;
   font-size: 24px;
 }
 
 .equipos-table table {
   width: 100%;
   border-collapse: collapse;
 }
 
 .equipos-table th,
 .equipos-table td {
   border: 1px solid #ddd;
   padding: 10px;
   text-align: center;
   font-size: 14px;
 }
 
 .equipos-table th {
   background-color: #f2f2f2;
   font-weight: bold;
 }
 
 .equipos-table img {
   width: 50px;
   height: 50px;
   border-radius: 50%;
   object-fit: cover;
 }
 
 .equipos-table .btn {
   padding: 5px 10px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   font-size: 12px;
   margin: 2px; /* Agregar margen entre los botones */
 }
 
 .equipos-table .btn.edit {
   background-color: #00acac;
   color: white;
 }
 
 .equipos-table .btn.delete {
   background-color: #00acac;
   color: white;
 }
 
 .equipos-table .btn.view {
   background-color: #00acac;
   color: white;
 }
 
 .equipos-table .btn.add {
   background-color: #00acac;
   color: white;
   display: block;
   margin: 20px auto;
   font-size: 14px;
 }
 
 /* Estilos para el modal */
 .modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
 }
 
 .modal-content {
   background-color: white;
   padding: 20px;
   border-radius: 8px;
   width: 90%;
   max-width: 500px;
   position: relative;
 }
 
 .close {
   position: absolute;
   top: 10px;
   right: 10px;
   font-size: 24px;
   cursor: pointer;
   color: #888;
 }
 
 .close:hover {
   color: #333;
 }
 
 .form-container h1 {
   text-align: center;
   margin-bottom: 20px;
   font-size: 22px;
 }
 
 .form-group {
   margin-bottom: 20px;
 }
 
 .form-group label {
   display: block;
   font-weight: bold;
   margin-bottom: 5px;
 }
 
 .form-group input {
   width: calc(100% - 22px);
   padding: 8px 10px;
   font-size: 14px;
   border: 1px solid #ddd;
   border-radius: 4px;
   outline: none;
 }
 
 .form-actions {
   display: flex;
   justify-content: space-between;
 }
 
 .form-actions .btn {
   width: 48%;
   padding: 10px;
   border-radius: 4px;
   font-size: 14px;
 }
 
 .form-actions .btn.save {
   background-color: #5cb85c;
   color: white;
 }
 
 .form-actions .btn.cancel {
   background-color: #d9534f;
   color: white;
 }
 
 /* Estilos para las alertas */
 .alert {
   padding: 10px;
   margin: 10px 0;
   border-radius: 4px;
   font-size: 14px;
   text-align: center;
   color: white;
 }
 
 .alert.success {
   background-color: #5cb85c;
 }
 
 .alert.error {
   background-color: #d9534f;
 }
 
 /* Ajustes para la imagen de vista previa */
 .image-preview {
   margin-top: 10px;
 }
 
 .image-preview img {
   width: 100px;
   height: 100px;
   object-fit: cover;
   border-radius: 4px;
 }
 </style>