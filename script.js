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

                counter.innerText = target;
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