<template>
  <div class="content">
    <p>When we uninstall a Python installed by Miniconda, we need to also uninstall all of the additional Miniconda stuff that came with it. To do that, we can either use <strong>Add/Remove Programs</strong> (Windows only), or remove the directory Miniconda lives in (Windows/OS X).</p>
    <p v-if="python">This specific Python lives in <FileLink :folder="python.basepath"></FileLink>, so you just need to remove that folder.</p>
  </div>
</template>

<script>
import FileLink from '../../FileLink'

export default {
  components: {
    FileLink
  },
  props: [ 'python' ]
}
</script>

<style>
</style>
