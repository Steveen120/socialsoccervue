<template>
    <form @submit.prevent="handleSubmit">
        <!-- Campo de nombre del árbitro -->
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300">Nombre del árbitro</label>
            <input v-model="refereeName" type="text" placeholder="Ingrese el nombre del árbitro"
                class="w-full p-2 border rounded-md" required />
            <span v-if="errors.refereeName" class="text-red-500">{{ errors.refereeName }}</span>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-center">
            <button type="submit" class="p-2 bg-primary-color text-white rounded-md">
                Agregar Árbitro
            </button>
        </div>
    </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            refereeName: "",
            errors: {},
        };
    },
    methods: {
        // Validación del formulario
        validateForm() {
            this.errors = {};
            let isValid = true;

            // Validar que el nombre del árbitro no esté vacío
            if (!this.refereeName) {
                this.errors.refereeName = "El nombre del árbitro es requerido.";
                isValid = false;
            } else if (this.refereeName.length < 3 || this.refereeName.length > 50) {
                // Validar longitud mínima y máxima
                this.errors.refereeName =
                    "El nombre del árbitro debe tener entre 3 y 50 caracteres.";
                isValid = false;
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.refereeName)) {
                // Validar formato (solo letras y espacios)
                this.errors.refereeName =
                    "El nombre del árbitro solo puede contener letras y espacios.";
                isValid = false;
            }

            return isValid;
        },

        // Manejo del envío del formulario
        handleSubmit() {
            if (this.validateForm()) {
                // Simulación de lógica para agregar el árbitro
                Swal.fire({
                    icon: "success",
                    title: "¡Agregado con éxito!",
                    text: "El árbitro ha sido agregado correctamente.",
                }).then(() => {
                    this.$emit("close"); // Emitir evento para cerrar el formulario
                });
            }
        },
    },
};
</script>
