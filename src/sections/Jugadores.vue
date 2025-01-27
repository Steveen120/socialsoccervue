<template>
  <div class="main-container">
    <div class="header flex-col gap-8 md:gap-0 md:flex-row md:justify-around text-black dark:text-white bg-bg-cards dark:bg-bg-cards-dark">
      <div class="profile-info flex-col md:flex-row md:gap-20">
        <div class="flex justify-center">
          <img :src="player.photo" alt="Foto Jugador" class="player-photo md:mr-5" />
        </div>
        <div class="player-details">
          <h1>{{ name }}</h1>
          <p><strong>{{ player.position }}</strong></p>
          <p>
            Futbolista, con edad de {{ player.age }} años, juega actualmente en el
            {{ player.team }}, su nombre completo es {{ player.fullName }}.
          </p>
          <button class="more-info-button" @click="goToPlayerInfo">
            Más detalles sobre su carrera
          </button>
        </div>
      </div>

      <div class="contact-functions">
        <div class="contact-box">
          <h3>Contacto</h3>
          <p><i class="fas fa-envelope"></i> {{ player.contact.email }}</p>
          <p><i class="fas fa-phone"></i> {{ player.contact.phone }}</p>
        </div>
        <div class="functions-box">
          <h3>Datos Adicionales</h3>
          <p><i class="fas fa-user"></i> Género: {{ player.gender }}</p>
          <p><i class="fas fa-shield-alt"></i> Funciones: {{ player.roles }}</p>
        </div>
      </div>
    </div>

    <div class="trophies-section md:flex md:justify-around">
      <div class="trophy-group flex flex-col items-center ">
        <h2>Trofeos Grupales</h2>
        <div class="trophies flex-col gap-8 md:flex-row ">
          <div v-for="trophy in player.groupTrophies" :key="trophy.id" class="trophy">
            <img :src="trophy.image" :alt="trophy.name" />
            <p>{{ trophy.name }}</p>
          </div>
        </div>
      </div>

      <div class="trophy-group flex flex-col items-center ">
        <h2>Trofeos Individuales</h2>
        <div class="trophies flex-col gap-8 md:flex-row ">
          <div v-for="trophy in player.individualTrophies" :key="trophy.id" class="trophy">
            <img :src="trophy.image" :alt="trophy.name" />
            <p>{{ trophy.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetallesJugadores',
  props: {
    nombre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: this.nombre,
      player: {
        photo: 'https://example.com/photo.jpg',
        position: 'Delantero',
        age: 34,
        team: 'FC Barcelona',
        fullName: 'Lionel Andrés Messi Cuccittini',
        contact: {
          email: 'messi@example.com',
          phone: '+123456789'
        },
        gender: 'Masculino',
        roles: 'Capitán',
        groupTrophies: [
          { id: 1, name: 'Champions League', image: 'https://example.com/trophy1.jpg' },
          { id: 2, name: 'La Liga', image: 'https://example.com/trophy2.jpg' }
        ],
        individualTrophies: [
          { id: 1, name: 'Balón de Oro', image: 'https://example.com/trophy3.jpg' },
          { id: 2, name: 'Bota de Oro', image: 'https://example.com/trophy4.jpg' }
        ]
      }
    };
  },
  methods: {
    goToPlayerInfo() {
      // Lógica para redirigir a más detalles sobre la carrera del jugador
      this.$router.push('/informacion-ju');

    }
  }
};
</script>


