<template>
  <div class="login-container bg-bg-cards text-black dark:text-white dark:bg-bg-cards-dark">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Campo de nombre de usuario -->
      <div class="form-group">
        <label for="username">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Ingrese su nombre de usuario"
          required
        />
        <span v-if="errors.username" class="text-red-500">{{ errors.username }}</span>
      </div>

      <!-- Campo de contraseña -->
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Ingrese su contraseña"
          required
        />
        <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
      </div>

      <!-- Botón de inicio de sesión -->
      <button type="submit" class="login-button bg-primary-color">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errors = ref({});
const router = useRouter();

// Función para validar el formulario
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  // Validación del nombre de usuario
  if (!username.value) {
    errors.value.username = "El nombre de usuario es requerido.";
    isValid = false;
  } else if (username.value.length < 3 || username.value.length > 20) {
    errors.value.username =
      "El nombre de usuario debe tener entre 3 y 20 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    errors.value.username =
      "El nombre de usuario solo puede contener letras, números y guiones bajos.";
    isValid = false;
  }

  // Validación de la contraseña
  if (!password.value) {
    errors.value.password = "La contraseña es requerida.";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "La contraseña debe tener al menos 6 caracteres.";
    isValid = false;
  } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password.value)) {
    errors.value.password =
      "La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número.";
    isValid = false;
  }

  return isValid;
};

// Función para manejar el envío del formulario
const handleSubmit = () => {
  if (validateForm()) {
    // Simulación de autenticación
    if (username.value === "user" && password.value === "Password123") {
      localStorage.setItem("token", "your-auth-token");
      router.push("/").then(() => {
        window.location.reload();
      });
    } else {
      alert("Credenciales incorrectas");
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>

