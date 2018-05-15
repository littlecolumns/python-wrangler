<template>
  <div>
    <template v-if="isWindows">
      <p>On Windows, first install any version of Python, and then use <code>pip</code> to install pipenv:</p>
      <pre><code>pip install pipenv</code></pre>
    </template>
    <template v-else>
      <p>On OS X, you'll need to first install <a href="https://brew.sh/">Homebrew</a>. Once that's done you can run <code>brew install pipenv</code>.</p>
    </template>
    <p>You can find more details on using pipenv <a href="https://docs.pipenv.org/">in the documentation</a>.</p>
  </div>
</template>

<script>
export default {
  computed: {
    isWindows () {
      return this.$store.state.system.platform === 'win32'
    }
  }
}
</script>

<style>
</style>
