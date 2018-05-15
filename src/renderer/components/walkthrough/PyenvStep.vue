<template>
  <div class="content">
    <template v-if="pyenv">
      <p><strong>Great!</strong> pyenv was successfully installed. <template v-if="pyenvHasAThree">Now <strong>{{ pyenvs[0].default_python_version }}</strong> is your default Python.</template></p>
      <template v-if="!pyenvHasAThree">
        <p>Now you need to <strong>tell pyenv to install Python 3</strong>. We'll use 3.6.4 here, but you can use any other version if you have a preference.</p>
        <pre><code>pyenv install 3.6.5
pyenv global 3.6.5</code></pre>
      </template>
      <template v-if="!pyenvActivated">
        <p><strong>pyenv is installed, but not activated!</strong> This means you won't get your cool new Pythons automatically. If you just installed/uninstalled something, try to click Refresh to see if this error goess away.

        <p>To set it up to activate, paste the following code into the command line.</p>
        <pre><code>echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo -e 'if command -v pyenv 1>/dev/null 2>&amp;1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile</code></pre>
        <p>Once you do that, your computer will use pyenv Pythons instead of the other ones on your system.</p>
      </template>
    </template>
    <installerView v-else></installerView>
  </div>
</template>

<script>
import installers from '../installers'

export default {
  props: ['pyenv', 'pyenvs', 'pyenvHasAThree', 'pyenvActivated'],
  components: {
    installerView: installers['pyenv'].Install
  }
}
</script>
