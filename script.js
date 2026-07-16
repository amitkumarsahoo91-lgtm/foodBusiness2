// ============================================
// Scroll Reveal Animation
// ============================================

const hiddenElements = document.querySelectorAll(".hidden");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

hiddenElements.forEach(element => {

    revealObserver.observe(element);

});


// ============================================
// Sticky Navbar
// ============================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ============================================
// Back To Top Button
// ============================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "flex";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


// ============================================
// Counter Animation (Every Entry)
// ============================================

const counterSection = document.querySelector(".counter");
const counters = document.querySelectorAll(".count");

let lastState = false;

function animateCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        counter.innerText = "0";

        let current = 0;

        const increment = Math.ceil(target / 100);

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {
				const suffix = counter.dataset.suffix || "";

                counter.innerText = target + suffix;
                clearInterval(timer);

            } else {

                counter.innerText = current;

            }

        },20);

    });

}

function checkCounter() {

    const rect = counterSection.getBoundingClientRect();

    // Section is considered visible
    const visible =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;

    // User has JUST entered the section
    if (visible && !lastState) {

        animateCounters();

    }

    lastState = visible;

}

window.addEventListener("scroll", checkCounter);
window.addEventListener("load", checkCounter);

//==================== SHOPPING CART ====================

let cart = [];

function addToCart(name, price) {

    const item = cart.find(food => food.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
}


// Increase Quantity
function increaseQty(index) {
    cart[index].quantity++;
    updateCart();
}


// Decrease Quantity
function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


// Refresh Cart
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const empty = document.getElementById("empty-cart");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.appendChild(empty);

        document.getElementById("cart-total").innerText = "₹0";

        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-left">

                <h3>${item.name}</h3>

                <p>₹${item.price} each</p>

            </div>

            <div class="cart-right">

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

                <strong>₹${item.price * item.quantity}</strong>

                <button class="remove-btn"
                        onclick="removeItem(${index})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>

        `;
    });

    document.getElementById("cart-total").innerText = total;
}

function goToCheckout(){

    updateCheckout();

    document.getElementById("checkout").scrollIntoView({

        behavior:"smooth"

    });

}

function updateCheckout(){

    const list = document.getElementById("checkout-items");

    list.innerHTML="";

    let total=0;

    cart.forEach(item=>{

        total += item.price*item.quantity;

        list.innerHTML += `

        <div class="checkout-item">

            <span>

                ${item.name} × ${item.quantity}

            </span>

            <strong>

                ₹${item.price*item.quantity}

            </strong>

        </div>

        `;

    });

    document.getElementById("checkout-total").innerText=total;

}

function placeOrder(){

    const name=document.getElementById("customer-name").value.trim();
    const phone=document.getElementById("customer-phone").value.trim();
    const email=document.getElementById("customer-email").value.trim();
    const address=document.getElementById("customer-address").value.trim();

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    if(name==="" || phone==="" || email==="" || address===""){

        alert("Please complete all required fields.");

        return;

    }

    alert("🎉 Thank you, "+name+"!\n\nYour FreshBites order has been placed successfully.");

}