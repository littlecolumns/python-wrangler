<template>
  <tr>
    <td>
      <span v-for='command in python.default_commands' :key='command' style='display: block'>
        <code>{{ command }}</code>
      </span>
    </td>
    <td>

      <router-link :to='{ name: "python-detail", params: { path: python.path } }'>
      <template v-if="python.missing">
        <span class="tag is-danger">Executable missing!</span>
        See details
      </template>
      <template v-else>{{ python.version }}</template>
      </router-link>
    </td>
    <td>
      {{ installer }}<br>
      <DisplayDate :time="python.ctime" v-if="!python.missing" />
    </td>
    <td>
      <span v-if='python.packages'>
        <router-link :to='{ name: "python-detail", params: { path: python.path } }'>{{ python.packages.length }} packages</router-link>
        <span class="tag tag-danger"
        v-if="python.package_overcount"
        title="Couldn't use pip, so it includes a lot of things you wouldn't consider packages">overcount</span>
      </span>
      <span v-else class="is-loading">
        Searching...
      </span>
    </td>
    <td class='paths'>
      <DisplayPath :python="python" :path="python.path" />
      <DisplayPath v-for='path in python.symlinks' v-bind:key='path' :python="python" :path="path" />
    </td>
  </tr>
</template>

<script>
import DisplayDate from './DisplayDate'
import DisplayPath from './DisplayPath'

export default {
  components: {
    DisplayDate,
    DisplayPath
  },
  created () {
    if (!this.python.packages) {
      this.$store.dispatch('fetchPackages', this.python.path)
    }
  },
  computed: {
    installer () {
      return !this.python.installer ? 'Unknown' : this.python.installer
    }
  },
  props: [ 'python' ]
}
</script>

<style>
.symlinks {
  display: block;
}
</style>
