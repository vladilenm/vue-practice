import {delay} from '../delay'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

const ORDERS = {
  'fuid': [
    new Order('Vladilen', '8-921-232-21-23', 'lamborgini-aventador-2017', false, 'random-imewk32'),
    new Order('Maxim', '8-921-232-21-23', 'buggati-veron-2018', true, 'randomfewfw323423-imewk32')
  ]
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId, false, Math.random() + 'unicmqk')
      commit('clearError')

      try {
        await delay(500)

        if (typeof ORDERS[ownerId] === 'undefined') {
          ORDERS[ownerId] = []
        }

        ORDERS[ownerId].push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')

      try {
        const userId = getters.user.id
        const resultOrders = await delay(500, ORDERS[userId] || [])

        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')
      try {
        await delay(300)

        const userId = getters.user.id
        if (ORDERS[userId]) {
          const order = ORDERS[userId].find(o => o.id === payload)
          order.done = true
        }
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
