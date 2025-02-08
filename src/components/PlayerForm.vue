<template>

  <div class="form-container">
    <h2>{{ player.id === null ? 'Agregar Jugador' : 'Editar Jugador' }}</h2>
    <div class="form-group">
      <label>Nombre del Jugador</label>
      <input v-model="localPlayer.nombre" type="text" class="input-field">
    </div>
    <div class="form-group">
      <label>Nombre del Equipo</label>
      <input v-model="localPlayer.equipo" type="text" class="input-field">
    </div>
    <div class="form-group">
      <label>Tiro</label>
      <input v-model.number="localPlayer.tiro" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Pase</label>
      <input v-model.number="localPlayer.pase" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Físico</label>
      <input v-model.number="localPlayer.fisico" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Regate</label>
      <input v-model.number="localPlayer.regate" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Defensa</label>
      <input v-model.number="localPlayer.defensa" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Ritmo</label>
      <input v-model.number="localPlayer.ritmo" type="number" min="0" class="input-field">
    </div>
    <div class="form-group">
      <label>Foto del Jugador</label>
      <input type="file" @change="handleFileUpload" class="input-field">
      <img v-if="localPlayer.foto" :src="localPlayer.foto" alt="Foto del Jugador" class="player-foto">
    </div>
    <div class="form-actions">
      <button class="btn save" @click="savePlayer">{{ localPlayer.id === null ? 'Agregar' : 'Actualizar' }}</button>
      <button class="btn cancel" @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localPlayer: { ...this.player }
    };
  },
  watch: {
    player: {
      handler(newPlayer) {
        this.localPlayer = { ...newPlayer };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.localPlayer.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    savePlayer() {
      this.$emit('save', this.localPlayer);
    },
    cancelEdit() {
      this.$emit('cancel');
    }
  }
};


</script>

<style scoped>
.form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1000;
  overflow-y: auto;
  max-height: 80vh;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.player-foto {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  flex: 1;
  margin-right: 10px;
}

.btn.save {
  background-color: #28a745;
}

.btn.cancel {
  background-color: #dc3545;
}

.btn:hover {
  opacity: 0.8;
}

.btn:last-child {
  margin-right: 0;
}
</style>
