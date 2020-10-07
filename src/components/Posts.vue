<template>
  <div>
    <Header />
    <div class="container">
      <div class="post-list" v-if="!loading">
        <article class="post-wrap" v-for="post in get_posts" :key="post.id">
          <div class="post">
            <div class="post-img-wrap">
              <img
                src="https://via.placeholder.com/360x220"
                alt=""
                class="post__img"
              />
            </div>
            <div class="post-info">
              <div class="post-header">
                <h3 class="post__title">
                  {{ post.title }}
                </h3>
                <span class="post__date">{{ post.date }}</span>
              </div>
              <p class="post__description">
                {{ post.description }}
              </p>
              <a href="#" class="post-link">Продолжить чтение &rarr;</a>
            </div>
          </div>
        </article>
      </div>
      <span v-if="loading">Загрузка</span>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters(["get_posts"]),
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch("get_posts");
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
.post-wrap {
  background: #ffffff;
  margin-bottom: 30px;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.2));
}
.post-list {
  padding: 50px 0;
}

.post {
  display: flex;
  padding: 20px;
}

.post-img-wrap {
  width: 360px;
  height: 220px;
  flex-basis: 360px;
  flex-shrink: 0;
  flex-grow: 0;
}

.post-img {
  width: 100%;
  object-fit: cover;
}

.post-info {
  padding-left: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.post__date {
  margin-left: 20px;
}

.post__description {
  margin-bottom: 20px;
}

@media (max-width: 1200px) {
  .container {
    max-width: 960px;
  }
}

@media (max-width: 992px) {
  .post-info {
    padding: 20px;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .post {
    flex-direction: column;
  }

  .post-header {
    flex-direction: column;
  }

  .post__title {
    margin-bottom: 20px;
  }

  .post__date {
    margin-left: 0;
  }

  .post-img-wrap {
    margin: auto;
    height: auto;
    flex-basis: 0;
  }
}

@media (max-width: 576px) {
  .post-img-wrap {
    width: 90%;
  }

  .post__img {
    width: 100%;
  }
}

/*
.post {
  display: flex;
  margin-bottom: 1.5rem;
  background: #ffffff;
}

.post-img {
  width: 360px;
  height: 220px;
  margin-right: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.post-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
}

.post__title {
  font-size: 1rem;
}

.post__date {
  margin-left: 20px;
}

.post__description {
  margin-bottom: 20px;
}

.post-link {
  text-align: right;
}

@media (max-width: 1200px) {
  .container {
    max-width: 960px;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 700px;
  }

  .post {
    flex-direction: column;
    padding-top: 20px;
  }

  .post-img {
    margin: auto;
  }

  .post-link {
    text-align: left;
  }
}

@media (max-width: 576px) {
  .post-header {
    flex-direction: column;
  }

  .post-img {
    width: 100%;
  }

  .post__date {
    display: none;
  }
} */
</style>
