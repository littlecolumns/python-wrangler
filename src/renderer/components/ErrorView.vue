<template>
  <div>
    <h1 class="title">Errors</h1>
    
    <div class="content" v-if="errorful.length > 1">
      <p>We ran into errors when trying to analyze your system! <strong>These might or might not matter.</strong></p>
      <p>They aren't supposed to make sense to you, really.</p>
    </div>
    <div class="content" v-else>
      <p>You're error-free!</p>
    </div>

    <div v-for="executable in errorful" class="content">
      <hr>
      <h3><code>{{ executable.path }}</code></h3>
      <div v-for="error in executable.errors">
        <p><strong>{{ error.message }}</strong></p>
        <pre><code>{{ error.stack }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
    }
  }
}
</script>

<style scoped>
</style>