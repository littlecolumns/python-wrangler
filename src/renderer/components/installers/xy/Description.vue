<template>
  <div class="content">
    <p>Python(x,y) is a "free scientific and engineering development software for numerical computations, data analysis and data visualization based on Python programming language, Qt graphical user interfaces and Spyder interactive scientific development environment." It isn't current or that common, so I don't know much about it.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>None</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>It hasn't been updated in forever</li>
        <li>Only available for Python 2, not Python 3</li>
        <li>Windows only</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>While Python(x,y) might have been a valid choice a hundred years ago, these days the competition for "Python plus add-ons" is too fierce for it to be a sensible option. If you want something in the same boat but modern, use Anaconda.</p>
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
