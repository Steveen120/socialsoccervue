<template>
  <div class="register-container  bg-bg-cards dark:bg-bg-cards-dark">
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" placeholder="Nombre" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Example@gmail.com" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="phone">Número de Teléfono</label>
        <input type="tel" id="phone" v-model="phone" placeholder="0000000000" required />
      </div>
      <div class="form-group">
        <label for="gender">Género</label>
        <select id="gender" class="dark:text-black" v-model="gender" required>
          <option value="" disabled>Seleccione su género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div class="form-group">
        <label for="skills">Habilidades</label>
        <input type="text" id="skills" v-model="skills" placeholder="Ej. Corredor" required />
      </div>
      <div class="form-group">
        <label for="team">Equipo al que Pertenece</label>
        <select id="team" v-model="team" class="dark:text-black"  required>
          <option value="" disabled>Seleccione su equipo</option>
          <option value="FC Barcelona">FC Barcelona</option>
          <option value="Real Madrid">Real Madrid</option>
          <option value="Juventus">Juventus</option>
          <option value="Paris Saint-Germain">Paris Saint-Germain</option>
        </select>
      </div>
      <button type="submit" class="register-button">Registrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      gender: '',
      skills: '',
      team: ''
    };
  },
  methods: {
    handleSubmit() {
      // Lógica para manejar el registro del usuario
      console.log('Nombre:', this.name);
      console.log('Email:', this.email);
      console.log('Número de Teléfono:', this.phone);
      console.log('Género:', this.gender);
      console.log('Habilidades:', this.skills);
      console.log('Equipo:', this.team);
      // Aquí puedes agregar la lógica para registrar al usuario
    }
  }
};
</script>
