// Data array
const cards = [
    { title: "National Emergency Number", subtitle: "National Emergency", number: "999", tag: "All", iconBg: "#ffe3e2", icon: "./assets/emergency.png" },
    { title: "Police Help Number", subtitle: "Police", number: "999", tag: "Police", iconBg: "#e2f0ff", icon: "./assets/police.png" },
    { title: "Fire Service Number", subtitle: "Fire Service", number: "999", tag: "Fire", iconBg: "#ffe3e2", icon: "./assets/fire-service.png" },
    { title: "Ambulance Service", subtitle: "Ambulance", number: "19994-999999", tag: "Health", iconBg: "#ffe3e2", icon: "./assets/ambulance.png" },
    { title: "Women & Child Helpline", subtitle: "Women & Child Helpline", number: "109", tag: "Help", iconBg: "#ffe3e2", icon: "./assets/emergency.png" },
    { title: "Anti-Corruption Helpline", subtitle: "Anti-Corruption", number: "106", tag: "Govt.", iconBg: "#ffe3e2", icon: "./assets/emergency.png" },
    { title: "Electricity Helpline", subtitle: "Electricity Outage", number: "16216", tag: "Electricity", iconBg: "#ffe3e2", icon: "./assets/emergency.png" },
    { title: "Brac Helpline", subtitle: "Brac", number: "16445", tag: "NGO", iconBg: "#ffe3e2", icon: "./assets/emergency.png" },
    { title: "Bangladesh Railway Helpline ", subtitle: "Bangladesh Railway", number: "163", tag: "Travel", iconBg: "#ffe3e2", icon: "./assets/emergency.png" }
];

// Generate cards with template literals
const container = document.getElementById("card-container");

container.classList.add("grid", "grid-col-3", "gap-[30px]")
container.innerHTML = cards.map(card => `
    <div class="card flex flex-col gap-3 rounded-2xl bg-white p-6">
        <!-- section-1 -->
        <div class="flex justify-between items-center">
            <!-- card-icon -->
            <div class="card-section-1 flex justify-center items-center rounded-2xl w-[60px] h-[60px] bg-[${card.iconBg}]">
            <img class="w-[32px] h-[32px]" src="${card.icon}" alt="">
            </div>
            <i class="fa-regular fa-heart fa-lg text-gray-500 heart-btn cursor-pointer"></i>
        </div>
        <!-- section-2 -->
        <div class="card-section-2">
            <h3 class="service-name text-nowrap text-[18px] font-semibold">${card.title}</h3>
            <p class="text-gray-500">${card.subtitle}</p>
        </div>
        <!-- section-3 -->
        <div class="section-3">
            <h2 class="service-number w-fit cursor-pointer text-[32px] text-3xl font-semibold">${card.number}</h2>
            <p class="text-gray-400 text-[18px] bg-gray-100 rounded-2xl px-4 py-0.5 w-fit">${card.tag}</p>
        </div>
        <!-- button-section -->
        <div class="card-section-button roboto flex gap-2">
            <button class="copy-btn w-[50%] cursor-pointer py-0.5 border border-gray-200 text-gray-400 rounded text-[16px]">
            <i class="fa-solid fa-copy"></i>
            <span> Copy</span>
            </button>
            <button class="call-btn cursor-pointer w-[50%] bg-[#00a639] text-white rounded text-[16px]">
            <i class="fa-solid fa-phone-flip fa-rotate-90 fa-sm"></i>
            <span>Call</span>
            </button>
        </div>
        </div>
`).join("");


//  Heart functionality
const heartCountEl = document.getElementById("heart-count");
let heartCount = parseInt(heartCountEl.textContent);

document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        heartCount++;
        heartCountEl.textContent = heartCount;
    });
});


//  Call button functionality
const coinEl = document.getElementById("coin-balance");
let coins = parseInt(coinEl.textContent);

const historyContainer = document.getElementById("history-container");

document.querySelectorAll(".card").forEach(card => {
    // select elements inside this specific card
    const serviceName = card.querySelector(".service-name").textContent;
    const serviceNumber = card.querySelector(".service-number").textContent;

    card.querySelector(".call-btn").addEventListener("click", () => {
        if (coins < 20) {
            alert("Not enough coins! You need at least 20 to make a call.");

            return;
        }

        // Deduct coins
        coins -= 20;
        coinEl.textContent = coins;
        updateCallButtons();

        alert(`Calling ${serviceName} at ${serviceNumber}`);

        // Add to history
        const time = new Date().toLocaleTimeString();
        const entry = document.createElement("div");
        entry.className = "history flex justify-between items-center my-2 p-2 rounded bg-gray-50";
        entry.innerHTML = `
            <div class="service-info">
            <h4 class="font-bold text-[18px]">${serviceName}</h4>
            <p class="text-gray-400">${serviceNumber}</p>
            </div>
            <div class="time-stamp">
            <p class="text-gray-600 text-nowrap">${time}</p>
            </div>
        `;
        historyContainer.appendChild(entry);
    });
});

document.getElementById("clear-btn").addEventListener("click", () => {
    historyContainer.innerHTML = "";
});


// Add copy functionality
const copyEl = document.getElementById("copy-count");
let copyCount = parseInt(copyEl.textContent);

document.querySelectorAll(".card").forEach(card => {
    const btn = card.querySelector(".copy-btn");
    btn.addEventListener("click", async () => {
        const number = card.querySelector(".service-number").textContent;
        try {
            await navigator.clipboard.writeText(number);

            // Temporarily change button text
            const span = btn.querySelector("span");
            const prev = span.textContent;
            span.textContent = "Copied!";
            setTimeout(() => span.textContent = prev, 1200);

            // Increment navbar copy count
            copyCount++;
            copyEl.textContent = copyCount;

        } catch {
            alert("Copy not supported on this browser");
        }
    });
});

//  buttons red when coin is less then 20
const updateCallButtons = () => {
    document.querySelectorAll(".card .call-btn").forEach(btn => {
        if (coins < 20) {
            btn.classList.add("bg-red-700", "text-gray-400");
        } else {
            btn.classList.remove("bg-red-700", "text-gray-400");
        }
    });
};


document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("call-history").classList.toggle("max-xl:hidden");
});


document.getElementById("history-close-btn").addEventListener("click", () => {
    document.getElementById("call-history").classList.toggle("max-xl:hidden");
});
