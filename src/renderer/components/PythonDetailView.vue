<template>
  <div>

    <h1 v-if="!python" class="title">Loading Python details...</h1>
    <h1 v-else class="title">Python {{ python.version }} details</h1>
    
    <div v-if="python" class="content">
      <p>This is everything we know about this particular Python.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Commands</td>
            <td>
              <div v-if="python.default_commands.length === 0">
                None available, you can't run this from the command line without typing its full path
              </div>
              <div v-for="command in python.default_commands" v-bind:key="command">
                <code>{{ command }}</code><br>
              </div>
            </td>
          </tr>
          <tr><td>Version</td><td>
          {{ python.version }}
          <span class="tag is-warning" v-if="isThree">Python 3</span>
          <span class="tag is-warning" v-if="isTwo">Python 2</span>
          </td></tr>
          <tr><td>Path</td><td><code>{{ python.path }}</code></td></tr>
          <tr>
            <td>Installed by</td>
            <td>{{ python.installer }}</td>
          </tr>
          <tr><td>Installed at</td><td><DisplayDate :time="python.ctime" v-if="!python.missing" /></td></tr>
          <tr><td>Raw version output</td><td>{{ python.raw_version }}</td></tr>
          <tr>
            <td>All paths</td>
            <td class="paths">
              <DisplayPath :path="python.path" :python="python" />
              <DisplayPath v-for="path in python.symlinks" :path="path" :python="python" v-bind:key="path" />
            </td>
          </tr>
          <tr>
            <td>syspath</td>
            <td class="paths">
              <div v-for="path in python.syspath" v-bind:key="path">
                <code>{{ path }}</code><br>
              </div>
            </td>
          </tr>
          <tr>
            <td>Jupyter</td>
            <td>
              <p v-if="kernelSpec">
                Available in Jupyter as <strong>{{ kernelSpec.display_name }}</strong>
              </p>
              <template v-else-if="kernelSpec === false">
                <p>Jupyter does <strong>not</strong> know about this python. To install it with the name <strong>{{ python.raw_version }}</strong>, run:</p>
                <pre><code>{{ python.path }} -m ipykernel install --user --name "{{ python.raw_version }}"</code></pre>
                <p>You can also pick a more descriptive name, something like "data projects" or whatever.</p>
              </template>
              <p v-else class="is-loading">
                Asking for Jupyter info...
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PythonInstallerView v-bind:installer="installer" v-bind:python="python" v-if="python"></PythonInstallerView>

    <PythonPackagesView v-bind:python="python" v-if="python"></PythonPackagesView>

  </div>
</template>

<script>
import installers from './installers'
import PythonInstallerView from './PythonInstallerView'
import PythonPackagesView from './PythonPackagesView'
import DisplayDate from './DisplayDate'
import DisplayPath from './DisplayPath'

export default {
  name: 'PythonSingleView',
  components: {
    DisplayDate,
    DisplayPath,
    PythonInstallerView,
    PythonPackagesView
  },
  mounted () {
    if (!this.jupyter) {
      this.$store.dispatch('fetchJupyters')
    }
    if (!this.python) {
      this.$store.dispatch('fetchPythons').then(() => {
        this.$store.dispatch('fetchPackages', this.python.path)
      })
    }
  },
  computed: {
    python () {
      if (!this.$store.state.pythons) {
        return
      }
      return this.$store.state.pythons.find((python) => {
        return this.$route.params.path === python.path
      })
    },
    jupyter () {
      return this.$store.state.jupyter
    },
    kernelSpec () {
      if (!this.jupyter || !this.python || !this.jupyter.kernels) {
        return null
      }
      for (var key in this.jupyter.kernels.kernelspecs) {
        var spec = this.jupyter.kernels.kernelspecs[key].spec
        var kernelpath = spec.argv[0]
        if (kernelpath === this.python.path || this.python.symlinks.indexOf(kernelpath) !== -1) {
          return spec
        }
      }
      return false
    },
    installer () {
      return installers[this.python.installer]
    },
    isThree () {
      return this.python.base_version === 3
    },
    isTwo () {
      return this.python.base_version === 2
    }
  }
}
</script>
