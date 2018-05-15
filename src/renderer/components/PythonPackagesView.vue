<template>
  <div v-if="python.packages" class="content">
    <h3>Packages
      <span class="tag is-light" v-if="python.package_overcount">overcount due to no <code>pip</code> installation</span>
    </h3>
    <p>This Python has <strong>{{ python.packages.length }}</strong> packages available. <span v-if="!python.package_overcount">To install more, run the following:</span></p>
    <pre v-if="!python.package_overcount"><code>{{ scriptPath }} -m pip install &lt;packagename&gt;</code></pre>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pkg in python.packages" v-bind:key="pkg.name">
          <td>{{ pkg.name }}</td>
          <td>{{ pkg.version }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['python'],
  computed: {
    scriptPath () {
      if (this.python.default_commands.length > 0) {
        return this.python.default_commands[0]
      } else {
        return this.python.path
      }
    }
  }
}
</script>
