import Executable from './executable'

class JupyterExecutable extends Executable {
  populate () {
    return Executable.prototype.populate.call(this)
      .then(() => this.detectKernels())
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

export default JupyterExecutable
