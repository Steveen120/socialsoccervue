<template>
  <div>
    <div v-if="alertVisible" class="alerta">
      <p>campeonato Registrado</p>
      <div class="checkmark-container">
        <div class="checkmark">
          <div class="checkmark-circle"><img src="https://icon-library.com/images/check-icon/check-icon-10.jpg" alt="check"></div>
        </div>
      </div>
    </div>

    <div class="datos-container">
      <h2 class="titulo">Campeonato</h2>
      <button v-if="!isCampeonatoAgregado" @click="showModal = true" class="button">Agregar Campeonato</button>

      <!-- Vista donde se mostrarán los datos -->
      <div v-if="campeonatos.length" class="lista-campeonatos">
        <div v-for="(campeonato, index) in campeonatos" :key="index" class="campeonato-item">
          <h3>{{ campeonato.nombre_liga }}</h3>
          <p><strong>Presidente:</strong> {{ campeonato.nombre_presidente }}</p>
          <!-- Visualización de la foto del presidente -->
          <img :src="campeonato.foto_presidente" alt="Foto del Presidente" v-if="campeonato.foto_presidente" class="foto-presidente"/>
          <p v-else>Sin foto del presidente</p>
          <p><strong>Información:</strong> {{ campeonato.informacion_liga }}</p>
          <button @click="editarCampeonato(index)" class="btn">Editar</button>
          <button @click="eliminarCampeonato(index, campeonato.id)" class="btn">Eliminar</button>
        </div>
      </div>
      <p v-else>No hay campeonatos agregados.</p>
    </div>

    <!-- Modal para agregar campeonato -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Agregar Campeonato</h2>
        <form @submit.prevent="submitForm" class="form-container">
          <div class="form-group">
            <label for="nombre_liga">Nombre de la Liga:</label>
            <input type="text" id="nombre_liga" v-model="campeonato.nombre_liga" required />
          </div>
          <div class="form-group">
            <label for="nombre_presidente">Nombre del Presidente:</label>
            <input type="text" id="nombre_presidente" v-model="campeonato.nombre_presidente" required />
          </div>
          <div class="form-group">
            <label for="foto_presidente">Foto del Presidente (URL):</label>
            <input type="url" id="foto_presidente" v-model="campeonato.foto_presidente" />
          </div>
          <div class="form-group">
            <label for="informacion_liga">Información de la Liga:</label>
            <textarea id="informacion_liga" v-model="campeonato.informacion_liga"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn save">Guardar</button>
            <button type="button" class="btn cancel" @click="showModal = false">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios';

export default {
  data() {
    return {
      showModal: false,
      campeonato: {
        nombre_liga: '',
        nombre_presidente: '',
        foto_presidente: '',
        informacion_liga: ''
      },
      campeonatos: [],
      csrfToken: '',
      isCampeonatoAgregado: false,
      editIndex: null,
      alertVisible: false
    };
  },
  async mounted() {
    try {
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;

      this.fetchCampeonatos();
    } catch (error) {
      console.error('Error al obtener el token CSRF o campeonatos:', error);
    }
  },
  methods: {
    async fetchCampeonatos() {
      try {
        const response = await instance.get('/campeonatos');
        this.campeonatos = response.data;
      } catch (error) {
        console.error('Error al obtener los campeonatos:', error);
      }
    },
    async submitForm() {
      try {
        if (this.editIndex !== null) {
          const campeonato = this.campeonatos[this.editIndex];
          const response = await instance.put(`/campeonatos/${campeonato.id}`, this.campeonato);
          console.log('Campeonato actualizado:', response.data);
          this.campeonatos.splice(this.editIndex, 1, response.data);
        } else {
          const response = await instance.post('/campeonato', this.campeonato);
          console.log('Campeonato agregado:', response.data);
          this.campeonatos.push(response.data.campeonato);
          this.isCampeonatoAgregado = true;
          this.showAlert();
        }
        this.showModal = false;
        this.editIndex = null;
        this.resetForm();
      } catch (error) {
        console.error('Error al agregar o actualizar campeonato:', error);
      }
    },
    editarCampeonato(index) {
      this.campeonato = { ...this.campeonatos[index] };
      this.editIndex = index;
      this.showModal = true;
    },
    async eliminarCampeonato(index, id) {
      try {
        await instance.delete(`/campeonatos/${id}`);
        this.campeonatos.splice(index, 1);
        console.log('Campeonato eliminado en el índice:', index);
      } catch (error) {
        console.error('Error al eliminar campeonato:', error);
      }
    },
    resetForm() {
      this.campeonato = {
        nombre_liga: '',
        nombre_presidente: '',
        foto_presidente: '',
        informacion_liga: ''
      };
    },
    showAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3000); // Oculta la alerta después de 3 segundos
    }
  }
};
</script>

<style scoped>
/* Estilos existentes */
.alerta {
  background-color: #232629;
  color: white;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.checkmark-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark {
  width: 100px;
  height: 100px;
  position: relative;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
}
.checkmark-circle img{
  max-width: 100%;
}

.checkmark-stem {
  width: 3px;
  height: 9px;
  background-color: white;
  position: absolute;
  top: 7px;
  left: 10px;
  transform: rotate(-45deg);
}

.checkmark-kick {
  width: 3px;
  height: 5px;
  background-color: white;
  position: absolute;
  top: 11px;
  left: 8px;
  transform: rotate(45deg);
}

.datos-container {
  border: 1px solid #232629;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
  text-align: center;
}

.button {
  margin-top: 25px;
  background-color: #00acac;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.button:hover {
  background-color: #808a93;
}

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
}

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
  color: black;
}

input[type="text"],
textarea,
input[type="url"] {
  width: 100%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
}

textarea {
  resize: vertical;
  word-wrap: break-word;
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

.lista-campeonatos {
  margin-top: 20px;
  text-align: left;
}

.campeonato-item p {
  word-wrap: break-word; 
  word-break: break-all; 
  white-space: normal; 
}
.campeonato-item {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.campeonato-item h3 {
  margin-top: 0;
}

.campeonato-item img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 80%;
    font-size: 14px;
  }
}
</style>
