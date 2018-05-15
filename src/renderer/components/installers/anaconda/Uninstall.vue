<template>
  <div class="content">
    <p>When we uninstall a Python installed by Anaconda, we need to also uninstall all of the additional Anaconda stuff that came with it. To do that, we can either use <strong>Add/Remove Programs</strong> (Windows only), or remove the directory Anaconda lives in (Windows/OS X).</p>
    <p v-if="python">This specific Python lives in <FileLink :folder="python.basepath"></FileLink>, so you just need to remove that folder.</p>
  </div>
</template>

<script>
import FileLink from '../../FileLink'

export default {
  components: {
    FileLink
  },
  mixins: [ ],
  props: [ 'python' ]
}
</script>

<style>
</style>
