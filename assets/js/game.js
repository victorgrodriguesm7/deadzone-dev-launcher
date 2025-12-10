var flashVersion = "11.3.300.271";
const BASE_URL = window.env?.API_BASE_URL || 'http://localhost:8080';
window.token = new URLSearchParams(window.location.search).get("userToken");

function startGame(){
    const flashVars = {
        path: "/game/",
        service: "pio",
        affiliate: "",
        useSSL: 0,
        gameId: "laststand-deadzone",
        connectionId: "public",
        clientAPI: "javascript",
        playerInsightSegments: [],
        playCodes: [],
        userToken: token,
        clientInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent
        }
    };

    const params = {
        allowScriptAccess: "always",
        allowFullScreen: "true",
        allowFullScreenInteractive: "true",
        allowNetworking: "all",
        menu: "false",
        scale: "noScale",
        salign: "tl",
        wmode: "direct",
        bgColor: "#000000"

    };

    const attributes = {
        id: "game",
        name: "game"
    };

    embedSWF("/game/preloader.swf", flashVars, params, attributes);
}

function embedSWF(swfURL, flashVars, params, attributes) {
    swfobject.embedSWF(
        BASE_URL + swfURL,
        "game-container",
        "100%",
        "100%",
        flashVersion,
        "swf/expressinstall.swf",
        flashVars,
        params,
        attributes,
        function(e) {
            if (!e.success) {
                console.error("[Game] Failed to embed SWF");
                alert("Error Embeding SWF!");
            } else {
                console.log("[Game] SWF embedded successfully");
            }
        }
    );

}

document.addEventListener("DOMContentLoaded", startGame);