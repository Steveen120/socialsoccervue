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
  <div class="gestion-equipos">
    <div class="equipos-lista">
      <h2>Equipos</h2>
      <hr>
      <div class="equipos-container">
        <div class="equipo-item" v-for="equipo in equipos" :key="equipo.id">
          <div class="equipo-card">
            <div class="equipo-img">
              <img :src="equipo.imagen" alt="Imagen del equipo">
            </div>
            <div class="equipo-details">
              <p><strong>{{ equipo.nombre }}</strong></p>
            </div>
            <button @click="verEquipo(equipo)">Ver Equipo</button>
          </div>
        </div>
        <div class="equipo-item agregar-equipo" @click="mostrarFormulario">
          <div class="equipo-card">
            <div class="equipo-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path fill-rule="evenodd" d="M7,13 C3.6862915,13 1,10.3137085 1,7 C1,3.6862915 3.6862915,1 7,1 C10.3137085,1 13,3.6862915 13,7 C13,10.3137085 10.3137085,13 7,13 Z M8,8 L10,8 C10.5522847,8 11,7.55228475 11,7 C11,6.44771525 10.5522847,6 10,6 L8,6 L8,4 C8,3.44771525 7.55228475,3 7,3 C6.44771525,3 6,3.44771525 6,4 L6,6 L4,6 C3.44771525,6 3,6.44771525 3,7 C3,7.55228475 3.44771525,8 4,8 L6,8 L6,10 C6,10.5522847 6.44771525,11 7,11 C7.55228475,11 8,10.5522847 8,10 L8,8 Z"/>
              </svg>
            </div>
            <div class="equipo-details">
              <p><strong>Agregar Equipo</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="formularioVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="ocultarFormulario">&times;</span>
        <div class="create-team">
          <h1>Crea tu Equipo</h1>
          <form @submit.prevent="submitForm">
            <div>
              <label for="teamName">NOMBRE DEL EQUIPO:</label>
              <input type="text" v-model="teamName" id="teamName" required>
            </div>
            <div>  
              <label for="infoTeam">INFORMACIÓN DEL EQUIPO:</label>
              <input type="text" v-model="infoTeam" id="infoTeam" required>
            </div>
            <div>
              <label for="ownerName">DUEÑO DEL EQUIPO:</label>
              <input type="text" v-model="ownerName" id="ownerName" required>
            </div>
            <div class="file-upload">
              <label for="ownerPhoto">INSERTAR FOTO DEL DUEÑO DEL EQUIPO:</label>
              <input type="file" @change="onFileChange($event, 'ownerPhoto', 'ownerPhotoUrl')" ref="ownerFileInput" id="ownerPhoto" accept="image/*" required>
              <button type="button" @click="triggerFileInput('ownerFileInput')">Seleccionar Archivo</button>
              <span v-if="ownerPhoto">{{ ownerPhoto.name }}</span>
              <button v-if="ownerPhoto" type="button" class="remove-button" @click="removeFile('ownerPhoto', 'ownerPhotoUrl', 'ownerFileInput')">Eliminar Foto</button>
              <div v-if="ownerPhotoUrl" class="image-preview">
                <img :src="ownerPhotoUrl" alt="Preview Owner Photo">
              </div>
            </div>
            <div>
              <label for="coachName">NOMBRE DEL ENTRENADOR:</label>
              <input type="text" v-model="coachName" id="coachName" required>
            </div>
            <div>
              <label for="coachInfo">INFORMACIÓN DEL ENTRENADOR:</label>
              <input type="text" v-model="coachInfo" id="coachInfo" required>
            </div>
            <div class="file-upload">
              <label for="coachPhoto">INSERTAR FOTO DEL ENTRENADOR:</label>
              <input type="file" @change="onFileChange($event, 'coachPhoto', 'coachPhotoUrl')" ref="coachFileInput" id="coachPhoto" accept="image/*" required>
              <button type="button" @click="triggerFileInput('coachFileInput')">Seleccionar Archivo</button>
              <span v-if="coachPhoto">{{ coachPhoto.name }}</span>
              <button v-if="coachPhoto" type="button" class="remove-button" @click="removeFile('coachPhoto', 'coachPhotoUrl', 'coachFileInput')">Eliminar Foto</button>
              <div v-if="coachPhotoUrl" class="image-preview">
                <img :src="coachPhotoUrl" alt="Preview Coach Photo">
              </div>
            </div>
            <div class="file-upload">
              <label for="teamPhoto">INSERTAR FOTO DEL EQUIPO:</label>
              <input type="file" @change="onFileChange($event, 'teamPhoto', 'teamPhotoUrl')" ref="teamFileInput" id="teamPhoto" accept="image/*" required>
              <button type="button" @click="triggerFileInput('teamFileInput')">Seleccionar Archivo</button>
              <span v-if="teamPhoto">{{ teamPhoto.name }}</span>
              <button v-if="teamPhoto" type="button" class="remove-button" @click="removeFile('teamPhoto', 'teamPhotoUrl', 'teamFileInput')">Eliminar Foto</button>
              <div v-if="teamPhotoUrl" class="image-preview">
                <img :src="teamPhotoUrl" alt="Preview Team Photo">
              </div>
            </div>
            <div>
              <label for="teamMembers">MIEMBROS DEL EQUIPO:</label>
              <textarea v-model="teamMembers" id="teamMembers" required></textarea>
            </div>
            <button type="submit">Crear Equipo</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const equipos = ref([
  { id: 2, nombre: 'universitarios fc', imagen: 'https://seeklogo.com/images/L/LDU_QUITO-logo-462A2B53B2-seeklogo.com.png' }
]);

const formularioVisible = ref(false);

const verEquipo = () => {
  router.push('/equipo')
};

const agregarEquipo = () => {
  router.push('/crearequipo');
};

const mostrarFormulario = () => {
  formularioVisible.value = true;
};

const ocultarFormulario = () => {
  formularioVisible.value = false;
};

const teamName = ref('');
const infoTeam = ref('');
const ownerName = ref('');
const coachName = ref('');
const coachInfo = ref('');
const teamMembers = ref('');
const ownerPhoto = ref(null);
const coachPhoto = ref(null);
const teamPhoto = ref(null);
const ownerPhotoUrl = ref(null);
const coachPhotoUrl = ref(null);
const teamPhotoUrl = ref(null);

const onFileChange = (event, photoType, photoUrlType) => {
  const file = event.target.files[0];
  if (photoType === 'ownerPhoto') {
    ownerPhoto.value = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        ownerPhotoUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      ownerPhotoUrl.value = null;
    }
  } else if (photoType === 'coachPhoto') {
    coachPhoto.value = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        coachPhotoUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      coachPhotoUrl.value = null;
    }
  } else if (photoType === 'teamPhoto') {
    teamPhoto.value = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        teamPhotoUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      teamPhotoUrl.value = null;
    }
  }
};

const triggerFileInput = (inputRefName) => {
  let inputRef = ref(null);
  if (inputRefName === 'ownerFileInput') {
    inputRef = ownerFileInput;
  } else if (inputRefName === 'coachFileInput') {
    inputRef = coachFileInput;
  } else if (inputRefName === 'teamFileInput') {
    inputRef = teamFileInput;
  }
  if (inputRef.value) {
    inputRef.value.click();
  }
};

const removeFile = (photoType, photoUrlType, inputRefName) => {
  if (photoType === 'ownerPhoto') {
    ownerPhoto.value = null;
    ownerPhotoUrl.value = null;
    ref(ownerFileInput).value.value = '';
  } else if (photoType === 'coachPhoto') {
    coachPhoto.value = null;
    coachPhotoUrl.value = null;
    ref(coachFileInput).value.value = '';
  } else if (photoType === 'teamPhoto') {
    teamPhoto.value = null;
    teamPhotoUrl.value = null;
    ref(teamFileInput).value.value = '';
  }
};

const submitForm = () => {
  const newTeam = {
    id: Date.now(),
    nombre: teamName.value,
    infoTeam: infoTeam.value,
    ownerName: ownerName.value,
    coachName: coachName.value,
    coachInfo: coachInfo.value,
    teamMembers: teamMembers.value,
    ownerPhoto: ownerPhotoUrl.value,
    coachPhoto: coachPhotoUrl.value,
    teamPhoto: teamPhotoUrl.value
  };

  equipos.value.push(newTeam);

  teamName.value = '';
  infoTeam.value = '';
  ownerName.value = '';
  coachName.value = '';
  coachInfo.value = '';
  teamMembers.value = '';
  ownerPhoto.value = null;
  coachPhoto.value = null;
  teamPhoto.value = null;
  ownerPhotoUrl.value = null;
  coachPhotoUrl.value = null;
  teamPhotoUrl.value = null;

  ocultarFormulario();
  router.push('/equipos');
};
</script>
<style scoped>
hr {
  max-width: 600px;
  border-color: #00ACAC;
}

.gestion-equipos {
  padding: 0px 0px 0px 50px;
  text-transform: uppercase;
  font-weight: bold;
}

h2 {
  color: #001529;
  text-align: center;
}

.equipos-lista {
  margin-top: 20px;
}

.equipos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.equipo-item {
  width: calc(22.22% - 10px);
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 5px;
  color: #595959;
  position: relative;
  box-sizing: border-box;
  cursor: pointer; /* Añadido para indicar que la tarjeta es clickeable */
}

.equipo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.equipo-img {
  margin-bottom: 10px;
}

.equipo-img img {
  max-width: 80px;
  height: auto;
  border-radius: 4px;
}

.equipo-details {
  margin-bottom: 10px;
}

.equipo-card button {
  background-color: #00ACAC;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}

.equipo-card button:hover {
  background-color: #808a93;
}

.agregar-equipo .equipo-img svg {
  fill: #00ACAC;
  width: 50px;
  height: 50px;
}

/* Estilos del modal */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

/* Estilos del formulario */
.create-team {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.create-team h1 {
  text-align: center;
}

.create-team form div {
  margin-bottom: 15px;
}

.create-team form label {
  display: block;
  margin-bottom: 5px;
}

.create-team form input,
.create-team form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.create-team form .file-upload {
  position: relative;
}

.create-team form .file-upload input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.create-team form .file-upload button {
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

.create-team form .file-upload button:hover {
  background-color: #009999;
}

.create-team form .file-upload span {
  display: block;
  margin-top: 10px;
  font-style: italic;
}

.create-team form .file-upload .remove-button {
  background-color: #dc3545;
  margin-top: 10px;
}

.create-team form .file-upload .remove-button:hover {
  background-color: #c82333;
}

.create-team form button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #00acac;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.create-team form button:hover {
  background-color: #009999;
}

.create-team .image-preview {
  margin-top: 10px;
  text-align: center;
}

.create-team .image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
}

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

</style>
