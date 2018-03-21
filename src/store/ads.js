import {delay} from '../delay'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

const INITIAL_ADS = [
  new Ad('Lamborghini Aventador', 'Very fast and modern car', 'fuid', 'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/share%20img/aventador-coupe-facebook-og.jpg', true, 'lamborgini-aventador-2017'),
  new Ad('Bugatti Veyron', 'The most expensive and cool car ever', 'fuid', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Bugatti_Veyron_-_BCN_motorshow_2009.JPG/1200px-Bugatti_Veyron_-_BCN_motorshow_2009.JPG', true, 'buggati-veron-2018'),
  new Ad('Porsche Panamera', 'Very elite looking car!', 'fuid', 'https://ag-spots-2017.o.auroraobjects.eu/2017/02/26/porsche-panamera-turbo-s-c609926022017232228_2.jpg', true, 'porshe-panamera-2018')
]

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const ad = await delay(1000, new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.image,
          payload.promo,
          Math.random() + 'uid'
        ))

        commit('setLoading', false)
        commit('createAd', {
          ...ad
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const resultAds = await delay(750, INITIAL_ADS)

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await delay(500)
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
