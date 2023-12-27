const registerForm = document.querySelector("#register");
const loginForm = document.querySelector("#login");
const url = window.location.href;

let users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

const changeUrl = (myUrl, Route) => {
  if (myUrl.split("/").includes("pages")) {
    const newUrl = [
      ...myUrl.split("/").slice(0, myUrl.split("/").length - 1),
      `${Route}.html`,
    ].join("/");
    window.location.href = newUrl;
  } else {
    const partToRemove = `index.html`;
    window.location.href = `${myUrl.replace(
      partToRemove,
      ""
    )}pages/${Route}.html`;
  }
};

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    registerForm.reset();
    document.querySelectorAll(".input-container").forEach((ele) => {
      ele.classList.remove("have-value");
    });
    sessionStorage.setItem("user", JSON.stringify(user));
    changeUrl(url, "welcome");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    const user = users.find(
      (user) => user.email === emailValue && user.password === passwordValue
    );
    if (user) {
      loginForm.reset();
      sessionStorage.setItem("user", JSON.stringify(user));
      document.querySelectorAll(".input-container").forEach((ele) => {
        ele.classList.remove("have-value");
      });
      changeUrl(url, "welcome");
    } else {
      alert("Invalid credentials");
      loginForm.reset();
    }
  });
}
