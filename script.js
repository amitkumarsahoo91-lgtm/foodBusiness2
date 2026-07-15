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
// Counter Animation
// ============================================

const counterSection = document.querySelector(".counter");
const counters = document.querySelectorAll(".count");

let isCounterAnimated = false;

function runCounterAnimation() {

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        let current = 0;

        counter.innerText = "0";

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                counter.innerText = target;
                clearInterval(timer);

            } else {

                counter.innerText = Math.floor(current);

            }

        }, stepTime);

    });

}

function handleCounter() {

    if (!counterSection) return;

    const rect = counterSection.getBoundingClientRect();

    const sectionVisible =
        rect.top <= window.innerHeight * 0.7 &&
        rect.bottom >= window.innerHeight * 0.3;

    if (sectionVisible && !isCounterAnimated) {

        isCounterAnimated = true;

        runCounterAnimation();

    }

    // Reset only after section has completely left the screen
    if (rect.bottom < 0 || rect.top > window.innerHeight) {

        isCounterAnimated = false;

    }

}

window.addEventListener("scroll", handleCounter);
window.addEventListener("load", handleCounter);