<template>
  <div class="content">
    <p>ActivePython is Python + a few other tools, packaged up by a company called ActiveState. I'm not that familiar with it, but it looks like it's mainly used by businesses who are <a href="https://www.activestate.com/blog/2015/11/activepython-vs-open-source-python-whats-difference">really scared of risk</a> and gives them someone to call when their Python breaks.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>ActivePython does some really friendly Python management when you're installing it so you can uninstall it easily later.</li>
        <li>If you're a business who really needs enterprise support, I guess it's a good solution?</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>It adds its own package manager to the mix, called <code>PyPM</code>. Python already has one called <code>pip</code> and you don't want to use some weird thing no one else uses.</li>
        <li>I don't know much about it, but it doesn't seem to have anything special about it except the whole enterprise thing.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>Ignore it.</p>
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
