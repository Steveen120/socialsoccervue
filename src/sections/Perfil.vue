<template>
    <div class="dashboard">
        <!-- Encabezado de la página -->
        <header class="header">
            <div class="welcome">
                <h1 class="">BIENVENIDO</h1>
                <p>"El fútbol se vive con pasión en cada rincón y en cada corazón."</p>
            </div>
        </header>
        <hr>
        <!-- Contenedor del perfil del usuario -->
        <div class="perfil-container p-4 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 dark:text-white">Perfil del Usuario</h2>
    
            <!-- Modo de visualización (no edición) -->
            <div v-if="!isEditing">
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Nombre:</label>
                    <p class="w-full p-2 border rounded-md bg-white text-black">{{ user.name }}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Correo Electrónico:</label>
                    <p class="w-full p-2 border rounded-md bg-white text-black">{{ user.email }}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Teléfono:</label>
                    <p class="w-full p-2 border rounded-md bg-white text-black">{{ user.phone }}</p>
                </div>
                <button @click="isEditing = true" class="p-2 bg-blue-500 text-white rounded-md">Editar Información</button>
            </div>
    
            <!-- Modo de edición -->
            <div v-else>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Nombre:</label>
                    <input v-model="user.name" type="text" class="w-full p-2 text-black border rounded-md" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Correo Electrónico:</label>
                    <input v-model="user.email" type="email" class="w-full p-2 text-black border rounded-md" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-300">Teléfono:</label>
                    <input v-model="user.phone" type="tel" class="w-full p-2 text-black border rounded-md" />
                </div>
                <button @click="updateProfile" class="p-2 bg-blue-500 text-white rounded-md">Guardar Cambios</button>
                <button @click="isEditing = false" class="p-2 bg-gray-500 text-white rounded-md ml-2">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Datos del usuario
const user = ref({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '123-456-7890'
});

// Estado para controlar si se está editando la información
const isEditing = ref(false);

// Función para actualizar la información del usuario
const updateProfile = () => {
    // Lógica para actualizar la información del usuario
    console.log('Información actualizada:', user.value);
    isEditing.value = false;
};
</script>

<style>
.header {
    text-align: center;
}

.welcome h1 {
    font-size: 2rem;
}
</style>