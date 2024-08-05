<template>
  <div class="estadisticas-jugadores">
    <h1>Estadísticas de Jugadores</h1>
    <button class="btn btn-primary" @click="mostrarModal = true">Agregar Estadísticas</button>

    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <span class="close" @click="resetForm">&times;</span>
          <h2>{{ editMode ? 'Editar Estadísticas' : 'Agregar Estadísticas' }}</h2>
          <form @submit.prevent="submitForm">
            <div v-for="(label, field) in formLabels" :key="field" class="form-group">
              <label :for="field">{{ label }}:</label>
              <input type="text" v-model="form[field]" :id="field" required />
            </div>
            <div class="form-group">
              <label for="jugador_id">ID del Jugador:</label>
              <input type="number" v-model="form.jugador_id" id="jugador_id" required />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success" :disabled="loading">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
              <button type="button" class="btn btn-secondary" @click="resetForm">Cancelar</button>
            </div>
            <div v-if="error" class="error">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th v-for="(label, field) in formLabels" :key="field">{{ label }}</th>
          <th>ID del Jugador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estadistica in estadisticas" :key="estadistica.id">
          <td>{{ estadistica.id }}</td>
          <td v-for="field in Object.keys(formLabels)" :key="field">{{ estadistica[field] }}</td>
          <td>{{ estadistica.jugador_id }}</td>
          <td>
            <button class="btn btn-warning" @click="editEstadistica(estadistica)">Editar</button>
            <button class="btn btn-danger" @click="deleteEstadistica(estadistica.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="loading">Cargando...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      estadisticas: [],
      form: {
        ataque: '',
        velocidad: '',
        potencia: '',
        resistencia: '',
        control_balon: '',
        agresion: '',
        pase_corto: '',
        pase_largo: '',
        dribbling: '',
        agilidad: '',
        equilibrio: '',
        jugador_id: null
      },
      formLabels: {
        ataque: 'Ataque',
        velocidad: 'Velocidad',
        potencia: 'Potencia',
        resistencia: 'Resistencia',
        control_balon: 'Control del Balón',
        agresion: 'Agresión',
        pase_corto: 'Pase Corto',
        pase_largo: 'Pase Largo',
        dribbling: 'Dribbling',
        agilidad: 'Agilidad',
        equilibrio: 'Equilibrio'
      },
      mostrarModal: false,
      editMode: false,
      editId: null,
      loading: false,
      error: null,
      csrfToken: ''
    };
  },
  methods: {
    async fetchEstadisticas() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:9000/estadisticas-jugador');
        this.estadisticas = response.data;
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
        this.error = 'Error al obtener las estadísticas';
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.loading = true;
      try {
        if (this.editMode) {
          await axios.put(`http://localhost:9000/estadisticas-jugador/${this.editId}`, this.form, {
            headers: {
              'X-CSRF-Token': this.csrfToken
            }
          });
        } else {
          await axios.post('http://localhost:9000/estadisticas-jugador', this.form, {
            headers: {
              'X-CSRF-Token': this.csrfToken
            }
          });
        }
        this.fetchEstadisticas();
        this.resetForm();
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        this.error = 'Error al enviar el formulario';
      } finally {
        this.loading = false;
      }
    },
    editEstadistica(estadistica) {
      this.editMode = true;
      this.editId = estadistica.id;
      this.form = { ...estadistica };
      this.mostrarModal = true;
    },
    async deleteEstadistica(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:9000/estadisticas-jugador/${id}`, {
          headers: {
            'X-CSRF-Token': this.csrfToken
          }
        });
        this.fetchEstadisticas();
      } catch (error) {
        console.error('Error al eliminar la estadística:', error);
        this.error = 'Error al eliminar la estadística';
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        ataque: '',
        velocidad: '',
        potencia: '',
        resistencia: '',
        control_balon: '',
        agresion: '',
        pase_corto: '',
        pase_largo: '',
        dribbling: '',
        agilidad: '',
        equilibrio: '',
        jugador_id: null
      };
      this.mostrarModal = false;
      this.editMode = false;
      this.editId = null;
      this.error = null;
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:9000/get-csrf-token');
      this.csrfToken = response.data.csrfToken;
      axios.defaults.headers['X-CSRF-Token'] = this.csrfToken;
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
    
    this.fetchEstadisticas();
  }
}
</script>

<style>
.estadisticas-jugadores {
  padding: 20px;
}

.btn {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
  border: none;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}

.loading {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
