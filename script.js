const container = document.getElementById("cards-container");
const buttons = document.querySelectorAll("[data-period]");
let data = [];

fetch("data/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    renderCards("weekly");
  });

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    button.classList.add("active");
    renderCards(button.dataset.period);
  });
});

function renderCards(period) {
  container.innerHTML = "";

  data.forEach((activity) => {
    const { title, timeframes } = activity;
    const iconName = title.toLowerCase().replace(" ", "-");
    const current = timeframes[period].current;
    const previous = timeframes[period].previous;

    container.innerHTML += `
  <div class="card ${iconName}">
    <div class="card-banner" style="height: 60px; position: relative; overflow: hidden;">
      <img src="assets/icon-${iconName}.svg" alt="${title} icon"
           style="position: absolute; top: 0px; right: 10px; width: 60px; height: 60px; opacity: 0.5;" />
    </div>
    <div class="card-content" style="background-color: hsl(235, 46%, 20%); padding: 20px; border-radius: 0 0 15px 15px;">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 14px;">${title}</h3>
        <img src="assets/icon-ellipsis.svg" alt="Menu" style="width: 20px; height: 5px;" />
      </div>
      <div class="card-body" style="margin-top: 15px;">
        <h2 style="margin: 0; font-size: 32px;">${current}hrs</h2>
        <p style="margin: 0; font-size: 12px; color: hsl(236, 100%, 87%);">Last ${capitalize(
          period
        )} - ${previous}hrs</p>
      </div>
    </div>
  </div>
`;
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
