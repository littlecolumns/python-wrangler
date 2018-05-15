<template>
  <div class="path">
    <code v-bind:class="{ symlink: isSymlink }">{{ path }}</code>
    <small v-if="inPath" class="tag is-warning">in PATH</small>
    <small v-if="isSymlink" class="is-symlink-tag">symlink</small>
    <small v-if="isMissing" class="tag is-danger">file missing</small>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['path', 'python'],
  computed: {
    isMissing () {
      return this.python.path === this.path && this.python.missing
    },
    isSymlink () {
      return this.python.symlinks.indexOf(this.path) !== -1
    },
    inPath () {
      return this.python.path_locations.indexOf(this.path) !== -1
    }
  }
}
</script>

<style>
code {
  word-break: break-word
}
.symlink {
  color: #bea9ad;
}
.is-symlink-tag {
  color: #666;
  background: white;
}
</style>
