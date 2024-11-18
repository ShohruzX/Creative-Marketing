const teamItems = document.querySelectorAll(".team__item");
const scrollIndicators = document.querySelector(".scroll-indicators");
const teamContainer = document.querySelector(".team");

teamItems.forEach((item, index) => {
  const indicator = document.createElement("div");
  scrollIndicators.appendChild(indicator);
  item.dataset.index = index;
});

function updateSelectedItem() {
  let closestItem = null;
  let closestDistance = Infinity;

  teamItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const distance = Math.abs(
      rect.left + rect.width / 2 - window.innerWidth / 2
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  teamItems.forEach((item) => item.classList.remove("selected"));
  document
    .querySelectorAll(".scroll-indicators div")
    .forEach((indicator) => indicator.classList.remove("selected"));
  closestItem.classList.add("selected");
  const index = closestItem.dataset.index;
  document
    .querySelectorAll(".scroll-indicators div")
    [index].classList.add("selected");
}

window.addEventListener("scroll", updateSelectedItem);
updateSelectedItem();

scrollIndicators.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "DIV") {
    const index = Array.from(scrollIndicators.children).indexOf(e.target);
    const targetItem = teamItems[index];
    teamContainer.scrollTo({
      left:
        targetItem.offsetLeft -
        (teamContainer.offsetWidth / 2 - targetItem.offsetWidth / 2),
      behavior: "smooth",
    });
    teamItems.forEach((item) => item.classList.remove("selected"));
    targetItem.classList.add("selected");
    document
      .querySelectorAll(".scroll-indicators div")
      .forEach((indicator) => indicator.classList.remove("selected"));
    e.target.classList.add("selected");
  }
});

