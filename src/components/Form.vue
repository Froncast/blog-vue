<template>
  <div class="form-inner">
    <div class="form-wrap">
      <div class="form-img-wrap">
        <img src="@/assets/login.svg" alt="login img" class="form__img" />
      </div>
      <form class="form" @submit.prevent="formHandler">
        <span class="form__title">{{ formTitle }}</span>
        <div class="form-group">
          <input
            class="form__input"
            type="text"
            name="email"
            placeholder="Email"
            v-model="userLogin"
            required
          />
        </div>
        <div class="form-group">
          <input
            class="form__input"
            type="password"
            name="pass"
            placeholder="Password"
            v-model="userPassword"
            required
          />
        </div>
        <div class="form-group">
          <button class="form-btn">{{ btnTitle }}</button>
        </div>
        <router-link :to="link" class="form-link"
          >{{ linkTitle }} &rarr;</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      userLogin: "",
      userPassword: "",
      isLoggedIn: this.$store.getters.isLoggedIn ? this.$router.push("/") : "",
    };
  },
  props: {
    formTitle: {
      type: String,
      defailt: "",
    },
    btnTitle: {
      type: String,
      defailt: "",
    },
    link: {
      type: String,
      default: "",
    },
    linkTitle: {
      type: String,
      default: "",
    },
    request: {
      type: String,
      default: "",
    },
  },
  methods: {
    formHandler() {
      const data = {
        userLogin: this.userLogin,
        userPassword: this.userPassword,
      };

      this.$store
        .dispatch(this.request, data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.form-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.form-wrap {
  display: flex;
  justify-content: space-around;
  padding: 40px;
  width: 960px;
  padding-top: 150px;
  background: #fff;
  border-radius: 10px;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.2));
}

.form-img-wrap {
  margin-right: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 290px;
}

.form__title {
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 54px;
}

.form-group {
  width: 100%;
  margin-bottom: 10px;
}

.form__input {
  font-size: 15px;
  line-height: 1.5;
  color: #666666;
  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px;
}

.form-btn {
  font-size: 15px;
  line-height: 1.5;
  background: #57b846;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  transition: all 0.4s;
}

.form-link {
  margin-top: 100px;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
  text-decoration: none;
  transition: color 0.4s;
}

.form-link:hover {
  text-decoration: underline;
  color: #57b846;
}

.form-img-wrap {
  width: 250px;
}

.form__img {
  margin: auto;
  width: 100%;
}

@media (max-width: 768px) {
  .form-img-wrap {
    display: none;
  }
}

@media (max-width: 576px) {
  .form {
    width: 90%;
  }
}
</style>
