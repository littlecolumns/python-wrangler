<template>
  <div>
    <p>To install pyenv on OS X, first you'll have install <a href="https://brew.sh/">Homebrew</a>, which helps you manage software from the command line. <a href="https://brew.sh/">Follow the instructions here</a>.
    <div class="notification is-warning">If you get a prompt that says <strong>Password: []</strong> and you type and type and nothing shows up... <strong>just type your password and hit enter!</strong> The command line is just hiding your typing from anyone who might be looking at your screen.</div>
    <p>Once Homebrew is installed, you can <strong>install pyenv</strong> by running...</p>
    <pre><code>brew install pyenv</code></pre>
    <p>Once Pyenv is installed, you can <strong>install a new Python</strong> and set it as the default by running a few more lines:</p>
    <pre><code>pyenv install 3.10.3
pyenv global 3.10.3</code></pre>
    <p>That installs Python 3.10.3 to your computer, then sets it as the default. If you're curious, you can use <code>pyenv install --list</code> to see all the versions you can install.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
