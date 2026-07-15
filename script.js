// ===============================
// Scroll Reveal
// ===============================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

hiddenElements.forEach(el=>observer.observe(el));

// ===============================
// Navbar Background
// ===============================

window.addEventListener("scroll",()=>{

const header=document.getElementById("header");

if(window.scrollY>80){

header.classList.add("scrolled");

}

else{

header.classList.remove("scrolled");

}

});

// ===============================
// Back To Top
// ===============================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

}

// ===============================
// Counter Animation (Professional)
// ===============================

const counters = document.querySelectorAll(".count");
const counterSection = document.querySelector(".counter");

let hasAnimated = false;

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    const increment = Math.ceil(target / 100);

    function update() {

        const current = Number(counter.innerText);

        if (current < target) {

            counter.innerText = Math.min(current + increment, target);

            setTimeout(update, 20);

        }

    }

    update();

}

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !hasAnimated) {

            hasAnimated = true;

            // Reset counters just before animation
            counters.forEach(counter => {
                counter.innerText = "0";
            });

            // Small delay so the reset is visible
            setTimeout(() => {
                counters.forEach(counter => animateCounter(counter));
            }, 100);

        }

        // Allow animation again after the section is completely out of view
        if (!entry.isIntersecting && entry.intersectionRatio === 0) {

            hasAnimated = false;

        }

    });

}, {

    threshold: 0.5

});

counterObserver.observe(counterSection);