const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".navbar__toggle");
const overlay = document.querySelector(".overlay");

navToggle.addEventListener("click", toggleMobileNav);

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

//slider
const testiContainer = document.querySelector(".testimonials__container");
const testiSlider = document.querySelector(".testimonials__slider");
const sliderIndicators = document.querySelectorAll(".testimonials__slider-indicator");
const testiCards = document.querySelectorAll(".card");

let counter = 0;
let testimonialCardWidth = 25;

sliderIndicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        const selectedIndex = Array.from(sliderIndicators).indexOf(indicator)

        moveSlider(selectedIndex);
        updateIndicator(indicator);
    })
})

function moveSlider(index) {
    testiSlider.style.transform = "translateX(" + -( index * testimonialCardWidth) + "%)";
}

function updateIndicator(selectedIndicator) {
    sliderIndicators.forEach(indicator => removeClass("active", indicator));

    addClass("active", selectedIndicator);
}

//autoplay
let windowWidth = window.innerWidth;

// if (windowWidth >= 768) {
//     //autoplay
//     setInterval(slideShow, 2000); 
// }

window.addEventListener("resize", () => {
    if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth;

        if (windowWidth > 1024) {
            //automatically closes mobile nav
            ariaExpandedFalse(navToggle);
            removeClass("active", navbar);
            removeClass("active", overlay);
            enableScrolling();

            // //autoplay
            // setInterval(slideShow, 2000); 
        }
    }
})

// function slideShow() {
//     counter < 3 ? counter++ : counter = 0;

//     testiSlider.style.transform = `translateX(-${counter * 100}%)`
// }

//form
const emailField = document.querySelector(".form__email");
const submitBtn = document.querySelector(".button--form");
const formResult = document.querySelector(".form__result");

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
})

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