const burgerBtn = document.querySelector(".burger-contact");
const mobileMenuContact = document.querySelector(".menu__mobile-contact");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("show");
  mobileMenuContact.classList.toggle("show");
});

const btnStart = document.querySelector(".welcome__form-btn");
const allInputs = document.querySelectorAll(".form__welcome-input");
const checkbox = document.querySelector(".checkbox__welcome-form");
const lineWelcome = document.querySelector(".line__welcome");
const mainForm = document.querySelector("#mainForm");

function getFieldsData() {
  return [
    {
      el: allInputs[0],
      valid: allInputs[0].value.trim().length >= 3,
      msg: "Нужно хотя бы 3 символа",
    },
    {
      el: allInputs[1],
      valid: allInputs[1].value.trim().length >= 2,
      msg: "Слишком короткое имя",
    },
    {
      el: allInputs[2],
      valid: allInputs[2].value.trim().length >= 3,
      msg: "Минимум 3 символа",
    },
    {
      el: allInputs[3],
      valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(allInputs[3].value.trim()),
      msg: "Email не похож на настоящий",
    },
    {
      el: allInputs[4],
      valid: allInputs[4].value.replace(/\D/g, "").length >= 11,
      msg: "Номер не похож на настоящий",
    },
  ];
}

function liveValidation() {
  const fields = getFieldsData();
  const isAllValid = fields.every((f) => f.valid) && checkbox.checked;
  if (isAllValid) {
    btnStart.classList.add("active-btn");
    if (lineWelcome) lineWelcome.classList.remove("line-error");
  } else {
    btnStart.classList.remove("active-btn");
  }
}

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  const fields = getFieldsData();
  let hasError = false;

  fields.forEach((field) => {
    const errorSpan = field.el.parentElement.querySelector(".error-hint");
    if (!field.valid) {
      field.el.classList.add("error");
      if (errorSpan) {
        errorSpan.style.visibility = "visible";
        errorSpan.style.opacity = "1";
      }
      hasError = true;
    } else {
      field.el.classList.remove("error");
      if (errorSpan) {
        errorSpan.style.visibility = "hidden";
        errorSpan.style.opacity = "0";
      }
    }
  });

  if (!checkbox.checked) {
    hasError = true;
    checkbox.parentElement.style.color = "#ff4d4d";
  }

  if (hasError) {
    btnStart.classList.add("shake-it");
    setTimeout(() => btnStart.classList.remove("shake-it"), 400);
    if (lineWelcome) lineWelcome.classList.add("line-error");
  } else {
    btnStart.disabled = true;
    const originalText = btnStart.textContent;
    btnStart.textContent = "Отправка...";

    const templateParams = {
      last_name: allInputs[0].value,
      first_name: allInputs[1].value,
      middle_name: allInputs[2].value,
      email: allInputs[3].value,
      phone: allInputs[4].value,
      date: String(new Date().toLocaleString("ru-RU")),
    };

    emailjs
      .send("service_rr8vkkv", "template_xi5oq6s", templateParams)
      .then(() => {
        window.location.href = "confirm.html";
      })
      .catch((error) => {
        alert("Ошибка при отправке: " + JSON.stringify(error));
        btnStart.disabled = false;
        btnStart.textContent = originalText;
      });
  }
});

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
    const errorSpan = input.parentElement.querySelector(".error-hint");
    if (errorSpan) {
      errorSpan.style.visibility = "hidden";
      errorSpan.style.opacity = "0";
    }
    liveValidation();
  });
});

checkbox.addEventListener("change", liveValidation);

window.addEventListener("pageshow", (event) => {
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    mainForm.reset();
    allInputs.forEach((input) => {
      input.classList.remove("error");
      const errorSpan = input.parentElement.querySelector(".error-hint");
      if (errorSpan) {
        errorSpan.style.visibility = "hidden";
        errorSpan.style.opacity = "0";
      }
    });
    btnStart.classList.remove("active-btn");
    btnStart.disabled = false;
    btnStart.textContent = "Начать работу";
    if (lineWelcome) lineWelcome.classList.remove("line-error");
  }
});

window.onload = () => {
  if (mainForm) mainForm.reset();
};
