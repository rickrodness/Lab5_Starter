// explore.js
// this script converts text to spoken words

let synth;

// Initialize on DOM content loaded
window.addEventListener("DOMContentLoaded", setup);

function setup() {
  speechSynthsis = window.speechSynthesis;  // assign speech synthesis interface to 'speechSynthesis'
  configureVoiceDropdown();                // voice selection dropdown
  setupSpeechButton();                     // speech trigger button
}

// dropdown for voice selection
function configureVoiceDropdown() {
  let dropdown = document.getElementById("voice-select");
  synth.addEventListener("voiceschanged", () => {
    let availableVoices = synth.getVoices();
    dropdown.innerHTML = ''; // clear dropdown

    // populate the dropdown with different voice options
    availableVoices.forEach(voice => {
      const voiceOption = document.createElement("option");
      voiceOption.textContent = `${voice.name} (${voice.lang})${voice.default ? ' — DEFAULT' : ''}`;
      voiceOption.setAttribute("data-lang", voice.lang);
      voiceOption.setAttribute("data-name", voice.name);
      dropdown.appendChild(voiceOption);
    });
  });
}

// button that triggers speech synthesis
function setupSpeechButton() {
  let speechButton = document.querySelector("button"); 
  speechButton.addEventListener("click", () => {
    let selectedVoice = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
    let textToSpeak = document.getElementById("text-to-speak").value;
    speakText(textToSpeak, selectedVoice);  // Play the text as speech
  });
}

// speak text using the selected voice
function speakText(text, selectedVoiceName) {
  let utterance = new SpeechSynthesisUtterance(text);
  let facialExpression = document.querySelector("img");

  // change the image when speaking starts/ends
  utterance.addEventListener("start", () => {
    facialExpression.src = "assets/images/smiling-open.png";
  });
  utterance.addEventListener("end", () => {
    facialExpression.src = "assets/images/smiling.png";
  });

  let voices = synth.getVoices();  // get all available voices
  let selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
  if (selectedVoice) {
    utterance.voice = selectedVoice;  // set the voice to selected voice
  }

  synth.speak(utterance);  // start speaking
}
