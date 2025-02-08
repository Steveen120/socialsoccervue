<template>
  <form @submit.prevent="handleSubmit">
    <div class="pb-4">
      <!-- Campo de Nombre -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Nombre:</label>
        <input v-model="formData.Nombre" type="text" placeholder="Nombre del jugador"
          class="w-full p-2 border rounded-md" required />
        <span v-if="errors.Nombre" class="text-red-500">{{ errors.Nombre }}</span>
      </div>

      <!-- Campo de Equipo -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Equipo:</label>
        <input v-model="formData.Equipo" type="text" placeholder="Equipo" class="w-full p-2 border rounded-md"
          required />
        <span v-if="errors.Equipo" class="text-red-500">{{ errors.Equipo }}</span>
      </div>

      <!-- Campo de Posición -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Posición:</label>
        <input v-model="formData.Posición" type="text" placeholder="Posición" class="w-full p-2 border rounded-md"
          required />
        <span v-if="errors.Posición" class="text-red-500">{{ errors.Posición }}</span>
      </div>
    </div>

    <!-- Botón de envío -->
    <button type="submit" class="p-2 bg-primary-color text-white rounded-md">
      Guardar Cambios
    </button>
  </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}), // Valor predeterminado para los datos
    },
  },
  data() {
    return {
      formData: { ...this.data }, // Copia los datos recibidos
      errors: {},
    };
  },
  methods: {
    // Validación del formulario
    validateForm() {
      this.errors = {};
      let isValid = true;

      // Validar el campo "Nombre"
      if (!this.formData.Nombre) {
        this.errors.Nombre = "El nombre es requerido.";
        isValid = false;
      } else if (this.formData.Nombre.length < 3 || this.formData.Nombre.length > 50) {
        this.errors.Nombre =
          "El nombre debe tener entre 3 y 50 caracteres.";
        isValid = false;
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.formData.Nombre)) {
        this.errors.Nombre =
          "El nombre solo puede contener letras y espacios.";
        isValid = false;
      }

      // Validar el campo "Equipo"
      if (!this.formData.Equipo) {
        this.errors.Equipo = "El equipo es requerido.";
        isValid = false;
      } else if (this.formData.Equipo.length < 3 || this.formData.Equipo.length > 50) {
        this.errors.Equipo =
          "El nombre del equipo debe tener entre 3 y 50 caracteres.";
        isValid = false;
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.formData.Equipo)) {
        this.errors.Equipo =
          "El nombre del equipo solo puede contener letras y espacios.";
        isValid = false;
      }

      // Validar el campo "Posición"
      if (!this.formData.Posición) {
        this.errors.Posición = "La posición es requerida.";
        isValid = false;
      } else if (
        !["Portero", "Defensa", "Mediocampista", "Delantero"].includes(
          this.formData.Posición
        )
      ) {
        this.errors.Posición =
          "La posición debe ser una de las siguientes: Portero, Defensa, Mediocampista, Delantero.";
        isValid = false;
      }

      return isValid;
    },

    // Manejo del envío del formulario
    handleSubmit() {
      if (this.validateForm()) {
        Swal.fire({
          icon: "success",
          title: "¡Actualizado con éxito!",
          text: "Datos actualizados.",
        }).then(() => {
          this.$emit("close"); // Emitir evento para cerrar el formulario
        });
        console.log("Datos actualizados:", this.formData);
        // Emitir un evento o enviar los datos al backend
        this.$emit("submit", this.formData); // Emitir los datos al componente padre
      }
    },
  },
};
</script>
