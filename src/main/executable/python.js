import Executable from './executable'

class PythonExecutable extends Executable {
  constructor (path) {
    super(path)
    this.installer = null
    this.packageOvercount = false
    this.packages = null
  }

  setPackages () {
    return this.exec(['-m', 'pip', 'list', '--format=legacy'])
      .then((output) => {
        if (output.stdout !== '') {
          this.packages = output.stdout.split('\n')
            .filter(line => line !== '')
            .map(line => line.match(/(.+) \((.*)\)/))
            .map(match => ({
              name: match[1],
              version: match[2]
            }))
          return this
        } else {
          return this.exec(['-c', 'import pkgutil; print(\':::\'.join(sorted([name for imp, name, ispkg in pkgutil.iter_modules()])))'])
            .then((output) => {
              this.packages = output.stdout.split(':::')
                .filter(line => line !== '')
                .map(line => ({'name': line}))
              this.packageOvercount = true
              return this
            })
        }
      })
      .catch(error => this.addError(error))
  }

  setSysPath () {
    return this.exec(['-c', 'import sys; print(\':::\'.join([path for path in sys.path if path]))'])
      .then((output) => {
        this.syspath = output.stdout
          .split(':::')
          .map(path => path.trim())
          .filter(path => path !== '')
        return this
      })
      .catch(error => this.addError(error))
  }

  setVersion () {
    return Executable.prototype.setVersion.call(this)
      .then(() => {
        this.baseVersion = Math.floor(parseInt(this.version))
      })
  }

  populate () {
    return Executable.prototype.populate.call(this)
      .then(() => this.setSysPath())
      .then(() => this.detectInstaller())
      .then(() => this)
      .catch(error => this.addError(error))
  }

  detectInstaller () {
    let detectives = [
      ['version', 'anaconda', 'Anaconda'],
      ['version', 'anaconda', 'Continuum'],
      ['path', 'pythonorg', '/Library/Frameworks/Python.framework/Versions/3.6'],
      ['path', 'pipenv', 'local/share/virtualenvs'],
      ['path', 'canopy', 'Enthought'],
      ['path', 'canopy', 'Canopy'],
      ['path', 'anaconda', 'anaconda'],
      ['path', 'miniconda', 'miniconda'],
      ['path', 'homebrew', 'Cellar'],
      ['path', 'pyenv', 'pyenv'],
      ['path', 'pythonorg', 'APPDATA\\LOCAL\\PROGRAMS\\PYTHON']
    ]

    let index = detectives.findIndex(d => {
      if (d[0] === 'version' && this.version) {
        return this.version.indexOf(d[2]) !== -1
      } if (d[0] === 'path' && this.path) {
        return this.path.indexOf(d[2]) !== -1
      }
    })

    if (index !== -1) {
      this.installer = detectives[index][1]
      return Promise.resolve(this)
    } else {
      return this.detectInstallerInDepth()
    }
  }

  detectInstallerInDepth () {
    var detectives = [
      this.isActivePython(),
      this.isWinPython(),
      this.isXyPython()
    ]
    return Promise.all(detectives)
      .then(responses => {
        this.installer = responses[0] ? 'activepython'
          : responses[1] ? 'winpython'
            : responses[2] ? 'xypython'
              : null
        return this
      })
      .catch(error => this.addError(error))
  }

  isActivePython () {
    return new Promise((resolve, reject) => {
      this.exec(['-c', 'import activestate'])
        .then(output => resolve(!output.error))
    })
  }

  isWinPython () {
    return new Promise((resolve, reject) => {
      this.exec(['-c', 'import winpython'])
        .then(output => resolve(!output.error))
    })
  }

  isXyPython () {
    return new Promise((resolve, reject) => {
      this.exec(['-m', 'pip', '--version'])
        .then(output => resolve(output.stdout.indexOf('xy') !== -1))
    })
  }
}

export default PythonExecutable
