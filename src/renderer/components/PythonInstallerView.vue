<template>
  <div v-if="installer" class="content">
    <h3>Installer Details: {{ installer.name }}</h3>
    <p>This Python was installed using <a v-bind:href="installer.url">{{ installer.name }}</a>.</p>

    <component v-bind:is="installer.Description" basics="true">
    </component>

    <h4>Removal instructions</h4>
    <component v-bind:is="installer.Uninstall" v-bind:python="python"></component>
  </div>
</template>

<script>
export default {
  props: ['installer', 'python']
}
</script>
