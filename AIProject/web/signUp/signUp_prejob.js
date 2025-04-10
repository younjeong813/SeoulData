/**
 * Job Search Input Component JavaScript
 */
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  var jobInput = document.querySelector(".job-input");
  var clearButton = document.querySelector(".clear-button");
  var submitButton = document.querySelector(".submit-button");
  // Function to clear input field
  var clearInput = function () {
    if (jobInput) {
      jobInput.value = "";
      jobInput.focus();
    }
  };
  // Function to handle form submission
  var handleSubmit = function () {
    if (jobInput && jobInput.value.trim()) {
      // Here you would typically send the data to a server
      console.log("Submitted job search:", jobInput.value);
      // For demo purposes, show an alert
      alert("\uAC80\uC0C9\uC5B4: ".concat(jobInput.value));
    } else {
      // If input is empty, focus on it
      if (jobInput) {
        jobInput.focus();
      }
    }
  };
  // Add event listeners
  if (clearButton) {
    clearButton.addEventListener("click", clearInput);
  }
  if (submitButton) {
    submitButton.addEventListener("click", handleSubmit);
  }
  // Add event listener for Enter key on input
  if (jobInput) {
    jobInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        handleSubmit();
      }
    });
  }
  // Initially hide the clear button (show only when input has text)
  if (clearButton) {
    clearButton.style.display = "none";
  }
  // Show/hide clear button based on input content
  if (jobInput) {
    jobInput.addEventListener("input", function () {
      if (clearButton) {
        clearButton.style.display = jobInput.value ? "flex" : "none";
      }
    });
  }
});
