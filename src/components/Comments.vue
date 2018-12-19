<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div class="card">
        <div class="card-block">
          <p class="card-text">{{comment.body}}</p>
        </div>
        <div class="card-footer">
          <a href class="comment-author">
            <img :src="comment.author.image" class="comment-author-img">
          </a>
          &nbsp;
          <a href class="comment-author">{{comment.author.username}}</a>
          <span class="date-posted">{{formatDate(comment.updatedAt)}}</span>
          <button
            class="btn btn-sm btn-primary"
            v-if="username==comment.author.username"
            @click="deleteComment(comment.id)"
          >
            <i class="ion-trash-a"></i>Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    comment: [] | Object,
    slug: ""
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    deleteComment(id) {
      this.$store
        .dispatch("articles/deleteComment", {
          slug: this.slug,
          id: id
        })
        .then(response => {
          this.$store.dispatch("articles/getComments", {
            slug: this.slug
          });
        });
    }
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>

