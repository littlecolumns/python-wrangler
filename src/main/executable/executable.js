import pathLib from 'path'
import os from 'os'
import glob from 'glob'
import fs from 'fs'
import cp from 'child_process'
import { which } from 'shelljs'
import trueCasePathSync from 'true-case-path'

const EXTENSION_GLOB = '?(.exe|.bat)'

const SEARCH_PATHS = [
  '/usr/local/Cellar/python*/*/bin',
  pathLib.join(os.homedir(), '*conda*'),
  pathLib.join(os.homedir(), '*conda*', 'bin'),
  pathLib.join(os.homedir(), '*conda*', 'Scripts'),
  '/usr/local/bin',
  '/usr/bin',
  '/Library/Frameworks/Python.framework/Versions/*/bin',
  '/System/Library/Frameworks/Python.framework/Versions/*/bin',
  '/*conda*',
  '/*conda*/bin',
  '/*conda*/Scripts',
  '/*ython*',
  '/*ython*/Scripts',
  pathLib.join(os.homedir(), '.pyenv', 'shims'),
  pathLib.join(os.homedir(), '.pyenv', 'versions', '**', 'bin'),
  pathLib.join(os.homedir(), '*ython*'),
  pathLib.join(os.homedir(), '*ython*', 'Scripts')
].map(pathLib.normalize)

function upOne (path) {
  return pathLib.normalize(pathLib.join(path, '..'))
}

function standardizePath (path) {
  try {
    return trueCasePathSync(path)
  } catch (err) {
    // It's missing, maybe? Doesn't really matter.
    return path
  }
}

class Executable {
  constructor (path) {
    this.errors = []
    this.missing = false
    this.symlinks = []

    this.path = standardizePath(path.trim())
    this.setRealPath(this.path)

    this.setBasePath()

    this.pathLocations = []
    this.defaultCommands = []
    this.version = null
    this.rawVersion = null
  }

  populate () {
    let promises = [
      this.setVersion(),
      this.setStats()
    ]
    return Promise.all(promises)
      .then(() => this)
      .catch(error => this.addError(error))
  }

  exec (params) {
    if (this.missing) {
      return Promise.resolve({ stdout: '', stderr: '', all: '' })
    }
    let execParams = typeof params === 'string' ? [params] : params
    return new Promise((resolve, reject) => {
      cp.execFile(
        this.path,
        execParams,
        // { shell: true },
        (error, stdout, stderr) => {
          let stdoutCleaned = (stdout || '').trim()
          let stderrCleaned = (stderr || '').trim()
          resolve({
            error: error,
            stdout: stdoutCleaned,
            stderr: stderrCleaned,
            all: stdoutCleaned + stderrCleaned
          })
        }
      )
    })
  }

  addError (error) {
    this.errors.push({
      error: error,
      message: error.message,
      stack: error.stack
    })
    return this
  }

  merge (executable) {
    executable.symlinks.forEach(this.addSymlink, this)
    executable.defaultCommands.forEach(this.addDefaultCommand, this)
    executable.pathLocations.forEach(this.addPathLocation, this)
  }

  addPathLocation (path) {
    if (this.pathLocations.indexOf(path) === -1) {
      this.pathLocations.push(path)
    }
  }

  addDefaultCommand (command) {
    if (this.defaultCommands.indexOf(command) === -1) {
      this.defaultCommands.push(command)
    }
  }

  learnPathLocations (paths) {
    paths.forEach((path, i) => {
      path = standardizePath(path)
      if (path === this.path || this.symlinks.indexOf(path) !== -1) {
        this.addPathLocation(path)
        if (i === 0) {
          this.addDefaultCommand(pathLib.basename(path))
        }
      }
    })
  }

  setRawVersion () {
    return this.exec('--version')
      .then((output) => {
        this.rawVersion = output.all
      })
  }

  setVersion () {
    return this.setRawVersion()
      .then(() => {
        let match = this.rawVersion.match(/\d[\w.]*/i)
        if (match) {
          this.version = match[0]
        }
      })
  }

  setBasePath () {
    this.basepath = upOne(this.path)
    if (['bin', 'Scripts'].indexOf(pathLib.basename(this.basepath)) !== -1) {
      this.basepath = upOne(this.basepath)
    }
  }

  /**
   * The path of the executable, or the target of a symlinked executable
   * @return {string} The executable file's path
   */
  setRealPath (path) {
    let realpath

    try {
      let realpath = pathLib.resolve(pathLib.dirname(path), fs.readlinkSync(path))
      this.addSymlink(path)
      this.path = realpath
    } catch (error) {
      // It's not a symlink
    }

    if (realpath) {
      /* But maybe that link is wrong! This throws an error
        if the target doesn't exist, though, which is why
        we try th eother one version first. */
      try {
        this.path = fs.realpathSync(path)
      } catch (error) {
        this.addError(error)
      }
    }

    return this.path
  }

  /**
   * Query for the executable file's creation/modification/access time
   * and save it to the object
   * @return {Promise}
   */
  setStats () {
    return new Promise((resolve, reject) => {
      fs.stat(this.path, (error, stats) => {
        if (error) {
          this.missing = true
          this.addError(error)
        } else {
          this.atime = stats.atime.getTime() / 1000
          this.ctime = stats.ctime.getTime() / 1000
          this.mtime = stats.mtime.getTime() / 1000
          this.size = stats.size
        }
        resolve(this)
      })
    })
  }

  addSymlink (path) {
    if (path !== '' && this.symlinks.indexOf(path) === -1) {
      this.symlinks.push(path)
    }
  }

  sameAs (executable) {
    if (this.path === executable.path) {
      return true
    }
    if (executable.symlinks.indexOf(this.path) !== -1) {
      return true
    }
    if (this.symlinks.indexOf(executable.path) !== -1) {
      return true
    }
    for (let i = 0; i < this.symlinks.length; i++) {
      for (let j = 0; j < executable.symlinks.length; j++) {
        if (this.symlinks[i] === executable.symlinks[j]) {
          return true
        }
      }
    }
  }

  static dedupe (executables) {
    let originals = []

    executables.forEach(executable => {
      let found = false
      originals.forEach(original => {
        if (original.sameAs(executable)) {
          found = true
          original.merge(executable)
        }
      })
      if (!found) {
        originals.push(executable)
      }
    })

    return originals
  }

  static findInSearchPaths (command) {
    let promises = SEARCH_PATHS.map((searchPath) => {
      return new Promise((resolve, reject) => {
        glob.glob(pathLib.join(searchPath, command + EXTENSION_GLOB), (error, paths) => {
          if (error) {
            reject(error)
          } else {
            let executables = paths.map(path => new (this)(path))
            resolve(executables)
          }
        })
      })
    })

    return Promise.all(promises)
  }

  static findByWhich (command) {
    return which('-a', command)
  }

  static findAllMultipleCommands (commands, options = {}) {
    let promises = commands.map(command => this.findAll(command))
    return Promise.all(promises)
      .then(found => [].concat(...found))
      .then(executables => this.dedupe(executables))
      .then(executables => {
        if (options.populate) {
          return Promise.all(executables.map(e => e.populate()))
        } else {
          return Promise.resolve(executables)
        }
      })
  }

  static findAll (command, options = {}) {
    if (Array.isArray(command)) {
      return this.findAllMultipleCommands(command, options)
    }

    let locations = this.findByWhich(command)

    let executables = locations.map(path => new (this)(path))

    return this.findInSearchPaths(command)
      .then(found => [].concat.apply(executables, found))
      .then(executables => {
        executables.forEach(p => p.learnPathLocations(locations))
        return this.dedupe(executables)
      })
      .then(executables => {
        if (options.populate) {
          return Promise.all(executables.map(e => e.populate()))
        } else {
          return Promise.resolve(executables)
        }
      })
  }
}

export default Executable
