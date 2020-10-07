<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="header__left-side">
          <router-link class="header__link" to="/">Главная</router-link>
          <router-link class="header__link" to="/posts">Cтатьи</router-link>
        </div>
        <div class="header__right-side">
          <button class="burger-btn">
            <span class="burger-btn__line"></span>
            <span class="burger-btn__line"></span>
            <span class="burger-btn__line"></span>
          </button>
          <router-link
            v-if="isLoggedIn"
            tag="a"
            to="/login"
            class="user header__user"
          >
            <img
              class="user__avatar"
              src="https://via.placeholder.com/40"
              alt="Avatar: Nathan"
            />
            <span class="user__name">User</span>
          </router-link>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">
            Выход
          </button>
          <router-link v-if="!isLoggedIn" class="header__link" to="/register"
            >Регистрация</router-link
          >
          <router-link v-if="!isLoggedIn" class="header__link" to="/login"
            >Авторизация</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isLoggedIn() {
      console.log(this.$store.getters.token);
      if (this.$store.getters.isLoggedIn) {
        return this.$store.getters.isLoggedIn;
      }
      return null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.header {
  background: #303b44;
  padding: 10px 20px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__right-side {
  display: flex;
  align-items: center;
}

.header__link {
  color: #ffffff;
  margin-right: 1rem;
  text-decoration: none;
}

.header__link:hover {
  text-decoration: underline;
}

.header__user {
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user__name {
  margin-left: 20px;
}

.logout-btn {
  background: #65a3be;
  color: #ffffff;
  padding: 0 13px;
  height: 32px;
  border-radius: 3px;
  font-size: 13px;
}

.burger-btn {
  display: none;
  height: 11px;
  width: 16px;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border: none;
  cursor: pointer;
  background: transparent;
}

@media (max-width: 576px) {
  .header__user,
  .logout-btn {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .burger-btn__line {
    width: 16px;
    height: 1px;
    background: #ffffff;
  }
}
</style>
