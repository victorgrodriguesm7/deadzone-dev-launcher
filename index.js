require('dotenv').config()

const path = require("path");
const { app, BrowserWindow  } = require('electron');
const { addFlashPlayerLib } = require("./src/flashlib");


addFlashPlayerLib(app);

app.commandLine.appendSwitch("ignore-certificate-errors");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            plugins: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            sandbox: false,
        }
    });

    mainWindow.loadFile('./assets/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});