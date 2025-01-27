<template>
    <div class="overflow-x-auto shadow-lg rounded-lg">
        <table class="min-w-full table-auto bg-white dark:bg-bg-dark overflow-hidden">
            <thead class="bg-bg-cards dark:bg-bg-cards-dark text-gray-800 dark:text-gray-200">
                <tr>
                    <th v-for="(header, index) in headers" :key="index"
                        class="p-4 text-left text-sm font-semibold tracking-wide border-b border-gray-400 dark:border-gray-400">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex"
                    :class="rowIndex % 2 === 0 ? 'bg-white dark:bg-bg-dark toggle-row' : 'bg-bg-cards dark:bg-bg-cards-dark toggle-row'"
                    @click="handleRowClick(row)">
                    <td v-for="(header, colIndex) in headers" :key="colIndex"
                        class="p-4 text-sm text-gray-700 dark:text-gray-300">
                        <template v-if="isImage(row[header])">
                            <img :src="row[header]" :alt="`Image for ${header}`"
                                class="h-8 w-8 object-cover rounded-full" />
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
    methods: {
        isImage(value) {
            return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
        },
        isCardObject(value) {
            return value && typeof value === 'object' && 'Amarillas' in value && 'Rojas' in value;
        },
        handleRowClick(row) {
            this.$emit('row-click', { name: row.Nombre, type: this.tableType });
        }
    }
};
</script>
