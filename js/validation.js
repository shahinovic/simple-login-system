const firstName = document.getElementById("first-name");
const firstNameFeedback = document.getElementById("first-name-feedback");
const lastName = document.getElementById("last-name");
const lastNameFeedback = document.getElementById("last-name-feedback");
const email = document.querySelector("input.email");
const emailFeedback = document.getElementById("email-feedback");
const password = document.getElementById("password");
const passwordFeedback = document.getElementById("password-feedback");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordFeedback = document.getElementById(
  "confirm-password-feedback"
);

// Define a debounce function
const debounce = (func, delay) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

document
  .querySelectorAll(".disabled input")
  .forEach((ele) => (ele.disabled = true));

if (firstNameFeedback) {
  firstName.addEventListener("input", (e) => {
    const nameRegex = /^[a-zA-Z]{3,}$/;

    const name = e.target.value;

    if (!nameRegex.test(name)) {
      firstNameFeedback.classList.add("err");
      firstNameFeedback.innerHTML =
        "Please enter a name that's at least 3 characters long and uses only English letters.";
      firstName.parentElement.classList.remove("have-value");
      if (
        ![
          ...document.querySelector("#first-name-feedback + .input-container")
            .classList,
        ].includes("disabled")
      ) {
        document
          .querySelector("#first-name-feedback + .input-container")
          .classList.add("disabled");
      }
    } else {
      firstNameFeedback.classList.remove("err");
      firstName.parentElement.classList.add("have-value");
      document
        .querySelector("#first-name-feedback + .input-container")
        .classList.remove("disabled");
      lastName.disabled = false;
    }
  });
}

if (lastName) {
  lastName.addEventListener("input", (e) => {
    const nameRegex = /^[a-zA-Z]{3,}$/;

    const name = e.target.value;

    if (!nameRegex.test(name)) {
      lastNameFeedback.classList.add("err");
      lastNameFeedback.innerHTML =
        "Please enter a name that's at least 3 characters long and uses only English letters.";
      lastName.parentElement.classList.remove("have-value");
      if (
        ![
          ...document.querySelector("#last-name-feedback + .input-container")
            .classList,
        ].includes("disabled")
      ) {
        document
          .querySelector("#last-name-feedback + .input-container")
          .classList.add("disabled");
      }
    } else {
      lastNameFeedback.classList.remove("err");
      lastName.parentElement.classList.add("have-value");
      document
        .querySelector("#last-name-feedback + .input-container")
        .classList.remove("disabled");
      email.disabled = false;
    }
  });
}

const emailInputHandler = (e) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailValue = e.target.value;

  // Check if the entered email is valid
  if (!emailRegex.test(emailValue)) {
    emailFeedback.classList.add("err");
    emailFeedback.innerHTML = "Please enter a valid email address";
    email.parentElement.classList.remove("have-value");
    if (
      ![
        ...document.querySelector("#email-feedback + .input-container")
          .classList,
      ].includes("disabled")
    ) {
      document
        .querySelector("#email-feedback + .input-container")
        .classList.add("disabled");
    }
  } else {
    // Check if the entered email already exists in the users array

    // e.target.classList.includes("register")
    if ([...e.target.classList].includes("register")) {
      const emailExists = users.some((user) => user.email === emailValue);
      if (emailExists) {
        emailFeedback.classList.add("err");
        emailFeedback.innerHTML = "This email is already in use";
        email.parentElement.classList.remove("have-value");
        document
          .querySelector("#email-feedback + .input-container")
          .classList.add("disabled");
        password.disabled = true; // Disable password input when email is not valid
      } else {
        emailFeedback.classList.remove("err");
        email.parentElement.classList.add("have-value");
        document
          .querySelector("#email-feedback + .input-container")
          .classList.remove("disabled");
        password.disabled = false;
      }
    } else {
      emailFeedback.classList.remove("err");
      email.parentElement.classList.add("have-value");
      document
        .querySelector("#email-feedback + .input-container")
        .classList.remove("disabled");
      password.disabled = false;
    }
  }
};

email.addEventListener("input", debounce(emailInputHandler, 300));

password.addEventListener("input", (e) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordValue = e.target.value;

  if (!passwordRegex.test(passwordValue)) {
    passwordFeedback.classList.add("err");
    passwordFeedback.innerHTML = `Password must meet the following criteria:

  At least 8 characters long.
  Contains at least one lowercase letter.
  Contains at least one uppercase letter.
  Contains at least one number.
  Contains at least one special character (@, $, !, %, *, ?, &).`;
    password.parentElement.classList.remove("have-value");
    if (
      ![
        ...document.querySelector("#password-feedback + .input-container")
          .classList,
      ].includes("disabled")
    ) {
      document
        .querySelector("#password-feedback + .input-container")
        .classList.add("disabled");
    }
  } else {
    passwordFeedback.classList.remove("err");
    password.parentElement.classList.add("have-value");
    document
      .querySelector("#password-feedback + .input-container")
      .classList.remove("disabled");
    confirmPassword.disabled = false;
  }
});

if (confirmPassword) {
  confirmPassword.addEventListener("input", (e) => {
    if (e.target.value !== password.value) {
      confirmPasswordFeedback.classList.add("err");
      confirmPasswordFeedback.innerHTML = "Passwords do not match";
      confirmPassword.parentElement.classList.remove("have-value");
      document.querySelector("form button").disabled = true;
    } else {
      confirmPasswordFeedback.classList.remove("err");
      confirmPassword.parentElement.classList.add("have-value");
      document;
      document.querySelector("form button").disabled = false;
    }
  });
}
