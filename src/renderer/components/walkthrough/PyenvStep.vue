<template>
  <div class="content">
    <template v-if="pyenv">
      <p><strong>Great!</strong> pyenv was successfully installed. Currently <strong>{{ defaultPyenvVersion }}</strong> is your default Python.</p>
      <template v-if="!pyenvHasAThree">
        <p>We need to <strong>tell pyenv to install Python 3</strong>. We'll use 3.7.1 here, but you can use any other version if you have a preference.</p>
        <pre><code>pyenv install 3.7.1
pyenv global 3.7.1</code></pre>
      </template>
      <template v-else>
        <p><span class="button is-small" @click='toggleInstructions()'>
          <span v-if="!showKept">+ What if I want a different default version?</span>
          <span v-else>- Hide instructions</span>
        </span></p>
        <template v-if="showInstr">
          <p>If you'd like to install a different default Python, you'd run the code below. Just replace <code>3.7.1</code> with the version you're interested in. <code>pyenv install --list</code> will show you all possible versions.</p>
          <pre><code>pyenv install 3.7.1
pyenv global 3.7.1</code></pre>
          <p><strong>Note:</strong> If you change your default Python this you'll need to reinstall all your packages.</p>
        </template>
      </template>
      <template v-if="!pyenvActivated">
        <p><strong>pyenv is installed, but not activated!</strong> This means you won't get your cool new Pythons automatically. If you just installed/uninstalled something, try to click Refresh to see if this error goess away.

        <p>To set it up to activate, paste the following code into the command line.</p>
        <pre><code>echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo -e 'if command -v pyenv 1>/dev/null 2>&amp;1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile</code></pre>
        <p>Once you do that, your computer will use pyenv Pythons instead of the other ones on your system.</p>
      </template>
      <p>You can find more about pyenv <a href="https://github.com/pyenv/pyenv">here</a>, or just read the <a href="https://github.com/pyenv/pyenv/blob/master/COMMANDS.md">command reference</a>.</p>
    </template>
    <installerView v-else></installerView>
  </div>
</template>

<script>
import installers from '../installers'

export default {
  props: ['pyenv', 'pyenvs', 'pyenvHasAThree', 'pyenvActivated', 'defaultPyenvVersion'],
  components: {
    installerView: installers['pyenv'].Install
  },
  data () {
    return {
      showInstr: false
    }
  },
  methods: {
    toggleInstructions () {
      this.showInstr = !this.showInstr
    }
  }
}
</script>
