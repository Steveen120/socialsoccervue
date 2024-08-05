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
        <table>
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
              <td><img :src="equipo.foto_de_equipo" alt="Imagen del Equipo" class="equipo-imagen" /></td>
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
                <button class="btn cancel" type="button" @click="ocultarFormulario">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import instance from '@/pluggins/axios';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Equipos',
    data() {
      return {
        equipos: [],
        searchQuery: '',
        formularioVisible: false,
        modalTitle: '',
        modalEquipo: {
          nombre_de_equipo: '',
          fecha_de_creacion: '',
          foto_equipo: ''
        },
        csrfToken: '', // Store CSRF token
      };
    },
    async mounted() {
      try {
        const response = await instance.get('/'); // Initial call to get CSRF token
        this.csrfToken = response.data.csrfToken;
        instance.defaults.headers.common['X-CSRF-Token'] = this.csrfToken;
        await this.fetchEquipos();
      } catch (error) {
        console.error('Error al obtener el token CSRF o los equipos:', error);
      }
    },
    computed: {
      filteredEquipos() {
        if (this.searchQuery.trim() === '') {
          return this.equipos;
        }
        return this.equipos.filter(equipo =>
          equipo.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      async fetchEquipos() {
        try {
          const response = await instance.get('/equipo');
          this.equipos = response.data;
        } catch (error) {
          console.error('Error al obtener equipos:', error);
        }
      },
      performSearch() {
        // La búsqueda se maneja automáticamente por la propiedad computada
      },
      mostrarFormulario() {
        this.modalTitle = 'Agregar Equipo';
        this.modalEquipo = { id: null, nombre_de_equipo: '', fecha_de_creacion: '', foto_equipo: '' };
        this.formularioVisible = true;
      },
      async submitForm() {
        try {
          if (this.modalEquipo.id === null) {
            await instance.post('/equipo', this.modalEquipo);
          } else {
            await instance.put(`/equipo/${this.modalEquipo.id}`, this.modalEquipo);
          }
          await this.fetchEquipos();
          this.ocultarFormulario();
        } catch (error) {
          console.error('Error al guardar el equipo:', error);
        }
      },
      async editEquipo(equipo) {
        this.modalTitle = 'Editar Equipo';
        this.modalEquipo = { ...equipo };
        this.formularioVisible = true;
      },
      async deleteEquipo(id) {
        try {
          await instance.delete(`/equipo/${id}`);
          this.equipos = this.equipos.filter(equipo => equipo.id !== id);
        } catch (error) {
          console.error('Error al eliminar el equipo:', error);
        }
      },
      viewEquipo(id) {
        const router = useRouter();
        router.push(`/detalle-equipo/${id}`);
      },
      ocultarFormulario() {
        this.formularioVisible = false;
      }
    }
  }
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
    max-width: 1200px;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .equipos-table h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .equipos-table table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .equipos-table th, .equipos-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .equipos-table th {
    background-color: #f4f4f4;
  }
  
  .equipos-table tbody tr:hover {
    background-color: #f0f0f0;
  }
  
  .equipo-imagen {
    max-width: 100px;
    max-height: 100px;
    display: block;
    margin: 10px 0;
  }
  
  /* Estilos para el modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #333;
  }
  
  .close:hover {
    color: #ff0000;
  }
  
  /* Estilos para el formulario dentro del modal */
  .form-container {
    max-width: 100%;
    margin: 0;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  input[type="text"],
  input[type="date"],
  input[type="url"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .image-preview img {
    max-width: 100%;
    border-radius: 4px;
  }
  
  .error {
    color: red;
    font-size: 0.875rem;
  }
  
  .btn {
    background-color: #00acac;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn:hover {
    background-color: #808a93;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
  }
  
  .form-actions .btn {
    margin: 0 5px;
  }
  
  @media screen and (max-width: 768px) {
    .form-container {
      width: 80%;
      font-size: 14px;
    }
  
    .equipos-table {
      width: 90%;
    }
  }
  </style>
  