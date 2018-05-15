<template>
  <div class="content">
    <p>ActivePython includes uninstall instructions in their documentation, broken up by version number:
      <a href="http://docs.activestate.com/activepython/2.6/installnotes.html">2.6</a>,
      <a href="http://docs.activestate.com/activepython/2.7/">2.7</a>,
      <a href="http://docs.activestate.com/activepython/3.5/">3.5</a>,
      <a href="http://docs.activestate.com/activepython/3.6/">3.6</a>.</p>
      <p>Your version is <strong>{{ python.version }}</strong>. You'll want to select from the left-hand menu - pick OS X or Windows or whichever platform you're on - then scroll down to the uninstall instructions down at the bottom of the page.</p>
    <p>If you're using Windows, you should be able to use <strong>Add/Remove Programs</strong>.</p>
  </div>
</template>

<script>
export default {
  props: [ 'python' ]
}
</script>

<style>
</style>
