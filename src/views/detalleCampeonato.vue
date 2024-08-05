<template>
    <div>
      <div class="datos-container">
        <h2 class="titulo">Detalle del Campeonato</h2>
  
        <!-- Botón para agregar detalles del campeonato -->
        <button v-if="!isDetalleAgregado" @click="showModal = true" class="button">Agregar Detalle</button>
  
        <!-- Vista donde se mostrarán los detalles -->
        <div v-if="detallesCampeonatos.length" class="lista-detalles">
          <div v-for="(detalle, index) in detallesCampeonatos" :key="index" class="detalle-item">
            <h3>Reglamentos:</h3>
            <p>{{ detalle.reglamentos }}</p>
            <button @click="editarDetalle(index)" class="btn">Editar</button>
            <button @click="eliminarDetalle(index)" class="btn">Eliminar</button>
          </div>
        </div>
        <p v-else>No hay detalles del campeonato agregados.</p>
      </div>
  
      <!-- Modal para agregar detalles del campeonato -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Agregar Detalle del Campeonato</h2>
          <form @submit.prevent="submitForm" class="form-container">
            <div class="form-group">
              <label for="reglamentos">Reglamentos:</label>
              <textarea id="reglamentos" v-model="detalle.reglamentos"></textarea>
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
         detalle: {
           reglamentos: '',
           id_campeonato: null // Debes asignar el ID del campeonato correspondiente
         },
         detallesCampeonatos: [], // Array para almacenar los detalles del campeonato
         csrfToken: '',
         isDetalleAgregado: false // Para controlar la visibilidad del botón "Agregar Detalle"
       };
     },
     async mounted() {
       try {
         const response = await instance.get('/');
         this.csrfToken = response.data.csrfToken;
         instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;
   
         // Cargar los detalles del campeonato existentes
         const detallesResponse = await instance.get('/detalle-campeonatos');
         this.detallesCampeonatos = detallesResponse.data;
       } catch (error) {
         console.error('Error al obtener el token CSRF o cargar detalles:', error);
       }
     },
     methods: {
       async submitForm() {
         try {
           const response = await instance.post('/detalle-campeonatos', this.detalle);
           console.log('Detalle del campeonato agregado:', response.data);
           this.detallesCampeonatos.push({...this.detalle});
           this.isDetalleAgregado = true;
           this.showModal = false;
           this.detalle = {
             reglamentos: '',
             id_campeonato: null
           };
         } catch (error) {
           console.error('Error al agregar detalle del campeonato:', error);
         }
       },
     },
     methods: {
  async submitForm() {
    try {
      if (this.detalle.id) {
        // Si el detalle tiene un ID, significa que estamos editando
        await instance.put(`/detalle-campeonatos/${this.detalle.id}`, this.detalle);
        const index = this.detallesCampeonatos.findIndex(d => d.id === this.detalle.id);
        this.detallesCampeonatos.splice(index, 1, {...this.detalle});
      } else {
        // Si no tiene ID, significa que estamos creando un nuevo detalle
        const response = await instance.post('/detalle-campeonatos', this.detalle);
        this.detallesCampeonatos.push({...response.data});
      }
      this.isDetalleAgregado = true;
      this.showModal = false;
      this.detalle = {
        reglamentos: '',
        id_campeonato: null
      };
    } catch (error) {
      console.error('Error al agregar o editar detalle del campeonato:', error);
    }
  },
  editarDetalle(index) {
    this.detalle = {...this.detallesCampeonatos[index]};
    this.showModal = true;
  }
} };
   </script>
   <style scoped>
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
   
   textarea {
     width: 100%;
     padding: 8px;
     border: 1px solid black;
     border-radius: 8px;
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
   
   .lista-detalles {
     margin-top: 20px;
     text-align: left;
   }
   
   .detalle-item {
     background-color: #f1f1f1;
     border: 1px solid #ddd;
     border-radius: 8px;
     padding: 15px;
     margin-bottom: 15px;
   }
   
   @media screen and (max-width: 768px) {
     .form-container {
       width: 80%;
       font-size: 14px;
     }
   }
   </style>
   