import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        cartPrice: 0,
    },
    getters: {
        cartPrice: (state) => state.cartPrice
    },
    actions: {
        setCartPrice ({ commit }, value) {
            commit('SET_CART_PRICE', value);
        }
    },
    mutations: {
        SET_CART_PRICE (state, value) {
            state.cartPrice = state.cartPrice + value;
        }
    }
});

export default store;
