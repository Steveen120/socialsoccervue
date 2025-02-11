<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-black">Editar Árbitro</h2>
    <form @submit.prevent="submitForm">
      <!-- Campo de Nombre -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Nombre:</label>
        <input v-model="referee.Nombre" type="text" placeholder="Ingrese el nombre del árbitro"
          class="w-full p-2 border rounded-md" required />
        <span v-if="errors.Nombre" class="text-red-500">{{ errors.Nombre }}</span>
      </div>

      <!-- Campo de Experiencia -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Experiencia:</label>
        <input v-model="referee.Experiencia" type="text" placeholder="Ingrese la experiencia (ej. '10 años')"
          class="w-full p-2 border rounded-md" required />
        <span v-if="errors.Experiencia" class="text-red-500">{{ errors.Experiencia }}</span>
      </div>

      <!-- Campo de Partidos Arbitrados -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Partidos Arbitrados:</label>
        <input v-model.number="referee['Partidos Arbitrados']" type="number"
          placeholder="Ingrese el número de partidos arbitrados" class="w-full p-2 border rounded-md" required />
        <span v-if="errors['Partidos Arbitrados']" class="text-red-500">{{ errors['Partidos Arbitrados'] }}</span>
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

const referee = ref({ ...props.item });
const errors = ref({});

// Validación del formulario
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  // Validar el campo "Nombre"
  if (!referee.value.Nombre) {
    errors.value.Nombre = "El nombre es requerido.";
    isValid = false;
  } else if (referee.value.Nombre.length < 3 || referee.value.Nombre.length > 50) {
    errors.value.Nombre =
      "El nombre debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(referee.value.Nombre)) {
    errors.value.Nombre =
      "El nombre solo puede contener letras y espacios.";
    isValid = false;
  }

  // Validar el campo "Experiencia"
  if (!referee.value.Experiencia) {
    errors.value.Experiencia = "La experiencia es requerida.";
    isValid = false;
  } else if (referee.value.Experiencia.length < 3 || referee.value.Experiencia.length > 50) {
    errors.value.Experiencia =
      "La descripción de la experiencia debe tener entre 3 y 50 caracteres.";
    isValid = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-]+$/.test(referee.value.Experiencia)) {
    errors.value.Experiencia =
      "La experiencia solo puede contener letras, números, guiones y espacios.";
    isValid = false;
  }

  // Validar el campo "Partidos Arbitrados"
  if (!referee.value["Partidos Arbitrados"] && referee.value["Partidos Arbitrados"] !== 0) {
    errors.value["Partidos Arbitrados"] = "El número de partidos arbitrados es requerido.";
    isValid = false;
  } else if (referee.value["Partidos Arbitrados"] < 0) {
    errors.value["Partidos Arbitrados"] =
      "El número de partidos arbitrados no puede ser negativo.";
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
    console.log("Árbitro actualizado:", referee.value);
    // Aquí puedes emitir un evento o enviar los datos al backend
  }
};

// Observar cambios en la prop `item`
watch(
  () => props.item,
  (newVal) => {
    referee.value = { ...newVal };
  }
);
</script>
