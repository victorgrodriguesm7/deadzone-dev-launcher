const express = require("express");
const path = require("path");
const { localAssetsPort } = require("./env");

/**
 * Start express local sever
 * @returns {Function} Dispose function
 */
function startServer() {
    const app = express();

    const PUBLIC_DIR = path.join(__dirname,"..", "assets");

    app.use(express.static(PUBLIC_DIR));

    const PORT = localAssetsPort;

    const server = app.listen(PORT, () => {
        console.log("Listening on", PORT);
    });

    return () => {
        server.close();
    }
}

module.exports = {
    startServer
}