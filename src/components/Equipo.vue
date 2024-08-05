<template>
    <div>
      <!-- Vista del Equipo -->
      <div class="Equipo">
        <!-- Sección del encabezado -->
        <div class="header">
          <div class="imgLiga">
            <div class="equipo-img">
              <img :src="equipo.imagen" alt="imagen liga" />
            </div>
          </div>
          <div class="nombre">
            <h1>EQUIPO</h1>
            <hr />
            <h1>NOMBRE DEL EQUIPO</h1>
            <p><strong>{{ equipo.nombre }}</strong></p>
          </div>
          <div class="imgEscudo">
            <div class="equipo-img">
              <img :src="equipo.escudo" alt="imagen escudo" />
            </div>
          </div>
        </div>
  
        <!-- Información del equipo -->
        <div class="infoEquipo">
          <div class="entrenador">
            <h2>Entrenador</h2>
            <div class="equipo-img">
              <img :src="equipo.entrenadorImg" alt="imagen entrenador" />
            </div>
            <p><strong>{{ equipo.entrenador }}</strong></p>
          </div>
          <div class="infoEntrenador">
            <h2>Información del Entrenador</h2>
            <p>Experiencia: {{ equipo.experienciaEntrenador }}</p>
          </div>
          <div class="dueñoEquipo">
            <h2>Dueño del Equipo</h2>
            <div class="equipo-img">
              <img :src="equipo.duenoImg" alt="imagen dueño" />
            </div>
            <p><strong>{{ equipo.dueno }}</strong></p>
          </div>
          <div class="infoEstadio">
            <h2>Información del Estadio</h2>
            <div class="equipo-img">
              <img :src="equipo.estadioImg" alt="imagen estadio" />
            </div>
            <p>{{ equipo.infoEquipo }}</p>
          </div>
        </div>
  
        <!-- Lista de jugadores -->
        <div class="jugadores">
          <h2>Jugadores</h2>
          <ul>
            <li v-for="(jugador, index) in equipo.jugadores" :key="index">
              <p>
                {{ jugador.nombre }} - {{ jugador.posicion }} - Dorsal: {{ jugador.dorsal }}
              </p>
            </li>
          </ul>
        </div>
  
        <!-- Botones de editar y eliminar -->
        <div class="acciones">
          <button @click="mostrarModal = true">Editar</button>
          <button @click="eliminarEquipo">Eliminar</button>
        </div>
      </div>
  
      <!-- Modal para editar equipo -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="mostrarModal = false">&times;</span>
          <h1>EDITAR EQUIPO</h1>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="teamName">NOMBRE DEL EQUIPO:</label>
              <input type="text" v-model="equipo.nombre" id="teamName" required />
            </div>
            <div class="form-group">
              <label for="infoTeam">INFORMACIÓN DEL EQUIPO:</label>
              <input type="text" v-model="equipo.infoEquipo" id="infoTeam" required />
            </div>
            <div class="form-group">
              <label for="ownerName">DUEÑO DEL EQUIPO:</label>
              <input type="text" v-model="equipo.dueno" id="ownerName" required />
            </div>
            <div class="form-group file-upload">
              <label for="ownerPhoto">INSERTAR FOTO DEL DUEÑO DEL EQUIPO:</label>
              <input type="file" @change="onFileChange($event, 'duenoImg')" ref="ownerFileInput" id="ownerPhoto" accept="image/*" />
              <button type="button" @click="triggerFileInput('ownerFileInput')">Seleccionar Archivo</button>
              <div v-if="equipo.duenoImg" class="image-preview">
                <img :src="equipo.duenoImg" alt="Preview Owner Photo" />
              </div>
            </div>
            <div class="form-group">
              <label for="coachName">NOMBRE DEL ENTRENADOR:</label>
              <input type="text" v-model="equipo.entrenador" id="coachName" required />
            </div>
            <div class="form-group">
              <label for="coachInfo">INFORMACIÓN DEL ENTRENADOR:</label>
              <input type="text" v-model="equipo.experienciaEntrenador" id="coachInfo" required />
            </div>
            <div class="form-group file-upload">
              <label for="coachPhoto">INSERTAR FOTO DEL ENTRENADOR:</label>
              <input type="file" @change="onFileChange($event, 'entrenadorImg')" ref="coachFileInput" id="coachPhoto" accept="image/*" />
              <button type="button" @click="triggerFileInput('coachFileInput')">Seleccionar Archivo</button>
              <div v-if="equipo.entrenadorImg" class="image-preview">
                <img :src="equipo.entrenadorImg" alt="Preview Coach Photo" />
              </div>
            </div>
            <div class="form-group file-upload">
              <label for="escudoPhoto">INSERTAR IMAGEN DEL ESCUDO:</label>
              <input type="file" @change="onFileChange($event, 'escudo')" ref="escudoFileInput" id="escudoPhoto" accept="image/*" />
              <button type="button" @click="triggerFileInput('escudoFileInput')">Seleccionar Archivo</button>
              <div v-if="equipo.escudo" class="image-preview">
                <img :src="equipo.escudo" alt="Preview Escudo" />
              </div>
            </div>
            <div class="form-group file-upload">
              <label for="stadiumPhoto">INSERTAR FOTO DEL ESTADIO:</label>
              <input type="file" @change="onFileChange($event, 'estadioImg')" ref="stadiumFileInput" id="stadiumPhoto" accept="image/*" />
              <button type="button" @click="triggerFileInput('stadiumFileInput')">Seleccionar Archivo</button>
              <div v-if="equipo.estadioImg" class="image-preview">
                <img :src="equipo.estadioImg" alt="Preview Stadium Photo" />
              </div>
            </div>
  
            <!-- Sección para actualizar jugadores -->
            <div class="form-group">
              <h2>JUGADORES:</h2>
              <div v-for="(jugador, index) in equipo.jugadores" :key="index" class="jugador-form-group">
                <label>Nombre:</label>
                <input type="text" v-model="jugador.nombre" required />
  
                <label>Posición:</label>
                <input type="text" v-model="jugador.posicion" required />
  
                <label>Dorsal:</label>
                <input type="number" v-model="jugador.dorsal" required />
  
                <button type="button" @click="eliminarJugador(index)">Eliminar Jugador</button>
              </div>
              <button type="button" @click="agregarJugador">Agregar Jugador</button>
            </div>
  
            <button type="submit">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mostrarModal: false,
        equipo: {
          escudo: "https://seeklogo.com/images/L/LDU_QUITO-logo-462A2B53B2-seeklogo.com.png",
          imagen: "ruta/a/la/imagen.jpg",
          nombre: "Universitarios FC",
          entrenador: "Juan Pérez",
          entrenadorImg: "ruta/a/imagen/entrenador.jpg",
          experienciaEntrenador: "10 años",
          dueno: "Carlos García",
          duenoImg: "ruta/a/imagen/dueno.jpg",
          estadioImg: "ruta/a/imagen/estadio.jpg",
          infoEquipo: "Estadio Nacional",
          jugadores: [
            { nombre: "Jugador 1", posicion: "Delantero", dorsal: "2" },
            { nombre: "Jugador 2", posicion: "Mediocampista", dorsal: "5" },
            { nombre: "Jugador 3", posicion: "Defensa", dorsal: "7" },
            { nombre: "Jugador 4", posicion: "Portero", dorsal: "10" },
          ],
        },
      };
    },
    methods: {
      onFileChange(event, photoType) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.equipo[photoType] = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      triggerFileInput(refName) {
        this.$refs[refName].click();
      },
      submitForm() {
        // Lógica para manejar el envío del formulario
        console.log("Equipo actualizado:", this.equipo);
        // Aquí podrías hacer una llamada a una API para guardar los datos del equipo actualizados
        this.mostrarModal = false;
      },
      eliminarEquipo() {
        // Lógica para eliminar el equipo
        alert("Eliminar equipo");
      },
      agregarJugador() {
        this.equipo.jugadores.push({ nombre: "", posicion: "", dorsal: "" });
      },
      eliminarJugador(index) {
        this.equipo.jugadores.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .Equipo {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .header,
  .infoEquipo,
  .jugadores,
  .acciones {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .equipo-img img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  
  .nombre {
    text-align: center;
  }
  
  hr {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 10px 0;
  }
  
  .infoEquipo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .entrenador,
  .infoEntrenador,
  .dueñoEquipo,
  .infoEstadio {
    margin-bottom: 10px;
  }
  
  .jugadores ul {
    list-style: none;
    padding: 0;
  }
  
  .jugadores li {
    padding: 5px 0;
  }
  
  .acciones {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #00acac;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #009999;
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-content .close {
    float: right;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  .modal-content h1 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .file-upload {
    position: relative;
  }
  
  .file-upload input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-upload button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #00acac;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
  }
  
  .file-upload button:hover {
    background-color: #009999;
  }
  
  .file-upload span {
    display: block;
    margin-top: 10px;
    font-style: italic;
  }
  
  .file-upload .remove-button {
    background-color: #dc3545;
    margin-top: 10px;
  }
  
  .file-upload .remove-button:hover {
    background-color: #c82333;
  }
  
  .image-preview {
    margin-top: 10px;
    text-align: center;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 4px;
  }
  
  .jugador-form-group {
    margin-bottom: 10px;
  }
  </style>
  