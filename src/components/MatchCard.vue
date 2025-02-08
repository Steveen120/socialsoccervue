<template>
    <div class="match-card w-full lg:w-[45%] 2xl:w-3/12 dark:bg-bg-cards-dark  dark:text-white rounded-xl ">
      <div class="flex ">
        <a href="/resultadosequip" class="league">{{ match.league }}</a>
      </div>
      <div class="grid grid-cols-[60%_30%] md:gap-4 px-2 md:pl-12 py-4">
        <div class="border-r border-gray-300 pr-4 w-full">
          <div class="team-section">
            <div class="team">
              <img :src="match.team1.logo" :alt="match.team1.name" class="team-logo">
              <span class="team-name flex text-center">{{ match.team1.name }}</span>
            </div>
            <span class="score">{{ match.team1.score }}</span>
          </div>
          <div class="team-section">
            <div class="team">
              <img :src="match.team2.logo" :alt="match.team2.name" class="team-logo">
              <span class="team-name flex text-center">{{ match.team2.name }}</span>
            </div>
            <span class="score">{{ match.team2.score }}</span>
          </div>
        </div>
        <div class="flex items-center justify-center w-full">
          <span class=" text-sm md:text-base">{{ match.date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      match: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  