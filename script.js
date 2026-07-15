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

let counterPlayed = false;

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

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

}

if (counterSection) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterPlayed) {

                counterPlayed = true;

                counters.forEach(counter => {

                    animateCounter(counter);

                });

            }

            // Reset only when the section is completely outside the viewport
            if (!entry.isIntersecting && entry.intersectionRatio === 0) {

                counterPlayed = false;

            }

        });

    }, {

        threshold: 0.5

    });

    counterObserver.observe(counterSection);

}