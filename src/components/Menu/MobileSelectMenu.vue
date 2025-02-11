<template>
    <div class="relative">
        <!-- Icono para abrir/cerrar el menú desplegable -->
        <span @click="toggleDropdown" class="cursor-pointer">
            <font-awesome-icon icon="chevron-down" class="text-white" />
        </span>
        <!-- Menú desplegable -->
        <div v-if="isDropdownOpen" class="absolute mt-1 w-[130px] rounded-md shadow-lg bg-white dark:bg-gray-800 z-10">
            <ul class="py-1 text-gray-700 dark:text-gray-200">
                <!-- Opciones del menú -->
                <li v-for="option in options" :key="option.value" @click="selectOption(option)"
                    class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2">
                    {{ option.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Define las propiedades que recibe el componente
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
});

// Define los eventos que emite el componente
const emit = defineEmits(['update:modelValue']);

// Estado para controlar la visibilidad del menú desplegable
const isDropdownOpen = ref(false);

// Función para alternar la visibilidad del menú desplegable
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Función para seleccionar una opción del menú
const selectOption = (option) => {
    emit('update:modelValue', option.value); // Emite el evento para actualizar el valor seleccionado
    isDropdownOpen.value = false; // Cierra el menú desplegable
};
</script>
