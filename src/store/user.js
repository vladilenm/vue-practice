import {delay} from '../delay'

class User {
  constructor (id) {
    this.id = id
  }
}

const REGISTERED_USERS = [
  {email: 'test@mail.ru', password: '123456', id: 'fuid'}
]

function userExists (email) {
  const candidate = REGISTERED_USERS.findIndex(u => u.email === email)
  return candidate > 0
}

function getUser (email, password) {
  const candidate = REGISTERED_USERS.find(u => u.email === email)
  if (!candidate) {
    return null
  }

  if (candidate.password === password) {
    return candidate
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await delay(750)

        if (userExists()) {
          throw {message: 'User with this email exists'}
        }

        const id = Math.random() + 'userID'

        REGISTERED_USERS.push({
          email, password, id
        })
        localStorage.setItem('user', JSON.stringify({id}))
        commit('setUser', new User(id))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await delay(750)

        const user = getUser(email, password)

        if (user === null) {
          throw {message: 'Incorrect user data'}
        }

        localStorage.setItem('user', JSON.stringify({id: user.id}))
        commit('setUser', user)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.id))
    },
    logoutUser ({commit}) {
      commit('setUser', null)
      localStorage.setItem('user', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
