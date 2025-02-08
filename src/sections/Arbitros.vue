<template>
  <div class="main-container">

    <div class="header flex-col md:flex-row gap-4 text-black dark:text-white bg-bg-cards dark:bg-bg-cards-dark">
      <div class="profile-info flex-col items-center gap-4 md:flex-row">
        <img src="@/assets/referee.jpg" alt="Foto Árbitro" class="referee-photo" />
        <div class="referee-details flex flex-col gap-4 text-center md:text-left">
          <h1>{{ nombre }}</h1>
          <p><strong>Arbitraje</strong></p>
          <p>
            Árbitro con experiencia en más de 3 años, sin errores:
            <strong>amarillas 40, rojas 6</strong>, ninguna ausencia por parte
            del árbitro.
          </p>
        </div>
      </div>

      <div class="contact-functions">
        <div class="contact-box">
          <h3>Contactos</h3>
          <p><i class="fas fa-envelope"></i> juanperez10@gmail.com</p>
          <p><i class="fas fa-phone"></i> +593 987654321</p>
        </div>
        <div class="functions-box">
          <h3>Datos Adicionales</h3>
          <p><i class="fas fa-user"></i> Género: Masculino</p>
          <p><i class="fas fa-calendar-alt"></i> Pitajes desde 2010</p>
        </div>
        <div class="roles-box">
          <h3>Funciones</h3>
          <p><i class="fas fa-star"></i> Árbitro Asistente, Árbitro</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DetallesArbitro',
  props: {
    nombre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedYear: "2024", 
      showDropdown: false, 
      years: [2020, 2021, 2022, 2023, 2024], 
      referees: [
        {
          id: 1,
          photo: "@/assets/referee.jpg",
          name: "HAMTI Edorján",
          city: "Quito",
          roles: ["Árbitro"],
          started: "2010",
          gender: "Masculino",
          yellow: 20,
          red: 8,
        },
        {
          id: 2,
          photo: "@/assets/referee2.jpg",
          name: "Elena Mena",
          city: "Cuenca",
          roles: ["Árbitro Asistente"],
          started: "2018",
          gender: "Femenino",
          yellow: 20,
          red: 6,
        },
        {
          id: 3,
          photo: "@/assets/referee.jpg",
          name: "Carlos Pérez",
          city: "Loja",
          roles: ["Árbitro"],
          started: "2015",
          gender: "Masculino",
          yellow: 25,
          red: 4,
        },
        {
          id: 4,
          photo: "@/assets/referee2.jpg",
          name: "Ana Rodríguez",
          city: "Quito",
          roles: ["Árbitro Asistente", "Árbitro"],
          started: "2012",
          gender: "Femenino",
          yellow: 30,
          red: 7,
        },
        {
          id: 5,
          photo: "@/assets/referee.jpg",
          name: "Javier Martínez",
          city: "Guayaquil",
          roles: ["Árbitro Asistente"],
          started: "2017",
          gender: "Masculino",
          yellow: 18,
          red: 5,
        },
        {
          id: 6,
          photo: "@/assets/referee2.jpg",
          name: "Fernanda López",
          city: "Cuenca",
          roles: ["Árbitro"],
          started: "2020",
          gender: "Femenino",
          yellow: 15,
          red: 3,
        },
        {
          id: 7,
          photo: "@/assets/referee.jpg",
          name: "Juan Rodríguez",
          city: "Manta",
          roles: ["Árbitro"],
          started: "2014",
          gender: "Masculino",
          yellow: 40,
          red: 9,
        },
        {
          id: 8,
          photo: "@/assets/referee2.jpg",
          name: "Camila Martínez",
          city: "Guayaquil",
          roles: ["Árbitro Asistente"],
          started: "2016",
          gender: "Femenino",
          yellow: 35,
          red: 6,
        }
        
      ],
    };
  },
  methods: {
    toggleYearDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectYear(year) {
      this.selectedYear = year;
      this.showDropdown = false; 
    }
  },
};
</script>
