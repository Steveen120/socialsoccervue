<template>
  <div :class="['match-card', isInicio ? 'w-full lg:w-11/12' : 'w-full lg:w-1/3 2xl:w-[30%]',]"
    class="dark:bg-bg-cards-dark text-black dark:text-white rounded-xl">
    <!-- Liga del partido -->
    <div class="flex">
      <a href="/resultadosequip" class="league">{{ match.league }}</a>
    </div>
    <!-- Detalles del partido -->
    <div class="md:grid flex flex-col grid-cols-[60%_30%] md:gap-4 px-2 md:pl-12 py-4">
      <div class="border-r border-gray-300 pr-4 w-full">
        <!-- Información del equipo 1 -->
        <div class="team-section">
          <div class="team">
            <img :src="match.team1.logo" :alt="match.team1.name" class="team-logo">
            <span class="team-name flex text-center">{{ match.team1.name }}</span>
          </div>
          <div>
            <span class="score hidden md:block">{{ match.team1.score }}</span>
          </div>
        </div>
        <!-- Marcador en pantallas pequeñas -->
        <div class="block md:hidden">
          <span class="flex justify-center">
            <span class="score">{{ match.team1.score }}</span>
            <span>-</span>
            <span class="score">{{ match.team2.score }}</span>
          </span>
        </div>
        <!-- Información del equipo 2 -->
        <div class="team-section">
          <div class="team">
            <img :src="match.team2.logo" :alt="match.team2.name" class="team-logo">
            <span class="team-name flex text-center">{{ match.team2.name }}</span>
          </div>
          <span class="score hidden md:block">{{ match.team2.score }}</span>
        </div>
      </div>
      <!-- Fecha del partido -->
      <div class="flex items-center justify-center w-full">
        <span class="text-sm md:text-base">{{ match.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Propiedad 'match' para los detalles del partido
    match: {
      type: Object,
      required: true
    },
    // Propiedad 'isInicio' para determinar el estilo del componente
    isInicio: {
      type: Boolean,
      default: false
    }
  }
};
</script>