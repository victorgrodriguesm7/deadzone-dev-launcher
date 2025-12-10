const { contextBridge } = require("electron");
const path = require("path");

const { baseUrl } = require(path.join(__dirname, "src/env.js"));

contextBridge.exposeInMainWorld("env", { API_BASE_URL: baseUrl });