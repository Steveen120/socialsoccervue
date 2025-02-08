<template>
  <div class="overflow-x-auto shadow-lg rounded-lg">
    <table class="min-w-full table-auto bg-white dark:bg-bg-dark overflow-hidden">
      <thead class="bg-bg-cards dark:bg-bg-cards-dark text-gray-800 dark:text-gray-200">
        <tr>
          <!-- Encabezados -->
          <th v-for="(header, index) in headers" :key="index"
            class="p-4 text-left text-sm font-semibold tracking-wide border-b border-gray-400 dark:border-gray-400">
            {{ header }}
          </th>
          <!-- Columna adicional para acciones (solo si hay acciones disponibles) -->
          <th v-if="hasActions" class="p-4 text-left text-sm font-semibold tracking-wide border-b border-gray-400 dark:border-gray-400">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex"
          :class="rowIndex % 2 === 0 ? 'bg-white dark:bg-bg-dark toggle-row' : 'bg-bg-cards dark:bg-bg-cards-dark toggle-row'"
          @click="handleRowClick(row)">
          <!-- Celdas de datos -->
          <td v-for="(header, colIndex) in headers" :key="colIndex"
            class="p-4 text-sm text-gray-700 dark:text-gray-300">
            <template v-if="isImage(row[header])">
              <img :src="row[header]" :alt="`Image for ${header}`" class="h-8 w-8 object-cover rounded-full" />
            </template>
            <template v-else-if="isCardObject(row[header])">
              <div class="flex gap-2">
                <span class="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
                  {{ row[header].Amarillas }}
                </span>
                <span class="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
                  {{ row[header].Rojas }}
                </span>
              </div>
            </template>
            <template v-else>
              {{ row[header] }}
            </template>
          </td>
          <!-- Columna de acciones -->
          <td v-if="hasActions" class="p-4 text-sm text-gray-700 dark:text-gray-300">
            <div v-if="isButtonAction(row.Acciones)" class="flex gap-2">
              <button
                v-for="(action, idx) in row.Acciones"
                :key="idx"
                @click.stop="handleAction(action, row)"
                :class="getActionButtonClass(action)"
                :title="action"
              >
                <i :class="getIconClass(action)" class="w-5 h-5"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Tabla',
  props: {
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    tableType: {
      type: String,
      required: true
    }
  },
  computed: {
    // Verifica si hay al menos una fila con acciones disponibles
    hasActions() {
      return this.data.some(row => this.isButtonAction(row.Acciones));
    }
  },
  methods: {
    // Verifica si un valor es una imagen
    isImage(value) {
      return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
    },
    // Verifica si un valor es un objeto con propiedades "Amarillas" y "Rojas"
    isCardObject(value) {
      return value && typeof value === 'object' && 'Amarillas' in value && 'Rojas' in value;
    },
    // Maneja el clic en una fila
    handleRowClick(row) {
      this.$emit('row-click', { name: row.Nombre, type: this.tableType });
    },
    // Verifica si una fila tiene acciones disponibles
    isButtonAction(actions) {
      return Array.isArray(actions) && actions.length > 0;
    },
    // Maneja las acciones (editar/eliminar)
    handleAction(action, row) {
      if (action === 'editar') {
        this.$emit('edit', row, this.tableType);
      } else if (action === 'eliminar') {
        this.$emit('delete', row, this.tableType);
      }
    },
    // Obtiene las clases CSS para los botones de acción
    getActionButtonClass(action) {
      const baseClass = 'p-2 rounded-md';
      if (action === 'editar') {
        return `${baseClass} text-primary-color hover:text-primary-color`;
      } else if (action === 'eliminar') {
        return `${baseClass} text-red-500 hover:text-red-600`;
      }
      return baseClass;
    },
    // Obtiene las clases de ícono para las acciones
    getIconClass(action) {
      if (action === 'editar') {
        return 'fas fa-pencil-alt'; // Ícono de edición
      } else if (action === 'eliminar') {
        return 'fas fa-trash-alt'; // Ícono de eliminación
      }
      return '';
    }
  }
};
</script>

<style scoped>
.action-button {
  margin-right: 5px;
}
</style>