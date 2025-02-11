<template>
  <div class="contendor-marcador py-8">
    <!-- Contenedor principal del marcador -->
    <div class="marcador bg-gradient-to-r from-gray-700 to-gray-900 pt-4 rounded-xl shadow-xl dark:bg-gray-800">
      <!-- Sección del marcador -->
      <div class="scoreboard flex flex-wrap justify-around pb-6 animate__animated animate__fadeIn">
        <!-- Información del equipo local -->
        <div class="team animate__animated animate__fadeInLeft flex flex-col items-center">
          <img :src="details.team1.logo" alt="FC Barcelona" class="team-logo">
          <div class="team-name">{{ details.team1.name }}</div>
          <div class="team-info">
            <p>Entrenador: {{ details.team1.coach }}</p>
            <p>Ciudad: {{ details.team1.city }}</p>
          </div>
        </div>

        <!-- Marcador del partido -->
        <div class="score flex items-center gap-10 animate__animated animate__zoomIn">
          <span class="bg-blue-600 text-white p-6 px-12 rounded-lg">{{ details.team1.score }}</span>
          <span class="score-separator text-5xl text-white">:</span>
          <span class="bg-green-600 text-white p-6 px-12 rounded-lg">{{ details.team2.score }}</span>
        </div>

        <!-- Información del equipo visitante -->
        <div class="team animate__animated animate__fadeInRight flex flex-col items-center">
          <img :src="details.team2.logo" alt="Real Betis" class="team-logo">
          <div class="team-name">{{ details.team2.name }}</div>
          <div class="team-info">
            <p>Entrenador: {{ details.team2.coach }}</p>
            <p>Ciudad: {{ details.team2.city }}</p>
          </div>
        </div>
      </div>

      <!-- Tabla de goles -->
      <div class="goles flex justify-center animate__animated animate__fadeInUp">
        <table class="tabla-goles dark:bg-gray-700">
          <thead>
            <tr>
              <th class="text-white dark:text-gray-300">Equipo Local</th>
              <th class="text-white dark:text-gray-300">-</th>
              <th class="text-white dark:text-gray-300">Equipo Visitante</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-white dark:text-gray-300">Gaby</td>
              <td class="text-white dark:text-gray-300">3'</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-white dark:text-gray-300">Jules Koundé</td>
              <td class="text-white dark:text-gray-300">27'</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-white dark:text-gray-300">Raphinha</td>
              <td class="text-white dark:text-gray-300">58'</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-white dark:text-gray-300">Ferran Torres</td>
              <td class="text-white dark:text-gray-300">67'</td>
              <td></td>
            </tr>
            <tr>
              <td class="text-white dark:text-gray-300">Lamine Yamal</td>
              <td class="text-white dark:text-gray-300">75'</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td class="text-white dark:text-gray-300">84'</td>
              <td class="text-white dark:text-gray-300">Vitor Roque</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Información del árbitro -->
      <div class="arbitro flex justify-center gap-2 text-white mt-4 animate__animated animate__fadeInUp">
        <span class="font-bold">Árbitro:</span>
        <span class="italic">Mateo Solís</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetallesPartido',
  props: {
    nombre: {
      type: String,
      required: true
    },
    details: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.contendor-marcador {
  padding: 2rem 0;
}

.marcador {
  background: linear-gradient(135deg, #2d3748, #1a202c);
  padding-top: 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.scoreboard {
  display: flex;
  justify-content: space-around;
  padding-bottom: 1.5rem;
  flex-wrap: wrap;
}

.team {
  text-align: center;
  flex: 1;
  margin: 1rem;
}

.team-logo {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
  filter: grayscale(50%);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.team-logo:hover {
  transform: scale(1.1);
  filter: grayscale(0);
}

.team-name {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: #ffffff;
  margin-top: 1rem;
  font-size: 2rem; /* Tamaño predeterminado */
}

/* Media queries para pantallas pequeñas */
@media (max-width: 1024px) {
  .team-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .team-name {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .team-name {
    font-size: 1rem;
  }
}

.team-info {
  margin-top: 1rem;
}

.score {
  display: flex;
  font-size: 6rem;
  transition: transform 0.3s ease-in-out;
}

.score:hover {
  transform: scale(1.1);
}

.score-separator {
  font-size: 5rem;
}

.goles {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  animation: fadeInUp 1s ease-out;
}

.tabla-goles {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tabla-goles th,
.tabla-goles td {
  padding: 1rem;
  border: 1px solid #2d3748;
}

.tabla-goles th {
  background-color: #4a5568;
}

.arbitro {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #edf2f7;
}

.arbitro span {
  color: #cbd5e0;
}

/* Animaciones */
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
