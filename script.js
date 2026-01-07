const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");
const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");

/* ---------- MODELS ---------- */
const models = [
  {
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/CupCake_ltr.glb",
    name: "Vanilla Cupcake",
    price: "Rs 749"
  },
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
    src: "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/sushi_ltr.glb",
    name: "Sushi Platter",
    price: "Rs 2,299"
  }
];

let index = 0;

/* ---------- PRELOAD ---------- */
const preloadCache = new Set();

function preloadModel(url) {
  if (!url || preloadCache.has(url)) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "fetch";
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);

  preloadCache.add(url);
}

function preloadNextModels(i) {
  for (let x = 1; x <= 2; x++) {
    preloadModel(models[(i + x) % models.length].src); // ✅ FIX
  }
}

// preload first two
preloadModel(models[0].src); // ✅ FIX
preloadModel(models[1].src); // ✅ FIX

/* ---------- MODEL SWITCH ---------- */
function showModel(i) {
  loader.style.display = "flex";
  viewer.classList.add("fade-out");

  // text updates are instant and free
  foodName.textContent = models[i].name;
  foodPrice.textContent = models[i].price;

  setTimeout(() => {
    viewer.src = models[i].src; // ✅ FIX
    preloadNextModels(i);
  }, 300);
}

viewer.addEventListener("load", () => {
  loader.style.display = "none";
  requestAnimationFrame(() => viewer.classList.remove("fade-out"));
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
startScreen.onclick = async () => {
  startScreen.style.display = "none";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    video.srcObject = stream;
  } catch {
    alert("Camera access is required");
  }

  showModel(index);
};

/* ---------- AR ---------- */
document.getElementById("arBtn").onclick = () => {
  viewer.activateAR();
};

