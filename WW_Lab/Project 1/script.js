// ==========================
// COMMON UTILITIES & MESSAGE
// ==========================
console.log("JS is loaded");

// Function to show popup message (above page)
function showMessage(msg, type = "success") {
    let messageBox = document.getElementById("message-box");
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "message-box";
        messageBox.style.position = "fixed";
        messageBox.style.top = "80px";
        messageBox.style.left = "50%";
        messageBox.style.transform = "translateX(-50%)";
        messageBox.style.background = type === "success" ? "#4CAF50" : "#e74c3c";
        messageBox.style.color = "#fff";
        messageBox.style.padding = "10px 20px";
        messageBox.style.borderRadius = "5px";
        messageBox.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        messageBox.style.zIndex = "9999";
        document.body.appendChild(messageBox);
    }

    messageBox.textContent = msg;
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
}

// Helper: email domain validation
function isValidCollegeEmail(email) {
    if (!email) return false;
    email = email.trim().toLowerCase();
    return email.endsWith("@gmail.com") || email.endsWith("@glbitm.ac.in");
}

// ==========================
// THEME HANDLING
// ==========================
function applySavedTheme() {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    function updateIcon() {
        const theme = document.documentElement.getAttribute("data-theme") || "light";
        toggleBtn.textContent = theme === "light" ? "🌙" : "☀️";
    }

    updateIcon();

    toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateIcon();
    });
}

// ==========================
// NAVBAR LOGIN STATE
// ==========================
function applyNavbarUserState() {
    const userName = sessionStorage.getItem("loggedInUser");
    const navList = document.querySelector("header nav ul");
    if (!navList) return;

    const loginLink = navList.querySelector('li a[href="login.html"]');
    const registerLink = navList.querySelector('li a[href="registration.html"]');
    const logoutLi = navList.querySelector(".nav-logout");

    if (userName) {
        if (loginLink && loginLink.parentElement) {
            navList.removeChild(loginLink.parentElement);
        }
        if (registerLink && registerLink.parentElement) {
            navList.removeChild(registerLink.parentElement);
        }

        if (!logoutLi) {
            const li = document.createElement("li");
            li.className = "nav-logout";
            li.innerHTML = `<button type="button" id="logout-btn" class="logout-btn">Logout</button>`;
            navList.appendChild(li);
        }

        const logoutBtn = navList.querySelector("#logout-btn");
        if (logoutBtn && !logoutBtn._bound) {
            logoutBtn._bound = true;
            logoutBtn.addEventListener("click", () => {
                sessionStorage.removeItem("loggedInUser");
                showMessage("Logged out", "success");
                window.location.href = "home.html";
            });
        }
    } else {
        if (logoutLi) {
            navList.removeChild(logoutLi);
        }
    }
}

// ==========================
// HOME PAGE WELCOME TEXT
// ==========================
function applyHomeWelcomeGreeting() {
    if (!window.location.pathname.includes("home.html")) return;
    const userName = sessionStorage.getItem("loggedInUser");
    const titleEl = document.getElementById("home-title");
    if (!titleEl) return;

    if (userName) {
        const firstName = userName.split(" ")[0];
        titleEl.innerHTML = `Welcome <span class="highlight-name">${firstName}</span> to GL Bajaj`;
    } else {
        titleEl.textContent = "Welcome to GL Bajaj";
    }
}

// ==========================
// FORM VALIDATION / AUTH
// ==========================
function setupPhoneValidation() {
    const phoneInput = document.getElementById("phone");
    if (!phoneInput) return;

    phoneInput.addEventListener("input", () => {
        // allow digits only and max 10 length
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
}

function setupRegistrationForm() {
    const regForm = document.getElementById("registration-form");
    if (!regForm) return;

    regForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("reg-confirm-password").value;
        const course = document.getElementById("course").value;

        if (!isValidCollegeEmail(email)) {
            showMessage("Use only @gmail.com or @glbitm.ac.in email!", "error");
            return;
        }

        if (phone.length !== 10) {
            showMessage("Mobile number must be exactly 10 digits!", "error");
            return;
        }

        if (!password || password.length < 4) {
            showMessage("Password must be at least 4 characters!", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match!", "error");
            return;
        }

        if (!course) {
            showMessage("Please select a course!", "error");
            return;
        }

        const fullName = (firstName + " " + lastName).trim();

        // Store registration data (single user for this project)
        localStorage.setItem("registeredName", fullName);
        localStorage.setItem("registeredEmail", email.toLowerCase());
        localStorage.setItem("registeredPassword", password);

        showMessage("Registration successful! Please login.", "success");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!isValidCollegeEmail(email)) {
            showMessage("Use only @gmail.com or @glbitm.ac.in email!", "error");
            return;
        }

        if (!password) {
            showMessage("Password cannot be empty!", "error");
            return;
        }

        const regEmail = localStorage.getItem("registeredEmail");
        const regPassword = localStorage.getItem("registeredPassword");
        const regName = localStorage.getItem("registeredName");

        if (!regEmail || !regPassword || !regName) {
            showMessage("No registered user found. Please register first.", "error");
            setTimeout(() => {
                window.location.href = "registration.html";
            }, 1000);
            return;
        }

        if (regEmail.toLowerCase() !== email.toLowerCase() || regPassword !== password) {
            showMessage("Invalid email or password!", "error");
            return;
        }

        sessionStorage.setItem("loggedInUser", regName);
        showMessage("Login successful!", "success");

        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    });
}

// =====================
// ADD TO CART LOGIC
// =====================
if (document.querySelector(".add-to-cart")) {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            const name = row.cells[1].innerText;
            const price = row.cells[2].innerText;

            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const existing = cart.find(item => item.name === name);

            if (existing) {
                showMessage("This book is already in your cart!", "error");
                return;
            }

            cart.push({ name, price });
            sessionStorage.setItem("cart", JSON.stringify(cart));

            showMessage("Book added to cart!");
        });
    });
}

// =====================
// DISPLAY CART LOGIC
// =====================
if (window.location.pathname.includes("cart.html")) {
    const cartTable = document.getElementById("cart-table");
    const cartBody = document.getElementById("cart-body");
    const totalPriceEl = document.getElementById("total-price");

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    function updateCart() {
        cartBody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const priceValue = parseInt(item.price.replace(/[^0-9]/g, ""));
            total += priceValue;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="btn remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartBody.appendChild(row);
        });

        totalPriceEl.textContent = "₹" + total;
    }

    updateCart();

    cartBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
            showMessage("Book removed from cart!", "error");
        }
    });
}

function applyHomeAuthButtons() {
    if (!window.location.pathname.includes("home.html")) return;

    const homeButtons = document.getElementById("homeButtons");
    if (!homeButtons) return;

    const userName = sessionStorage.getItem("loggedInUser");

    if (userName) {
        homeButtons.style.display = "none";      // hide login/register buttons
    } else {
        homeButtons.style.display = "flex";      // show them when logged out
    }
}

// ==========================
// INIT ON DOM READY
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    setupThemeToggle();
    applyNavbarUserState();
    applyHomeWelcomeGreeting();
    applyHomeAuthButtons();
    setupPhoneValidation();
    setupRegistrationForm();
    setupLoginForm();
});
