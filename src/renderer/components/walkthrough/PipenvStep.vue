<template>
  <div class="content">
    <template v-if="!pipenvs">
      <p>Looking for pipenv...</p>
    </template>
    <template v-else>
      <template v-if="pipenvs.length > 0">
        <p>
        <strong>Great!</strong> pipenv was successfully installed. You can use it when a project needs to be isolated from everything else.</p>
        <p>If you'd like to learn more about using pipenv, <a href="https://thoughtbot.com/blog/how-to-manage-your-python-projects-with-pipenv">read this</a>.</p>
      </template>
      <installerView v-else></installerView>
    </template>
  </div>
</template>

<script>
import installers from '../installers'

export default {
  props: ['pipenvs', 'pipenv'],
  components: {
    installerView: installers['pipenv'].Install
  }
}
</script>
