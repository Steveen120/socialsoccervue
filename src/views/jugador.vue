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

  <div class="jugadores-table-container">
    <div class="jugadores-table">
      <h2>Lista de Jugadores</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
            <th>Foto</th>
            <th>Número de Camiseta</th>
            <th>Equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jugador in filteredJugadores" :key="jugador.id">
            <td>{{ jugador.id }}</td>
            <td>{{ jugador.nombre_jugador }}</td>
            <td>{{ jugador.edad }}</td>
            <td>{{ jugador.fecha_nacimiento }}</td>
            <td>
              <img
                :src="jugador.foto_jugador"
                alt="Foto del Jugador"
                class="jugador-foto"
              />
            </td>
            <td>{{ jugador.numerocamiseta }}</td>
            <td>{{ getEquipoNombre(jugador.id_equipos) }}</td>
            <td>
              <button class="btn edit" @click="editJugador(jugador)">Editar</button>
              <button class="btn delete" @click="deleteJugador(jugador.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn add" @click="openAddModal">Agregar Jugador</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ modalTitle }}</h2>
        <div class="form-group">
          <label>Nombre del Jugador</label>
          <input v-model="modalJugador.nombre_jugador" type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label>Edad</label>
          <input v-model="modalJugador.edad" type="number" class="input-field" />
        </div>
        <div class="form-group">
          <label>Fecha de Nacimiento</label>
          <input v-model="modalJugador.fecha_nacimiento" type="date" class="input-field" />
        </div>
        <div class="form-group">
          <label>Número de Camiseta</label>
          <input v-model="modalJugador.numerocamiseta" type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label>Equipo</label>
          <select v-model="modalJugador.id_equipos" class="input-field">
            <option value="" disabled>Seleccionar equipo</option>
            <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">
              {{ equipo.nombre_de_equipo }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Foto del Jugador</label>
          <input type="file" @change="handleFileUpload" class="input-field" />
          <img
            v-if="modalJugador.foto_jugador"
            :src="modalJugador.foto_jugador"
            alt="Foto del Jugador"
            class="modal-jugador-foto"
          />
        </div>
        <div class="form-actions">
          <button class="btn save" @click="saveJugador">Guardar</button>
          <button class="btn cancel" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios';

export default {
  name: 'Jugador',
  data() {
    return {
      jugadores: [],
      equipos: [],
      showModal: false,
      modalTitle: '',
      modalJugador: {
        id: null,
        nombre_jugador: '',
        edad: '',
        fecha_nacimiento: '',
        foto_jugador: '',
        numerocamiseta: '',
        id_equipos: null,
      },
      searchQuery: '',
    };
  },
  async mounted() {
    await this.fetchJugador();
    await this.fetchEquipos();
  },
  computed: {
    filteredJugadores() {
      if (this.searchQuery.trim() === '') {
        return this.jugadores;
      }
      return this.jugadores.filter(jugador =>
        jugador.nombre_jugador
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchJugador() {
      try {
        const response = await instance.get('/jugador');
        this.jugadores = response.data;
      } catch (error) {
        console.error('Error al obtener jugadores:', error);
      }
    },
    async fetchEquipos() {
      try {
        const response = await instance.get('/equipos');
        this.equipos = response.data;
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    },
    getEquipoNombre(id) {
      const equipo = this.equipos.find(equipo => equipo.id === id);
      return equipo ? equipo.nombre_de_equipo : 'Sin equipo';
    },
    openAddModal() {
      this.modalTitle = 'Agregar Jugador';
      this.modalJugador = {
        id: null,
        nombre_jugador: '',
        edad: '',
        fecha_nacimiento: '',
        foto_jugador: '',
        numerocamiseta: '',
        id_equipos: null,
      };
      this.showModal = true;
    },
    editJugador(jugador) {
      this.modalTitle = 'Editar Jugador';
      this.modalJugador = { ...jugador };
      this.showModal = true;
    },
    async saveJugador() {
      try {
        if (!this.modalJugador.id_equipos) {
          alert('El campo de equipo es obligatorio.');
          return;
        }

        if (this.modalJugador.id === null) {
          await instance.post('/jugador', this.modalJugador);
        } else {
          await instance.put(`/jugador/${this.modalJugador.id}`, this.modalJugador);
        }
        await this.fetchJugador();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar el jugador:', error);
      }
    },
    async deleteJugador(id) {
      try {
        await instance.delete(`/jugador/${id}`);
        this.jugadores = this.jugadores.filter(jugador => jugador.id !== id);
      } catch (error) {
        console.error('Error al eliminar el jugador:', error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.modalJugador.foto_jugador = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    performSearch() {
      // No es necesario; la búsqueda se maneja automáticamente por la propiedad computada
    },
  },
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

/* Estilos de la tabla de jugadores */
.jugadores-table-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
}

.jugadores-table {
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.jugadores-table h2 {
  margin-bottom: 20px;
}

.jugadores-table table {
  width: 100%;
  border-collapse: collapse;
}

.jugadores-table th,
.jugadores-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.jugadores-table th {
  background-color: #f2f2f2;
}

.jugadores-table td {
  vertical-align: middle;
}

.jugadores-table img.jugador-foto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

/* Botones */
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn.add {
  background-color: #28a745;
  color: #fff;
}

.btn.edit {
  background-color: #ffc107;
  color: #fff;
}

.btn.delete {
  background-color: #dc3545;
  color: #fff;
}

.btn.save {
  background-color: #28a745;
  color: #fff;
}

.btn.cancel {
  background-color: #6c757d;
  color: #fff;
}

/* Modal */
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
  border-radius: 10px;
  width: 400px;
  max-width: 80%;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.input-field:focus {
  border-color: #007bff;
}

.modal-jugador-foto {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>