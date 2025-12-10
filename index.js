require('dotenv').config()

const path = require("path");
const { app, session, BrowserWindow  } = require('electron');
const { addFlashPlayerLib } = require("./src/flashlib");
const { startServer } = require("./src/server");
const { localAssets } = require("./src/env");
const userAgent = "TLSDZDEVLauncher";
const disposeServer = startServer();

addFlashPlayerLib(app);

app.commandLine.appendSwitch("ignore-certificate-errors");

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        icon: "./assets/logo.png",
        webPreferences: {
            plugins: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            sandbox: false,
        },
        autoHideMenuBar: true
    });

    const url = new URL("index.html", localAssets);

    mainWindow.loadURL(url.toString());

    mainWindow.maximize();
    mainWindow.webContents.session.clearCache(() => {});
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = userAgent;
        callback({ requestHeaders: details.requestHeaders });
    });

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("will-quit", () => {
    disposeServer();
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});