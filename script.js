let shortBtn = document.querySelector(".short");
let bigLink = document.querySelector(".big-link");
let shortLink = document.querySelector(".short-link");
let oldLink = document.querySelector(".old-link");
let copyButton = document.querySelector(".copy");
let shortLinkDiv = document.querySelector(".shorten-link-div");
let small = document.querySelector("small");

function getLinkShort(link) {
  bigLink.style.border = "none";
  small.style.display = "none";
  shortBtn.style.backgroundColor = "hsl(180, 67%, 70%)";
  shortBtn.disabled = true;
  let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
  fetch(url)
    .then((res) => {
      if (res.ok == false) {
        throw new Error("Please add a valid link");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      shortLink.innerHTML = data.result.short_link;
      oldLink.innerHTML = data.result.original_link;
      shortLinkDiv.style.display = "flex";
      shortBtn.style.backgroundColor = "hsl(180, 66%, 49%)";
      shortBtn.disabled = false;
      bigLink.value = "";
      console.log(data);
    })
    .catch((err) => {
      shortLinkDiv.style.display = "none";
      shortBtn.style.backgroundColor = "hsl(180, 66%, 49%)";
      shortBtn.disabled = false;
      small.style.display = "block";
      small.innerHTML = err.message;
      console.log(err.message);
    });
}

shortBtn.addEventListener("click", () => {
  if (bigLink.value) {
    getLinkShort(bigLink.value);
  } else {
    bigLink.style.border = "3px solid hsl(0, 80%, 52%)";
    small.style.display = "block";
  }
});

bigLink.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    getLinkShort(bigLink.value);
  }
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(shortLink.innerHTML);
  copyButton.classList.add("copied");
  copyButton.innerHTML = "Copied!";
});
