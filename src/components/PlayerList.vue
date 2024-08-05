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
  <div class="players-table-container">
    <div class="players-table">
      <h2>Lista de Jugadores</h2>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Tiro</th>
            <th>Pase</th>
            <th>Físico</th>
            <th>Regate</th>
            <th>Defensa</th>
            <th>Ritmo</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="player.id">
            <td>{{ index + 1 }}</td>
            <td>{{ player.nombre }}</td>
            <td>{{ player.equipo }}</td>
            <td>{{ player.tiro }}</td>
            <td>{{ player.pase }}</td>
            <td>{{ player.fisico }}</td>
            <td>{{ player.regate }}</td>
            <td>{{ player.defensa }}</td>
            <td>{{ player.ritmo }}</td>
            <td><img v-if="player.foto" :src="player.foto" alt="Foto del Jugador" class="player-foto"></td>
            <td>
              <button class="btn edit" @click="editPlayer(player)">Editar</button>
              <button class="btn delete" @click="confirmDelete(player.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn add" @click="openAddModal">Agregar Jugador</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <PlayerForm 
          :player.sync="modalPlayer" 
          @save="savePlayer" 
          @cancel="closeModal" 
        />
      </div>
    </div>

    <div v-if="showConfirm" class="confirm-modal">
      <div class="confirm-modal-content">
        <p>¿Estás seguro de eliminar este registro?</p>
        <button class="btn confirm" @click="deletePlayer(confirmId)">Sí</button>
        <button class="btn confirm cancel" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerForm from './PlayerForm.vue';

export default {
  components: {
    PlayerForm
  },
  data() {
    return {
      players: this.getPlayersFromLocalStorage(),
      showModal: false,
      showConfirm: false,
      confirmId: null,
      modalPlayer: {
        id: null,
        nombre: '',
        equipo: '',
        tiro: 0,
        pase: 0,
        fisico: 0,
        regate: 0,
        defensa: 0,
        ritmo: 0,
        foto: ''
      }
    };
  },
  methods: {
    getPlayersFromLocalStorage() {
      const players = localStorage.getItem('players');
      return players ? JSON.parse(players) : [];
    },
    savePlayersToLocalStorage() {
      localStorage.setItem('players', JSON.stringify(this.players));
    },
    openAddModal() {
      this.modalPlayer = { id: null, nombre: '', equipo: '', tiro: 0, pase: 0, fisico: 0, regate: 0, defensa: 0, ritmo: 0, foto: '' };
      this.showModal = true;
    },
    editPlayer(player) {
      this.modalPlayer = { ...player };
      this.showModal = true;
    },
    confirmDelete(id) {
      this.confirmId = id;
      this.showConfirm = true;
    },
    deletePlayer(id) {
      this.players = this.players.filter(player => player.id !== id);
      this.savePlayersToLocalStorage();
      this.showConfirm = false;
    },
    cancelDelete() {
      this.showConfirm = false;
      this.confirmId = null;
    },
    savePlayer(player) {
      if (player.id === null) {
        player.id = Date.now();
        this.players.push(player);
      } else {
        const index = this.players.findIndex(p => p.id === player.id);
        this.players.splice(index, 1, player);
      }
      this.savePlayersToLocalStorage();
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
};
</script>

<style scoped>
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
.players-table-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
}

.players-table {
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.players-table h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.players-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.players-table th, .players-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.players-table th {
  background-color: #f4f4f4;
}

.players-table tbody tr:hover {
  background-color: #f0f0f0;
}

.player-foto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.modal, .confirm-modal {
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

.modal-content, .confirm-modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.confirm-modal-content {
  text-align: center;
}

.confirm-modal-content p {
  margin-bottom: 20px;
}

.confirm-modal-content .btn {
  margin: 0 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
}

.btn.edit {
  background-color: #ffc107;
}

.btn.delete {
  background-color: #dc3545;
}

.btn.add {
  background-color: #007bff;
}

.btn.save {
  background-color: #28a745;
}

.btn.cancel {
  background-color: #6c757d;
}

.btn.confirm {
  background-color: #28a745;
}

.btn.confirm.cancel {
  background-color: #dc3545;
}

.btn:hover {
  opacity: 0.8;
}

.btn:last-child {
  margin-right: 0;
}
</style>
