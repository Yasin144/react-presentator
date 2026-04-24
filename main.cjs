const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Presentator Studio',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Disabling to allow local file blob reads perfectly
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.loadFile('vanilla.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
