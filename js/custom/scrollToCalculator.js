export default function (e) {
  e.preventDefault();
  console.log(document.querySelector(this.getAttribute("href")));
  document.querySelector(this.getAttribute("href")).scrollIntoView({
    behavior: "smooth",
  });
}
