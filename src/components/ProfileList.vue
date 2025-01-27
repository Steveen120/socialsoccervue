<template>
  <nav class="navbar">
      <div class="navbar-content">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Buscar..." @keyup.enter="performSearch" />
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
    <div class="profile-list-container">
      <h1>Gestión de Perfiles</h1>
      <ProfileForm @submit="addOrUpdateProfile" :initialProfile="currentProfile" :isEdit="isEdit" />
      <ul class="profile-list">
        <li v-for="profile in profiles" :key="profile.correo" class="profile-item">
          <div class="profile-photo" v-if="profile.fotoUrl">
            <img :src="profile.fotoUrl" alt="Foto" />
          </div>
          <div class="profile-info">
            <p><strong>{{ profile.nombre }} {{ profile.apellido }}</strong></p>
            <p>{{ profile.correo }}</p>
          </div>
          <div class="profile-actions">
            <button @click="editProfile(profile)" class="btn-edit">Editar</button>
            <button @click="deleteProfile(profile.correo)" class="btn-delete">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import ProfileForm from './ProfileForm.vue';
  
  export default {
    components: {
      ProfileForm
    },
    data() {
      return {
        profiles: [],
        currentProfile: null,
        isEdit: false
      };
    },
    methods: {
      addOrUpdateProfile(profile) {
        console.log(profile); // Imprimir los datos del perfil en la consola
        if (this.isEdit) {
          const existingProfileIndex = this.profiles.findIndex(p => p.correo === profile.correo);
          if (existingProfileIndex !== -1) {
            this.profiles.splice(existingProfileIndex, 1, profile);
          }
        } else {
          this.profiles.push(profile);
        }
        this.currentProfile = null;
        this.isEdit = false;
      },
      editProfile(profile) {
        this.currentProfile = { ...profile };
        this.isEdit = true;
      },
      deleteProfile(correo) {
        this.profiles = this.profiles.filter(p => p.correo !== correo);
      }
    }
  };
  const performSearch = () => {
  alert('Buscar: ' + searchQuery.value);
};
  </script>
  
  <style scoped>
  .navbar {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.navbar-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-container button {
  background-color: #ddd;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 5px 10px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #ccc;
}

.search-container button i {
  color: #555;
}
  .profile-list-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .profile-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .profile-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    border: 2px solid #001f3f;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  
  .profile-photo img {
    width: 100px;
    height: 140px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .profile-info {
    flex: 1;
  }
  
  .profile-actions {
    display: flex;
    gap: 10px;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-edit {
    background-color: #ffc107;
    color: white;
  }
  
  .btn-edit:hover {
    background-color: #e0a800;
  }
  
  .btn-delete {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-delete:hover {
    background-color: #c82333;
  }
  </style>
  