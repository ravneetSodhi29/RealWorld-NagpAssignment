import { api, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    userImage(state) {
      return (state.user && state.user.image) || null;
    },
    profile(state) {
      return state.profile || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    getUser: async function({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },

    loginUser: async function({ commit }, { email, password }) {
      try {
        clearToken();
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          localStorage.setItem("token", response.data.user.token);
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    registerUser: async function({ commit }, { username, email, password }) {
      try {
        const response = await api.post("/users", {
          user: {
            username,
            email,
            password
          }
        });
        if (response.data.user) {
          localStorage.setItem("token", response.data.user.token);
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getProfile: async function({ commit }, payload) {
      const response = await api.get(`/profiles/${payload.username}`);
      commit("setProfile", response.data);
    }
  }
};
