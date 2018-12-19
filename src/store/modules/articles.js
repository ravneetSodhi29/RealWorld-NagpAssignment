import { api } from "../api";
import router from '../../router';

export default {
  namespaced: true,
  state: {
    feed: [],
    count: 0,
    article: { title: "", updatedAt: "", author: { username: "" } },
    articles: [],
    comments: [],
    tags: []
  },
  getters: {
    article(state) {
      return (state.article);
    },
    articles(state) {
      return (state.articles || []);
    },
    comments(state) {
      return (state.comments || []);
    },
    tags(state) {
      return (state.tags || []);
    }
  },
  mutations: {
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    },
    setArticleList(state, { articles, articlesCount }) {
      state.articles = articles;
      state.count = articlesCount;
    },
    setArticle(state, { article }) {
      state.article = article;
    },
    setComments(state, { comments }) {
      state.comments = comments;
    },
    setTags(state, { tags }) {
      state.tags = tags;
    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;

        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favourited=${favourited}&` : "";
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },

    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      commit("setArticles", '');
      const response = await api.get(route);
      commit("setArticles", response.data);

    },

    async getArticle({ commit }, payload = { slug }) {
      let route = `articles/${payload.slug}`;
      const response = await api.get(route);
      commit("setArticle", response.data);
    },

    async createArticle({ commit }, payload) {
      let route = `articles`;
      const response = await api.post(route, {
        'article': {
          'title': payload.article.title,
          'description': payload.article.description,
          'body': payload.article.body,
          'tagList': payload.article.tags
        }
      });
      commit("setArticle", response.data);
      router.push(`/article/${response.data.article.slug}`);
    },

    async getAllArticles({ commit }, payload) {
      let route = `articles`;
      if (payload && payload.username) {
        route += `?author=${payload.username}`
      }
      const response = await api.get(route);
      commit("setArticleList", response.data);
    },

    async updateArticle({ commit }, payload) {
      let route = `articles/${payload.article.slug}`;
      const response = await api.put(route, {
        'article': {
          'title': payload.article.title,
          'description': payload.article.description,
          'body': payload.article.body,
          'tagList': payload.article.tags
        }
      });
      commit("setArticle", response.data);
      router.push(`/article/${response.data.article.slug}`);
    },

    async deleteArticle({ commit }, payload) {
      let route = `articles/${payload.slug}`;
      const response = await api.delete(route);
      router.push(`/`);
    },

    async getComments({ commit }, payload) {
      let route = `articles/${payload.slug}/comments`;
      const response = await api.get(route);
      commit("setComments", response.data);
    },

    async deleteComment({ commit }, payload) {
      let route = `articles/${payload.slug}/comments/${payload.id}`;
      const response = await api.delete(route);
    },

    async addComment({ commit }, payload) {
      let route = `articles/${payload.slug}/comments`;
      const response = await api.post(route, {
        "comment": {
          "body": payload.comment
        }
      });
    },

    async getTags({ commit }) {
      let route = `tags`;
      const response = await api.get(route);
      commit("setTags", response.data);
    }
  }
}


