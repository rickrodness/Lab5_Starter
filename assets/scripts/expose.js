// explore.js

// Wait for the DOM to fully load before running the init function
window.addEventListener('DOMContentLoaded', init);

// Initialize the functionality once the DOM content has loaded
function init() {
  // Retrieve elements from the DOM and assign them to variables
  const voiceSelect = document.getElementById('voice-select');
  const textArea = document.getElementById('text-to-speak');
  const pressToTalkButton = document.getElementById('press-to-talk');
  const faceImage = document.getElementById('face-image');
  const openMouthImageSrc = 'assets/images/smiling-open.png'; // Path to open mouth image
  const closedMouthImageSrc = 'assets/images/smiling.png'; // Path to closed mouth image

  // Speech synthesis setup
  let synth = window.speechSynthesis;
  let voices = [];

  // Populates the voice selection dropdown with available speech synthesis voices
  function populateVoiceList() {
    voices = synth.getVoices(); // Get available voices
    for(let i = 0; i < voices.length; i++) {
      let option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT'; // Mark the default voice
      }
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  // Initial population of voices
  populateVoiceList();
  // Re-populate voices when they are loaded or changed, browser-specific
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Event listener for the 'Press to Talk' button
  pressToTalkButton.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(textArea.value); // Create utterance from text input
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    utterance.voice = voices.find(voice => voice.name === selectedOption); // Set the voice based on selection
    faceImage.src = openMouthImageSrc; // Change face to open mouth when speaking
    utterance.onend = () => {
      faceImage.src = closedMouthImageSrc; // Revert face to closed mouth after speaking
    };
    synth.speak(utterance); // Speak out the text
  });
}
