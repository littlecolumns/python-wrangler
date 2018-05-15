import log from 'electron-log'
import exe from './executable'
import caseConverter from './utils/case-converter'
import refreshPath from './utils/refresh-path'

log.transports.file.appName = 'Python Wrangler'
log.transports.file.level = 'verbose'
log.transports.console.level = false

const responses = {
  'get-pythons' () {
    return exe.Python.findAll(['python', 'python3'], { populate: true })
      .then(pythons => ({ pythons: pythons }))
  },
  'get-pyenvs' () {
    return exe.Pyenv.findAll(['pyenv'], { populate: true })
      .then(pyenvs => {
        let pythonPaths = exe.Python.findByWhich('python')
        let activated = pythonPaths.length > 0 && pythonPaths[0].indexOf('pyenv') !== -1

        return {
          activated: activated,
          pyenvs: pyenvs
        }
      })
  },
  'get-jupyters' () {
    return exe.Jupyter.findAll(['jupyter'], { populate: true })
      .then(jupyters => ({ jupyters: jupyters }))
  },
  'get-pipenvs' () {
    return exe.Pipenv.findAll(['pipenv'])
      .then(pipenvs => ({ pipenvs: pipenvs }))
  },
  'hello' () {
    return Promise.resolve('hello back')
  },
  'get-packages' (path) {
    let python = new exe.Python(path)
    return python.setPackages()
      .then(python => {
        return {
          path: path,
          package_overcount: python.packageOvercount,
          packages: python.packages
        }
      })
  }
}

process.on('message', function (msg) {
  log.info('[WORKER RECV]', msg)
  try {
    refreshPath()
      .then(() => responses[msg.method].apply(this, msg.args))
      .then(data => {
        process.send({
          method: msg.method,
          data: JSON.parse(JSON.stringify(caseConverter(data)))
        })
      })
      .catch(err => {
        log.error('[WORKER ERR]', err)
        process.send({
          method: 'error',
          data: JSON.parse(JSON.stringify(err))
        })
      })
  } catch (err) {
    log.error('[WORKER ERR]', err)
    process.send({
      method: 'error',
      data: JSON.parse(JSON.stringify(err))
    })
  }
})
