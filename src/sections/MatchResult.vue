<template>
  <div class="contendor-marcador">
    <div class="marcador">
      <div class="scoreboard flex justify-around">
        <div class="team">
          <img :src="details.team1.logo" alt="FC Barcelona" class="team-logo">
          <div class="team-name">{{ details.team1.name }}</div>
        </div>

        <div class="score">
          <span>{{ details.team1.score }}</span>
          <span class="score-separator">:</span>
          <span>{{ details.team2.score }}</span>
        </div>

        <div class="team">
          <img :src="details.team2.logo" alt="Real Betis" class="team-logo">
          <div class="team-name">{{ details.team2.name }}</div>
        </div>
      </div>

      <!-- <div class="flex">
        <div>
            <span>Equipo Local</span>
            <div class="flex gap-4">
              <div class="flex flex-col">
                <span>Gaby</span>
                <span>Jules Koundé</span>
                <span>Raphinha</span>
                <span>Ferran Torres</span>
                <span>Lamine Yamal</span>
              </div>
            </div>
          </div>
          <div>
            
            <div class="flex flex-col">
              <span>3'</span>
              <span>27'</span>
              <span>58'</span>
              <span>58'</span>
              <span>58'</span>    
              <span>84'</span>
            </div>
        </div>
        <div>
            <span>Equipo Visitante</span>
            <div class="flex gap-4">
              <div class="flex flex-col">
              </div>
              <div class="flex flex-col">
                <span>Vitor Roque</span>
              </div>
            </div>
        </div>
      </div> -->

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

      <div class="arbitro flex justify-center gap-2">
        <span class=" font-bold">Árbitro del encuentro:</span>
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

<!-- <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
  
  .contendor-marcador {
    background-color: #1E1E1E;
    color: white;
    padding: 2rem;
    font-family: Arial, sans-serif;
   width: 90%;
  }
  
  .scoreboard {
    background-color: rgb(23, 26, 29);
              width: 95%;
              border-radius: 15px;
              padding: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
  
          .team {
              align-items: center;
              gap: 10px;
              width: 200px;
          }
  
          .team img {
              width: 60px;
              height: 60px;
              object-fit: contain;
          }
  
          .team-name {
              font-size: 18px;
              text-align: center;
          }
  
          .score {
              font-size: 36px;
              font-weight: bold;
              display: flex;
              align-items: center;
              gap: 10px;
          }
  
          .score-separator {
              color: #666;
          }
  
  .marcador {
    justify-content: center;
    background: #1E1E1E;
    color: white;
    height: 80vh; 
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
  }
  
 
  
  .equipo {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
  }
  
  .equipo img {
    width: 20%;;
    height: auto;
    border-radius: 50%;
    margin: 10px;
  }
  
  .resultado {
    font-size: 32px;
    font-weight: bold;
  }
  
  .estado {
    font-size: 14px;
    color: #bbb;
    margin-bottom: 15px;
  }
  
  .goles {
    width: 90%;
    margin: auto;
  }
  
  .tabla-goles {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
  }
  
  .tabla-goles th, .tabla-goles td {
    padding: 15px;
    text-align: center;
    border: 10px solid #1E1E1E;
  }
  
  .tabla-goles th {
    background: rgba(56, 54, 54, 0.1);
    font-weight: bold;
  }
  
  .tabla-goles td {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .tabla-goles tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .arbitro {
    font-size: 14px;
    color: #bbb;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  </style> -->