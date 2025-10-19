// ==========================
// ADD TO CART
// ==========================
console.log("JS is loaded");

// Function to show popup message (above catalogue)
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

// ===================== ADD TO CART LOGIC =====================
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

// ===================== DISPLAY CART LOGIC =====================
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
