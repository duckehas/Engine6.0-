const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 500,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      contextIsolation: true, 
    },
  });

  mainWindow.loadFile('index.html');
}

ipcMain.on('minimize-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  window.minimize();
});

ipcMain.on('close-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  window.close();
});

app.whenReady().then(createWindow);