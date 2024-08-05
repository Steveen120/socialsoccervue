<template>
    <div>
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
            <button @click="eliminarCampeonato(index)" class="btn">Eliminar</button>
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
        campeonatos: [], // Array para almacenar los campeonatos agregados
        csrfToken: '',
        isCampeonatoAgregado: false // Estado para controlar la visibilidad del botón
      };
    },
    async mounted() {
      try {
        // Obtener token CSRF si es necesario
        const response = await instance.get('/');
        this.csrfToken = response.data.csrfToken;
        instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;

        // Cargar campeonatos al cargar la página
        this.fetchCampeonatos();
      } catch (error) {
        console.error('Error al obtener el token CSRF o campeonatos:', error);
      }
    },
    methods: {
      async fetchCampeonatos() {
        try {
          const response = await instance.get('/campeonatos'); // Cambia la ruta a la de tu API
          this.campeonatos = response.data; // Asigna los datos obtenidos al array campeonatos
        } catch (error) {
          console.error('Error al obtener los campeonatos:', error);
        }
      },
      async submitForm() {
        try {
          const response = await instance.post('/campeonato', this.campeonato);
          console.log('Campeonato agregado:', response.data);
          this.campeonatos.push({...this.campeonato}); // Agregar el nuevo campeonato al array
          this.showModal = false;
          this.isCampeonatoAgregado = true; // Ocultar el botón "Agregar Campeonato"
          this.campeonato = {
            nombre_liga: '',
            nombre_presidente: '',
            foto_presidente: '',
            informacion_liga: ''
          };
        } catch (error) {
          console.error('Error al agregar campeonato:', error);
        }
      },
      editarCampeonato(index) {
        // Lógica para editar el campeonato
        console.log('Editar campeonato en el índice:', index);
      },
      eliminarCampeonato(index) {
        this.campeonatos.splice(index, 1); // Eliminar el campeonato del array
        console.log('Campeonato eliminado en el índice:', index);
      }
    }
  };
</script>


  
  <style scoped>
  /* Estilos existentes */
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
  