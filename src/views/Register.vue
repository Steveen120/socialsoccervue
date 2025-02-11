<template>
  <div class="register-container">
    <div class="register-box">
      <div class="image-container"></div>
      <div class="form-container">
        <h2 style="font-size: 1.5em;">Registrarse</h2>
        <p style="font-size: 13px; text-align: center;">
          ¡Únete a nuestra comunidad hoy mismo y descubre todo lo que tenemos para ti! Regístrate ahora para empezar.
        </p>
        <form @submit.prevent="registro">
          <div class="form-group">
            <label class="username" for="nombre"><i class="fa-solid fa-user"></i> Nombre</label>
            <input type="text" id="nombre" v-model="nombre" required class="form-control" />
          </div>
          <div class="form-group">
            <label class="apellido" for="apellido"><i class="fa-solid fa-user"></i> Apellido</label>
            <input type="text" id="apellido" v-model="apellido" required class="form-control" />
          </div>
          <div class="form-group">
            <label class="email" for="email"><i class="fa-solid fa-envelope"></i> Email</label>
            <input type="email" id="email" v-model="correo" required class="form-control" />
          </div>
          <div class="form-group">
            <label class="password" for="password"><i class="fa fa-key"></i> Contraseña</label>
            <input type="password" id="password" v-model="contrasena" required class="form-control" />
          </div>
          <button type="submit" id="register-button" class="btn btn-primary register-button">Registrarse</button>
        </form>
        <div v-if="registerSuccess" id="registerSuccess" class="alert alert-success mt-3">
          ¡Registro exitoso! Ahora puedes <router-link to="/login" class="register-link">iniciar sesión</router-link>.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios';


export default {
  name: 'Register',
  data() {
    return {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      csrfToken: '',
      registerSuccess: false
    };
  },
  async mounted() {
    try {
      // Configura el token CSRF en Axios
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      axios.defaults.headers['X-CSRF-Token'] = this.csrfToken;
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
  },
  methods: {
    async registro() {
      try {
        const response = await instance.post('/registro', {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          contrasena: this.contrasena
        }, {
          headers: {
            'X-CSRF-Token': this.csrfToken
          }
        });

        console.log('Registro exitoso:', response);
        this.registerSuccess = true;
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.$router.push('/'); // Redirecciona después de la alerta
        });
      } catch (error) {
        console.error('Error en el registro:', error);
        const message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'No se pudo registrar el usuario.';

        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: message
        });
      }
    }
  }
}
</script>

<style scoped>
/* Estilos CSS */

.register-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

.register-box {
  display: flex;
  width: 60%;
  height: 46em;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.image-container {
  width: 50%;
  background: url('../assets/imagen.jpg') no-repeat center center;
  background-size: cover;
}

.form-container {
  width: 50%;
  padding: 2rem;
}

.password, .username, .apellido, .email {
  font-size: 1em;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
  font-size: 12px;
}

.form-group input {
  width: 90%;
  padding: 1rem;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 12px;
}

#register-button {
  width: 100%;
  padding: 1rem;
  background-color: #009688;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

#register-button:hover {
  background-color: #00796b;
}

.register {
  text-align: center;
  font-size: 12px;
  color: #555;
}

router-link {
  color: #00796b;
  text-decoration: none;
}

router-link:hover {
  color: #00796b;
}

#registerSuccess {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 0.8em;
  margin-top: 10px;
  margin-bottom: 1em;
  border-radius: 0.5em;
  text-align: center;
}

@media (max-width: 768px) {
  .register-box {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  .image-container {
    display: none;
  }

  .form-container {
    width: 100%;
    padding: 1rem;
  }

  .form-group input {
    width: 100%;
  }

  #register-button {
    font-size: 16px;
  }
}
</style>
