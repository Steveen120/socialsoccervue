<template>
  <div class="dashboard">
    <header class="header">
      <div class="welcome">
        <h1 class="">BIENVENIDO</h1>
        <h2>{{ userName }}</h2>
        <p>"El fútbol se vive con pasión en cada rincón y en cada corazón."</p>
      </div>
    </header>
    <hr>

    <section class="flex flex-col pt-4 md:flex-row gap-8 md:justify-between md:mb-5">
      <div class="flex gap-2">
        <label for="teams">Mis equipos</label>
        <select id="teams" v-model="selectedTeam" class="dark:bg-bg-cards-dark dark:text-white">
          <option selected  disabled>
            Seleccione un tipo</option>
          <option v-for="team in teams" :key="team">{{ team }}</option>
        </select>
      </div>
      <div class="flex gap-2">
        <label for="competitions">Competencias</label>
        <select id="competitions" class="dark:bg-bg-cards-dark dark:text-white" v-model="selectedCompetition">
          <option selected  disabled>
            Seleccione un tipo</option>
          <option v-for="competition in competitions" :key="competition">
            {{ competition }}
          </option>
        </select>
      </div>
    </section>

    <section class="highlights flex flex-col gap-8 ">
      <div class="results-container grid gap-8 ">
        <div>
          <span class="text-lg text-primary-color font-bold dark:text-white">Partidos Próximos</span>
          <div class="matches-row flex flex-wrap w-full gap-6">
            <ResultCard v-for="match in upcomingMatches" :key="match.date + match.team1.name + match.team2.name"
              :match="match" class="toggle-card" />
          </div>
        </div>
  
        <div class="">
          <span class="text-lg text-primary-color font-bold dark:text-white">Resultados Recientes</span>
          <div class="matches-row flex flex-wrap w-full gap-6">
            <MatchCard v-for="result in recentResults" :key="result.date + result.team1.name + result.team2.name"
              :match="result" class="toggle-card" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8 md:justify-around">
        <div>
          <span class="text-lg text-primary-color font-bold dark:text-white">Jugadores Destacados</span>
          <div class="top-players justify-center">
            <div class="player-card toggle-card bg-bg-cards dark:bg-bg-cards-dark" v-for="player in highlightedPlayers" :key="player.name">
              <div class="flex justify-center">
                <img :src="player.photo" :alt="player.name" />
              </div>
              <span>{{ player.name }}</span>
              <div class="vertical-line"></div>
              <div class="player-info flex flex-col">
                <span>{{ player.goals }} Goles</span>
                <span>{{ player.assists }} Asistencias</span>
              </div>
            </div>
          </div>
        </div>
  
        <div>
          <span class="text-lg text-primary-color font-bold dark:text-white">Equipos Destacados</span>
          <div class="top-teams justify-center">
            <div class="team-card toggle-card bg-bg-cards dark:bg-bg-cards-dark" v-for="team in highlightedTeams" :key="team.name">
              <div class="flex justify-center">
                <img :src="team.logo" :alt="team.name" class="team-logo" />
              </div>
              <span>{{ team.name }}</span>
              <div class="vertical-line"></div>
              <div class="team-info">
                <span class="pb-4 font-bold">Resultados Recientes:</span>
                <ul class="flex flex-col gap-4">
                  <li v-for="result in team.recentResults" :key="result.date + result.opponent" class="flex flex-col">
                    <span>{{ result.date }}</span> 
                    <span>{{ result.opponent }}</span>
                    <span>{{ result.score }}</span> 
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MatchCard from '../components/MatchCard.vue';
import ResultCard from '../components/ResultCard.vue';
import resumenData from '@/data/resumen.json';

const userName = ref('JUAN FERNANDO');
const selectedTeam = ref('');
const selectedCompetition = ref('');
const teams = ref(['FC Barcelona', 'Real Madrid', 'Juventus', 'Paris Saint-Germain']);
const competitions = ref(['LaLiga', 'Serie A', 'Ligue 1', 'Champions League']);
const highlightedPlayers = ref(resumenData.highlightedPlayers);
const highlightedTeams = ref(resumenData.highlightedTeams);
const upcomingMatches = ref(resumenData.upcomingMatches);
const recentResults = ref(resumenData.recentResults);
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header {
  text-align: center;
}

.welcome h1 {
  font-size: 2rem;
}

.welcome h2 {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}


.highlights {
  margin-top: 20px;
}

.match-cards,
.result-cards,
.top-players,
.top-teams {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.player-card,
.team-card {
  /* background-color: #f9f9f9; */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 200px;
}

.player-card img{
  width: 100px;
  height: 100px;
  object-fit: cover;
  /* border-radius: 50%; */
}

.vertical-line {
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
}

.player-info,
.team-info {
  text-align: left;
}
</style>
