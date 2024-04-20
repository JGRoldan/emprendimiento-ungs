const handlerDOM = () =>{
    const usernameElement = document.getElementById("username");
    usernameElement.innerHTML = "ADMIN"
    usernameElement.style.display = "inline"

    const logoutLink = document.getElementById("logoutLink")
    logoutLink.style.display = "inline"

    const pendingLink = document.getElementById("pendingLink")
    pendingLink.style.display = "inline"

    const loginLink = document.getElementById("loginLink")
    loginLink.style.display = "none"

    const registerLink = document.getElementById("registerLink")
    registerLink.style.display = "none"
}

const handlerDOMLogout = () =>{
    const usernameElement = document.getElementById("username");
    usernameElement.innerHTML = "ADMIN"
    usernameElement.style.display = "inline"

    const logoutLink = document.getElementById("logoutLink")
    logoutLink.style.display = "inline"

    const pendingLink = document.getElementById("pendingLink")
    pendingLink.style.display = "inline"

    const loginLink = document.getElementById("loginLink")
    loginLink.style.display = "none"

    const registerLink = document.getElementById("registerLink")
    registerLink.style.display = "none"
}

export { handlerDOM, handlerDOMLogout };
