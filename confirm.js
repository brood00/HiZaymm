const burgerBtn = document.querySelector(".burger-contact");
const mobileMenuContact = document.querySelector(".menu__mobile-contact");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("show");
  mobileMenuContact.classList.toggle("show");
});
