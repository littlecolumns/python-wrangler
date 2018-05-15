<template>
  <div class="content">
    <p>WinPython is one of the many scientific distributions of Python, but it's neat because it's <em>isolated</em>, which means it doesn't touch anything on your computer other than the directory you install it in. In theory you could install a thousand versions of WinPython on your machine without any of them knowing about the others.</p>

    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>Includes all of the science-y and data-y things you could ever want</li>
        <li>Isolated/portable so it doesn't affect anything else on your computer</li>
        <li>You can create your own bundles of packages/versions for distribution</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>Not a standard Python-y way of doing things</li>
        <li>Windows only</li>
        <li>Not as popular as Anaconda, so probably fewer answers when googling</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>WinPython looks pretty nice, I'm going to be honest. If you want something similar that's more popular and (AFAIK) more fully-featured, though, use Anaconda.</p>
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
