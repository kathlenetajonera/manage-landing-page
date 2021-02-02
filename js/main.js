const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".navbar__toggle");
const overlay = document.querySelector(".overlay");
const testiContainer = document.querySelector(".testimonials__container");
const testiSlider = document.querySelector(".testimonials__slider");
const sliderIndicators = document.querySelectorAll(".testimonials__slider-indicator");
const emailField = document.querySelector(".form__email");
const submitBtn = document.querySelector(".button--form");
const formResult = document.querySelector(".form__result");
const footerLogo = document.querySelector(".footer__logo-link");

let counter = 0;
let testimonialCardWidth = 25;
let windowWidth = window.innerWidth;

navToggle.addEventListener("click", toggleMobileNav);

sliderIndicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        const selectedIndex = Array.from(sliderIndicators).indexOf(indicator)

        moveSlider(selectedIndex);
        updateIndicator(indicator);
    })
})

emailField.addEventListener("input", () => {
    if (!emailField.value) {
        removeClass("error", emailField);
        removeClass("error", formResult);
        removeClass("valid", emailField);
        removeClass("valid", formResult);

        formResult.textContent = "";
    }
})

submitBtn.addEventListener("click", e => {
    e.preventDefault();

    if (emailField.value) {
        validateEmail(emailField.value);
    } else {
        showError("empty");
    }
});

footerLogo.addEventListener("click", e => {
    e.preventDefault();
    smoothScroll(".navbar");
});

window.addEventListener("resize", () => {
    if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth;

        if (windowWidth > 1024) {
            //automatically closes mobile nav
            ariaExpandedFalse(navToggle);
            removeClass("active", navbar);
            removeClass("active", overlay);
            enableScrolling();
        }
    }
});

function toggleMobileNav() {
    const isExpanded = navToggle.getAttribute("aria-expanded");

    if (isExpanded == "false") {
        ariaExpandedTrue(navToggle);
        addClass("active", navbar);
        addClass("active", overlay);
        disableScrolling();
    } else {
        ariaExpandedFalse(navToggle);
        removeClass("active", navbar);
        removeClass("active", overlay);
        enableScrolling();
    }
}

function addClass(className, elem) {
    const elemName = elem.classList[0];

    if (className === "valid") {
        elem.classList.remove(`${elemName}--error`);
    } else if ("error") {
        elem.classList.remove(`${elemName}--valid`);
    }

    elem.classList.add(`${elemName}--${className}`);
}

function removeClass(className, elem) {
    const elemName = elem.classList[0];

    elem.classList.remove(`${elemName}--${className}`);
}

function moveSlider(index) {
    testiSlider.style.transform = "translateX(" + -( index * testimonialCardWidth) + "%)";
}

function updateIndicator(selectedIndicator) {
    sliderIndicators.forEach(indicator => removeClass("active", indicator));

    addClass("active", selectedIndicator);
}

function validateEmail(userEmail) {
    const emailPattern = /^([a-zA-Z]{1,})([\w \. \-]+)(\@[\w]{3,8})(\.[a-zA-Z]{2,4})(\.[a-zA-Z]{2,3})?$/;

    if (userEmail.match(emailPattern)) {
        showValid();
    } else {
        showError("invalid");
    }
}

function showError(errType) {

    if (errType === "empty") {
        formResult.textContent = "Please enter your email";
    } else if (errType === "invalid") {
        formResult.textContent = "Please insert a valid email";
    }

    addClass("error", formResult);
    addClass("error", emailField);
}

function showValid() {
    formResult.textContent = "Valid email address";

    addClass("valid", formResult);
    addClass("valid", emailField);
}

const ariaExpandedTrue = elem => elem.setAttribute("aria-expanded", "true");

const ariaExpandedFalse = elem => elem.setAttribute("aria-expanded", "false");

const disableScrolling = () => {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
}

const enableScrolling = () => {
    document.body.style.height = "auto";
    document.body.style.overflowY = "";
}

function smoothScroll(target) {
    const targetSection = document.querySelector(target);
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    let startTime;
    let duration = 1000;
    
    function animation(currentTime) {
        if (startTime === undefined)
          startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        let animate = ease(timeElapsed, startPosition, distance, duration)

        window.scrollTo(0, animate);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t,b,c,d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    };

    requestAnimationFrame(animation);
}