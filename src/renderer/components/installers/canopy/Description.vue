<template>
  <div class="content">
    <p>Canopy is Python + a ton of science-y/data-y tools, all packaged together. It's practically the same thing as Anaconda but not as popular.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>If you work in data analysis or science (like <em>astrophysics</em> science, not computer science), Canopy has all of the complicated-to-install pieces already there. It's also easy to launch Python, no goofing around on the command line required.</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>If you're looking for a big ol' scientific package shebang, it isn't as popular as Anaconda. When you hit a problem, you're going to want to google for it, and you'll find more answers for more popular software.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>Skip it. If you want something similar, go with Anaconda.</p>
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
