<template>
  <div class="register-container text-black dark:text-white bg-bg-cards dark:bg-bg-cards-dark">
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Campo de Nombre -->
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Nombre"
          v-model="name"
          required
        />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>

      <!-- Campo de Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Example@gmail.com"
          v-model="email"
          required
        />
        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
      </div>

      <!-- Campo de Número de Teléfono -->
      <div class="form-group">
        <label for="phone">Número de Teléfono</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          placeholder="0000000000"
          required
        />
        <span v-if="errors.phone" class="text-red-500">{{ errors.phone }}</span>
      </div>

      <!-- Campo de Género -->
      <div class="form-group">
        <label for="gender">Género</label>
        <select id="gender" class="dark:text-black" v-model="gender" required>
          <option value="" disabled>Seleccione su género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <span v-if="errors.gender" class="text-red-500">{{ errors.gender }}</span>
      </div>

      <!-- Campo de Habilidades -->
      <div class="form-group">
        <label for="skills">Habilidades</label>
        <input
          type="text"
          id="skills"
          v-model="skills"
          placeholder="Ej. Corredor"
          required
        />
        <span v-if="errors.skills" class="text-red-500">{{ errors.skills }}</span>
      </div>

      <!-- Campo de Equipo -->
      <div class="form-group">
        <label for="team">Equipo al que Pertenece</label>
        <select id="team" v-model="team" class="dark:text-black" required>
          <option value="" disabled>Seleccione su equipo</option>
          <option value="FC Barcelona">FC Barcelona</option>
          <option value="Real Madrid">Real Madrid</option>
          <option value="Juventus">Juventus</option>
          <option value="Paris Saint-Germain">Paris Saint-Germain</option>
        </select>
        <span v-if="errors.team" class="text-red-500">{{ errors.team }}</span>
      </div>

      <!-- Botón de envío -->
      <button type="submit" class="register-button bg-primary-color">
        Registrar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const phone = ref("");
const gender = ref("");
const skills = ref("");
const team = ref("");
const errors = ref({});

// Validación del formulario
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  // Validar el campo "Nombre"
  if (!name.value) {
    errors.value.name = "El nombre es requerido.";
    isValid = false;
  } else if (name.value.length < 3 || name.value.length > 50) {
    errors.value.name = "El nombre debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.value)) {
    errors.value.name = "El nombre solo puede contener letras y espacios.";
    isValid = false;
  }

  // Validar el campo "Email"
  if (!email.value) {
    errors.value.email = "El email es requerido.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "El email no es válido.";
    isValid = false;
  }

  // Validar el campo "Número de Teléfono"
  if (!phone.value) {
    errors.value.phone = "El número de teléfono es requerido.";
    isValid = false;
  } else if (!/^\d{10}$/.test(phone.value)) {
    errors.value.phone = "El número de teléfono debe tener exactamente 10 dígitos.";
    isValid = false;
  }

  // Validar el campo "Género"
  if (!gender.value) {
    errors.value.gender = "El género es requerido.";
    isValid = false;
  }

  // Validar el campo "Habilidades"
  if (!skills.value) {
    errors.value.skills = "Las habilidades son requeridas.";
    isValid = false;
  } else if (skills.value.length < 3 || skills.value.length > 50) {
    errors.value.skills = "Las habilidades deben tener entre 3 y 50 caracteres.";
    isValid = false;
  }

  // Validar el campo "Equipo"
  if (!team.value) {
    errors.value.team = "El equipo es requerido.";
    isValid = false;
  }

  return isValid;
};

// Manejo del envío del formulario
const handleSubmit = () => {
  if (validateForm()) {
    // Lógica para manejar el registro del usuario
    console.log("Nombre:", name.value);
    console.log("Email:", email.value);
    console.log("Número de Teléfono:", phone.value);
    console.log("Género:", gender.value);
    console.log("Habilidades:", skills.value);
    console.log("Equipo:", team.value);
    // Aquí puedes agregar la lógica para registrar al usuario
  }
};
</script>

