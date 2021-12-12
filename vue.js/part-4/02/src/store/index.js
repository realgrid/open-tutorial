import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        token: "",
    },
    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token;
        },
    },
    actions: {
        updateToken({commit}, token) {
            commit("UPDATE_TOKEN", token);
        },
    },
    getters: {
        isLogined: (state) => {
            return state.token !== "";
        },
    },
    modules: {
    },
    plugins: [createPersistedState()],
})
