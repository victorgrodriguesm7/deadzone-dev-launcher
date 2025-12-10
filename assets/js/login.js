const BASE_URL = window.env?.API_BASE_URL || 'http://localhost:8080';
const form = document.querySelector("form");

const
    /** @type {HTMLInputElement} */ rememberField = document.querySelector("#remember"),
    /** @type {HTMLInputElement} */ usernameField = document.querySelector("#username"),
    /** @type {HTMLInputElement} */ passwordField = document.querySelector("#password");

form.addEventListener("submit", onFormSubmit);

const flashvars = {
    path: "/game/",
    service: "pio",
    affiliate: "",
    useSSL: "0",
    gameId: "laststand-deadzone",
    connectionId: "public",
    clientAPI: "javascript",
    playerInsightSegments: "",
    playCodes: "",
    userToken: "",
    clientInfo: "{}"
}

/**
 * 
 * @param {SubmitEvent} e 
 */
async function onFormSubmit(e){
    e.preventDefault();
    
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData);
    const url = new URL("/api/login", BASE_URL);

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    try {
        if (!response.ok) throw new Error(response.status)

        const data = await response.json();

        flashvars.userToken = data.token;

        const flashVarsAsQueryParams = new URLSearchParams(flashvars).toString();

        handleRemember(payload);

        window.location.href = `game.html?${flashVarsAsQueryParams}`;
    } catch (e) {
        console.error("Error parsing JSON:", e);
        alert("Error! Check Console")
    }
}

/**
 * Save username and password when Remember is checked
 * @param {Object} payload 
 */
function handleRemember(payload){
    if (!rememberField.checked){
        localStorage.clear();
    }

    localStorage.setItem("payload", JSON.stringify(payload))
}

function loadRemeberData(){
    const data = localStorage.getItem("payload");

    if (!data) return;

    const parsedData = JSON.parse(data);

    passwordField.value = parsedData.password || '';
    usernameField.value = parsedData.username || '';
    rememberField.checked = true;
}

loadRemeberData();