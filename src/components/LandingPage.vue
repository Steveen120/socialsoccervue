<template>
  <div class="landing-page">
    <h2>Bienvenido a la {{ division }}</h2>
    <p>Seleccione una opción del menú para comenzar.</p>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  props: {
    division: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 2rem;
}

.landing-page h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.landing-page p {
  font-size: 1.25rem;
}
</style>