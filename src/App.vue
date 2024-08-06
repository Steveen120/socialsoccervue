<template>
  <div id="app" :class="{ 'menu-open': isMenuOpen }">
    <template v-if="loggedIn && !isLoginView && !isRegisterView">
      <aside class="menu" @mouseenter="isMenuOpen = true" @mouseleave="isMenuOpen = false">
        <nav>
          <!-- Logo y texto de la aplicación -->
          <div class="logo-container">
            <img src="/src/assets/images/logo.png" alt="Logo" class="logo" />
            <span class="app-name">SOCIAL SOCCER</span>
          </div>
          <ul>
            <li v-for="item in filteredMenuItems" :key="item.section" :class="{ active: isActive(item.section) }">
              <template v-if="item.submenu">
                <a href="#" @click.prevent="toggleSubmenu(item.section)">
                  <i :class="`fa-solid ${item.icon}`"></i>
                  <span>{{ item.name }}</span>
                  <i class="fa-solid fa-chevron-right" :class="{ 'rotate-180': isSubmenuOpen(item.section) }"></i>
                </a>
                <ul v-show="isSubmenuOpen(item.section)">
                  <li v-for="subItem in item.submenu" :key="subItem.section">
                    <a href="#" @click.prevent="handleMenuItemClick(subItem)">
                      <span>{{ subItem.name }}</span>
                    </a>
                  </li>
                </ul>
              </template>
              <template v-else>
                <a href="#" @click.prevent="handleMenuItemClick(item)">
                  <i :class="`fa-solid ${item.icon}`"></i>
                  <span>{{ item.name }}</span>
                </a>
              </template>
            </li>
          </ul>
        </nav>
      </aside>
    </template>
    <main class="content" v-if="loggedIn && !isLoginView && !isRegisterView">
      <router-view></router-view>
    </main>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const loggedIn = localStorage.getItem('loggedIn') === 'true';

const isLoginView = ref(false);
const isRegisterView = ref(false);

watch(() => route.name, (newRoute) => {
  isLoginView.value = newRoute === 'login';
  isRegisterView.value = newRoute === 'register';
});

const menuItems = [
  { name: 'Inicio', icon: 'fa-home', section: 'inicio' },
  { name: 'Perfil', icon: 'fa-user', section: 'perfil' },
  { name: 'Encuentros', icon: 'fa-futbol', section: 'partido' },
  { name: 'Gestión', icon: 'fa-cogs', section: 'gestion', submenu: [
      { name: 'Gestión de Equipos', section: 'equipo' },
      { name: 'Gestión de Jugadores', section: 'jugador' }
    ]
  },
  { name: 'Estadísticas', icon: 'fa-chart-bar', section: 'estadisticas', submenu: [
      { name: 'Estadísticas de Jugadores', section: 'estadisticas-jugador' },
      { name: 'Estadísticas de Partidos', section: 'estadisticas-partidos' }
    ]
  },
  { name: 'Campeonato', icon: 'fa-trophy', section: 'campeonato' },
  { name: 'Árbitro', icon: 'fa-whistle', section: 'arbitro' },
  { name: 'Cerrar Sesión', icon: 'fa-sign-out-alt', section: 'cerrar-sesion' }
];

const isMenuOpen = ref(false);
const openSubmenus = ref([]);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleSubmenu = (section) => {
  const index = openSubmenus.value.indexOf(section);
  if (index === -1) {
    openSubmenus.value.push(section);
  } else {
    openSubmenus.value.splice(index, 1);
  }
};

const isSubmenuOpen = (section) => {
  return openSubmenus.value.includes(section);
};

const navigateTo = (section) => {
  closeMenu();
  router.push({ name: section });
};

const isActive = (section) => {
  return route.name === section;
};

const handleMenuItemClick = (item) => {
  if (item.section === 'cerrar-sesion') {
    handleLogout();
  } else if (item.section === 'partido') {
    window.location.href = 'http://localhost:5173/partidos';
  } else if (item.section === 'inicio') {
    window.location.href = 'http://localhost:5173/Inicio';
  } else if (item.section === 'estadisticas-jugador') {
    window.location.href = 'http://localhost:5173/estadisticas-Jugador';
  } else {
    navigateTo(item.section);
  }
};

const handleLogout = () => {
  localStorage.removeItem('loggedIn');
  closeMenu();
  router.push({ name: 'login' });
};

const filteredMenuItems = ref(menuItems.filter(item => item.section !== 'login'));
</script>

<style scoped>
#app {
  display: flex;
  transition: margin-left 0.3s ease;
}

.menu {
  width: 250px;
  background-color: #001529;
  color: #fff;
  padding: 20px;
  position: fixed;
  left: -250px;
  top: 0;
  height: 100%;
  transition: left 0.3s ease;
}

#app.menu-open .menu {
  left: 0;
}

#app.menu-open .content {
  margin-left: 250px;
}

.content {
  padding: 20px;
  width: 100%;
  transition: margin-left 0.3s ease;
}

.menu nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu nav ul li {
  margin-bottom: 10px;
}

.menu nav ul li a {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.menu nav ul li a:hover {
  background-color: #1890ff;
}

.menu nav ul li a i {
  margin-right: 10px;
}

.menu nav ul li.active a {
  background-color: #1890ff;
  color: #fff;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu ul li {
  padding-left: 20px;
}

.menu ul li a {
  color: #fff;
  text-decoration: none;
}

.menu ul li a:hover {
  background-color: #1890ff;
}

.rotate-180 {
  transform: rotate(180deg);
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
</style>
