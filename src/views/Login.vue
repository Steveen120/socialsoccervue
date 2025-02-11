<template>
  <div id="login-container">
    <div id="login-box">
      <div id="image-container"></div>
      <div id="form-container">
        <h2 style="font-size: 2em;">Social Soccer</h2>
        <p style="font-size: 1em;"> Por favor, ingrese los datos requeridos para iniciar sesión.</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="username" for="username"><i class="fa-solid fa-user"></i>  
               Nombre de usuario
            </label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label class="password" for="password">
              <i class="fa fa-key"></i> Contraseña
            </label>
            <input type="password" id="password" v-model="password"  required />
          </div>
          <button type="submit" class="login-button">Ingresar</button>
        </form>
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
        <p style="font-size: 1em;" class="register">¿No tienes una cuenta? <router-link to="/register" style="color:#009688 ;">Regístrate aquí</router-link></p>
      </div>
    </div>
    <div class="container_date">
        Copyright Social Soccer {{ new Date().getFullYear() }}
      </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


const username = ref('');
const password = ref('');
const loginError = ref('');


// Credenciales predefinidas (simulación)
const predefinedUsername = 'bryan@gmail.com';
const predefinedPassword = '12345';


const handleLogin = () => {
  if (username.value === predefinedUsername && password.value === predefinedPassword) {
    // Simulación de autenticación exitosa
    localStorage.setItem('loggedIn', 'true'); // Establecer estado de autenticación en localStorage
    router.push({ name: 'home' }); // Redirigir a la página de inicio después del login
  } else {
    loginError.value = 'Nombre de usuario o contraseña incorrectos';
  }
};
</script>


<style>
.container_date {
  text-align: center;
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
  #login-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6;
  }
  #login-box {
    display: flex;
    width: 60%;
    height: 40em;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  #image-container {
    width: 50%;
    background: url('../assets/imagen.jpg') no-repeat center center;
    background-size: cover;
  }
  #form-container {
    width: 50%;
    padding: 2rem;
    line-height: 2;
  }
  .password, .username {
    font-size: 1em;
  }
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
    font-size: 12px;
  }
  .form-group input {
    width: 90%;
    padding: 1rem;
    margin-bottom: 1em;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 12px;
  }
  .login-button {
    width: 100%;
    padding: 1rem;
    background-color: #009688;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
  }
  .login-button:hover {
    background-color: #00796b;
  }
  
  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 1em;
    margin-top: 10px;
    margin-bottom: 1em;
    border-radius: 0.5em;
    text-align: center;
  }
  .register {
    text-align: center;
    font-size: 12px;
    color: #555;
  }
  router-link {
    color: #00796b;
    text-decoration: none;
  }
  router-link:hover {
    color: #00796b;
  }
 
  @media (max-width: 768px) {
  #login-box {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
 
  #image-container {
    display: none;
  }
 
  #form-container {
    width: 100%;
    padding: 1rem;
  }
 
  .form-group input{
    width: 100%;
  }
 
  .login-button {
    font-size: 16px;
  }
 
  .container_date {
    font-size: 10px;
    padding: 5px;
  }
}
</style>