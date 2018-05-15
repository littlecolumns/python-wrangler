<template>
  <div class="content">
    <p>Homebrew is a "package manager" for OS X - a simple tool that helps you easily install command-line (and non-command-line) software.</p>
    <div v-if="!basics">
      <p><strong>UPSIDES</strong></p>
      <ul class="list">
        <li>It's much easier to keep Python up to date than when installing with other methods.</li>
        <li>Homebrew is the best way to install a <em>lot</em> of technical software on a Mac, so using it to install Python is good practice.</li>
        <li>Only standard Python will be installed, so you won't clutter your system with a lot of extra stuff you don't need. On top of that, if you use Homebrew to install both Python 2 and Python 3, they won't conflict with one another.</li>
        <li>Homebrew does all of its installing in its own private secret little area, and only puts symlinks (shortcuts) into the more public areas of your computer. That does a lot to help keep things organized and avoid conflicts.</li>
      </ul>

      <p><strong>DOWNSIDES</strong></p>
      <ul class="list">
        <li>Homebrew is <strong>only for OS X</strong>. You also need to use the Terminal to use Homebrew. If you find a text-only interface overwhelming, you can avoid it by using Anaconda.</li>
        <li>Unlike Anaconda, Homebrew won't automatically install more science-y and data-y components. If you need them, you're probably going to spend a while installing those extra bits and pieces.</li>
        <li>Because Homebrew <em>does</em> interact with more public parts of your system (e.g. <code>/usr/local/bin</code>), there's always the chance that <em>something</em> could get messed up. It has a nice tool called <code>brew doctor</code> that helps you troubleshoot, though.</li>
      </ul>

      <p><strong>RECOMMENDATION</strong></p>
      <p>If you're using OS X, I <strong>strongly recommend</strong> you install Python using Homebrew. If you work with lots of science or people who use Anaconda, though, use Anaconda.</p>
      <p>If you're using Windows or Linux, you can't use Homebrew.</p>
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
