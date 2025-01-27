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
  
    <div class="arbitros-table-container">
      <div class="arbitros-table">
        <h2>Lista de Árbitros</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Edad</th>
              <th>Tarjetas Amarillas Totales</th>
              <th>Tarjetas Rojas Totales</th>
              <th>Promedio de Desempeño</th>
              <th>Partidos Totales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="arbitro in arbitros" :key="arbitro.id">
              <td>{{ arbitro.id }}</td>
              <td>{{ arbitro.nombre }}</td>
              <td>{{ arbitro.nacionalidad }}</td>
              <td>{{ arbitro.edad }}</td>
              <td>{{ arbitro.total_tarjetas_amarillas }}</td>
              <td>{{ arbitro.total_tarjetas_rojas }}</td>
              <td>{{ arbitro.promedio_desempeno }}</td>
              <td>{{ arbitro.total_partidos }}</td>
              <td>
                <button class="btn edit" @click="editArbitro(arbitro)">Editar</button>
                <button class="btn delete" @click="deleteArbitro(arbitro.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn add" @click="openAddModal">Agregar Árbitro</button>
      </div>
  
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>{{ modalTitle }}</h2>
          <div class="form-group">
            <label>Nombre del Árbitro</label>
            <input v-model="modalArbitro.nombre" type="text" class="input-field">
          </div>
          <div class="form-group">
            <label>Nacionalidad</label>
            <input v-model="modalArbitro.nacionalidad" type="text" class="input-field">
          </div>
          <div class="form-group">
            <label>Edad</label>
            <input v-model.number="modalArbitro.edad" type="number" step="0.01" min="0" class="input-field">
          </div>
          
          
          
          <div class="form-group">
            <label>Foto del Árbitro</label>
            <input type="file" @change="handleFileUpload" class="input-field">
            <img v-if="modalArbitro.foto" :src="modalArbitro.foto" alt="Foto del Árbitro" class="arbitro-foto">
          </div>
          <div class="form-actions">
            <button class="btn edit" v-if="modalArbitro.id !== null" @click="saveArbitro">Guardar</button>
            <button class="btn add" v-if="modalArbitro.id === null" @click="saveArbitro">Agregar</button>
            <button class="btn cancel" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import instance from '@/pluggins/axios';

export default {
  name: 'Arbitro',
  data() {
    return {
      arbitros: [],
      showModal: false,
      modalTitle: '',
      modalArbitro: {
        id: null,
        nombre: '',
        nacionalidad: '',
        edad: 0,
        
        foto: ''
      },
      searchQuery: '',
      csrfToken: ''
    };
  },
  async mounted() {
    try {
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
    
    await this.fetchArbitro();

    // Actualiza las estadísticas de todos los árbitros
    this.arbitros.forEach(arbitro => {
      this.updateArbitroStats(arbitro.id);
    });
  },
  computed: {
    filteredArbitros() {
      if (this.searchQuery.trim() === '') {
        return this.arbitros;
      }
      return this.arbitros.filter(arbitro => 
        arbitro.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        arbitro.nacionalidad.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchArbitro() {
      try {
        const response = await instance.get('/arbitros');
        if (Array.isArray(response.data)) {
          this.arbitros = response.data;
        } else {
          console.error('La respuesta no es un array:', response.data);
          this.arbitros = []; // Asigna un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al obtener árbitros:', error);
      }
    },
    
    async updateArbitroStats(id) {
      try {
        // Envía una solicitud PUT para actualizar las estadísticas
        const response = await instance.put(`/arbitros/${id}`);
        console.log('Estadísticas del árbitro actualizadas:', response.data);
        await this.fetchArbitro(); // Actualiza la lista de árbitros después de la actualización
      } catch (error) {
        console.error('Error al actualizar las estadísticas del árbitro:', error);
      }
    },
    
    openAddModal() {
      this.modalTitle = 'Agregar Árbitro';
      this.modalArbitro = { id: null, nombre: '', nacionalidad: '', edad: 0, total_tarjetas_amarillas: 0, total_tarjetas_rojas: 0, promedio_desempeno: '', calificacion: '', foto: '' };
      this.showModal = true;
    },
    
    async saveArbitro() {
      try {
        if (this.modalArbitro.id === null) {
          await instance.post('/arbitros', this.modalArbitro);
        } else {
          await instance.put(`/prueba/${this.modalArbitro.id}`, this.modalArbitro);
        }
        await this.fetchArbitro();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar el árbitro:', error);
      }
    },
    
    editArbitro(arbitro) {
      this.modalTitle = 'Editar Árbitro';
      this.modalArbitro = { ...arbitro };
      this.showModal = true;
    },
    
    async deleteArbitro(id) {
      try {
        await instance.delete(`/arbitro/${id}`);
        this.arbitros = this.arbitros.filter(arbitro => arbitro.id !== id);
      } catch (error) {
        console.error('Error al eliminar el árbitro:', error);
      }
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.modalArbitro.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    performSearch() {
      // Simplemente actualiza la lista de árbitros basada en el texto de búsqueda
      this.filteredArbitros();
    }
  }
};
</script>
  
  <style scoped>
  /* Navbar styles */
  .navbar {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
  
  .navbar-content {
    display: flex;
    justify-content: flex-end;
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
  }
  
  .search-container button:hover {
    background-color: #ccc;
  }
  
  .search-container button i {
    color: #555;
  }
  
  /* Table styles */
  .arbitros-table-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    padding: 20px;
  }
  
  .arbitros-table {
    width: 100%;
    max-width: 1200px;
    overflow-x: auto;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .arbitros-table h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .arbitros-table table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .arbitros-table th, .arbitros-table td {
    padding: 8px; /* Ajuste de padding para reducir el tamaño de los campos */
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .arbitros-table th {
    background-color: #f4f4f4;
  }
  
  .arbitros-table tbody tr:hover {
    background-color: #f0f0f0;
  }
  
  /* Modal styles */
  .modal {
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
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
  }
  
  .modal-content h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 12px; /* Reducción del margen inferior para compactar los campos */
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 8px; /* Ajuste de padding para reducir el tamaño de los campos */
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .tarjetas {
    display: flex;
    justify-content: space-between;
  }
  
  .tarjeta {
    flex: 1;
    margin-right: 10px;
  }
  
  .tarjeta:last-child {
    margin-right: 0;
  }
  
  .arbitro-foto {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-top: 10px;
    border-radius: 4px;
  }
  
  /* Button styles */
  .btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #00acac;
    color: #fff;
    font-size: 14px;
  }
  
  .btn.edit:hover,
  .btn.delete:hover,
  .btn.add:hover,
  .btn.save:hover,
  .btn.cancel:hover {
    background-color: #808a93;
  }
  
  .btn:not(:last-child) {
    margin-right: 10px;
  }
  </style>
  