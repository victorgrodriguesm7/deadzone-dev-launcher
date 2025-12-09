const path = require("path");

const SUPPORTED_OS = {
    "win32": () => process.arch === "x64" ? "flashver/pepflashplayer64.dll" : "flashver/pepflashplayer32.dll",
    "linux": () => {
        app.commandLine.appendSwitch("no-sandbox");

        return process.arch === "x64" ? "flashver/libpepflashplayer.so" : "";
    },
    "darwin": () => "flashver/PepperFlashPlayer.plugin"
}
/**
 * Get correct flash player lib by OS
 */
function getPluginPath(){
    const OS = SUPPORTED_OS[process.platform];

    if (OS){
        return OS();
    }
}

/**
 * Add Flash Player Library for Electron App
 * @param {Electron.App} app 
 */
function addFlashPlayerLib(app){
    const pluginPath = getPluginPath();

    console.log(pluginPath);

    if (pluginPath){
        return app.commandLine.appendSwitch("ppapi-flash-path", path.join(__dirname, pluginPath));
    }

    console.warn("OS Probabily not supported!");
}

module.exports = {
    addFlashPlayerLib
}