const startScreen = document.getElementById("start");
const video = document.getElementById("camera");
const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");

// 🔗 YOUR R2 MODEL URLS (replace these)
const models = [
  "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/Chicken_Strips.glb",
  "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/Cookie.glb",
  "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/CupCake.glb",
  "https://pub-2df5d5369349481bbb31738813eaa799.r2.dev/sushi.glb"
];

let index = 0;
viewer.src = models[index];

// SHOW loader when model starts loading
viewer.addEventListener("loadstart", () => {
  loader.style.display = "flex";
});

// HIDE loader when model finishes loading
viewer.addEventListener("load", () => {
  loader.style.display = "none";
});

document.getElementById("next").onclick = () => {
  loader.style.display = "flex";
  index = (index + 1) % models.length;
  viewer.src = models[index];
};

document.getElementById("prev").onclick = () => {
  loader.style.display = "flex";
  index = (index - 1 + models.length) % models.length;
  viewer.src = models[index];
};

// START CAMERA (iOS compatible)
startScreen.onclick = async () => {
  startScreen.style.display = "none";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = stream;
  } catch (err) {
    alert("Camera access is required for HD Menu");
    console.error(err);
  }
};

// MODEL NAVIGATION
document.getElementById("next").onclick = () => {
  index = (index + 1) % models.length;
  viewer.src = models[index];
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + models.length) % models.length;
  viewer.src = models[index];
};

// AR BUTTON
document.getElementById("arBtn").onclick = () => {
  viewer.activateAR();
};