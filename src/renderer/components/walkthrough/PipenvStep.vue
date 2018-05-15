<template>
  <div class="content">
    <template v-if="!pipenvs">
      <p>Looking for pipenv...</p>
    </template>
    <template v-else>
      <p v-if="pipenvs.length > 0">
        <strong>Great!</strong> pipenv was successfully installed. You can use it when a project needs to be isolated from everything else.
      </p>
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
