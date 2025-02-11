<template>
  <!-- Modal -->
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-1/2">
      <!-- Encabezado del modal -->
      <div class='bg-primary-color w-full h-full p-4 rounded-t-lg'>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold dark:text-white">{{ title }}</h2>
          <button @click="closeModal" class="text-2xl text-gray-300">&times;</button>
        </div>
      </div>
      <!-- Contenido del modal -->
      <div class="p-6 text-black dark:text-white">
        <!-- Renderiza el componente dinámico con los datos -->
        <div v-if="component">
          <component :is="component" :data="data" />
        </div>
        <!-- Botón para cerrar el modal -->
        <div class="flex justify-end pt-4">
          <button @click="closeModal" class="text-white bg-red-600 p-2 rounded-xl">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    component: {
      type: [String, Object],
      default: null
    },
    data: {
      type: Object,
      default: () => ({}) // Valor predeterminado para los datos
    }
  },
  methods: {
    // Emite el evento 'close' para cerrar el modal
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>
