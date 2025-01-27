<template>
  <div class="login-container bg-bg-cards dark:bg-bg-cards-dark">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // Lógica para manejar el inicio de sesión
      console.log('Nombre de Usuario:', this.username);
      console.log('Contraseña:', this.password);
      // Aquí puedes agregar la lógica para autenticar al usuario
    }
  }
};
</script>

