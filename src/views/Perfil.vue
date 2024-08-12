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
          <button class="btn save" v-if="modalPerfil.id !== null" @click="savePerfil">Guardar</button>
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
        perfil.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchPerfil() {
      try {
        const response = await instance.get('/perfils');
        this.perfils = response.data;
      } catch (error) {
        console.error('Error al obtener perfiles:', error);
      }
    },
    openAddModal() {
      this.modalTitle = 'Agregar Perfil';
      this.modalPerfil = {
        id: null,
        nombre: '',
        apellido: '',
        correo: '',
        rol: '',
        numero: 0,
        imagen: ''
      };
      this.showModal = true;
    },
    editPerfil(perfil) {
      this.modalTitle = 'Editar Perfil';
      this.modalPerfil = { ...perfil };
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
    async deletePerfil(id) {
      try {
        await instance.delete(`/perfils/${id}`);
        this.perfils = this.perfils.filter(perfil => perfil.id !== id);
        this.closeConfirmDeleteModal();
      } catch (error) {
        console.error('Error al eliminar el perfil:', error);
      }
    },
    confirmDelete(id) {
      this.confirmDeleteId = id;
      this.showConfirmDeleteModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeConfirmDeleteModal() {
      this.showConfirmDeleteModal = false;
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
    }
  }
};
</script>

<style scoped>
/* Estilos de la barra de navegación */
.navbar {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

/* Estilos de la tabla de perfiles */
.perfils-table-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
}

.perfils-table {
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.perfils-table h2 {
  margin-bottom: 20px;
}

.perfils-table table {
  width: 100%;
  border-collapse: collapse;
}

.perfils-table th,
.perfils-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.perfils-table th {
  background-color: #f4f4f4;
}

.perfils-table .perfil-imagen {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Estilos de los botones */
.perfils-table .btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.perfils-table .btn.edit {
  background-color: #007bff;
  color: #fff;
}

.perfils-table .btn.delete {
  background-color: #dc3545;
  color: #fff;
}

.perfils-table .btn.add {
  background-color: #28a745;
  color: #fff;
  margin-top: 10px;
}

.perfils-table .btn:hover {
  opacity: 0.9;
}

/* Estilos del modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content .form-group {
  margin-bottom: 15px;
}

.modal-content .form-group label {
  display: block;
  margin-bottom: 5px;
}

.modal-content .form-group .input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.modal-content .perfil-imagen {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
}

.modal-content .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-content .form-actions .btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content .form-actions .btn.save {
  background-color: #007bff;
  color: #fff;
}

.modal-content .form-actions .btn.add {
  background-color: #28a745;
  color: #fff;
}

.modal-content .form-actions .btn.cancel {
  background-color: #dc3545;
  color: #fff;
}

.modal-content .form-actions .btn.confirm {
  background-color: #28a745;
  color: #fff;
}

.modal-content .form-actions .btn:hover {
  opacity: 0.9;
}
</style>
