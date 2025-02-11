<template>
  <div>
    <div class="flex flex-col gap-8">
      <div class="pt-8 flex justify-center">
        <span class="text-xl md:text-4xl text-white justify-center md:justify-start">PROXIMOS PARTIDOS</span>
      </div>
      <div class="results-container pb-16 grid gap-8">
        <!-- Itera sobre cada equipo en la lista de equipos -->
        <div v-for="team in teams" :key="team.name" class="flex flex-col gap-4">
          <span class="text-xl">{{ team.name }}</span>
          <div class="matches-row flex flex-wrap justify-center w-full gap-6">
            <!-- Itera sobre los partidos visibles de cada equipo -->
            <MatchCard v-for="(match, index) in visibleMatchesByTeam(team.name)"
              :key="index"
              :match="match"
              class="toggle-card"/>
          </div>
          <!-- Botón para mostrar más o menos partidos -->
          <button v-if="team.results.length > visibleCount" @click="toggleShowMore(team.name)">
            {{ isShowingAll[team.name] ? 'Ver menos' : 'Ver más' }}
            <svg v-if="isShowingAll[team.name]" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M1.646 11.854a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 6.707l-6.354 6.147z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-chevron-down" viewBox="0 16 16">
              <path fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchCard from '../components/Cards/MatchCard.vue'; // Importa el componente MatchCard
import resultsData from '@/data/results.json'; // Importa los datos de resultados desde un archivo JSON

export default {
  name: 'Partidos',
  components: { MatchCard }, // Declara el componente MatchCard
  data() {
    return {
      teams: resultsData.teams, // Inicializa la lista de equipos desde los datos importados
      visibleCount: 4, // Número de partidos visibles por defecto
      isShowingAll: {}, // Objeto para rastrear qué equipos están mostrando todos sus partidos
    };
  },
  computed: {
    // Agrupa los partidos por equipo
    groupedMatches() {
      return this.teams.reduce((groups, team) => {
        groups[team.name] = team.results;
        return groups;
      }, {});
    },
    // Devuelve los partidos visibles para un equipo específico
    visibleMatchesByTeam() {
      return (teamName) => {
        const matches = this.groupedMatches[teamName];
        return this.isShowingAll[teamName] ? matches : matches.slice(0, this.visibleCount);
      };
    }
  },
  methods: {
    // Alterna entre mostrar más o menos partidos para un equipo específico
    toggleShowMore(teamName) {
      this.$set(this.isShowingAll, teamName, !this.isShowingAll[teamName]);
    },
  }
};
</script>
