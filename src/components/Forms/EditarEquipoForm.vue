<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Campo de Nombre -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Nombre:</label>
        <input v-model="team.Nombre" type="text" placeholder="Ingrese el nombre del equipo"
          class="w-full p-2 border rounded-md" required />
        <span v-if="errors.Nombre" class="text-red-500">{{ errors.Nombre }}</span>
      </div>

      <!-- Campo de Ciudad -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Ciudad:</label>
        <input v-model="team.Ciudad" type="text" placeholder="Ingrese la ciudad" class="w-full p-2 border rounded-md"
          required />
        <span v-if="errors.Ciudad" class="text-red-500">{{ errors.Ciudad }}</span>
      </div>

      <!-- Campo de Estadio -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Estadio:</label>
        <input v-model="team.Estadio" type="text" placeholder="Ingrese el nombre del estadio"
          class="w-full p-2 border rounded-md" required />
        <span v-if="errors.Estadio" class="text-red-500">{{ errors.Estadio }}</span>
      </div>

      <!-- Botón de envío -->
      <button type="submit" class="p-2 bg-primary-color text-white rounded-md">
        Guardar Cambios
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const team = ref({ ...props.item });
const errors = ref({});

// Validación del formulario
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  // Validar el campo "Nombre"
  if (!team.value.Nombre) {
    errors.value.Nombre = "El nombre es requerido.";
    isValid = false;
  } else if (team.value.Nombre.length < 3 || team.value.Nombre.length > 50) {
    errors.value.Nombre =
      "El nombre debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(team.value.Nombre)) {
    errors.value.Nombre =
      "El nombre solo puede contener letras y espacios.";
    isValid = false;
  }

  // Validar el campo "Ciudad"
  if (!team.value.Ciudad) {
    errors.value.Ciudad = "La ciudad es requerida.";
    isValid = false;
  } else if (team.value.Ciudad.length < 3 || team.value.Ciudad.length > 50) {
    errors.value.Ciudad =
      "La ciudad debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(team.value.Ciudad)) {
    errors.value.Ciudad =
      "La ciudad solo puede contener letras y espacios.";
    isValid = false;
  }

  // Validar el campo "Estadio"
  if (!team.value.Estadio) {
    errors.value.Estadio = "El estadio es requerido.";
    isValid = false;
  } else if (team.value.Estadio.length < 3 || team.value.Estadio.length > 50) {
    errors.value.Estadio =
      "El nombre del estadio debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-]+$/.test(team.value.Estadio)) {
    errors.value.Estadio =
      "El nombre del estadio solo puede contener letras, números, guiones y espacios.";
    isValid = false;
  }

  return isValid;
};

// Manejo del envío del formulario
const submitForm = () => {
  if (validateForm()) {
    Swal.fire({
      icon: "success",
      title: "¡Actualizado con éxito!",
      text: "Datos actualizados.",
    }).then(() => {
      this.$emit("close"); // Emitir evento para cerrar el formulario
    });
    console.log("Equipo actualizado:", team.value);
    // Aquí puedes emitir un evento o enviar los datos al backend
  }
};

// Observar cambios en la prop `item`
watch(
  () => props.item,
  (newVal) => {
    team.value = { ...newVal };
  }
);
</script>
