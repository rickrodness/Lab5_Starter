// This script enhances the web page by using the Web Speech API
// to convert text to spoken words
let synth;

// Initialize on DOM content loaded
window.addEventListener("DOMContentLoaded", setup);

function setup() {
  synth = window.speechSynthesis;  // Assign the speech synthesis interface to 'synth'
  configureVoiceDropdown();        // Set up the voice selection dropdown
  setupSpeechButton();             // Set up the speech trigger button
  populateVoiceList();             // Initially populate the voice list if already loaded
}

// Configures the dropdown for voice selection
function configureVoiceDropdown() {
  let dropdown = document.getElementById("voice-select");
  // Set up event listener for when available voices change
  synth.onvoiceschanged = populateVoiceList;

  function populateVoiceList() {
    let availableVoices = synth.getVoices();
    if (!availableVoices.length) {
      console.error('No voices available.'); // Log if no voices are found
      return;
    }
    dropdown.innerHTML = ''; // Clear the dropdown before populating

    // Populate the dropdown with voice options
    availableVoices.forEach(voice => {
      const voiceOption = document.createElement("option");
      voiceOption.textContent = `${voice.name} (${voice.lang})${voice.default ? ' — DEFAULT' : ''}`;
      voiceOption.setAttribute("data-lang", voice.lang);
      voiceOption.setAttribute("data-name", voice.name);
      dropdown.appendChild(voiceOption);
    });
  }
}

// Sets up the button that triggers speech synthesis
function setupSpeechButton() {
  let speechButton = document.querySelector("button");
  speechButton.addEventListener("click", () => {
    let selectedVoice = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
    let textToSpeak = document.getElementById("text-to-speak").value;
    speakText(textToSpeak, selectedVoice);  // Trigger the speech synthesis
  });
}

// Speaks the text using the selected voice
function speakText(text, selectedVoiceName) {
  let utterance = new SpeechSynthesisUtterance(text);
  let facialExpression = document.querySelector("img");

  // Change the image when speaking starts/ends
  utterance.addEventListener("start", () => {
    facialExpression.src = "assets/images/smiling-open.png";
  });
  utterance.addEventListener("end", () => {
    facialExpression.src = "assets/images/smiling.png";
  });

  let voices = synth.getVoices();  // Retrieve all available voices
  let selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
  if (selectedVoice) {
    utterance.voice = selectedVoice;  // Set the voice to the selected voice
  }

  synth.speak(utterance);  // Start speaking
}

