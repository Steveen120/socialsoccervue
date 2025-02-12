<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="login-box flex flex-col md:flex-row bg-white text-[#00ffc1] dark:bg-bg-cards-dark shadow-lg rounded-lg overflow-hidden w-full max-w-3xl min-h-[750px]">
      <!-- Logo en versión responsive (visible solo en móviles) -->
      <div class="logo-container-mobile flex md:hidden justify-center bg-black p-6">
        <img src="/src/assets/images/logo.svg" alt="logo" class="max-w-[120px] svg-logo">
      </div>

      <!-- Sección del Logo (oculto en móviles) -->
      <div class="logo-container hidden md:flex flex-grow items-center justify-center bg-black p-8">
        <img src="/src/assets/images/logo.svg" alt="logo" class="max-w-[180px] svg-logo">
      </div>

      <!-- Sección del Formulario -->
      <div class="form-container p-8 md:w-3/4 w-full flex flex-col justify-center">
        <h1 class="text-3xl font-semibold mb-6 text-center">INICIAR SESIÓN</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="username" class="block text-lg font-medium">Nombre de Usuario</label>
            <input type="text" id="username" v-model="username" placeholder="Ingrese su nombre de usuario" required class="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring focus:border-green-500" />
            <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
          </div>

          <div>
            <label for="password" class="block text-lg font-medium">Contraseña</label>
            <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required class="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring focus:border-green-500" />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>

          <button type="submit" class="w-full bg-[#0D182E] text-white py-3 text-lg rounded-md hover:bg-green-700 transition">
            INICIAR SESIÓN
          </button>
        </form>

        <!-- Texto de "No estás registrado" -->
        <p class="text-center mt-4 text-lg">
          ¿No estás registrado? 
          <router-link to="/registrar" class="text-white hover:underline">
            Regístrate aquí
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errors = ref({});
const router = useRouter();

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!username.value) {
    errors.value.username = "El nombre de usuario es requerido.";
    isValid = false;
  } else if (username.value.length < 3 || username.value.length > 20) {
    errors.value.username = "Debe tener entre 3 y 20 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    errors.value.username = "Solo letras, números y guiones bajos.";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "La contraseña es requerida.";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "Debe tener al menos 6 caracteres.";
    isValid = false;
  } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password.value)) {
    errors.value.password = "Debe incluir mayúscula, minúscula y número.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    if (username.value === "user" && password.value === "Password123") {
      localStorage.setItem("token", "your-auth-token");
      router.push("/inicio");
    } else {
      alert("Credenciales incorrectas");
    }
  }
};
</script>

<style scoped>
.login-box {
  max-width: 1100px; 
  min-height: 750px; 
  border: 2px solid #4caf4f; 
}

.logo-container{
  background-color: #0D182E; /* Asegura fondo negro en ambas versiones */
  width: 50%;
  display: flex;
  align-items: center; 
  justify-content: center; 

}

.form-container {
  width: 100%;
  background: url('/src/assets/images/fondo.webp') no-repeat center center;
}



@media (max-width: 765px) {
  .logo-container {
    display: none;
  }
}
</style>
