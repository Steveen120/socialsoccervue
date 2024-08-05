<template>
    <div id="container">
      <h1>Editar Encuentro</h1>
      <form @submit.prevent="agregarEncuentro" class="form-group">
        <label for="equipoLocal">Equipo Local</label>
        <input v-model="nuevoEncuentro.equipoLocal" id="equipoLocal" placeholder="Equipo Local" required>
        
        <div class="file-upload">
          <label for="imagenLocal">Imagen Equipo Local:</label>
          <input type="file" @change="handleImagenLocal" ref="imagenLocalInput" id="imagenLocal" accept="image/*" required>
          <button type="button" @click="triggerImagenLocalInput">Seleccionar Archivo</button>
          <span v-if="nuevoEncuentro.imagenLocal">{{ nuevoEncuentro.imagenLocal.name }}</span>
          <button v-if="nuevoEncuentro.imagenLocal" type="button" class="remove-button" @click="removeImagenLocal">Eliminar Foto</button>
        </div>
        
        <label for="equipoVisitante">Equipo Visitante</label>
        <input v-model="nuevoEncuentro.equipoVisitante" id="equipoVisitante" placeholder="Equipo Visitante" required>
        
        <div class="file-upload">
          <label for="imagenVisitante">Imagen Equipo Visitante:</label>
          <input type="file" @change="handleImagenVisitante" ref="imagenVisitanteInput" id="imagenVisitante" accept="image/*" required>
          <button type="button" @click="triggerImagenVisitanteInput">Seleccionar Archivo</button>
          <span v-if="nuevoEncuentro.imagenVisitante">{{ nuevoEncuentro.imagenVisitante.name }}</span>
          <button v-if="nuevoEncuentro.imagenVisitante" type="button" class="remove-button" @click="removeImagenVisitante">Eliminar Foto</button>
        </div>
  
        <label for="marcadorLocal">Marcador Local</label>
        <input v-model="nuevoEncuentro.marcadorLocal" id="marcadorLocal" type="number" required>
  
        <label for="marcadorVisitante">Marcador Visitante</label>
        <input v-model="nuevoEncuentro.marcadorVisitante" id="marcadorVisitante" type="number"  required>
  
        <label for="hora">Hora</label>
        <input v-model="nuevoEncuentro.hora" type="time" id="hora"  required>
  
        <label for="lugar">Lugar</label>
        <input v-model="nuevoEncuentro.lugar" id="lugar" required>
  
        <label for="observaciones">Observaciones</label>
        <input v-model="nuevoEncuentro.observaciones" id="observaciones" required>
  
        <label for="fecha">Fecha</label>
        <input v-model="nuevoEncuentro.fecha" type="date" id="fecha"  required>
  
        <div class="container-button">
          <button type="submit" id="button1">Agregar</button>
          <router-link to="/encuentros" id="cancelButton">Cancelar</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nuevoEncuentro: {
          equipoLocal: '',
          equipoVisitante: '',
          imagenLocal: null,
          imagenVisitante: null,
          marcadorLocal: 0,
          marcadorVisitante: 0,
          hora: '',
          lugar: '',
          observaciones: '',
          fecha: ''
        }
      };
    },
    methods: {
      handleImagenLocal(event) {
        this.nuevoEncuentro.imagenLocal = event.target.files[0];
      },
      handleImagenVisitante(event) {
        this.nuevoEncuentro.imagenVisitante = event.target.files[0];
      },
      triggerImagenLocalInput() {
        this.$refs.imagenLocalInput.click();
      },
      triggerImagenVisitanteInput() {
        this.$refs.imagenVisitanteInput.click();
      },
      removeImagenLocal() {
        this.nuevoEncuentro.imagenLocal = null;
        // Opcional: Resetear el input file
        // this.$refs.imagenLocalInput.value = null;
      },
      removeImagenVisitante() {
        this.nuevoEncuentro.imagenVisitante = null;
        // Opcional: Resetear el input file
        // this.$refs.imagenVisitanteInput.value = null;
      },
      agregarEncuentro() {
        this.$emit('agregarEncuentro', this.nuevoEncuentro);
        this.$router.push('/encuentros');
      }
    }
  };
  </script>
  
  <style scoped>
  #container {
    max-width: 55%;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid black;
    border-radius: 10px;
  }
  
  h1 {
    margin-bottom: 20px;
    color: black;
    text-align: center;
    font-weight: bold; 
    font-size: 1.5em
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    margin-left: 5px;
    color: black;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0 5px 0;
    border: 1px solid black;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .file-upload {
    margin-bottom: 10px;
  }
  
  .file-upload label {
    display: block;
    margin-bottom: 5px;
  }
  
  .file-upload input[type="file"] {
    display: none;
  }
  
  .file-upload button {
    margin-top: 5px;
    padding: 8px 12px;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .file-upload .remove-button {
    margin-left: 10px;
    background-color: #dc3545;
  }
  
  .container-button {
    display: flex;
    justify-content: space-between; 
    margin-top: 20px;
  }
  
  button, #cancelButton {
    flex: 1; 
    padding: 10px 20px;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  #cancelButton {
    margin-left: 10px;
    text-align: center;
    text-decoration: none;
  }
  
  button:hover, #cancelButton:hover {
    background-color: #1762a3;
  }
  
  @media (max-width: 768px) {
    #container {
      max-width: 80%;
    }
  
    h1 {
      font-size: 1.2em;
    }
  }
  </style>
  