<template>
  <div class="content">
    <div v-if="jupyterKernelInstalled">
      <p><strong>Great!</strong> You can use the <strong>{{ jupyterKernelInstalled.spec.display_name }}</strong> kernel when starting up a new notebook.</p>
    </div>
    <template v-else>
      <p>We're going to install Jupyter and allow it to use our default Python.</p>
      <p><strong>Paste each line below into the command line</strong>, hitting enter after each. Read below if you want to know what each line does.</p>
      <template v-if="!isWindows">
        <pre><code>eval "$(pyenv init -)"
python -m pip install jupyter
python -m ipykernel install --user</code></pre>
        <p>These commands do the following:</p>
        <ul>
          <li>Activates pyenv</li>
          <li>Installs jupyter</li>
          <li>Adds a new <strong>Python 3</strong> to Jupyter, which hooks into our pyenv Python (and overwrites any old Python 3 so you don't get confused)</li>
        </ul>
      </template>
      <template v-else>
        <pre><code>python -m pip install jupyter
python -m ipykernel install --user</code></pre>
        <p>These commands do the following:</p>
        <ul>
          <li>Installs jupyter</li>
          <li>Adds a new <strong>Python 3</strong> to Jupyter, which hooks into our pyenv Python (and overwrites any old Python 3 so you don't get confused)</li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ['jupyter', 'jupyters', 'pyenv', 'jupyterKernelInstalled', 'isWindows'],
  computed: {
    jupyterInstalled () {
      return this.jupyters.length > 0
    },
    jupyterInPath () {
      return !!this.jupyter
    }
  }
}
</script>
