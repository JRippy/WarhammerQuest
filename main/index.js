// Native
const { format } = require('url')

// Packages
const electron = require('electron')
const { BrowserWindow, app, dialog, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')


var mainWindow

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const width = electron.screen.getPrimaryDisplay().workAreaSize.width
  const height = electron.screen.getPrimaryDisplay().workAreaSize.height

  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
  })

  mainWindow.setMenu(null);

  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: resolve('renderer/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
