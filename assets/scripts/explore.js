// explore.js
// this script enhances the web page by using the Web Speech API
// to convert text to spoken words

window.addEventListener("DOMContentLoaded", initialize);

// initialize the main functions after the page is fully loaded
function initialize() {
  speechSynthesisEngine = window.speechSynthesis;
  setupVoiceSelection();
  setupSpeechTriggerButton();
}

// setup the dropdown menu for voice selection with dynamically loaded voice options
function setupVoiceSelection() {
  const voiceDropdown = document.getElementById("voice-select");
  speechSynthesisEngine.onvoiceschanged = populateVoices;

  // populate the voice select dropdown with available speech synthesis voices
  function populateVoices() {
    const voices = speechSynthesisEngine.getVoices();
    voiceDropdown.innerHTML = ''; // clear existing options
    voices.forEach(voice => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' — DEFAULT' : ''}`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceDropdown.appendChild(option);
    });
  }
}

// setup the button that triggers speech synthesis
function setupSpeechTriggerButton() {
  const talkButton = document.querySelector("button"); 
  talkButton.addEventListener("click", () => {
    const selectedVoiceName = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
    const textToSpeak = document.getElementById("text-to-speak").value;
    speakText(textToSpeak, selectedVoiceName);
  });
}

// function to speak text using the selected voice
function speakText(text, voiceName) {
  const utterance = new SpeechSynthesisUtterance(text);
  const faceImage = document.querySelector("img"); 

  // change face image to open mouth when speaking starts
  utterance.addEventListener("start", () => {
    faceImage.src = "assets/images/smiling-open.png";
  });
  // revert face image to smiling when speaking ends
  utterance.addEventListener("end", () => {
    faceImage.src = "assets/images/smiling.png";
  });

  const voices = speechSynthesisEngine.getVoices();
  const selectedVoice = voices.find(voice => voice.name === voiceName);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  speechSynthesisEngine.speak(utterance);
}

}
