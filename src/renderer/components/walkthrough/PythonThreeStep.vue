<template>
  <div class="content">
    <template v-if="hasPythonorgThree">
      <p><strong>Great!</strong> You're all set with Python 3 from Python.org.</p>
    </template>
    <template v-else-if="maybeHasPythonorgThree">
      <p>You have Python 3 installed, and <strong>maybe</strong> it's from Python.org. We can't tell because it looks like a nice generic Python. You're probably okay!</p>
    </template>
    <template v-else>
      <p>We're starting off with a nice plain Python installation that we're going to layer everything on top of. Some software packages I enjoy like Python.org (e.g. QGIS 3.0) , so we're going along with it.</p>
      <installerView></installerView>
    </template>
  </div>
</template>

<script>
import installers from '../installers'

export default {
  props: ['pythons', 'hasPythonorgThree', 'maybeHasPythonorgThree'],
  components: {
    installerView: installers['pythonorg'].Install
  }
}
</script>
