<template>
  <div>
    <h1 class='title'>Python Installations</h1>
    <div class="content">
      <p v-if="pythons">
        We found <strong>{{ pythons.length }} Pythons</strong> installed on your system. There might be more if they're exceptionally polite about hiding when not in use.
      </p>
      <p v-else class="is-loading">
        Scanning your system for Python installations...
      </p>
      <PythonTable v-bind:pythons='pythons' v-if='pythons'></PythonTable>
    </div>
  </div>
</template>

<script>
import PythonTable from './PythonTable'

export default {
  name: 'PythonListView',
  components: {
    PythonTable
  },
  mounted () {
    if (!this.pythons && !this.isLoading('PYTHONS')) {
      this.$store.dispatch('fetchPythons')
    }
  },
  computed: {
    pythons () {
      return this.$store.state.pythons
    }
  },
  methods: {
    isLoading (type) {
      return this.$store.state.pending.indexOf(type) !== -1
    }
  }
}
</script>
