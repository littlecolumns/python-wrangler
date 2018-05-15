<template>
  <div class="content">
    <p>Anaconda is Python + a ton of science-y/data-y tools, all packaged together. It's huge, though! <strong>Miniconda</strong>, as you might guess, is the smaller version of Anaconda. It installs Python and the magic command <code>conda</code> that lets you install the additional Anaconda tools as you need them.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>Anaconda is great because it takes all of this sometimes-hard-to-set-up software and it <em>just works</em>. Miniconda (potentially) has all the magic of Anaconda with a much smaller download size.</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>Being encouraged to use <code>conda</code> in addition to more traditional Python tools like <code>pip</code> can get confusing, especially if you don't need all of the science-y things that Anaconda is useful for.</li>
        <li>If you need a million different science things, you might as well get Anaconda. If you don't need those tools, you probably don't really need <code>conda</code>.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>Skip it unless you'd like Anaconda but are concerned about disk space.</p>
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
