import { platform } from 'os'
import Registry from 'winreg'
import fixPath from 'fix-path'

function getPath (reg) {
  return new Promise((resolve, reject) => {
    reg.values((err, items) => {
      if (err) {
        return resolve()
      }

      let paths = items.filter(item => item.name.toLowerCase() === 'path')
      if (paths.length === 0) {
        return resolve()
      }
      return resolve(paths[0].value)
    })
  })
}

function getWindowsPath () {
  let user = new Registry({ hive: Registry.HKCU, key: '\\Environment' })
  let system = new Registry({ hive: Registry.HKLM, key: '\\System\\CurrentControlSet\\Control\\Session Manager\\Environment' })

  return Promise.all([getPath(user), getPath(system)])
    .then((results) => {
      let userPath = results[0] || ''
      let systemPath = results[1] || ''
      let path = (userPath.trim() + ';' + systemPath.trim()).replace(/;$/, '').replace(/^;/, '')
      return path.replace(/%(SystemRoot|SYSTEMROOT)%/g, process.env.SYSTEMROOT)
    })
    .catch((e) => {
      return ''
    })
}

function refreshPath () {
  if (platform() === 'win32') {
    return getWindowsPath()
      .then(path => {
        process.env.PATH = path
      })
  } else {
    fixPath()
    return Promise.resolve()
  }
}

export default refreshPath
