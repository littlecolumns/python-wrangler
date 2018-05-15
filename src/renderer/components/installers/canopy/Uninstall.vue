<template>
  <div class="content">
    <p>On Windows, remove Canopy through <strong>Add/Remove Programs</strong>.</p>
    <p>On OS X, follow the folowing steps:</p>
    <ol>
      <li>Open up <FileLink folder="/Applications" openInto="true"></FileLink> and delete <code>Canopy.app</code> and <code>Enthought Canopy (64-bit)</code></li>
      <li>Open up <FileLink folder="~/Library" openInto="true"></FileLink> and delete <code>Enthought</code> and <code>Canopy</code></li>
    </ol>
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
