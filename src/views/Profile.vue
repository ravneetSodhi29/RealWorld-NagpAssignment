<template>
  <div class="profile-page" v-if="profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img">
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="articles">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="setArticleType('myArticle')">
                <a class="nav-link active" href>My Articles</a>
              </li>
              <li class="nav-item" @click="setArticleType('favouritedArticle')">
                <a class="nav-link" href>Favorited Articles</a>
              </li>
            </ul>
          </div>
          <ArticlePreview v-for="article in articles" :key="article.slug" :article="article"></ArticlePreview>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  components: {
    ArticlePreview
  },
  methods: {
    getProfile() {
      this.$store.dispatch("users/getProfile", { username: this.username });
    },
    setArticleType(type) {
      this.type = type;
      if (this.type == "myArticle") {
        this.$store.dispatch("articles/getAllArticles", {
          username: this.username
        });
      } else if (this.type == "favouritedArticle") {
        this.$store.dispatch("articles/getAllArticles");
      }
    }
  },
  created() {
    this.getProfile();
    this.setArticleType(this.type);
  },
  computed: {
    profile() {
      return this.$store.getters["users/profile"] || null;
    },
    username() {
      return this.$store.getters["users/username"];
    },
    articles() {
      if (this.type == "myArticle") {
        return this.$store.state.articles.articles || [];
      } else if (this.type == "favouritedArticle") {
        return (
          this.$store.state.articles.articles.filter(item => item.favourited) ||
          []
        );
      }
    }
  },
  data: function() {
    return {
      type: "myArticle"
    };
  }
};
</script>
