<template>
  <br>
  <div class="fc-barcelona-page overflow-hidden">
    <header class="header flex-col md:flex-row gap-4 md:gap-0 md:justify-evenly justify-center text-black dark:text-white bg-gradient-to-r from-[#2d3748] to-[#1a202c] shadow-lg animate__animated animate__fadeIn">
      <img src="@/assets/equipos/LDU.png" alt="FC Barcelona" class="logo transition-transform duration-300 hover:scale-105"/>
      <h1 class="text-3xl font-semibold text-white">{{ nombre }}</h1>
      <button class="btn-ver-jugadores p-4 transition-all duration-300 hover:bg-[#4a5568] hover:text-white">Ver jugadores</button>
    </header>

    <!-- Sección principal -->
    <main class="main-content flex flex-col text-center gap-8 mt-8">
      <div class="resultado-container flex-col gap-8 md:flex-row">
        <section class="ultimo-resultado flex flex-col gap-4 p-4 rounded-lg bg-gradient-to-r from-[#2d3748] to-[#1a202c] shadow-md animate__animated animate__fadeInUp">
          <h2 class="text-2xl font-semibold text-white">Último Resultado</h2>
          <div class="card bg-white dark:bg-[#2d3748] p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <p class="text-black dark:text-white"><strong>FC Barcelona</strong> 5</p>
            <p class="text-black dark:text-white"><strong>Real Betis</strong> 1</p>
            <p class="text-black dark:text-white">Finalizado</p>
            <p class="text-black dark:text-white">Copa del Rey</p>
          </div>
        </section>

        <section class="siguiente-partido flex flex-col gap-4 p-4 rounded-lg bg-gradient-to-r from-[#2d3748] to-[#1a202c] shadow-md animate__animated animate__fadeInRight">
          <h2 class="text-2xl font-semibold text-white">Siguiente Partido</h2>
          <div class="card bg-white dark:bg-[#2d3748] p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <p class="text-black dark:text-white"><strong>Getafe</strong></p>
            <p class="text-black dark:text-white">18/01/25 - 15:00</p>
            <p class="text-black dark:text-white">La Liga</p>
          </div>
        </section>
      </div>

      <section class="clasificaciones flex flex-col gap-4">
        <h2 class="text-2xl font-semibold text-white">Clasificaciones</h2>
        <div class="overflow-auto bg-gradient-to-r from-[#2d3748] to-[#1a202c] p-4 rounded-lg shadow-md">
          <table class="table-auto w-full text-sm text-center">
            <thead class="bg-[#4a5568]">
              <tr>
                <th class="text-white">Posición</th>
                <th class="text-white">Equipo</th>
                <th class="text-white">PJ</th>
                <th class="text-white">G</th>
                <th class="text-white">D</th>
                <th class="text-white">DG</th>
                <th class="text-white">PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white dark:bg-[#2d3748] hover:bg-[#4a5568]">
                <td class="text-black dark:text-white">1</td>
                <td class="text-black dark:text-white">FC Barcelona</td>
                <td class="text-black dark:text-white">19</td>
                <td class="text-black dark:text-white">13</td>
                <td class="text-black dark:text-white">5</td>
                <td class="text-black dark:text-white">22</td>
                <td class="text-black dark:text-white">44</td>
              </tr>
              <!-- Agrega más filas aquí -->
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DetallesEquipo',
  props: {
    nombre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Aquí puedes definir más propiedades si es necesario
    };
  }
};
</script>

<style scoped>
.fc-barcelona-page {
  background-color: #f9f9f9;
}

.header {
  background: linear-gradient(135deg, #2d3748, #1a202c); /* Nuevo gradiente oscuro */
  border-radius: 1rem;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.btn-ver-jugadores {
  background-color: #4a5568;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-ver-jugadores:hover {
  background-color: #2d3748;
  transform: scale(1.05);
}

.card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}

.resultado-container {
  display: flex;
  gap: 16px;
  animation: fadeInUp 1s ease-out;
}

.clasificaciones table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.clasificaciones table th,
.clasificaciones table td {
  padding: 12px;
  border: 1px solid #2d3748; /* Color oscuro */
}

.clasificaciones table th {
  background-color: #4a5568; /* Color de encabezado más oscuro */
  color: white;
}

.clasificaciones table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.clasificaciones table tbody tr:hover {
  background-color: #e2e8f0; /* Azul claro de hover */
}

.animate__animated {
  animation-duration: 1s;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__fadeInLeft {
  animation-name: fadeInLeft;
}

.animate__fadeInRight {
  animation-name: fadeInRight;
}

.animate__fadeInUp {
  animation-name: fadeInUp;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
