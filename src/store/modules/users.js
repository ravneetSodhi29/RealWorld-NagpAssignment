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
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
