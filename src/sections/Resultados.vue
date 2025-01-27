<template>
  <div>
    <button v-if="!showTable" @click="goBack"
    class="p-3 font-bold text-primary-color dark:text-white bg-bg-cards dark:bg-bg-cards-dark rounded-lg cursor-pointer">
    < Atrás</button>

    <div v-if="showTable" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <div class="pt-8 flex justify-center">
            <span
              class="text-primary-color text-xl md:text-4xl dark:text-white justify-center md:justify-start">RESULTADOS</span>
          </div>
          <div class=" flex flex-col md:flex-row gap-4 md:gap-8">
            <span class="text-xl">Resultados de los últimos partidos</span>
            <select class="dark:bg-bg-cards-dark dark:text-white" name="team" id="team">
              <option selected disabled>
                Seleccione un tipo</option>
              <option>FC Barcelona</option>
              <option>Real Betis</option>
            </select>
          </div>
        </div>
        <div v-for="(matches, monthYear) in visibleMatchesByGroup" :key="monthYear" :data="matches" @row-click="handleRowClick" tableType="resultados" class="grid gap-4 ">
          <div class=" text-lg md:text-xl">{{ monthYear }}</div>
          <div class="matches-row flex flex-col md:flex-row md:flex-wrap w-full gap-6">
            <MatchCard v-for="(match, index) in matches" :key="index" :match="match"  @click="handleRowClick(match)" class="toggle-card" />
          </div>
          <div class="flex justify-center">
            <button v-if="groupedMatches[monthYear].length > visibleCount" @click="toggleShowMore(monthYear)"
              class="toggle-button flex items-center gap-4">
              {{ isShowingAll[monthYear] ? 'Ver menos' : 'Ver más' }}
              <svg v-if="isShowingAll[monthYear]" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 11.854a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 6.707l-6.354 6.147z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
    </div>
  
    <Detalles v-if="selectedItem && !showTable" :nombre="selectedItem.team1.name + ' vs ' + selectedItem.team2.name" :tipo="'resultados'" :details="selectedItem" />

  </div>

</template>

<script>
import MatchCard from '../components/MatchCard.vue';
import matchesData from '@/data/matches.json';
import Detalles from '../components/Detalles.vue';

export default {
  name: 'Resultados',
  components: { MatchCard, Detalles },
  props: {
    division: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      matches: matchesData.matches,
      visibleCount: 4,
      isShowingAll: {},
      selectedItem: null,
      showTable: true
    };
  },
  computed: {
    groupedMatches() {
      return this.matches.reduce((groups, match) => {
        const monthYear = `${match.month} ${match.year}`;
        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }
        groups[monthYear].push(match);
        return groups;
      }, {});
    },
    visibleMatchesByGroup() {
      return Object.keys(this.groupedMatches).reduce((result, monthYear) => {
        const matches = this.groupedMatches[monthYear];
        result[monthYear] = this.isShowingAll[monthYear]
          ? matches
          : matches.slice(0, this.visibleCount);
        return result;
      }, {});
    }
  },
  methods: {
    toggleShowMore(monthYear) {
      this.isShowingAll[monthYear] = !this.isShowingAll[monthYear];
    },
    handleRowClick(item) {
      this.selectedItem = item;
      this.showTable = false;
    },
    goBack() {
      this.selectedItem = null;
      this.showTable = true;
    }
  }
};

</script>
