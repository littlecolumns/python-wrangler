<template>
  <table>
    <thead>
      <tr>
        <th width="100">Command</th>
        <th width="80">Version</th>
        <th width="110">Installation</th>
        <th width="120">Packages</th>
        <th>Location(s)</th>
      </tr>
    </thead>
    <tbody>
      <PythonRow v-for="python in sortedPythons" :python="python" :key="python.path"></PythonRow>
    </tbody>
  </table>
</template>

<script>
import PythonRow from './PythonRow'

export default {
  props: [ 'pythons' ],
  components: {
    PythonRow
  },
  computed: {
    sortedPythons () {
      if (!this.pythons) {
        return []
      }

      return this.pythons
    }
  }
}
</script>
