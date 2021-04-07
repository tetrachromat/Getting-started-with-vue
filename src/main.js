import { createApp } from 'vue';
import { createStore } from 'vuex'

import App from './App.vue';

// start by creating store which return state
const store = createStore({
    state() {
        return {
            counter: 0
        }
    },
    // clearly defined methods which have the logic to update the state
    // same as reducers
    // mutations only accepts synchronous code
    mutations: {
        increment(state) {
            state.counter = state.counter + 2
        },
        increase(state, payload) {
            state.counter = state.counter + payload.value
        }
    },
    // actions are allowed to make asynchronous 
    actions: {
        increment(context) {
            setTimeout(() => {
                context.commit('increment')
            }, 2000)
        },
        increase(context, payload) {
            context.commit('increase', payload)
        }
    },
    // think of them as computed properties for stores.
    // same as selectors
    getters: {
        finalCounter(state) {
            return state.counter * 2
        },
        normalizedCounter(_, getters) {
            const finalCounter = getters.finalCounter
            if (finalCounter < 0) {
                return 0
            }
            if (finalCounter > 100) {
                return 100
            }
            return finalCounter
        }
    }
})


const app = createApp(App);

app.use(store)

app.mount('#app');
