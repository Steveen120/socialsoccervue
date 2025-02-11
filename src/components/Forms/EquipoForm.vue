<template>
    <form @submit.prevent="handleSubmit">
        <!-- Campo de nombre del equipo -->
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300">Nombre del equipo</label>
            <input v-model="teamName" type="text" placeholder="Ingrese el nombre del equipo"
                class="w-full p-2 border rounded-md" required />
            <span v-if="errors.teamName" class="text-red-500">{{ errors.teamName }}</span>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-center">
            <button type="submit" class="p-2 bg-primary-color text-white rounded-md">
                Agregar Equipo
            </button>
        </div>
    </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            teamName: "",
            errors: {},
        };
    },
    methods: {
        // Validación del formulario
        validateForm() {
            this.errors = {};
            let isValid = true;

            // Validar que el nombre del equipo no esté vacío
            if (!this.teamName) {
                this.errors.teamName = "El nombre del equipo es requerido.";
                isValid = false;
            } else if (this.teamName.length < 3 || this.teamName.length > 50) {
                // Validar longitud mínima y máxima
                this.errors.teamName =
                    "El nombre del equipo debe tener entre 3 y 50 caracteres.";
                isValid = false;
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.teamName)) {
                // Validar formato (solo letras y espacios)
                this.errors.teamName =
                    "El nombre del equipo solo puede contener letras y espacios.";
                isValid = false;
            }

            return isValid;
        },

        // Manejo del envío del formulario
        handleSubmit() {
            if (this.validateForm()) {
                // Simulación de lógica para agregar el equipo
                Swal.fire({
                    icon: "success",
                    title: "¡Agregado con éxito!",
                    text: "El equipo ha sido agregado correctamente.",
                }).then(() => {
                    this.$emit("close"); // Emitir evento para cerrar el formulario
                });
            }
        },
    },
};
</script>
