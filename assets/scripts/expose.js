// expose.js

// Listen for the DOMContentLoaded event to ensure the HTML is fully loaded before executing the script
window.addEventListener('DOMContentLoaded', init);

// Initialization function that sets up the necessary event listeners and default states
function init() {
  // Grab HTML elements by their IDs and store them in variables
  const imgElement = document.getElementById('horn-image'); // Image element for the horn
  const audioElement = document.getElementById('horn-sound'); // Audio element for playing horn sounds
  const volumeIcon = document.getElementById('volume-icon'); // Icon representing the volume level
  const volumeSlider = document.getElementById('volume-slider'); // Slider input for adjusting volume
  const hornSelect = document.getElementById('horn-select'); // Dropdown for selecting different horns
  const playButton = document.getElementById('play-sound'); // Button to trigger sound playback

  // Event listener for horn selection change
  hornSelect.addEventListener('change', () => {
    const hornType = hornSelect.value; // Get the selected horn type from the dropdown
    imgElement.src = `assets/images/${hornType}-horn.svg`; // Update the image based on selected horn
    audioElement.src = `assets/audio/${hornType}-horn.mp3`; // Set the appropriate sound file
  });

  // Event listener for volume slider adjustment
  volumeSlider.addEventListener('input', () => {
    const volume = parseInt(volumeSlider.value); // Parse the volume value from the slider input
    audioElement.volume = volume / 100; // Convert the slider value to a decimal for the audio volume

    // Update the volume icon based on the slider's value
    if (volume === 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg'; // Mute icon
    } else if (volume < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg'; // Low volume icon
    } else if (volume < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg'; // Medium volume icon
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg'; // High volume icon
    }
  });

  // Event listener for playing the horn sound
  playButton.addEventListener('click', () => {
    audioElement.play(); // Play the audio file set on the audio element
    if (hornSelect.value === 'party') {
      const jsConfetti = new JSConfetti(); 
      jsConfetti.addConfetti(); 
    }
  });
}