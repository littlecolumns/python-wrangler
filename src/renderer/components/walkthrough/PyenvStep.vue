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
        <p>You can find more about pyenv <a href="https://github.com/pyenv/pyenv">here</a>, or just read the <a href="https://github.com/pyenv/pyenv/blob/master/COMMANDS.md">command reference</a>.</p>
      </template>
      <template v-if="!pyenvActivated">
        <p><span class="button is-small" @click='toggleTroubleshooting()'>
          <span v-if="!showTroubleshooting">+ Show troubleshooting tips</span>
          <span v-else>- Hide troubleshooting</span>
        </span></p>
        <template v-if="showTroubleshooting" class="troubleshooting">
          <p>If you're having trouble on <strong>OS X 10.14 Mojave</strong>, it's because we need to manually install some headers first. To fix this, run the following comamnd:</p>
          <pre><code>sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /
brew reinstall zlib</code></pre>
          <p>If you're using <strong>OS X 10.13 or earlier</strong>, you might be able to fix it with this command:</p>
          <pre><code>xcode-select --install
brew reinstall zlib</code></pre>
        </template>

        <p><strong>pyenv is installed, but not activated!</strong> This means you won't get your cool new Pythons automatically. If you just installed/uninstalled something, try to click Refresh to see if this error goess away.

        <p>To set it up to activate, paste the following code into the command line.</p>
        <pre><code>echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo -e 'if command -v pyenv 1>/dev/null 2>&amp;1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile</code></pre>
        <p>Once you do that, your computer will use pyenv Pythons instead of the other ones on your system.</p>
      </template>
    </template>
    <template v-else>
      <installerView></installerView>
    </template>
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
      showInstr: false,
      showTroubleshooting: false
    }
  },
  methods: {
    toggleInstructions () {
      this.showInstr = !this.showInstr
    },
    toggleTroubleshooting () {
      this.showTroubleshooting = !this.showTroubleshooting
    }
  }
}
</script>