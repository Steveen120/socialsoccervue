<template>
  <div class="container mx-auto px-5">
    <div class="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden" id="contenedor">

      <!-- Sección Izquierda (Formulario) -->
      <div class="w-full md:w-1/2 p-4 sm:p-8 lg:p-14">
        <h1 class="text-black text-3xl mb-3 text-center">SOCIAL SOCCER</h1>
        <p class="mb-4 text-black text-center" id="descripcion">Únete a Social Soccer y vive la pasión del fútbol</p>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input type="text" placeholder="Nombre"
                class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" v-model="name" required>
              <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
            </div>
            <div>
              <input type="email" placeholder="Email"
                class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" v-model="email" required>
              <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>
          </div>

          <div class="mt-4">
            <input type="tel" placeholder="Número de Teléfono"
              class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" v-model="phone" required>
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
          </div>

          <div class="mt-4">
            <select v-model="gender"
              class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" required>
              <option value="">Selecciona tu género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</span>
          </div>

          <div class="mt-4">
            <input type="text" placeholder="Habilidades"
              class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" v-model="skills" required>
          </div>

          <div class="mt-4">
            <select v-model="team"
              class="border border-gray-400 py-3 px-3 w-full text-black rounded-lg" required>
              <option value="" disabled>Seleccione su equipo</option>
              <option value="FC Barcelona">FC Barcelona</option>
              <option value="Real Madrid">Real Madrid</option>
              <option value="Juventus">Juventus</option>
              <option value="Paris Saint-Germain">Paris Saint-Germain</option>
            </select>
            <span v-if="errors.team" class="text-red-500 text-sm">{{ errors.team }}</span>
          </div>

          <div class="mt-5">
            <button class="w-full py-3 text-center text-white font-bold rounded-lg" id="boton-registro">
              ¡Regístrate Ahora!
            </button>
          </div>
        </form>
      </div>

      <!-- Sección Derecha (Imagen) -->
      <div class="w-full md:w-1/2 flex items-center justify-center bg-no-repeat bg-center"
           style="background-image: url('src/assets/images/logo.svg'); background-size: 50%; background-color: #0D182E;">
      </div>
    </div>
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

// Función de validación
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!name.value || name.value.length < 3 || name.value.length > 50) {
    errors.value.name = "El nombre debe tener entre 3 y 50 caracteres.";
    isValid = false;
  }
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "El email no es válido.";
    isValid = false;
  }
  if (!phone.value || !/^\d{10}$/.test(phone.value)) {
    errors.value.phone = "Debe ser un número de 10 dígitos.";
    isValid = false;
  }
  if (!gender.value) {
    errors.value.gender = "El género es requerido.";
    isValid = false;
  }
  if (!team.value) {
    errors.value.team = "Selecciona un equipo.";
    isValid = false;
  }
  return isValid;
};

// Manejo del envío del formulario
const handleSubmit = () => {
  if (validateForm()) {
    console.log("Registro exitoso:", {
      name: name.value,
      email: email.value,
      phone: phone.value,
      gender: gender.value,
      skills: skills.value,
      team: team.value
    });
  }
};
</script>

<style>
/* Estilos generales */
h1 {
  text-align: center;
}

#contenedor{
  margin-top: 5em;
}

/* Color de la descripción */
#descripcion {
  color: rgb(48, 47, 47);
}

/* Estilos del botón */
#boton-registro {
  background-color: #0D182E;
  margin-top: 7px;
  border-radius: 5px;
}

#boton-registro:hover {
  background-color: #2a3650;
  transform: scale(1.05);
}

/* Media Queries */
@media (max-width: 768px) {  
  h1 {
    font-size: 1.8rem;
  }
  #descripcion {
    font-size: 0.9rem;
  }
  input, select {
    font-size: 0.9rem;
    padding: 10px;
  }
  #boton-registro {
    font-size: 1rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {  
  h1 {
    font-size: 1.5rem;
  }
  #descripcion {
    font-size: 0.8rem;
  }
  input, select {
    font-size: 0.8rem;
    padding: 8px;
  }
  #boton-registro {
    font-size: 0.9rem;
    padding: 8px;
  }
}

@media (min-width: 2560px) {
  h1 {
    font-size: 3rem;
  }
  #descripcion {
    font-size: 1.2rem;
  }
  input, select {
    font-size: 1.1rem;
    padding: 14px;
  }
  #boton-registro {
    font-size: 1.2rem;
    padding: 14px;
  }
}
</style>
