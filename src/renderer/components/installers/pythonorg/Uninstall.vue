<template>
  <div class="content">
    <p><strong>On Windows,</strong> you can remove Python.org's installation using <strong>Add/Remove Programs</strong> in the Control Panel.</p>
    <p><strong>On OS X</strong>, you can remove this version of Python by deleting its folder.</p>
    <p v-if="python">This Python lives in <FileLink :folder="python.basepath"></FileLink>, so you just need to remove that folder.</p>
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
