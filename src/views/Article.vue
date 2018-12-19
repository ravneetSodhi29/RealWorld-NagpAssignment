<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <div class="article-meta">
          <a href>
            <img :src="article.author.image">
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{formatDate(article.updatedAt)}}</span>
          </div>
          <router-link
            v-if="username==article.author.username"
            class="nav-link"
            :to="{name:'editor_edit', params:{slug:article.slug}}"
          >Edit Article</router-link>
          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="username==article.author.username"
            @click="deleteArticle"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Delete Article
          </button>
          &nbsp;&nbsp;
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.body}}</p>
        </div>
      </div>

      <hr>

      <div class="article-actions">
        <div class="article-meta">
          <a>
            <img :src="article.author.username">
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{article.updatedAt}}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="userComment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="userImage" class="comment-author-img">
              <button
                class="btn btn-sm btn-primary"
                @click="addComment"
                v-if="username"
              >Post Comment</button>
            </div>
          </form>
        </div>
      </div>
      <Comments v-for="comment in comments" :key="comment.id" :comment="comment" :slug="slug"></Comments>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Comments from "@/components/Comments.vue";
export default {
  components: {
    Comments
  },
  methods: {
    getArticle() {
      this.$store.dispatch("articles/getArticle", { slug: this.slug });
    },
    getArticleComments() {
      this.$store.dispatch("articles/getComments", { slug: this.slug });
    },
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    deleteArticle() {
      this.$store.dispatch("articles/deleteArticle", { slug: this.slug });
    },
    addComment() {
      this.$store
        .dispatch("articles/addComment", {
          slug: this.slug,
          comment: this.userComment
        })
        .then(response => {
          this.userComment = "";
          this.$store.dispatch("articles/getComments", {
            slug: this.slug
          });
        });
    }
  },

  created() {
    this.slug = this.$route.params.slug;
    this.getArticle();
    this.getArticleComments();
  },

  computed: {
    userImage() {
      return this.$store.getters["users/userImage"];
    },

    article() {
      return this.$store.getters["articles/article"];
    },

    comments() {
      return this.$store.getters["articles/comments"] || [];
    },

    username() {
      return this.$store.getters["users/username"];
    }
  },
  data: function() {
    return {
      userComment: ""
    };
  }
};
</script>
