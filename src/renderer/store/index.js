import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { ipcRenderer } from 'electron'
import { EventEmitter } from 'events'

EventEmitter.defaultMaxListeners = 30

Vue.use(Vuex)
Vue.use(VueResource)

const asyncWatcher = store => {
  store.subscribe((mutation, state) => {
    let pieces = mutation.type.split('_')
    if (pieces[0] === 'FETCH') {
      store.commit('COMPLETED_DATA', pieces[1])
    }
  })

  store.subscribeAction((action, state) => {
    if (action.type.indexOf('fetch') === 0) {
      var type = action.type.replace('fetch', '').toUpperCase()
      store.commit('PENDING_DATA', type)
    }
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [asyncWatcher],
  state: {
    locked: false,
    pythons: null,
    pyenv: null,
    pyenvs: null,
    pyenv_activated: null,
    pipenvs: null,
    jupyter: null,
    jupyters: null,
    pending: []
  },
  mutations: {
    FETCH_PYTHONS (state, pythons) {
      if (state.locked) {
        return
      }
      pythons.sort((a, b) => {
        if (b.default_commands.length === a.default_commands.length) {
          // return b.ctime - a.ctime
          if (!a.installer) {
            return 1
          }
          if (!b.installer) {
            return -1
          }
          return a.installer.localeCompare(b.installer)
        } else {
          return b.default_commands.length - a.default_commands.length
        }
      })
      state.pythons = pythons
    },
    FETCH_PACKAGES (state, data) {
      if (state.locked) {
        return
      }
      var match = state.pythons.find((python) => {
        return python.path === data.path
      })
      match.packages = data.packages
      match.package_overcount = data.package_overcount
    },
    FETCH_PYENVS (state, data) {
      if (state.locked) {
        return
      }
      state.pyenv_activated = data.activated
      state.pyenvs = data.pyenvs
      state.pyenv = data.pyenvs.find((pyenv) => {
        return pyenv.default_commands.indexOf('pyenv') !== -1
      })
    },
    FETCH_PIPENVS (state, data) {
      if (state.locked) {
        return
      }
      state.pipenvs = data.pipenvs
      state.pipenv = data.pipenvs.find((pipenv) => {
        return pipenv.default_commands.indexOf('pipenv') !== -1 || pipenv.default_commands.indexOf('pipenv.exe') !== -1
      })
    },
    FETCH_JUPYTERS (state, data) {
      if (state.locked) {
        return
      }
      state.jupyters = data.jupyters
      state.jupyter = data.jupyters.find((jupyter) => {
        return jupyter.default_commands.indexOf('jupyter') !== -1 || jupyter.default_commands.indexOf('jupyter.exe') !== -1
      })
    },
    FETCH_SYSTEM (state, data) {
      if (state.locked) {
        return
      }
      state.system = data.system
    },
    PENDING_DATA (state, type) {
      state.pending.push(type)
    },
    COMPLETED_DATA (state, type) {
      var copy = state.pending.slice()
      copy.splice(state.pending.indexOf(type), 1)
      state.pending = copy
    },
    LOCK (state) {
      state.locked = true
    }
  },
  actions: {
    lock ({ commit }, data) {
      commit('LOCK', data)
    },
    pendingData ({ commit }, type) {
      commit('PENDING_DATA', type)
    },
    completedData ({ commit }, type) {
      commit('COMPLETED_DATA', type)
    },
    fetchPythons ({ commit, state }) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        ipcRenderer.once(`get-pythons`, (event, data) => {
          commit('FETCH_PYTHONS', data.pythons)
          resolve()
        })
        ipcRenderer.send(`get-pythons`)
      })
    },
    fetchPyenvs ({ commit, state }) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        ipcRenderer.once(`get-pyenvs`, (event, data) => {
          commit('FETCH_PYENVS', data)
          resolve()
        })
        ipcRenderer.send(`get-pyenvs`)
      })
    },
    fetchPipenvs ({ commit, state }) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        ipcRenderer.once(`get-pipenvs`, (event, data) => {
          commit('FETCH_PIPENVS', data)
          resolve()
        })
        ipcRenderer.send(`get-pipenvs`)
      })
    },
    fetchJupyters ({ commit, state }) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        ipcRenderer.once(`get-jupyters`, (event, data) => {
          commit('FETCH_JUPYTERS', data)
          resolve()
        })
        ipcRenderer.send(`get-jupyters`)
      })
    },
    fetchSystem ({ commit, state }) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        ipcRenderer.once(`get-system`, (event, data) => {
          commit('FETCH_SYSTEM', data)
          resolve()
        })
        ipcRenderer.send(`get-system`)
      })
    },
    fetchPackages ({ commit, state }, pythonPath) {
      if (state.locked) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        /* The listener responds to every set-packages, so
        we need to make sure we're listening for the right one
        and then remove the listener & process if it's a match */
        let responder = (event, data) => {
          if (pythonPath === data.path) {
            ipcRenderer.removeListener('get-packages', responder)
            commit('FETCH_PACKAGES', data)
            resolve()
          }
        }
        ipcRenderer.on(`get-packages`, responder)
        ipcRenderer.send(`get-packages`, pythonPath)
      })
    }
  }
})
