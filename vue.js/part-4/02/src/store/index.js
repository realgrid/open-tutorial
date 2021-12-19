import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        token: "",
    },
    getters: {
        isLogined: (state) => {
            return state.token !== "";
        },
    },
    actions: {
        updateToken({commit}, token) {
            commit("UPDATE_TOKEN", token);
        },
    },
    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token;
        },
    },
    modules: {
    },
    plugins: [createPersistedState()],
})
