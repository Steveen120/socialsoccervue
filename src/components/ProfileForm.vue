<template>
  
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.nombre" type="text" />
          <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>
        </div>
        <div class="form-group">
          <label>Apellido</label>
          <input v-model="form.apellido" type="text" />
        </div>
        <div class="form-group">
          <label>Correo</label>
          <input v-model="form.correo" type="email" />
          <span v-if="errors.correo" class="error">{{ errors.correo }}</span>
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="form.contrasena" type="password" />
          <span v-if="errors.contrasena" class="error">{{ errors.contrasena }}</span>
        </div>
        <div class="form-group">
          <label>Foto</label>
          <input type="file" @change="handleFileUpload" />
          <div v-if="form.fotoUrl" class="photo-preview">
            <img :src="form.fotoUrl" alt="Foto previa" />
          </div>
        </div>
        <button type="submit" class="btn-submit">{{ isEdit ? 'Actualizar' : 'Guardar' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['initialProfile', 'isEdit'],
    data() {
      return {
        form: {
          nombre: this.initialProfile ? this.initialProfile.nombre : '',
          apellido: this.initialProfile ? this.initialProfile.apellido : '',
          correo: this.initialProfile ? this.initialProfile.correo : '',
          contrasena: this.initialProfile ? this.initialProfile.contrasena : '',
          foto: this.initialProfile ? this.initialProfile.foto : null,
          fotoUrl: this.initialProfile ? URL.createObjectURL(this.initialProfile.foto) : null
        },
        errors: {}
      };
    },
    watch: {
      initialProfile: {
        handler(newProfile) {
          if (newProfile) {
            this.form = { ...newProfile, fotoUrl: URL.createObjectURL(newProfile.foto) };
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      handleFileUpload(event) {
        this.form.foto = event.target.files[0];
        this.form.fotoUrl = URL.createObjectURL(this.form.foto);
      },
      submitForm() {
        this.errors = this.validateForm();
        if (Object.keys(this.errors).length === 0) {
          console.log(this.form); // Imprimir los datos del formulario en la consola
          this.$emit('submit', { ...this.form, fotoUrl: this.form.fotoUrl });
        }
      },
      validateForm() {
        const errors = {};
        if (this.form.nombre.length < 5) errors.nombre = 'El nombre debe tener al menos 5 caracteres';
        if (!this.form.correo.includes('@')) errors.correo = 'Correo inválido';
        if (this.form.contrasena.length < 10) errors.contrasena = 'La contraseña debe tener al menos 10 caracteres';
        return errors;
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    border: 2px solid #001f3f;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .error {
    color: red;
    font-size: 0.875em;
  }
  
  .photo-preview {
    margin-top: 10px;
  }
  
  .photo-preview img {
    max-width: 150px;
    max-height: 200px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .btn-submit {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  </style>
  