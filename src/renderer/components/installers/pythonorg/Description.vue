<template>
  <div class="content">
    <p>Python.org distributes the official Python source code - every other version of Python out there is just a repackaged version of this one.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>You'll be using a standard kind of Python that doesn't do many weird things when being installed. You also won't pollute your computer with a bunch of commands and programs tied to specific companies.</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>It's more difficult to keep Python up to date - you'll need to re-download the installer and re-run it each time a new Python comes out, while also (optionally) removing your old versions.</li>
        <li>Python is installed as a super magic all-powerful user, instead of a nice comfortable installation just for you. You might wind up typing your password in a <em>lot</em> to confirm changes.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>It's a fine, simple basis for building up a Python installation that isn't full of other junk</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['basics']
}
</script>

<style>
</style>
