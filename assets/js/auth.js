let users =
    JSON.parse(localStorage.getItem("users")) || [];

const registerForm =
    document.getElementById("register-form");

const loginForm =
    document.getElementById("login-form");

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

    showToast(
        "info",
        "Logged Out",
        "You have been logged out successfully."
    );

    setTimeout(() => {

        goHome();

    }, 1200);

}

/* ==========================
   REGISTER
========================== */

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document.getElementById("register-name")
                    .value
                    .trim();

            const username =
                document.getElementById("register-username")
                    .value
                    .trim()
                    .toLowerCase();

            const identifier =
                document.getElementById("register-email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById("register-password")
                    .value;

            const confirmPassword =
                document.getElementById("register-confirm-password")
                    .value;

            if (password !== confirmPassword) {

                showToast(
                    "warning",
                    "Password Mismatch",
                    "Passwords do not match."
                );

                return;

            }

            const exists =
                users.find(user =>

                    user.username === username ||

                    user.email === identifier ||

                    user.phone === identifier

                );

            if (exists) {

                showToast(
                    "warning",
                    "Account Exists",
                    "Username, email or phone already exists."
                );

                return;

            }

            let newUser = {

                name: name,

                username: username,

                password: password

            };

            if (identifier.includes("@")) {

                newUser.email =
                    identifier;

            }

            else {

                newUser.phone =
                    identifier;

            }

            users.push(newUser);

            saveUsers();

            showToast(
                "success",
                "Registration Successful",
                "Your account has been created successfully."
            );

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1500);

        }

    );

}
/* ==========================
   LOGIN SYSTEM
========================== */

function findUser(identifier, password) {

    identifier =
        identifier
            .trim()
            .toLowerCase();

    return users.find(user =>

        (

            (user.email &&
                user.email.toLowerCase() === identifier)

            ||

            (user.username &&
                user.username.toLowerCase() === identifier)

            ||

            (user.phone &&
                user.phone === identifier)

        )

        &&

        user.password === password

    );

}

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const identifier =
                document.getElementById("login-email")
                    .value
                    .trim();

            const password =
                document.getElementById("login-password")
                    .value;

            const user =
                findUser(
                    identifier,
                    password
                );

            if (!user) {

                showToast(
                    "error",
                    "Login Failed",
                    "Invalid username, email, phone or password."
                );

                return;

            }

            setCurrentUser(user);

            showToast(
                "success",
                "Login Successful",
                "Welcome back, " + user.name + "!"
            );

            setTimeout(() => {

                goHome();

            }, 1500);

        }

    );

}

/* ==========================
   NAVBAR AUTH UI
========================== */

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

        if (loginLink) {

            loginLink.style.display =
                "none";

        }

        if (registerLink) {

            registerLink.style.display =
                "none";

        }

        userMenu.style.display =
            "block";

        if (userName) {

            userName.textContent =
                currentUser.name;

        }

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAuthUI();

    }
);
/* ==========================
   PASSWORD TOGGLE
========================== */

const togglePassword =
    document.getElementById("toggle-password");

const passwordInput =
    document.getElementById("login-password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                this.innerHTML =
                    '<i class="fas fa-eye-slash"></i>';

            }

            else {

                passwordInput.type = "password";

                this.innerHTML =
                    '<i class="fas fa-eye"></i>';

            }

        }
    );

}

/* ==========================
   CHECKOUT PROTECTION
========================== */

(function () {

    const currentUser =
        getCurrentUser();

    if (

        window.location.pathname.includes("checkout.html")

        &&

        !currentUser

    ) {

        showToast(
            "warning",
            "Login Required",
            "Please login before proceeding to checkout."
        );

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1500);

    }

})();

/* ==========================
   INITIALIZATION
========================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAuthUI();

    }
);