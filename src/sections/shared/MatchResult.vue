<template>
  <div class="contendor-marcador py-8">
    <!-- Contenedor principal del marcador -->
    <div class="marcador bg-slate-200 pt-4 bg-opacity-20 rounded-xl">
      <!-- Sección del marcador -->
      <div class="scoreboard flex justify-around pb-4">
        <!-- Información del equipo local -->
        <div class="team">
          <img :src="details.team1.logo" alt="FC Barcelona" class="team-logo">
          <div class="team-name text-2xl">{{ details.team1.name }}</div>
        </div>

        <!-- Marcador del partido -->
        <div class="score text-9xl flex">
          <span class="bg-slate-500 p-5 px-8">{{ details.team1.score }}</span>
          <!-- <span class="score-separator">:</span> -->
          <span class="bg-slate-400 p-5 px-8">{{ details.team2.score }}</span>
        </div>

        <!-- Información del equipo visitante -->
        <div class="team">
          <div class="team-name text-2xl">{{ details.team2.name }}</div>
          <img :src="details.team2.logo" alt="Real Betis" class="team-logo">
        </div>
      </div>

      <!-- Tabla de goles -->
      <div class="goles flex justify-center">
        <table class="tabla-goles">
          <thead>
            <tr>
              <th>Equipo Local</th>
              <th>-</th>
              <th>Equipo Visitante</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gaby</td>
              <td>3'</td>
              <td></td>
            </tr>
            <tr>
              <td>Jules Koundé</td>
              <td>27'</td>
              <td></td>
            </tr>
            <tr>
              <td>Raphinha</td>
              <td>58'</td>
              <td></td>
            </tr>
            <tr>
              <td>Ferran Torres</td>
              <td>67'</td>
              <td></td>
            </tr>
            <tr>
              <td>Lamine Yamal</td>
              <td>75'</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>84'</td>
              <td>Vitor Roque</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Información del árbitro -->
      <div class="arbitro flex justify-center gap-2">
        <span class="font-bold">Árbitro del encuentro:</span>
        <span>Mateo Solís</span>
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
  background-color: #e2e8f0;
  padding-top: 1rem;
  background-opacity: 0.2;
  border-radius: 1rem;
}

.scoreboard {
  display: flex;
  justify-content: space-around;
  padding-bottom: 1rem;
}

.team {
  text-align: center;
}

.team-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.score {
  display: flex;
  font-size: 6rem;
}

.goles {
  display: flex;
  justify-content: center;
}

.tabla-goles {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.tabla-goles th,
.tabla-goles td {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
}

.arbitro {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
}
</style>
