import axios from 'axios'

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
}

const actions = {
  async login ({
    commit
  }, data) {
    const response = await axios({
      url: `${process.env.VUE_APP_API_ENDPOINT}/login/`,
      data: data,
      method: 'POST'
    }).catch(err => {
      if (err.response) {
        commit('auth_error')
        localStorage.removeItem('token')
        console.error(err.response.data)
      }
    })

    const token = response.data.token
    const user = response.data.user
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    commit('auth_success', token, user)
  },
  async register ({
    commit
  }, data) {
    const response = await axios({
      url: `${process.env.VUE_APP_API_ENDPOINT}/register/`,
      data: data,
      method: 'POST'
    }).catch(err => {
      if (err.response) {
        commit('auth_error')
        localStorage.removeItem('token')
        console.error(err.response.data)
      }
    })

    const token = response.data.token
    const user = response.data.user
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    commit('auth_success', token, user)
  },
  logout ({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const getters = {
  isLoggedIn: state => state.token,
  authStatus: state => state.status
}

export default {
  state,
  getters,
  actions,
  mutations
}
