<template>
  <div class="fc-barcelona-page overflow-hidden">
    <header class="header flex-col md:flex-row gap-4 md:gap-0 md:justify-evenly justify-center text-black dark:text-white bg-bg-cards dark:bg-bg-cards-dark">
      <img :src="`./assets/perfil/${nombre}.png`" alt="FC Barcelona" class="logo" />
      <h1>{{ nombre }}</h1>
      <button class="btn-ver-jugadores p-4">Ver jugadores</button>
    </header>

    <!-- Sección principal -->
    <main class="main-content flex flex-col text-center gap-8">
      <div class="resultado-container flex-col gap-8 md:flex-row">
        <section class="ultimo-resultado flex flex-col gap-4">
          <h2>Último Resultado</h2>
          <div class="card bg-bg-cards dark:bg-bg-cards-dark">
            <p><strong>FC Barcelona</strong> 5</p>
            <p><strong>Real Betis</strong> 1</p>
            <p>Finalizado</p>
            <p>Copa del Rey</p>
          </div>
          <!-- <a href="#">Ver todos los resultados ></a> -->
        </section>

        <section class="siguiente-partido flex flex-col gap-4">
          <h2>Siguiente Partido</h2>
          <div class="card">
            <p><strong>Getafe</strong></p>
            <p>18/01/25 - 15:00</p>
            <p>La Liga</p>
          </div>
          <!-- <a href="#">Ver todos los partidos ></a> -->
        </section>
      </div>

      <section class="clasificaciones flex flex-col gap-4">
        <h2>Clasificaciones</h2>
        <div class=" overflow-auto">
          <table>
            <thead class="bg-bg-cards dark:bg-bg-cards-dark">
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>G</th>
                <th>D</th>
                <th>DG</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>FC Barcelona</td>
                <td>19</td>
                <td>13</td>
                <td>5</td>
                <td>22</td>
                <td>44</td>
              </tr>
              <!-- Agrega más filas aquí -->
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DetallesEquipo',
  props: {
    nombre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Aquí puedes definir más propiedades si es necesario
    };
  }
};
</script>

