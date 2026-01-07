const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");
const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");

/* ---------- MODELS ---------- */
const models = [
  {
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/Cookie_ltr.glb",
    name: "Chocolate Cookie",
    price: "Rs 449"
  },
  {
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/Chicken_Strips_ltr.glb",
    name: "Chicken Strips",
    price: "Rs 1,199"
  },
  {
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/CupCake_ltr.glb",
    name: "Vanilla Cupcake",
    price: "Rs 749"
  },
  {
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/sushi_ltr.glb",
    name: "Sushi Platter",
    price: "Rs 2,299"
  }
];

let index = 0;

/* ---------- PRELOAD (SAFE) ---------- */
const preloadCache = new Set();

function preloadModel(url) {
  if (preloadCache.has(url)) return;

  fetch(url, { mode: "cors", priority: "low" }).catch(() => {});
  preloadCache.add(url);
}

function preloadNextModels(i) {
  preloadModel(models[(i + 1) % models.length].src);
}

/* ---------- MODEL SWITCH ---------- */
function showModel(i) {
  loader.style.display = "flex";
  viewer.classList.add("fade-out");

  foodName.textContent = models[i].name;
  foodPrice.textContent = models[i].price;

  viewer.src = models[i].src;
}

viewer.addEventListener("load", () => {
  loader.style.display = "none";
  viewer.classList.remove("fade-out");

  // preload next AFTER first model loads
  preloadNextModels(index);
});

/* ---------- NAVIGATION ---------- */
document.getElementById("next").onclick = () => {
  index = (index + 1) % models.length;
  showModel(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + models.length) % models.length;
  showModel(index);
};

/* ---------- START ---------- */
startScreen.onclick = () => {
  startScreen.style.display = "none";

  // load model FIRST
  showModel(index);

  // start camera AFTER model begins loading
  setTimeout(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      video.srcObject = stream;
    } catch {
      alert("Camera access is required");
    }
  }, 700);
};

/* ---------- AR ---------- */
document.getElementById("arBtn").onclick = () => {
  viewer.activateAR();
};
