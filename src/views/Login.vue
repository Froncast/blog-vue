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
  name: "Login",
  data() {
    return {
      formTitle: "Авторизация",
      btnTitle: "Войти",
      link: "/register",
      linkTitle: "Создать учетную запись",
      request: "login",
    };
  },
  components: {
    Form,
  },
};
</script>
