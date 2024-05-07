// expose.js
// built using a modular design where the script is
// structured into 3 functions, each deal with a specific
// aspect of the pages functionality. 

window.addEventListener("DOMContentLoaded", () => init());
// Event Listener: handles user interactions with specific html elements

// hornConfigs object is a central repo for the configurations
// of different horns, easy to access and modify
const hornConfigs = {
  "air-horn": {
    imagePath: "assets/images/air-horn.svg",
    soundPath: "assets/audio/air-horn.mp3",
    confetti: false,
  },
  "car-horn": {
    imagePath: "assets/images/car-horn.svg",
    soundPath: "assets/audio/car-horn.mp3",
    confetti: false,
  },
  "party-horn": {
    imagePath: "assets/images/party-horn.svg",
    soundPath: "assets/audio/party-horn.mp3",
    confetti: true,
  },
};
// instatiate JSConfetti, for party horn
const confetti = new JSConfetti();

// intitialize all components when the page loads
function init() {
  configureHornSelector();
  configureVolumeControl();
  setupSoundPlayback();
}
// function to trigger confetti
function triggerConfetti(){
  confetti.addConfetti();
}
// horn select drop down menu
// adjusts image, audio, and Y/N confetti
function configureHornSelector() {
  const selector = document.getElementById("horn-select");
  const imageDisplay = document.querySelector("img");
  const audioPlayer = document.querySelector("audio");

  selector.addEventListener("change", function(event) {
    const selectedHorn = hornConfigs[event.target.value];
    imageDisplay.src = selectedHorn.imagePath;
    audioPlayer.src = selectedHorn.soundPath;

    // manage confetti trigger
    const button = document.querySelector("button");
    if (selectedHorn.confetti) {
      button.addEventListener("click", triggerConfetti, { once: true });
    } else {
      button.removeEventListener("click", triggerConfetti);
    }
  });
}
// volume control slider
function configureVolumeControl() {
  const volumeControl = document.getElementById("volume");
  const volumeIcon = document.querySelector("#volume-controls img");
  const audio = document.querySelector("audio");

  volumeControl.addEventListener("input", function(event) {
    const vol = parseInt(event.target.value);
    audio.volume = vol / 100;

    // Update volume icon
    // From 1 to < 33 volume the first volume level should be displayed
    // From 33 to < 67 volume the second volume level should be displayed
    // From 67 and up the third volume level should be displayed
    let iconPath = "assets/icons/";
    if (vol === 0) iconPath += "volume-level-0.svg"; // mute
    else if (vol < 33) iconPath += "volume-level-1.svg";
    else if (vol < 67) iconPath += "volume-level-2.svg";
    else iconPath += "volume-level-3.svg";
    volumeIcon.src = iconPath;
  });
}
// play button to play horn when clicked
function setupSoundPlayback() {
  const playButton = document.querySelector("button");
  const soundPlayer = document.querySelector("audio");

  playButton.addEventListener("click", () => {
    soundPlayer.play();
  });
}
