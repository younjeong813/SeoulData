/**
 * Job Preference Selection Screen JavaScript
 * Compiled from TypeScript
 */

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
  // Close icon functionality
  var closeIcon = document.querySelector(".close-icon");
  if (closeIcon) {
    closeIcon.addEventListener("click", function () {
      clearInput();
    });
  }

  // Next button functionality
  var nextButton = document.querySelector(".next-button");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      handleNextButtonClick();
    });
  }

  // Make input field clickable
  var inputField = document.querySelector(".input-field");
  if (inputField) {
    inputField.addEventListener("click", function () {
      showPreferenceOptions();
    });
  }
}

/**
 * Clear the input field
 */
function clearInput() {
  console.log("Input cleared");
  // In a real implementation, this would clear the selected preference
}

/**
 * Handle next button click
 */
function handleNextButtonClick() {
  console.log("Next button clicked");
  // In a real implementation, this would navigate to the next screen
  // or submit the selected preference
}

/**
 * Show preference options
 */
function showPreferenceOptions() {
  console.log("Showing preference options");
  // In a real implementation, this would show a dropdown or modal
  // with job preference options
}
