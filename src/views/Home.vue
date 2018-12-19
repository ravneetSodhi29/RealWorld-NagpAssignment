<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-if="username"
                  @click="setFeed('user');"
                  :class="{active:activeFeed==='user'}"
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="setFeed('global');"
                  :class="{active:activeFeed==='global'}"
                >Global Feed</a>
              </li>
            </ul>
          </div>

          <ArticlePreview v-for="article in articles" :key="article.slug" :article="article"></ArticlePreview>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <Tags v-for="tag in tags" :tag="tag" :key="tag"></Tags>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
import Tags from "@/components/Tags.vue";
export default {
  components: {
    ArticlePreview,
    Tags
  },
  methods: {
    setFeed(feedType) {
      if (feedType == "global") {
        this.activeFeed = "global";
        this.$store.dispatch("articles/getGlobalFeed");
      } else if (feedType == "user") {
        this.activeFeed = "user";
        this.$store.dispatch("articles/getUserFeed");
      }
    },
    getTags() {
      this.$store.dispatch("articles/getTags");
    }
  },
  created() {
    this.setFeed("global");
    this.getTags();
  },
  computed: {
    articles() {
      return this.$store.state.articles.feed || [];
    },
    username() {
      return this.$store.getters["users/username"];
    },
    tags() {
      return this.$store.getters["articles/tags"];
    }
  },
  data: function() {
    return {
      activeFeed: "global"
    };
  }
};
</script>
