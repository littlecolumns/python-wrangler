<template>
  <div class="content">
    <p>When we uninstall, we're only removing the Python installed by Homebrew, <em>not</em> all of Homebrew. The process is pretty simple - Homebrew comes with a <code>brew uninstall</code> command that's used to remove software it installed.</p>
    <p v-if="python">This particular Python can be removed using
      <code>
        brew uninstall <span v-if="python.base_version == 3">python</span><span v-else>python@2</span>
      </code>
    </p>

  </div>
</template>

<script>
export default {
  mixins: [ ],
  props: [ 'python' ]
}
</script>

<style>
</style>
