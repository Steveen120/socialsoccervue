<template>
  <div>
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

    <div class="container-one">
      <h1>Partidos Próximos</h1>
      <div class="button-container">
        <button class="btn add" @click="openAddModal">Agregar Partido</button>
        <router-link class="btn championships" to="/estadisticas-partidos">Ver estadísticas</router-link>
      </div>

      <div class="card-container">
        <div class="card" v-for="(partido, index) in filteredPartidos" :key="partido.id">
          <div class="date-box">
            <p><strong>{{ getEquipoNombre(partido.id_equipo_local) }} vs {{ getEquipoNombre(partido.id_equipo_visitante)
                }}</strong></p>
          </div>

          <div class="team-images">
            <img :src="partido.imagen_partido" alt="Imagen del Partido" class="team-image" />
          </div>
          <p><strong>{{ partido.nombre_partido }}</strong></p>
          <div class="hora">
            <div class="time">
              <p><strong><i class="fa-solid fa-clock" style="color: #ffffff;"></i> {{ partido.hora }} </strong></p>
            </div>
            <div class="date">
              <p><i class="fa-solid fa-calendar-days" style="color: #ffffff;"></i> {{ partido.fecha }} </p>
            </div>
          </div>
          <p><strong>Lugar: </strong>{{ partido.estadio }}</p>
          <p><strong>Descripción: </strong>{{ partido.descripcion_partido }}</p>

          <div class="button-group">
            <button class="btn edit" @click="editPartido(partido)">Editar</button>
            <button class="btn delete" @click="confirmDelete(partido.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ modalTitle }}</h2>

          <form @submit.prevent="savePartido">
            <div class="form-group">
              <label for="nombre_partido">Nombre del Partido:</label>
              <input id="nombre_partido" type="text" v-model="modalPartido.nombre_partido" required>
            </div>

            <div class="form-group">
              <label for="descripcion_partido">Descripción del Partido:</label>
              <input id="descripcion_partido" type="text" v-model="modalPartido.descripcion_partido" required>
            </div>

            <div class="form-group">
              <label for="estadio">Estadio:</label>
              <input id="estadio" type="text" v-model="modalPartido.estadio" required>
            </div>

            <div class="form-group">
              <label for="imagen_partido">Imagen del Partido:</label>
              <input id="imagen_partido" type="file" @change="handleFileUpload">
              <img v-if="modalPartido.imagen_partido" :src="modalPartido.imagen_partido" alt="Imagen del Partido"
                class="partido-image" width="100">
            </div>

            <div class="form-group">
              <label for="id_equipo_local">Equipo Local:</label>
              <select id="id_equipo_local" v-model="modalPartido.id_equipo_local">
                <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">{{ equipo.nombre_de_equipo }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="id_equipo_visitante">Equipo Visitante:</label>
              <select id="id_equipo_visitante" v-model="modalPartido.id_equipo_visitante">
                <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">{{ equipo.nombre_de_equipo }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="fecha">Fecha:</label>
              <input id="fecha" type="date" v-model="modalPartido.fecha" required>
            </div>

            <div class="form-group">
              <label for="hora">Hora:</label>
              <input id="hora" type="time" v-model="modalPartido.hora" required>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn save">Guardar</button>
              <button type="button" @click="closeModal" class="btn cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios'; // Asegúrate de importar tu instancia de Axios

export default {
  name: 'Partido',
  data() {
    return {
      partidos: [],
      equipos: [], // Lista de equipos
      campeonatos: [], // Lista de campeonatos
      showModal: false,
      modalTitle: '',
      modalPartido: {
        id: null,
        nombre_partido: '',
        descripcion_partido: '',
        estadio: '',
        imagen_partido: '',
        id_equipo_local: null,
        id_equipo_visitante: null,
        fecha: '',
        hora: ''
      },
      searchQuery: '',
      csrfToken: ''
    };
  },
  async mounted() {
    try {
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }

    await this.fetchPartidos();
    await this.fetchEquipos();
  },
  computed: {
    filteredPartidos() {
      if (this.searchQuery.trim() === '') {
        return this.partidos;
      }
      return this.partidos.filter(partido =>
        partido.nombre_partido.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        partido.descripcion_partido.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchPartidos() {
      try {
        const response = await instance.get('/partidos');
        if (Array.isArray(response.data)) {
          this.partidos = response.data;
        } else {
          console.error('La respuesta no es un array:', response.data);
          this.partidos = []; // Asigna un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al obtener partidos:', error);
      }
    },
    async fetchEquipos() {
      try {
        const response = await instance.get('/equipos');
        if (Array.isArray(response.data)) {
          this.equipos = response.data;
        } else {
          console.error('La respuesta no es un array:', response.data);
          this.equipos = []; // Asigna un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    },
    getEquipoNombre(id) {
      const equipo = this.equipos.find(equipo => equipo.id === id);
      return equipo ? equipo.nombre_de_equipo : 'Desconocido';
    },
    openAddModal() {
      this.modalTitle = 'Agregar Partido';
      this.modalPartido = {
        id: null,
        nombre_partido: '',
        descripcion_partido: '',
        estadio: '',
        imagen_partido: '',
        id_equipo_local: null,
        id_equipo_visitante: null,
        fecha: '',
        hora: ''
      };
      this.showModal = true;
    },
    async editPartido(partido) {
      this.modalTitle = 'Editar Partido';
      this.modalPartido = { ...partido };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async savePartido() {
      try {
        const url = this.modalPartido.id ? `/partidos/${this.modalPartido.id}` : '/partidos';
        const method = this.modalPartido.id ? 'put' : 'post';
        const response = await instance[method](url, this.modalPartido);
        this.fetchPartidos(); // Actualiza la lista de partidos
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar el partido:', error);
      }
    },
    async confirmDelete(partidoId) {
      if (confirm('¿Estás seguro de que quieres eliminar este partido?')) {
        try {
          const response = await instance.delete(`/partidos/${partidoId}`);
          console.log('Respuesta del servidor:', response);
          this.fetchPartidos(); // Actualiza la lista de partidos
        } catch (error) {
          console.error('Error al eliminar el partido:', error.response ? error.response.data : error.message);
        }
      }
    },
    performSearch() {
      // La búsqueda se maneja automáticamente a través de computed 'filteredPartidos'
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        this.modalPartido.imagen_partido = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>



<style scoped>
/* Estilos generales */
.navbar {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.navbar-content {
  display: flex;
  justify-content: center;
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
  margin-left: 5px;
  /* Adds space between input and button */
}

.search-container button:hover {
  background-color: #ccc;
}

.search-container button i {
  color: #555;
}

/*estilos de la lista*/

.body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

.container-one {
  max-width: 90%;
  margin: 20px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 20px;
}

.button-container .btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 35%;
}

.team-images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-image {
  width: 80px;
  height: 70px;
  border: 1px solid rgb(194, 190, 190);
  margin-top: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 10%;
}

.date-box {
  background-color: #f0f0f0;
  font-size: 1.2em;
  padding: 2px;
  border-radius: 5px;
}

.hora {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.time,
.date {
  font-size: 14px;
  background-color: #001529;
  text-align: center;
  color: white;
  width: 25%;
  /* Ajusta el ancho según sea necesario */
  border-radius: 5px;
  box-sizing: border-box;
  /* Asegura que el padding no afecte al ancho total del elemento */
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.button-group .btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

/*agregar y editar*/

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 40%;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group select {
  width: 95%;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.form-actions .btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

/* Estilos específicos de los botones */
.btn.add {
  background-color: #008CBA;
  color: white;
}

.btn.championships {
  background-color: #008CBA;
  color: white;
  text-decoration: none;
}

.btn.edit {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
}

.btn.delete {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
}

.btn.save {
  background-color: #008CBA;
  color: white;
}

.btn.cancel {
  background-color: #008CBA;
  color: white;
}



/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .container-one {
    padding: 20px;
  }

  .card {
    width: 90%;
  }

  .button-container {
    gap: 20px;
    /* Reduce el espacio entre botones */
  }

  .button-group {
    gap: 20px;
    /* Reduce el espacio entre botones */
  }

  .modal {
    width: 80%;
  }

  .team-image {
    width: 60px;
    height: 50px;
  }

  .time,
  .date {
    width: 100%;
    font-size: 12px;
  }

  .btn {
    padding: 8px 15px;
    /* Reduce el tamaño del padding */
    font-size: 14px;
    /* Reduce el tamaño de la fuente */
  }
}

/* Estilos para pantallas muy pequeñas, como móviles en vertical */
@media (max-width: 480px) {
  .container-one {
    padding: 10px;
  }

  .card {
    width: 100%;
    margin-bottom: 20px;
  }

  .button-container {
    gap: 10px;
    /* Reduce el espacio entre botones */
  }

  .button-group {
    gap: 10px;
    /* Reduce el espacio entre botones */
  }

  .modal {
    width: 90%;
    padding: 15px;
  }

  .team-image {
    width: 50px;
    height: 40px;
  }

  .time,
  .date {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }

  .btn,
  .btn.add,
  .btn.championships {
    padding: 6px 12px;
    /* Reduce aún más el tamaño del padding */
    font-size: 12px;
    /* Reduce aún más el tamaño de la fuente */
  }
}
</style>