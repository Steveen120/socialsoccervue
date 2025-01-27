<template>
  <div class="pt-8 flex justify-center">
    <span class="text-primary-color text-xl md:text-4xl dark:text-white justify-center md:justify-start">PROXIMOS PARTIDOS</span>
  </div>
  <div class="results-container grid gap-8">
    <div v-for="team in teams" :key="team.name" class="flex flex-col gap-4">
      <span class="text-xl">{{ team.name }}</span>
      <div class="matches-row flex flex-wrap w-full gap-6">
        <ResultCard
          v-for="(match, index) in visibleMatchesByTeam(team.name)"
          :key="index"
          :match="match"
          class="toggle-card"
        />
      </div>
      <button v-if="team.results.length > visibleCount" @click="toggleShowMore(team.name)">
        {{ isShowingAll[team.name] ? 'Ver menos' : 'Ver más' }}
        <svg v-if="isShowingAll[team.name]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 11.854a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 6.707l-6.354 6.147z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ResultCard from '../components/ResultCard.vue';
import resultsData from '@/data/results.json';

export default {
  components: { ResultCard },
  data() {
    return {
      teams: resultsData.teams,
      visibleCount: 4,
      isShowingAll: {}
    };
  },
  computed: {
    groupedMatches() {
      return this.teams.reduce((groups, team) => {
        groups[team.name] = team.results;
        return groups;
      }, {});
    },
    visibleMatchesByTeam() {
      return (teamName) => {
        const matches = this.groupedMatches[teamName];
        return this.isShowingAll[teamName] ? matches : matches.slice(0, this.visibleCount);
      };
    }
  },
  methods: {
    toggleShowMore(teamName) {
      this.$set(this.isShowingAll, teamName, !this.isShowingAll[teamName]);
    }
  }
};

</script>


