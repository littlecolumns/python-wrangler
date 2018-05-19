<template>
  <div>
    <p>To install pyenv on OS X, first you'll have install <a href="https://brew.sh/">Homebrew</a>, which helps you manage software from the command line. <a href="https://brew.sh/">Follow the instructions here</a>.</p>
    <p>Once Homebrew is installed, you can <strong>install pyenv</strong> by running...</p>
    <pre><code>brew install pyenv</code></pre>
    <p>Once Pyenv is installed, you can <strong>install a new Python</strong> and set it as the default by running a few more lines:</p>
    <pre><code>pyenv install 3.6.5
pyenv global 3.6.5</code></pre>
    <p>That installs Python 3.6.5 to your computer, then sets it as the default. If you're curious, you can use <code>pyenv install --list</code> to see all the versions you can install.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
