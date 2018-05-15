import Executable from './executable'

class PyenvExecutable extends Executable {
  constructor (path) {
    super(path)
    this.pythonVersions = []
    this.defaultPythonVersion = null
  }

  populate () {
    return Executable.prototype.populate.call(this)
      .then(() => this.setRoot())
      .then(() => this.detectPythons())
      .then(() => this)
      .catch(error => this.addError(error))
  }

  setRoot () {
    return this.exec(['root'])
      .then(output => {
        this.root = output.stdout
      })
  }

  detectPythons () {
    return this.exec(['versions'])
      .then(output => {
        output.stdout.split('\n')
          .forEach(line => {
            let version = line.replace(/^[^\w]*/, '').split(' ')[0].trim()
            let isDefault = line.indexOf('*') !== -1
            this.addPythonVersion(version, isDefault)
          })
      })
  }

  addPythonVersion (version, isDefault) {
    if (this.pythonVersions.indexOf(version) === -1) {
      this.pythonVersions.push(version)
    }
    if (isDefault) {
      this.defaultPythonVersion = version
    }
  }

  detectKernels () {
    return this.exec(['kernelspec', 'list', '--json'])
      .then(output => {
        if (output.stdout.trim() !== '') {
          this.kernels = JSON.parse(output.stdout)
        }
        return this
      })
      .catch(error => this.addError(error))
  }
}

export default PyenvExecutable
