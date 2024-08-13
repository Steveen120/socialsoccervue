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

        <div v-if="alertVisible" class="alerta">
      <p>Estadistica Registrada <br></p>
      <div class="checkmark-container">
        <div class="checkmark">
          <div class="checkmark-circle"><img src="https://icon-library.com/images/check-icon/check-icon-10.jpg" alt="check"></div>
        </div>
      </div>
    </div>

        <div class="container-one">
            <h1>Estadísticas de Partidos</h1>
            <div class="button-container">
                <button class="btn add" @click="openAddModal">Agregar Estadística</button>
                <router-link class="btn championships" to="/partidos">Ver Partidos</router-link>
            </div>

            <div class="estadisticas-table-container">

            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Partido</th>
                        <th>Árbitro</th>
                        <th>T.Amarillas</th>
                        <th>T.Rojas</th>
                        <th>Goles</th>
                        <th>Posesión (%)</th>
                        <th>Tiros Totales</th>
                        <th>Tiros a Puerta</th>
                        <th>Tiros Desviados</th>
                        <th>Pases</th>
                        <th>Tiros de Esquina</th>
                        <th>Fuera de Juego</th>
                        <th>Calificación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(estadisticasPartido, index) in filteredEstadisticasPartidos"
                        :key="estadisticasPartido.id">
                        <td>{{ getPartidoNombre(estadisticasPartido.partido_id) }}</td>
                        <td>{{ getArbitroNombre(estadisticasPartido.arbitro_id) }}</td>
                        <td>{{ estadisticasPartido.tar_amarrillas }}</td>
                        <td>{{ estadisticasPartido.tar_roja }}</td>
                        <td>{{ estadisticasPartido.goles }}</td>
                        <td>{{ estadisticasPartido.posecion }}</td>
                        <td>{{ estadisticasPartido.tiros_totales }}</td>
                        <td>{{ estadisticasPartido.tiros_apuerta }}</td>
                        <td>{{ estadisticasPartido.tiros_desviados }}</td>
                        <td>{{ estadisticasPartido.pases }}</td>
                        <td>{{ estadisticasPartido.tiros_esquina }}</td>
                        <td>{{ estadisticasPartido.fuera_juego }}</td>
                        <td>{{ estadisticasPartido.calificacion }}</td>
                        <td>
                            <button class="btn edit"
                                @click="editEstadisticasPartido(estadisticasPartido)">Editar</button>
                                <button class="btn delete" @click="eliminarEstadisticaPartido(index, estadisticasPartido.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>

                <form @submit.prevent="saveEstadisticasPartido">

                    <div class="form-group">
                        <label for="partido_id">Partido:</label>
                        <select id="partido_id" v-model="modalEstadisticasPartido.partido_id">
                            <option v-for="partido in partidos" :key="partido.id" :value="partido.id">{{
                                partido.nombre_partido }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="arbitro_id">Árbitro:</label>
                        <select id="arbitro_id" v-model="modalEstadisticasPartido.arbitro_id">
                            <option v-for="arbitro in arbitros" :key="arbitro.id" :value="arbitro.id">{{ arbitro.nombre
                                }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tar_amarrillas">Tarjetas Amarillas:</label>
                        <input id="tar_amarrillas" type="number" v-model="modalEstadisticasPartido.tar_amarrillas"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="tar_roja">Tarjetas Rojas:</label>
                        <input id="tar_roja" type="number" v-model="modalEstadisticasPartido.tar_roja" required>
                    </div>

                    <div class="form-group">
                        <label for="goles">Goles:</label>
                        <input id="goles" type="number" v-model="modalEstadisticasPartido.goles" required>
                    </div>

                    <div class="form-group">
                        <label for="posecion">Posesión (%):</label>
                        <input id="posecion" type="number" step="0.1" v-model="modalEstadisticasPartido.posecion"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="tiros_totales">Tiros Totales:</label>
                        <input id="tiros_totales" type="number" v-model="modalEstadisticasPartido.tiros_totales"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="tiros_apuerta">Tiros a Puerta:</label>
                        <input id="tiros_apuerta" type="number" v-model="modalEstadisticasPartido.tiros_apuerta"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="tiros_desviados">Tiros Desviados:</label>
                        <input id="tiros_desviados" type="number" v-model="modalEstadisticasPartido.tiros_desviados"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="pases">Pases:</label>
                        <input id="pases" type="number" v-model="modalEstadisticasPartido.pases" required>
                    </div>

                    <div class="form-group">
                        <label for="tiros_esquina">Tiros de Esquina:</label>
                        <input id="tiros_esquina" type="number" v-model="modalEstadisticasPartido.tiros_esquina"
                            required>
                    </div>

                    <div class="form-group">
                        <label for="fuera_juego">Fuera de Juego:</label>
                        <input id="fuera_juego" type="number" v-model="modalEstadisticasPartido.fuera_juego" required>
                    </div>

                    <div class="form-group">
                        <label for="calificacion">Calificación:</label>
                        <input id="calificacion" type="number" step="0.1"
                            v-model="modalEstadisticasPartido.calificacion" required>
                    </div>


                    <div class="form-actions">
                        <button type="submit" class="btn save">Guardar</button>
                        <button type="button" @click="closeModal" class="btn cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '../pluggins/axios'; // Asegúrate de importar tu instancia de Axios

export default {
    name: 'EstadisticasPartido',
    data() {
        return {
            estadisticasPartidos: [],
            partidos: [], // Lista de partidos
            arbitros: [], // Lista de árbitros
            showModal: false,
            modalTitle: '',
            modalEstadisticasPartido: {
                id: null,
                tar_amarrillas: 0,
                tar_roja: 0,
                goles: 0,
                posecion: 0,
                tiros_totales: 0,
                tiros_apuerta: 0,
                tiros_desviados: 0,
                pases: 0,
                tiros_esquina: 0,
                fuera_juego: 0,
                calificacion: 0,
                partido_id: null,
                arbitro_id: null
            },
            searchQuery: '',
            csrfToken: '',
            alertVisible: false
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

        await this.fetchEstadisticas();
        await this.fetchPartidos();
        await this.fetchArbitros();
    },
    computed: {
        filteredEstadisticasPartidos() {
            if (this.searchQuery.trim() === '') {
                return this.estadisticasPartidos;
            }
            return this.estadisticasPartidos.filter(estadisticasPartido =>
                estadisticasPartido.nombre_partido?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                estadisticasPartido.descripcion_partido?.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchEstadisticas() {
            try {
                const response = await instance.get('/estadisticas');
                this.estadisticasPartidos = response.data;
            } catch (error) {
                console.error('Error al obtener las estadísticas de partidos:', error);
            }
        },
        async fetchPartidos() {
            try {
                const response = await instance.get('/partidos');
                this.partidos = response.data;
            } catch (error) {
                console.error('Error al obtener los partidos:', error);
            }
        },
        async fetchArbitros() {
            try {
                const response = await instance.get('/arbitros');
                this.arbitros = response.data;
            } catch (error) {
                console.error('Error al obtener los árbitros:', error);
            }
        },
        getPartidoNombre(partidoId) {
            const partido = this.partidos.find(partido => partido.id === partidoId);
            return partido ? partido.nombre_partido : '';
        },
        getArbitroNombre(arbitroId) {
            const arbitro = this.arbitros.find(arbitro => arbitro.id === arbitroId);
            return arbitro ? arbitro.nombre : '';
        },
        performSearch() {
            // Esta función no es necesaria porque el filtrado se realiza en la propiedad computada
        },
        openAddModal() {
            this.modalTitle = 'Agregar Estadística de Partido';
            this.resetModalEstadisticasPartido();
            this.showModal = true;
        },
        editEstadisticasPartido(estadisticasPartido) {
            this.modalTitle = 'Editar Estadística de Partido';
            this.modalEstadisticasPartido = { ...estadisticasPartido };
            this.showModal = true;
        },
        async saveEstadisticasPartido() {
            if (this.modalEstadisticasPartido.id) {
                await this.updateEstadisticasPartido();
            } else {
                await this.addEstadisticasPartido();
            }
            this.showModal = false;
        },
        async addEstadisticasPartido() {
            try {
                const response = await instance.post('/estadisticas', this.modalEstadisticasPartido);
                this.estadisticasPartidos.push(response.data);
                this.showAlert();
            } catch (error) {
                console.error('Error al agregar la estadística de partido:', error);
            }
        },
        async updateEstadisticasPartido() {
            try {
                const response = await instance.put(`/estadisticas/${this.modalEstadisticasPartido.id}`, this.modalEstadisticasPartido);
                const index = this.estadisticasPartidos.findIndex(estadisticasPartido => estadisticasPartido.id === this.modalEstadisticasPartido.id);
                if (index !== -1) {
                    this.estadisticasPartidos.splice(index, 1, response.data);
                }
            } catch (error) {
                console.error('Error al actualizar la estadística de partido:', error);
            }
        },
        async eliminarEstadisticaPartido(index, id) {
    try {
        await instance.delete(`/estadisticas/${id}`);
        this.estadisticasPartidos.splice(index, 1);
        console.log('Estadística de partido eliminada en el índice:', index);
    } catch (error) {
        console.error('Error al eliminar estadística de partido:', error);
    }
},

        closeModal() {
            this.showModal = false;
        },
        resetModalEstadisticasPartido() {
            this.modalEstadisticasPartido = {
                id: null,
                tar_amarrillas: 0,
                tar_roja: 0,
                goles: 0,
                posecion: 0,
                tiros_totales: 0,
                tiros_apuerta: 0,
                tiros_desviados: 0,
                pases: 0,
                tiros_esquina: 0,
                fuera_juego: 0,
                calificacion: 0,
                partido_id: null,
                arbitro_id: null
            };
        },
        showAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3000); // Oculta la alerta después de 3 segundos
    }

    }
};
</script>


<style scoped>
.alerta {
  background-color: #232629;
  color: white;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.checkmark-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark {
  margin-left: 15px;
  width: 100px;
  height: 100px;
  position: relative;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
}
.checkmark-circle img{
  max-width: 100%;
}

.checkmark-stem {
  width: 3px;
  height: 9px;
  background-color: white;
  position: absolute;
  top: 7px;
  left: 10px;
  transform: rotate(-45deg);
}

.checkmark-kick {
  width: 3px;
  height: 5px;
  background-color: white;
  position: absolute;
  top: 11px;
  left: 8px;
  transform: rotate(45deg);
}


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
    max-width: 100%;
    margin: 20px auto;
    margin-left: 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow-x: auto;
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

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

.estadisticas-table-container {
   display: flex;
   justify-content: center;
   align-items: flex-start;
   padding: 20px;
 }

.stats-table {
    width: 100%;
   max-width: 1500px;
   overflow-x: auto;
    border-collapse: collapse;
    margin-top: 20px;
}

.stats-table th,
.stats-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.stats-table th {
    background-color: #f2eeee;
}
.stats-table tbody tr:hover {
    background-color: #f0f0f0;
  }
/* Estilos para el modal */
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
    z-index: 1000;
}

.modal {
    background-color: white;
    margin-bottom: 5px;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    position: relative;
    text-align: center;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #888;
}

.close:hover {
    color: #333;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input,
.form-group select {
    width: calc(100% - 22px);
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.form-actions .btn {
    width: 48%;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
}

.form-actions .btn.save {
    background-color: #5cb85c;
    color: white;
}

.form-actions .btn.cancel {
    background-color: #d9534f;
    color: white;
}

/* Estilos específicos de los botones */
.btn.add {
    background-color: #00acac;
    color: white;
}

.btn.championships {
    background-color: #00acac;
    color: white;
    text-decoration: none;
}

.btn.edit {
    background-color: #00acac;
    color: white;
    padding: 7px 15px;
    margin-bottom: 5px;
}

.btn.delete {
    background-color: #00acac;
    color: white;
    padding: 7px 15px;
}

.btn.save {
    background-color: #00acac;
    color: white;
}

.btn.cancel {
    background-color: #00acac;
    color: white;
}

@media (max-width: 768px) {
    .container-one {
        margin-left: 10px;
        padding: 15px;
    }

    .button-container {
        flex-direction: column;
        gap: 10px;
    }

    .stats-table th,
    .stats-table td {
        font-size: 12px;
        /* Tamaño de fuente más pequeño para pantallas pequeñas */
        padding: 6px;
    }

    .modal {
        width: 80%;
    }

    .form-group input,
    .form-group select {
        width: 100%;
    }

    .form-actions .btn {
        padding: 8px 16px;
    }

    .btn {
        padding: 8px 16px;
    }
}
</style>