const BASE_URL = window.API_BASE_URL || 'http://localhost:8080';
const form = document.querySelector("form");

const
    /** @type {HTMLInputElement} */ usernameField = document.querySelector("#username"),
    /** @type {HTMLInputElement} */ emailField = document.querySelector("#username"),
    /** @type {HTMLInputElement} */ passwordField = document.querySelector("#password");

form.addEventListener("submit", onFormSubmit);

/**
 * 
 * @param {SubmitEvent} e 
 */
async function onFormSubmit(e){
    e.preventDefault();
    
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData);
    const url = new URL("/api/register", BASE_URL);

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

        alert("Success!");

        window.location.href = `index.html`;
    } catch (e) {
        console.error("Error parsing JSON:", e);
        
        alert("Error! Check Console");
    }
}