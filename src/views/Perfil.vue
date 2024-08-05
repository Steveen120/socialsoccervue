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

  <div class="perfils-table-container">
    <div class="perfils-table">
      <h2>Lista de Perfiles</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Número</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perfil in filteredPerfils" :key="perfil.id">
            <td>{{ perfil.id }}</td>
            <td>{{ perfil.nombre }}</td>
            <td>{{ perfil.apellido }}</td>
            <td>{{ perfil.correo }}</td>
            <td>{{ perfil.rol }}</td>
            <td>{{ perfil.numero }}</td>
            <td>
              <img v-if="perfil.imagen" :src="perfil.imagen" alt="Imagen del Perfil" class="perfil-imagen">
            </td>
            <td>
              <button class="btn edit" @click="editPerfil(perfil)">Editar</button>
              <button class="btn delete" @click="confirmDelete(perfil.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn add" @click="openAddModal">Agregar Perfil</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ modalTitle }}</h2>
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="modalPerfil.nombre" type="text" class="input-field">
        </div>
        <div class="form-group">
          <label>Apellido</label>
          <input v-model="modalPerfil.apellido" type="text" class="input-field">
        </div>
        <div class="form-group">
          <label>Correo</label>
          <input v-model="modalPerfil.correo" type="email" class="input-field">
        </div>
        <div class="form-group">
          <label>Rol</label>
          <input v-model="modalPerfil.rol" type="text" class="input-field">
        </div>
        <div class="form-group">
          <label>Número</label>
          <input 
            v-model.number="modalPerfil.numero" 
            type="number" 
            step="1" 
            min="0" 
            max="100" 
            class="input-field"
            @input="adjustNumber"
          >
        </div>
        <div class="form-group">
          <label>Imagen</label>
          <input type="file" @change="handleFileUpload" class="input-field">
          <img v-if="modalPerfil.imagen" :src="modalPerfil.imagen" alt="Imagen del Perfil" class="perfil-imagen">
        </div>
        <div class="form-actions">
          <button class="btn edit" v-if="modalPerfil.id !== null" @click="savePerfil">Guardar</button>
          <button class="btn add" v-if="modalPerfil.id === null" @click="savePerfil">Agregar</button>
          <button class="btn cancel" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>

    <div v-if="showConfirmDeleteModal" class="modal">
      <div class="modal-content">
        <h2>¿Estás seguro de eliminar este perfil?</h2>
        <div class="form-actions">
          <button class="btn confirm" @click="deletePerfil(confirmDeleteId)">Sí</button>
          <button class="btn cancel" @click="closeConfirmDeleteModal">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios';

export default {
  name: 'Perfil',
  data() {
    return {
      perfils: [],
      showModal: false,
      showConfirmDeleteModal: false,
      confirmDeleteId: null,
      modalTitle: '',
      modalPerfil: {
        id: null,
        nombre: '',
        apellido: '',
        correo: '',
        rol: '',
        numero: 0,
        imagen: ''
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
    
    await this.fetchPerfil();
  },
  computed: {
    filteredPerfils() {
      if (this.searchQuery.trim() === '') {
        return this.perfils;
      }
      return this.perfils.filter(perfil => 
        perfil.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        perfil.apellido.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        perfil.correo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchPerfil() {
      try {
        const response = await instance.get('/perfils');
        if (Array.isArray(response.data)) {
          this.perfils = response.data;
        } else {
          console.error('La respuesta no es un array:', response.data);
          this.perfils = []; // Asigna un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al obtener perfiles:', error);
      }
    },
    
    openAddModal() {
      this.modalTitle = 'Agregar Perfil';
      this.modalPerfil = { id: null, nombre: '', apellido: '', correo: '', rol: '', numero: 0, imagen: '' };
      this.showModal = true;
    },
    
    async savePerfil() {
      try {
        if (this.modalPerfil.id === null) {
          await instance.post('/perfils', this.modalPerfil);
        } else {
          await instance.put(`/perfils/${this.modalPerfil.id}`, this.modalPerfil);
        }
        await this.fetchPerfil();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar el perfil:', error);
      }
    },
    
    editPerfil(perfil) {
      this.modalTitle = 'Editar Perfil';
      this.modalPerfil = { ...perfil };
      this.showModal = true;
    },
    
    confirmDelete(id) {
      this.confirmDeleteId = id;
      this.showConfirmDeleteModal = true;
    },

    async deletePerfil(id) {
      try {
        await instance.delete(`/perfils/${id}`);
        this.perfils = this.perfils.filter(perfil => perfil.id !== id);
        this.closeConfirmDeleteModal();
      } catch (error) {
        console.error('Error al eliminar el perfil:', error);
      }
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.modalPerfil.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    closeConfirmDeleteModal() {
      this.showConfirmDeleteModal = false;
      this.confirmDeleteId = null;
    },
    
    performSearch() {
      // Simplemente actualiza la lista de perfiles basada en el texto de búsqueda
      this.filteredPerfils();
    },
    
    adjustNumber(event) {
      const value = Number(event.target.value);
      if (value < 0) {
        this.modalPerfil.numero = 0;
      } else if (value > 100) {
        this.modalPerfil.numero = 100;
      } else {
        this.modalPerfil.numero = Math.floor(value);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos de la barra de navegación */
.navbar {
  background-color: #ffffff;
  padding: 10px;
}

.navbar-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 5px;
}

.search-container input {
  border: none;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}

.search-container button {
  background: transparent;
  border: none;
  cursor: pointer;
}

/* Estilos para la tabla de perfiles */
.perfils-table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.perfils-table {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.perfils-table h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.perfils-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.perfils-table th, .perfils-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.perfils-table th {
  background-color: #007bff;
  color: #fff;
}

.perfils-table tbody tr:hover {
  background-color: #f0f0f0;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn.edit {
  background-color: #28a745;
  color: #fff;
}

.btn.delete {
  background-color: #dc3545;
  color: #fff;
}

.btn.add {
  background-color: #007bff;
  color: #fff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions .btn.cancel {
  background-color: #dc3545;
  color: #fff;
}

.form-actions .btn.confirm {
  background-color: #28a745;
  color: #fff;
}

.perfil-imagen {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>