const registerForm =
    document.getElementById("register-form");

const loginForm =
    document.getElementById("login-form");

let users =
    JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

function setCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

function goHome() {

    if (
        window.location.pathname.includes("/pages/")
    ) {

        window.location.href =
            "../index.html";

    }

    else {

        window.location.href =
            "index.html";

    }

}

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    goHome();

}

function initializeAuthUI() {

    const currentUser =
        getCurrentUser();

    const loginLink =
        document.getElementById("nav-login");

    const registerLink =
        document.getElementById("nav-register");

    const userMenu =
        document.getElementById("nav-user");

    const userName =
        document.getElementById("nav-username");

    const logoutBtn =
        document.getElementById("logout-btn");

    if (!userMenu) return;

    if (currentUser) {

        if (loginLink)
            loginLink.style.display = "none";

        if (registerLink)
            registerLink.style.display = "none";

        userMenu.style.display = "block";

        userName.textContent =
            currentUser.name;

        if (logoutBtn) {

            logoutBtn.onclick =
                logout;

        }

    }

    else {

        userMenu.style.display =
            "none";

    }

}
if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("register-name").value.trim();

        const email =
            document.getElementById("register-email").value.trim().toLowerCase();

        const password =
            document.getElementById("register-password").value;

        const confirmPassword =
            document.getElementById("register-confirm-password").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;

        }

        const exists =
            users.find(user => user.email === email);

        if (exists) {

            alert("An account with this email already exists.");

            return;

        }

        users.push({

            name,
            email,
            password

        });

        saveUsers();

        alert("Registration successful! Please login.");

        window.location.href = "login.html";

    });

}

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("login-email").value.trim().toLowerCase();

        const password =
            document.getElementById("login-password").value;

        const user =
            users.find(item =>
                item.email === email &&
                item.password === password
            );

        if (!user) {

            alert("Invalid email or password.");

            return;

        }

        setCurrentUser(user);

        alert("Login successful!");

        goHome();

    });

}

const currentUser = getCurrentUser();

if (

    window.location.pathname.includes("checkout.html") &&

    !currentUser

) {

    alert("Please login before checkout.");

    window.location.href = "login.html";

}