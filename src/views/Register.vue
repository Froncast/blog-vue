<template>
  <Form
    :formTitle="formTitle"
    :btnTitle="btnTitle"
    :link="link"
    :linkTitle="linkTitle"
    :request="request"
  />
</template>

<script>
import Form from "@/components/Form";

export default {
  name: "Register",
  data() {
    return {
      formTitle: "Регистрация",
      btnTitle: "Зарегистрироваться",
      link: "/login",
      linkTitle: "Авторизоваться",
      request: "register",
    };
  },
  created() {
    console.log(this.$store.getters.isLoggedIn);
  },
  components: {
    Form,
  },
};
</script>
