<template>
    <!-- Botón con evento de clic -->
    <button @click="handleClick" class="p-2 bg-primary-color text-white rounded-md">
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        // Propiedad 'label' para el texto del botón
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        // Maneja el evento de clic y emite un evento 'click'
        handleClick() {
            this.$emit('click');
        }
    }
};
</script>