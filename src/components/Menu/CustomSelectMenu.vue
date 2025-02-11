<template>
    <div class="relative w-40">
      <!-- Botón del menú desplegable -->
      <div @click="toggleDropdown"
        class="p-3 rounded-lg bg-gradient-to-r from-[#38a169] to-[#2f855a] border border-green-700 text-white font-medium flex items-center justify-between cursor-pointer hover:bg-green-500 transition-all">
        {{ selectedLabel }}
        <font-awesome-icon :icon="isDropdownOpen ? 'chevron-up' : 'chevron-down'" class="ml-2 text-white" />
      </div>
  
      <!-- Lista desplegable -->
      <div v-if="isDropdownOpen" class="absolute mt-1 w-full rounded-lg shadow-lg bg-gradient-to-r from-[#2d3748] to-[#1a202c] z-10">
        <ul class="py-2 text-gray-200">
          <li v-for="option in options" :key="option.value" @click="selectOption(option)"
              class="cursor-pointer px-4 py-2 hover:bg-green-700 hover:text-white transition-all rounded-md">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Define las propiedades que recibe el componente
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  });
  
  // Define los eventos que emite el componente
  const emit = defineEmits(["update:modelValue"]);
  
  // Estado para controlar la visibilidad del menú desplegable
  const isDropdownOpen = ref(false);
  
  // Computed property para obtener la etiqueta de la opción seleccionada
  const selectedLabel = computed(() => {
    const selectedOption = props.options.find(
      (option) => option.value === props.modelValue
    );
    return selectedOption ? selectedOption.label : "Seleccione una opción";
  });
  
  // Función para alternar la visibilidad del menú desplegable
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  // Función para seleccionar una opción del menú
  const selectOption = (option) => {
    emit("update:modelValue", option.value);
    isDropdownOpen.value = false;
  };
  </script>
  
  <style scoped>
  /* Sombra para la lista desplegable */
  div[role="listbox"] {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Suavidad en las transiciones */
  .transition-all {
    transition: all 0.2s ease-in-out;
  }
  
  /* Mejorar las opciones del menú desplegable */
  li:hover {
    background-color: #38a169;
    color: white;
  }
  
  /* Estilo del botón */
  button {
    font-size: 1rem;
    font-weight: bold;
  }
  
  /* Estilo del contenedor del menú desplegable */
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  </style>
  