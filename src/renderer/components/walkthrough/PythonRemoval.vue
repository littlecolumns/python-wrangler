<template>
  <div class="content">
    <p v-if="unwantedPythons.length === 0">
      <strong>You're all set!</strong> You don't have any Pythons to remove.
    </p>
    <p v-else>
      We found <strong>{{ unwantedPythons.length }} unneeded Python installations</strong>. We recommend removing anything you don't need &mdash; let's make a list.
    </p>

    <table class="table" v-if="unwantedPythons.length > 0">
      <thead>
        <th>Version</th>
        <th>Installer</th>
        <th>Path</th>
        <th>Instructions</th>
      </thead>
      <tbody>
        <tr v-for="python in unwantedPythons" v-bind:key="python.path">
          <td>
            <span v-if="!python.installer">unknown</span>
            <span v-else>{{ python.installer }}</span>
          </td>
          <td>{{ python.version }}</td>
          <td><DisplayPath :path="python.path" :python="python" /></td>
          <td>
            <component
              v-bind:is="uninstallInstructions(python)"
              v-bind:python="python"
              v-if="python.installer"
            ></component>
          </td>
        </tr>
      </tbody>
    </table>

    <p><span class="button is-small" @click='toggleKept()'>
      <span v-if="!showKept">+ Show Pythons we're keeping</span>
      <span v-else>- Hide list</span>
    </span></p>

    <div v-show="showKept">
      <p>We're going to keep everything installed by <strong>pyenv</strong>, <strong>pipenv</strong>, <strong>Python.org</strong>, or <strong>Homebrew</strong>. We aren't going to <em>use</em> the Homebrew ones, but software installed with <code>brew</code> might depend on them. Some software depends on the Python.org version, so we'll keep that, too. We're also keeping anything with a mystery origin, just to be safe.</p>
      <table class="table">
        <thead>
          <th>Version</th>
          <th>Installer</th>
          <th>Path</th>
        </thead>
        <tbody>
          <tr v-for="python in keptPythons" v-bind:key="python.path">
            <td>{{ python.version }}</td>
            <td>
              <span v-if="!python.installer">unknown</span>
              <span v-else>{{ python.installer }}</span>
            </td>
            <td><DisplayPath :path="python.path" :python="python" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DisplayPath from '../DisplayPath'
import installers from '../installers'

export default {
  components: {
    DisplayPath
  },
  props: ['pythons'],
  data () {
    return {
      showKept: false
    }
  },
  computed: {
    unwantedPythons () {
      if (!this.pythons) {
        return []
      }
      return this.pythons.filter((python) => {
        return !this.isOkay(python)
      })
    },
    keptPythons () {
      if (!this.pythons) {
        return []
      }
      return this.pythons.filter((python) => {
        return this.isOkay(python)
      })
    }
  },
  methods: {
    uninstallInstructions (python) {
      return installers[python.installer].Uninstall
    },
    isOkay (python) {
      return ['pyenv', 'pipenv', 'homebrew', 'pythonorg', null].indexOf(python.installer) !== -1
    },
    toggleKept () {
      this.showKept = !this.showKept
    }
  }
}
</script>
