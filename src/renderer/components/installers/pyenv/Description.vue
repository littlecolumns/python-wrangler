<template>
  <div class="content">
    <p>Pyenv is a simple Python version manager. It allows you to install multiple versions of Python on your machine, from the command line.</p>
    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>Allows you to switch between multiple version of Python easily.</li>
        <li>Is very easy to use.</li>
        <li>Is simple to uninstall.</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>It's easily confused with <code>pipenv</code>, which is a different project.</li>
        <li>Traditional virtualenv support.</li>
        <li>Not as good as <code>pipenv</code> for managing individual virtual environments.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>I think using <code>pyenv</code> is an excellent choice to manage your global Python version. Combine it with <code>pipenv</code> for individual projects and you'll be good to go!</p>
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
