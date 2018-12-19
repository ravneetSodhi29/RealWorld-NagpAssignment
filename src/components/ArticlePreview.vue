<template>
  <div class="article-preview">
    <div class="article-meta">
      <a >
        <img :src="article.author.image">
      </a>
      <div class="info">
        <a href class="author">{{article.author.username}}</a>
        <span class="date">{{formatDate(article.createAt)}}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>
        {{article.favouritesCount}}
      </button>
    </div>
    <a href class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>
        <router-link
          class="nav-link"
          :to="{name:'article', params:{slug:article.slug}}"
        >Read more...</router-link>
      </span>
    </a>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>