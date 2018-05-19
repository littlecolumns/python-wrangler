<template>
  <aside class="column is-narrow aside hero is-fullheight">
    <div>
      <div class="header">
        <div class="logo"></div>
        <h1>Python Wrangler</h1>
      </div>
      <div class="main">
        <router-link to="/pythons" class="item">
          <span class="name">Pythons</span>
        </router-link>
        <router-link to="/walkthrough" class="item">
          <span class="name">Walkthrough</span>
        </router-link>
        <router-link to="/about" class="item">
          <span class="name">About</span>
        </router-link>
        <router-link to="/errors" class="item" v-if="errorful.length > 0">
          <span class="tag is-danger">!!!</span> <span class="name">Errors</span>
        </router-link>
      </div>
      <div class="main has-text-centered">
        <div v-if="isLoading" class="button is-small is-warning is-loading">
          Loading...
        </div>
        <div v-else class="button is-small is-warning" v-on:click="refresh">
          <font-awesome-icon :icon="['fas', 'sync']" /> &nbsp; Refresh
        </div>

        <form class="import-export" method="post" action="" enctype="multipart/form-data">
          <input class="import-export__file" type="file" name="file" id="file" v-on:change="importFileChange" />
          <label for="file" class="button is-warning is-small">
            <font-awesome-icon :icon="['fas', 'download']" /> &nbsp; Import
          </label>
          <a class="button is-warning is-small" v-on:click="startExport">
            <font-awesome-icon :icon="['fas', 'upload']" /> &nbsp; Export
          </a>
        </form>

      </div>

    </div>
  </aside>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { saveAs } from 'file-saver'

export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    isLoading () {
      return this.$store.state.pending.length > 0
    },
    errorful () {
      let stacked = ['pythons', 'pipenvs', 'jupyters', 'pyenvs']
        .map(type => this.errorfulExecutables(type))
      return [].concat.apply([], stacked)
    }
  },
  methods: {
    errorfulExecutables (itemtype) {
      let objs = this.$store.state[itemtype]
      if (!objs) {
        return []
      }
      return objs
        .filter(e => e.errors.length > 0)
    },
    startExport () {
      let json = JSON.stringify(this.$store.state, null, 2)
      var blob = new Blob([json], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `wrangler-export-${Date.now()}.txt`)
    },
    importFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.runImport(files[0])
      }
    },
    runImport (file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        let everything = JSON.parse(e.target.result)
        this.$store.replaceState(everything)
        this.$store.dispatch('lock')
      }
      reader.readAsText(file)
    },
    refresh () {
      if (this.isLoading) {
        return
      }
      this.$store.dispatch('fetchPythons')
      this.$store.dispatch('fetchJupyters')
      this.$store.dispatch('fetchPipenvs')
      this.$store.dispatch('fetchPyenvs')
    }
  }
}
</script>

<style scoped>
  .import-export {
    display: flex;
    justify-content: space-around; 
    align-items: stretch;
    padding: 0 25px;
  }

  .import-export__file {
    display: none;
  }

  .import-export .button {
    flex-grow: 1;
    margin: 0 5px; 
  }

  form {
    margin-top: 15px;
  }
</style>