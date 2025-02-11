<template>
    <body>
        <div class="profile-header">
            <div class="container-perfil">
                <div class="welcome-section">
                    <span class="welcome">BIENVENIDO</span>
                </div>

                <div class="profile-content">
                    <div class="user-section">
                        <div class="avatar">
                            <img src="https://randomuser.me/api/portraits/men/50.jpg" alt="Avatar del usuario">
                        </div>
                        <div class="user-info">
                            <h3 class="name" id="userName">JUAN PEREZ</h3>
                        </div>
                    </div>

                    <!-- Se agrega un margen para separar el nombre de las cards -->
                    <div class="separation-line"></div>

                    <div class="container">
                        <div class="card">
                            <div class="card-content">
                                <div class="title">Contacto:</div>
                                <div class="info" id="userEmail">📧 <a href="mailto:juanperez70@gmail.com">juanperez70@gmail.com</a></div>
                                <div class="info" id="userPhone">📞 <a href="tel:+593987654321">+593 987654321</a></div>
                            </div>
                            <div class="icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Contacto" width="60">
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="title">Datos adicionales:</div>
                                <div class="info" id="userGender">Género: Masculino</div>
                                <div class="info" id="userTeam">Equipo: Equipo 1</div>
                            </div>
                            <div class="icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Datos" width="60">
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="title">Habilidades</div>
                                <div class="info" id="userSkills">⚡ Velocidad explosiva</div>
                            </div>
                            <div class="icon">
                            </div>
                        </div>
                    </div>

                    <!-- Sección de jugadores con imágenes de ejemplo -->
                    <div class="players-section">
                        <h2>Jugadores Destacados</h2>
                        <div class="players-container">
                            <div class="player-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Jugador 3">
                                <p>Neymar Jr.</p>
                            </div>
                            <div class="player-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Jugador 4">
                                <p>Kylian Mbappé</p>
                            </div>
                            <div class="player-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" alt="Jugador 5">
                                <p>Kevin De Bruyne</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </body>
</template>

<style>
/* Contenedor del perfil más reducido */
.container-perfil {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1c1e26;
    border-radius: 12px;
}

/* Tarjetas organizadas en filas */
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

/* Tarjetas más pequeñas y elegantes */
.card {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #272830;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.2);
}

/* Avatar con imagen real, centrado */
.avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.avatar img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
}

/* Nombre centrado */
.user-info {
    text-align: center;
    margin-top: 20px; /* Separación entre avatar y nombre */
}

.name {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}

/* Línea de separación entre el nombre y las cards */
.separation-line {
    margin: 20px 0;
    border-top: 1px solid #555;
}

/* Sección de jugadores */
.players-section {
    margin-top: 20px;
    text-align: center;
}

.players-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.player-card {
    background-color: #272830;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    width: 180px;
}

.player-card img {
    width: 100%;
    border-radius: 10px;
    height: 180px;
    object-fit: cover;
}

.player-card p {
    color: #fff;
    margin-top: 10px;
}

/* Media Queries para pantallas pequeñas */
@media screen and (max-width: 768px) {
    /* Avatar más pequeño en pantallas pequeñas */
    .avatar img {
        width: 150px;
        height: 150px;
    }

    /* Nombre más pequeño */
    .name {
        font-size: 20px;
    }

    /* Tarjetas de contacto más pequeñas */
    .card {
        width: 280px;
        padding: 12px;
    }

    /* Sección de jugadores se adapta a pantalla pequeña */
    .players-container {
        flex-direction: column;
        gap: 15px;
    }

    .player-card {
        width: 100%;
    }

    /* Aseguramos que las cards no ocupen mucho espacio en pantallas más pequeñas */
    .container {
        justify-content: center;
    }
}

/* Media Queries para pantallas muy pequeñas (móviles) */
@media screen and (max-width: 480px) {
    /* Avatar aún más pequeño */
    .avatar img {
        width: 120px;
        height: 120px;
    }

    /* Tarjetas más pequeñas */
    .card {
        width: 100%;
    }

    /* Nombre más pequeño */
    .name {
        font-size: 18px;
    }

    /* Sección de jugadores más compacta */
    .players-container {
        flex-direction: column;
        gap: 10px;
    }

    .player-card {
        width: 100%;
        padding: 8px;
    }
}
</style>
