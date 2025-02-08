<template>
    <div class="create-team">
      <h1>Crea tu Equipo</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="teamName">Nombre del Equipo:</label>
          <input type="text" v-model="teamName" id="teamName" required>
        </div>
        <div>
          <label for="coachName">Nombre del Entrenador:</label>
          <input type="text" v-model="coachName" id="coachName" required>
        </div>
        <div>
          <label for="teamMembers">Miembros del Equipo:</label>
          <textarea v-model="teamMembers" id="teamMembers" required></textarea>
        </div>
        <div class="file-upload">
          <label for="teamPhoto">Inserta Foto del Equipo:</label>
          <input type="file" @change="onFileChange" ref="fileInput" id="teamPhoto" accept="image/*" required>
          <button type="button" @click="triggerFileInput">Seleccionar Archivo</button>
          <span v-if="teamPhoto">{{ teamPhoto.name }}</span>
          <button v-if="teamPhoto" type="button" class="remove-button" @click="removeFile">Eliminar Foto</button>
        </div>
        <button type="submit">Crear Equipo</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teamName: '',
        coachName: '',
        teamMembers: '',
        teamPhoto: null
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        this.teamPhoto = file;
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      removeFile() {
        this.teamPhoto = null;
        this.$refs.fileInput.value = null;
      },
      submitForm() {
        // Lógica para manejar el envío del formulario
        const teamData = {
          name: this.teamName,
          coach: this.coachName,
          members: this.teamMembers.split('\n'),
          photo: this.teamPhoto
        };
        console.log('Equipo creado:', teamData);
        // Aquí podrías hacer una llamada a una API para guardar los datos del equipo
      }
    }
  };
  </script>
  
  <style scoped>
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
  }
  .create-team form .file-upload button:hover {
    background-color: #0056b3;
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }
  .create-team form button:hover {
    background-color: #0056b3;
  }
  </style>
  