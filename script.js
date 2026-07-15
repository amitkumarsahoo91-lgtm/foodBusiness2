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

const counterSection = document.querySelector(".counter");
const counters = document.querySelectorAll(".count");

let counterStarted = false;

function animateCounter(counter) {

    const target = +counter.dataset.target;
    const speed = 20;
    const increment = Math.ceil(target / 100);

    function update() {

        let current = +counter.innerText;

        if (current < target) {

            counter.innerText = Math.min(current + increment, target);

            setTimeout(update, speed);

        } else {

            counter.innerText = target;

        }

    }

    update();

}

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        // Start animation when 50% visible
        if (entry.isIntersecting && !counterStarted) {

            counterStarted = true;

            counters.forEach(counter => {

                counter.innerText = "0";
                animateCounter(counter);

            });

        }

        // Reset only after section completely leaves screen
        if (!entry.isIntersecting) {

    counterStarted = false;

    counters.forEach(counter => {

        counter.innerText = "0";

    });

}

    });

}, {

    threshold: 0.5

});

counterObserver.observe(counterSection);