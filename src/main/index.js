'use strict'

import { app, BrowserWindow, ipcMain, Menu, screen } from 'electron'
import { join, resolve } from 'path'
import { fork } from 'child_process'
import log from 'electron-log'
import os from 'os'

log.transports.file.appName = 'Python Wrangler'
log.transports.file.level = 'verbose'
log.transports.console.level = false

log.info('[HOST] Starting up')

// let env = { ...process.env }

// env['ELECTRON_RUN_AS_NODE'] = true
// env['ELECTRON_NO_ASAR'] = true

let workerPath
if (process.env.NODE_ENV === 'production') {
  workerPath = resolve(join(__dirname, 'worker.js'))
} else {
  workerPath = resolve(join(__dirname, '..', '..', 'dist', 'electron', 'worker.js'))
}

let worker = fork(workerPath)

// let worker = spawn(
//   process.execPath,
//   [join(__dirname, '/worker.js')],
//   { env: env, stdio: [null, null, null, null, 'ipc'] }
// )

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function setupCopyPaste () {
  let template = [{
    label: 'Application',
    submenu: [
      { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: () => { app.quit() } }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]
  }]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

function createWindow () {
  /**
   * Initial window options
   */
  const {width, height} = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    height: height * 0.80,
    width: width * 0.90,
    title: 'Python Wrangler'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('will-navigate', function (e, url) {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })

  setupCopyPaste()
}

function logIncoming (m) {
  if (m.method !== 'get-packages') {
    log.info('[HOST RECV]', m.method, JSON.stringify(m.data, null, 2))
  } else {
    log.info('[HOST RECV]', m.method, m.data.path)
  }
}

function setupCommunication () {
  // Receive results from child process
  worker.on('message', (m) => {
    logIncoming(m)
    try {
      if (mainWindow !== null) {
        mainWindow.webContents.send(m.method, m.data)
      }
    } catch (err) {
      log.info('Failed to send back to main window', err)
    }
  })

  ipcMain.on('get-system', (event) => {
    log.info('[HOST] get-system')
    mainWindow.webContents.send('get-system', {
      system: {
        'platform': os.platform(),
        'type': os.type(),
        'release': os.release()
      }
    })
  })

  ipcMain.on('get-pythons', (event) => {
    log.info('[HOST SEND] get-pythons')
    worker.send({'method': 'get-pythons'})
  })

  ipcMain.on('get-pyenvs', (event) => {
    worker.send({'method': 'get-pyenvs'})
  })

  ipcMain.on('get-jupyters', (event) => {
    worker.send({'method': 'get-jupyters'})
  })

  ipcMain.on('get-pipenvs', (event) => {
    worker.send({'method': 'get-pipenvs'})
  })

  ipcMain.on('get-packages', (event, path) => {
    worker.send({'method': 'get-packages', 'args': [path]})
  })
}

setupCommunication()

worker.send({ method: 'hello' })

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
  worker.kill('SIGINT')
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
