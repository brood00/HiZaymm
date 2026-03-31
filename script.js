const swiper = new Swiper(".mySwiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 1300,
  allowTouchMove: false,
  simulateTouch: false,
});

const staffRange = document.getElementById("staff-range");
const staffVal = document.getElementById("staff-val");
const clientsRange = document.getElementById("clients-range");
const clientsVal = document.getElementById("clients-val");

function handleInput(slider, display) {
  display.innerHTML = slider.value;

  const percent =
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

  slider.style.background = `linear-gradient(to right, #21CC66 ${percent}%, #D1DCD6 ${percent}%)`;
}

staffRange.oninput = function () {
  handleInput(this, staffVal);
};

clientsRange.oninput = function () {
  handleInput(this, clientsVal);
};

handleInput(staffRange, staffVal);
handleInput(clientsRange, clientsVal);

document.querySelectorAll(".faq__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const parent = trigger.parentElement;

    document.querySelectorAll(".faq__item").forEach((item) => {
      if (item !== parent) item.classList.remove("active");
    });

    parent.classList.toggle("active");
  });
});

const burger = document.getElementById("burger-menu");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
});

const mobileLinks = document.querySelectorAll(".menu__mobile .menu__link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "visible";
  });
});

const scrollTopBtn = document.querySelector(".btn__scroll-top");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show-scroll");
  } else {
    scrollTopBtn.classList.remove("show-scroll");
  }
});
