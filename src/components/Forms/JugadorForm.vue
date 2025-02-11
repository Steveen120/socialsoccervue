<template>
    <form @submit.prevent="handleSubmit">
        <!-- Campo de nombre del jugador -->
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300">Nombre del jugador</label>
            <input v-model="playerName" type="text" placeholder="Ingrese el nombre del jugador"
                class="w-full p-2 border rounded-md" required />
            <span v-if="errors.playerName" class="text-red-500">{{ errors.playerName }}</span>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-center">
            <button type="submit" class="p-2 bg-primary-color text-white rounded-md">
                Agregar Jugador
            </button>
        </div>
    </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            playerName: "",
            errors: {},
        };
    },
    methods: {
        // Validación del formulario
        validateForm() {
            this.errors = {};
            let isValid = true;

            // Validar que el nombre del jugador no esté vacío
            if (!this.playerName) {
                this.errors.playerName = "El nombre del jugador es requerido.";
                isValid = false;
            } else if (this.playerName.length < 3 || this.playerName.length > 50) {
                // Validar longitud mínima y máxima
                this.errors.playerName =
                    "El nombre del jugador debe tener entre 3 y 50 caracteres.";
                isValid = false;
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.playerName)) {
                // Validar formato (solo letras y espacios)
                this.errors.playerName =
                    "El nombre del jugador solo puede contener letras y espacios.";
                isValid = false;
            }

            return isValid;
        },

        // Manejo del envío del formulario
        handleSubmit() {
            if (this.validateForm()) {
                // Simulación de lógica para agregar el jugador
                Swal.fire({
                    icon: "success",
                    title: "¡Agregado con éxito!",
                    text: "El jugador ha sido agregado correctamente.",
                }).then(() => {
                    this.$emit("close"); // Emitir evento para cerrar el formulario
                });
            }
        },
    },
};
</script>