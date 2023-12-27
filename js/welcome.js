const logedInUser = JSON.parse(sessionStorage.getItem("user"));
const LogoutButton = document.querySelector(".navbar button");
const url = window.location.href;
const changeUrl = (myUrl, Route) => {
  if (myUrl.split("/").includes("pages")) {
    const newUrl = [
      ...myUrl.split("/").slice(0, myUrl.split("/").length - 1),
      `${Route}.html`,
    ].join("/");
    window.location.href = newUrl;
  } else {
    window.location.href = `${myUrl}pages/${Route}.html`;
  }
};

const uppercaseName =
  logedInUser.firstName[0].toUpperCase() + logedInUser.firstName.slice(1);

document.querySelector(".name").innerHTML = uppercaseName;

LogoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  changeUrl(url, "login");
});
