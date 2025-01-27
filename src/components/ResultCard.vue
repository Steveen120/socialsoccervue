<template>
    <div class="match-card w-full lg:w-[45%] 2xl:w-1/4 dark:bg-bg-cards-dark rounded-xl" v-if="match && match.team1 && match.team2">
        <div class="flex ">
            <span class="league">{{ match.league }}</span>
        </div>
        <div class="grid grid-cols-[60%_30%] md:gap-4 px-2 md:pl-12 py-4">
            <div class="border-r border-gray-300 pr-4 w-full">
                <div class="">
                    <div class="team-section">
                        <div class="team">
                            <img :src="match.team1.logo" :alt="match.team1.name" class="team-logo">
                            <span class="team-name flex text-center">{{ match.team1.name }}</span>
                        </div>
                    </div>
                    <div class="team-section">
                        <div class="team">
                            <img :src="match.team2.logo" :alt="match.team2.name" class="team-logo">
                            <span class="team-name flex text-center">{{ match.team2.name }}</span>
                        </div>
                    </div>
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
