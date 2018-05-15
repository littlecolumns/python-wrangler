<template>
  <div class="content">
    <p>Pipenv is the officially recommended packaging tool from Python.org. It's great at juggling Python versions and package installs, <em>but just for single projects</em>.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>Officially sanctions by the Powers that Be.</li>
        <li>Super easy to use compared to previous virtual environment tools</li>
        <li>Simple to change versions and keep track of the packages you need for a project</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>Does NOT manage your global Python version (a.k.a. your default <code>python</code>).</li>
        <li>Not the same as pyenv, which has a similar name.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>I am over the moon for <code>pipenv</code>, it's fantastic for managing virtual environments. If you're a web developer or plan on distributing packages or working with others on a project, I highly highly highly recommend it. I'd use something else for installing the default Python on your computer, though.</p>
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
