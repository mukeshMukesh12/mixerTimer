// Define object of different product mixers end timing in minutes
let mixers = {
  "soft-boiled-egg": [
    { title: "Boiling Water", duration: 0.5 }, // 30 seconds for boiling water
    { title: "Half-Boil the Egg", duration: 4 }, // 4 minutes to half-boil the egg
    { title: "Cool Egg", duration: 5 }, // 30 seconds to cool the egg
    { title: "Ready to Serve!", duration: 0 },
  ],
  "medium-boiled-egg": [
    { title: "Boiling Water", duration: 0.5 },
    { title: "Medium-Boil the Egg", duration: 7 }, // 7 minutes to medium-boil the egg
    { title: "Cool Egg", duration: 8 },
    { title: "Ready to Serve!", duration: 0 },
  ],
  "hard-boiled-egg": [
    { title: "Boiling Water", duration: 0.5 },
    { title: "Full-Boil the Egg", duration: 10 }, // 10 minutes to full-boil the egg
    { title: "Cool Egg", duration: 11 },
    { title: "Ready to Serve!", duration: 0 },
  ],
};

// Function to create a mixture timer element
function createMixtureTimer(ID, element) {
  const parentElement = document.getElementById(element);
  parentElement.querySelector("button").style.display = "none"; // Hide the initial button

  // Create main timer container
  const mixingTimer = document.createElement("div");
  mixingTimer.className = "mixing-timer";
  mixingTimer.id = `mixing-timer-${ID}`;

  // Create select dropdown for product choice
  const selectProduct = document.createElement("select");
  selectProduct.className = "select-product";
  selectProduct.setAttribute("onChange", `update('mixing-timer-${ID}')`);

  // Create buttons for controlling the timer
  const timer = document.createElement("div");
  timer.className = "timer";
  const controls = document.createElement("div");
  controls.className = "controls";

  const playBtn = document.createElement("button");
  playBtn.id = `playbtn-no-${ID}`;
  playBtn.className = "play";
  playBtn.setAttribute("type", "button");
  playBtn.setAttribute(
    "onClick",
    `countdown('mixing-timer-${ID}','playbtn-no-${ID}','resetbtn-no-${ID}')`
  );

  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("style", "display:none");
  resetBtn.setAttribute("type", "button");
  resetBtn.id = `resetbtn-no-${ID}`;
  resetBtn.className = "reset";
  controls.appendChild(playBtn);
  controls.appendChild(resetBtn);

  const countdown = document.createElement("div");
  countdown.className = "countdown";
  countdown.innerHTML = "00:00";
  timer.appendChild(controls);
  timer.appendChild(countdown);

  // Create options for the select element
  const options = [
    { value: "", text: "Select a product mixing timer" },
    { value: "soft-boiled-egg", text: "Half Boiled Egg" },
    { value: "medium-boiled-egg", text: "Medium Boiled Egg" },
    { value: "hard-boiled-egg", text: "Full Boiled Egg" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    selectProduct.appendChild(option);
  });

  // Create additional elements
  const selectProductLabel = document.createElement("div");
  selectProductLabel.className = "select-product-label";
  const progressWrap = document.createElement("div");
  progressWrap.className = "progress-wrap";

  // Append all created elements to the main timer container
  mixingTimer.appendChild(selectProduct);
  mixingTimer.appendChild(selectProductLabel);
  mixingTimer.appendChild(timer);
  mixingTimer.appendChild(progressWrap);

  parentElement.appendChild(mixingTimer);
}

// Function to check if an element has a certain class
function hasClass(el, cls) {
  return el.className && new RegExp(`(\\s|^)${cls}(\\s|$)`).test(el.className);
}

// Function to select the mixer based on the class
function selectMixer(element) {
  if (hasClass(element, "soft-boiled-egg")) return mixers["soft-boiled-egg"];
  if (hasClass(element, "medium-boiled-egg"))
    return mixers["medium-boiled-egg"];
  if (hasClass(element, "hard-boiled-egg")) return mixers["hard-boiled-egg"];
}

// Function to update the timer based on the selected product
function update(element) {
  let wrapper = document.getElementById(element);
  let select = wrapper.querySelector(".select-product");
  let option = select.options[select.selectedIndex];
  let progress = wrapper.querySelector(".progress-wrap");

  wrapper.className = `${option.value} mixing-timer active`;
  if (option.value !== "") {
    wrapper.querySelector(".select-product-label").innerHTML = option.text;
    select.style.display = "none";
    createProgress(progress, selectMixer(wrapper));
  }
}

// Function to manage the countdown timer
function countdown(wrapperId, playbtnId, resetbtnId) {
  let wrapper = document.getElementById(wrapperId);
  let playBtn = document.getElementById(playbtnId);
  let resetBtn = document.getElementById(resetbtnId);
  let countdownEl = wrapper.querySelector(".countdown");

  playBtn.style.display = "none";
  let minutes =
    selectMixer(wrapper)[selectMixer(wrapper).length - 2]["duration"];

  let sec = 0,
    min = 0,
    hour = 0,
    progress = 0,
    step = "";
  let interval = setInterval(function () {
    progress++;
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    }
    if (min === 60) {
      min = 0;
      hour++;
    }

    if (min === minutes) {
      progress = 0;
      countdownEl.innerHTML = "Closure!";
      resetBtn.style.display = "none";
      clearInterval(interval);
      return;
    }

    for (let i = 0; i < selectMixer(wrapper).length; i++) {
      step = selectMixer(wrapper)[i]["title"];
      if (i !== 0) {
        const timeduration =
          selectMixer(wrapper)[i]["duration"] * 60 -
          selectMixer(wrapper)[i - 1]["duration"] * 60;
        if (
          progress <= selectMixer(wrapper)[i]["duration"] * 60 &&
          progress === selectMixer(wrapper)[i - 1]["duration"] * 60
        ) {
          wrapper.querySelector(
            `.progressbar${i} div`
          ).style.animation = `mymove ${timeduration}s`;
          wrapper.querySelector(`.progressbar${i} div`).style.width = "100%";
          wrapper
            .querySelector(`.progressbar${i} div`)
            .classList.add("completed");
        }
      } else {
        wrapper.querySelector(
          `.progressbar${i} div`
        ).style.animation = `mymove ${
          selectMixer(wrapper)[i]["duration"] * 60
        }s`;
        wrapper.querySelector(`.progressbar${i} div`).style.width = "100%";
      }
    }

    countdownEl.innerHTML = `${min.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${sec.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }, 1000);

  resetBtn.style.display = "inline-block";
  resetBtn.onclick = function () {
    for (let i = 0; i < selectMixer(wrapper).length; i++) {
      wrapper.querySelector(`.progressbar${i} div`).style.width = "0";
      wrapper.querySelector(
        `.progressbar${i} div`
      ).style.animation = `mymove1 0s`;
    }
    resetBtn.style.display = "none";
    countdownEl.innerHTML = "00:00";
    playBtn.style.display = "inline-block";
    clearInterval(interval);
  };
}

// Function to create progress bars based on the array of steps
function createProgress(element, array) {
  array.forEach((el, index) => {
    let div = document.createElement("div");
    let progress = document.createElement("div");
    progress.className = `progressbar progressbar${index}`;
    let bar = document.createElement("div");
    bar.className = "bar";
    progress.appendChild(bar);
    let title = document.createElement("p");
    title.className = "title";
    title.innerHTML = el.title;
    let duration = document.createElement("p");
    duration.className = "duration";
    duration.innerHTML =
      el.duration < 1 ? `${el.duration * 60} sec` : `~${el.duration} min`;
    div.appendChild(progress);
    div.appendChild(title);
    div.appendChild(duration);
    element.append(div);
  });
}
