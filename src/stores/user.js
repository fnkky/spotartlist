// stores/counter.js
import axios from 'axios'
import { defineStore } from 'pinia'

export const LS_ITEM_LOGIN_STATE = 'loginState'

export const USER_STORE_NAME = 'user'

export const useUserStore = defineStore(USER_STORE_NAME, {
  state: () => {
    return {
      profile: null
    }
  },
  getters: {
    userId () {
      return this.profile?.id
    }
  },
  actions: {
    setProfile (profile) {
      this.profile = profile
    },
    readUserProfile () {
      this.loading = true
      return axios.get('https://api.spotify.com/v1/me')
        .then((response) => {
          this.profile = response.data
        })
        .catch(e => {
          console.error(e)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})
