<template>
  <div class="content">
    <p>When we uninstall, we're only removing the Python installed by pyenv, <em>not</em> pyenv itself. The process is pretty simple - Homebrew comes with a <code>pyenv uninstall</code> command that's used to remove software it installed.</p>
    <p v-if="python">This particular Python can be removed using <code>pyenv uninstall {{ python.version }}</code>
    </p>
    <p>If you <em>did</em> want to remove pyenv itself and all of the Python versions it installed, you can remove the <code>~/.pyenv</code> folder.</p>
  </div>
</template>

<script>
export default {
  props: [ 'python' ]
}
</script>

<style>
</style>
