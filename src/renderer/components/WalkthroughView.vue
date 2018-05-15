<template>
  <div>
    <h1 class="title">Python Setup Walkthrough</h1>
    <div class="content">
      <p>Python Wrangler is <strong>very opinionated</strong> about how you should set up your machine. When you're done, your setup will look like this:</p>
      <ul>
        <li class="is-small"><strong>Python 3</strong> from python.org, since some software assumes it's installed</li>
        <li><strong>Pipenv</strong> for modern virtual environment management</li>
        <li><strong>Jupyer Notebook</strong>, pointing to the Python installed by pyenv</li>
        <li><span class="tag is-warning">OS X only</span> <strong>Pyenv</strong> to switch between different (global) Python versions, like 3.6 vs 2.7</li>
      </ul>
      <p>If you'd like more details about the software: <a href="https://www.python.org/">python.org</a>, <a href='https://github.com/pyenv/pyenv'>pyenv</a>, <a href='https://docs.pipenv.org/'>pipenv</a>, <a class="is-small" href="http://jupyter.org/">Jupyter Notebook</a></p>
    </div>

   <Step
      title="Step 0: The command line"
      v-bind:conditional="() => true">
      <div class="content" slot="step">
        <p>If the steps below ask you to type something or enter a command, they want you to do it on the <strong>command line</strong>.</p>
      <p>
        <span v-if="isWindows">On Windows, open up the Start Menu and search for <code>cmd</code> or <code>Command Prompt</code>. Run this and you're all set.</span>
        <span v-else>
          On a Mac, click the magnifying glass in the upper right-hand corner of your screen. Type <code>Terminal</code> in the box that comes up and hit enter.
        </span>
        The text-y thing that comes up the command line - type your commands there, pressing enter after each one.
      </p>
      </div>
    </Step>

    <Step
      title="Step 1: Uninstalling Pythons you don't need"
      v-bind:conditional="pythons"
      v-bind:refresher="updatePythons"
      v-bind:loading="isLoading('PYTHONS')"
      v-bind:completed="unwantedPythons && unwantedPythons.length == 0">
      <PythonRemoval slot="step" v-bind:pythons="pythons"></PythonRemoval>
    </Step>

    <Step
      title="Step 2: Installing Python 3 from Python.org"
      v-bind:conditional="pythons"
      v-bind:refresher="updatePythons"
      v-bind:loading="isLoading('PYTHONS')"
      v-bind:completed="maybeHasPythonorgThree">
      <PythonThreeStep slot="step" :pythons="pythons" :maybeHasPythonorgThree="maybeHasPythonorgThree" :hasPythonorgThree="hasPythonorgThree"></PythonThreeStep>
    </Step>

    <Step
      title="Step 3: Installing pyenv"
      v-bind:conditional="pyenvs"
      v-bind:refresher="updatePyenv"
      v-bind:loading="isLoading('PYENVS')"
      v-bind:completed="isWindows || (pyenvHasAThree && pyenvActivated)">
      <PyenvStep v-if="!isWindows" slot="step" :pyenv="pyenv" :pyenvs="pyenvs" :pyenvActivated="pyenvActivated" :pyenvHasAThree="pyenvHasAThree"></PyenvStep>
      <div v-else slot='step' class='content'>
        <p>You're using Windows, so you don't need pyenv! You use the <a href="https://docs.python.org/3/using/windows.html#python-launcher-for-windows">Python Launcher</a>, which comes with Python 3.</p>
      </div>
    </Step>

    <Step
      title="Step 4: Installing pipenv"
      v-bind:conditional="pipenvs"
      v-bind:refresher="updatePipenv"
      v-bind:loading="isLoading('PIPENVS')"
      v-bind:completed="pipenvs && pipenvs.length > 0">
      <PipenvStep slot="step" :pipenv="pipenv" :pipenvs="pipenvs"></PipenvStep>
    </Step>

    <Step
      title="Step 5: Setting up Jupyter Notebooks"
      v-bind:conditional="jupyters"
      v-bind:refresher="updateJupyter"
      v-bind:loading="isLoading('JUPYTERS') || isLoading('PIPENVS')"
      v-bind:completed="jupyterKernelInstalled">
      <JupyterStep slot="step" :isWindows="isWindows" :jupyter="jupyter" :pyenv='pyenv' :jupyters="jupyters" :jupyterKernelInstalled="jupyterKernelInstalled"></JupyterStep>
    </Step>

    <Step
      title="Step 6: Finishing up"
      v-bind:conditional="() => true">
      <div class="content" slot="step">
        <p v-if="isWindows">Since you're on Windows, if you're planning on doing anything science-y, maps-y, or data-y, you probably want to install <a href="http://landinghub.visualstudio.com/visual-cpp-build-tools">Visual Studio Build Tools</a>. This allows you compile Python packages on your machine.</p>
        <p>Now that you're done, check out <a href="http://littlecolumns.com/tools/python-wrangler-notes">Python Wrangler notes</a> for tips on how to use your new system. It includes tips on virtual environments, switching Python versions, and anything else.</p>
      </div>
    </Step>


  </div>
</template>

<script>
import PythonThreeStep from './walkthrough/PythonThreeStep'
import PythonRemoval from './walkthrough/PythonRemoval'
import PyenvStep from './walkthrough/PyenvStep'
import PipenvStep from './walkthrough/PipenvStep'
import JupyterStep from './walkthrough/JupyterStep'
import Step from './walkthrough/Step'

export default {
  components: {
    Step,
    PythonThreeStep,
    PythonRemoval,
    PyenvStep,
    PipenvStep,
    JupyterStep
  },
  mounted () {
    if (!this.pythons) {
      this.updatePythons()
    }
    if (!this.pyenvs) {
      this.updatePyenv()
    }
    if (!this.pipenvs) {
      this.updatePipenv()
    }
    if (!this.jupyters) {
      this.updateJupyter()
    }
  },
  methods: {
    isLoading (type) {
      return this.$store.state.pending.indexOf(type.toUpperCase()) !== -1
    },
    updatePythons () {
      if (!this.isLoading('pythons')) {
        this.$store.dispatch('fetchPythons')
      }
    },
    updatePyenv () {
      if (!this.isLoading('pyenvs')) {
        this.$store.dispatch('fetchPyenvs')
      }
    },
    updatePipenv () {
      if (!this.isLoading('pipenvs')) {
        this.$store.dispatch('fetchPipenvs')
      }
    },
    updateJupyter () {
      if (!this.isLoading('jupyters')) {
        this.$store.dispatch('fetchJupyters')
      }
    }
  },
  computed: {
    isWindows () {
      return this.$store.state.system.platform === 'win32'
    },
    unwantedPythons () {
      if (!this.pythons) {
        return null
      }
      return this.pythons.filter((python) => {
        return ['pyenv', 'pipenv', 'homebrew', 'pythonorg', null].indexOf(python.installer) === -1
      })
    },
    maybeHasPythonorgThree () {
      if (!this.pythons) {
        return
      }
      return this.pythons.find((python) => {
        return (!python.installer || python.installer === 'pythonorg') && python.base_version === 3
      })
    },
    hasPythonorgThree () {
      if (!this.pythons) {
        return
      }
      return this.pythons.find((python) => {
        return python.installer === 'pythonorg' && python.base_version === 3
      })
    },
    pyenvActivated () {
      return this.$store.state.pyenv_activated
    },
    pyenvHasAThree () {
      if (!this.pyenv) {
        return false
      }
      return this.pyenv.python_versions.find((version) => {
        return version[0] === '3'
      })
    },
    pythons () {
      if (!this.$store.state.pythons) {
        return null
      }
      return this.$store.state.pythons.filter((python) => {
        return !python.missing
      })
    },
    jupyterKernelInstalled () {
      if (!this.jupyter || !this.maybeHasPythonorgThree) {
        return false
      }
      let target
      if (!this.isWindows) {
        if (!this.pyenv) {
          return false
        }
        // This is the Python we're aiming to use for Jupyer
        target = this.pyenv.root + '/versions/' + this.pyenv.default_python_version + '/bin/python'
      } else {
        target = this.maybeHasPythonorgThree.path
      }

      // Let's go through every kernel and see if it exists
      for (var name in this.jupyter.kernels.kernelspecs) {
        var kernel = this.jupyter.kernels.kernelspecs[name]
        var path = kernel.spec.argv[0]
        if (path === target) {
          return kernel
        }
      }
    },
    pipenv () {
      return this.$store.state.pipenv
    },
    pipenvs () {
      return this.$store.state.pipenvs
    },
    jupyter () {
      return this.$store.state.jupyter
    },
    pyenvs () {
      return this.$store.state.pyenvs
    },
    pyenv () {
      return this.$store.state.pyenv
    },
    jupyters () {
      return this.$store.state.jupyters
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 2em;
}
</style>
