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

  <div class="container-one">
    <div class="datos-container">
      <h2 class="titulo">Perfil del Administrador</h2>
      <div class="card-list" v-if="datosGuardados.length">
        <div class="card" v-for="(dato, index) in datosGuardados" :key="index">
          <div class="card-header">
            <h3>{{ dato.liga.nombre }}</h3>
          </div>
          <div class="card-body">
            <div class="left-section">
              <img v-if="dato.administrador.imagen" :src="dato.administrador.imagen" alt="Imagen del Administrador" class="card-img">
            </div>
            <div class="right-section">
              <p style="color: black;"><strong>Nombre:</strong> <br>{{ dato.administrador.nombre }}</p>
              <p style="color: black;"><strong>Apellido:</strong> <br>{{ dato.administrador.apellido }}</p>
              <p style="color: black;"><strong>Correo:</strong> <br>{{ dato.administrador.correo }}</p>
              <p style="color: black;"><strong>Rol:</strong> <br>{{ dato.administrador.rol }}</p>
              <p style="color: black;"><strong>Número:</strong> <br>{{ dato.administrador.numero }}</p>
              <div class="card-buttons">
                <button type="button" @click="editarDato(index)">Editar</button>
                <button type="button" @click="confirmarEliminar(index)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn add" @click="openAddModal">Agregar Perfil</button>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      <form @submit.prevent="guardarDatos" class="form-container">
        <div class="form-group">
          <label for="nombre_administrador">Nombre:</label>
          <input type="text" id="nombre_administrador" v-model="administrador.nombre" required>
          <span v-if="errors.administradorNombre" class="error">{{ errors.administradorNombre }}</span>
        </div>
        <div class="form-group">
          <label for="apellido_administrador">Apellido:</label>
          <input type="text" id="apellido_administrador" v-model="administrador.apellido" required>
          <span v-if="errors.administradorApellido" class="error">{{ errors.administradorApellido }}</span>
        </div>
        <div class="form-group">
          <label for="correo_administrador">Correo:</label>
          <input type="email" id="correo_administrador" v-model="administrador.correo" required>
          <span v-if="errors.administradorCorreo" class="error">{{ errors.administradorCorreo }}</span>
        </div>
        <div class="form-group">
          <label for="rol_administrador">Rol:</label>
          <select id="rol_administrador" v-model="administrador.rol" required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="Usuario">Usuario</option>
            <option value="Árbitro">Árbitro</option>
            <option value="Administrador">Administrador</option>
            <option value="Jugador">Jugador</option>
          </select>
          <span v-if="errors.administradorRol" class="error">{{ errors.administradorRol }}</span>
        </div>
        <div class="form-group">
          <label for="numero_administrador">Número:</label>
          <input type="tel" id="numero_administrador" v-model="administrador.numero" required>
          <span v-if="errors.administradorNumero" class="error">{{ errors.administradorNumero }}</span>
        </div>
        <div class="form-group center-img">
          <label for="foto_administrador">Foto:</label>
          <input type="file" id="foto_administrador" @change="handleImagenChange">
          <div v-if="administrador.imagen" class="imagen-container">
            <img :src="administrador.imagen" alt="Imagen del Administrador" class="preview-img">
            <button class="button" type="button" @click="eliminarImagen">Eliminar Imagen</button>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn save">{{ modalTitle === 'Agregar Perfil' ? 'Agregar' : 'Guardar' }}</button>
          <button type="button" class="btn cancel" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <div v-if="mostrarModal" class="modal-overlay1">
    <div class="modal1">
      <p style="font-size: 20px;">¿Desea eliminar este dato?</p>
      <button style="margin-right:10px" class="btn confirm" @click="eliminarDato(confirmarIndex)">Sí</button>
      <button class="btn cancel" @click="cerrarModal">No</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const liga = ref({
  nombre: ''
});

const administrador = ref({
  nombre: '',
  apellido: '',
  correo: '',
  rol: '',
  numero: '',
  imagen: ''
});

const info = ref({
  info: ''
});

const errors = ref({});
const datosGuardados = ref([
  {
    liga: { nombre: 'Perfil' },
    administrador: { nombre: 'Bryan', apellido: 'Chicaiza', correo: 'bryan@example.com', rol: 'Administrador', numero: '1234567890', imagen: 'https://via.placeholder.com/150' }
  }
]);

const showModal = ref(false);
const modalTitle = ref('');
const confirmarIndex = ref(null);
const mostrarModal = ref(false);

const validateForm = (fieldValue, fieldName) => {
  const errors = {};
  if (fieldValue.length < 5) {
    errors[fieldName] = 'El campo debe tener al menos 5 caracteres';
  }
  return errors;
};

const handleImagenChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      administrador.value.imagen = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const eliminarImagen = () => {
  administrador.value.imagen = '';
};

const guardarDatos = () => {
  errors.value = {
    ...validateForm(administrador.value.nombre, 'administradorNombre'),
    ...validateForm(administrador.value.apellido, 'administradorApellido'),
    ...validateForm(administrador.value.correo, 'administradorCorreo'),
    ...validateForm(administrador.value.rol, 'administradorRol'),
    ...validateForm(administrador.value.numero, 'administradorNumero')
  };
  if (Object.keys(errors.value).length === 0) {
    const datos = {
      liga: { ...liga.value },
      administrador: { ...administrador.value },
      info: { ...info.value }
    };
    if (modalTitle.value === 'Agregar Perfil') {
      datosGuardados.value.push(datos);
    } else {
      datosGuardados.value[confirmarIndex.value] = datos;
    }
    liga.value.nombre = '';
    administrador.value.nombre = '';
    administrador.value.apellido = '';
    administrador.value.correo = '';
    administrador.value.rol = '';
    administrador.value.numero = '';
    administrador.value.imagen = '';
    closeModal();
  }
};

const openAddModal = () => {
  modalTitle.value = 'Agregar Perfil';
  showModal.value = true;
};

const editarDato = (index) => {
  const dato = datosGuardados.value[index];
  liga.value = { ...dato.liga };
  administrador.value = { ...dato.administrador };
  info.value = { ...dato.info };
  confirmarIndex.value = index;
  modalTitle.value = 'Editar Perfil';
  showModal.value = true;
};

const confirmarEliminar = (index) => {
  confirmarIndex.value = index;
  mostrarModal.value = true;
};

const eliminarDato = (index) => {
  datosGuardados.value.splice(index, 1);
  cerrarModal();
};

const closeModal = () => {
  showModal.value = false;
  confirmarIndex.value = null;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  confirmarIndex.value = null;
};
const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
}
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

.container-one {
  max-width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr)); /* Crear columnas adaptables con un ancho mínimo */
  gap: 20px; /* Espacio entre las tarjetas */
  justify-content: center; /* Centra las tarjetas en el contenedor */
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.card-header {
  border-bottom: 1px solid #ddd;
  color: whitesmoke;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  background-color: #001529;
}

.card-body {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.left-section {
  flex: 0 0 30%;
}

.right-section {
  flex: 1;
  padding-left: 20px;
}

.card-img {
  max-width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  height: auto;
  display: block;
  margin-top: 20px;
}

.card-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
}

.card-buttons button {
  background-color: #008CBA;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card-buttons button:hover {
  background-color: #1762a3;
}

@media screen and (max-width: 768px) {
  .card-list {
    grid-template-columns: 1fr;
  }
}

/* Estilos adicionales */
.campeonato {
  max-width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/*error alerta*/
.modal-overlay1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal1 {
  background-color: white;
  padding: 20px;
  font-size: 1.5em;
  line-height: 2;
  border-radius: 10px;
  text-align: center;
  margin: 7px;
}

/*estilos formularios*/
.form-container {
  max-width: 600px; /* Ancho máximo reducido */
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 10px; /* Espacio reducido entre grupos de formulario */
}

label {
  display: block;
  margin-bottom: 5px;
  color: black;
}

input[type="text"],
textarea,
input[type="file"],
select {
  width: 100%; /* Ancho completo */
  padding: 6px; /* Espaciado reducido */
  border: 1px solid black;
  border-radius: 4px; /* Bordes más redondeados */
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

.btn.add {
  margin: 20px;
}

.btn.save {
  background-color: #00acac;
}

.btn.save:hover {
  background-color: #808a93;
}

.btn.cancel {
  background-color: #00acac;
}

.btn.cancel:hover {
  background-color: #808a93;
}

.button {
  margin-top: 10px;
  background-color: #00acac;
  color: white;
  border: none;
  padding: 4px;
  border-radius: 4px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  width: 40%;
  border-radius: 8px;
  padding: 20px;
}

.preview-img {
  max-width: 100px;
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 10px;
}

.imagen-container {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center; /* Alinea la imagen al centro */
}

.form-actions {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 80%;
    font-size: 14px;
  }
}
</style>
