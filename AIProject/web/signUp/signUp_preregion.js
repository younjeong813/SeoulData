/**
 * JavaScript functionality for the job search interface
 * (Compiled from TypeScript)
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  var inputField = document.querySelector(".input-field");
  var clearButton = document.querySelector(".close-icon");
  var nextButton = document.querySelector(".next-button");

  // Make input field editable
  if (inputField) {
    inputField.setAttribute("contenteditable", "true");
    inputField.setAttribute("role", "textbox");
    inputField.setAttribute("aria-label", "희망 근무 지역");

    // Focus the input field when clicked
    inputField.addEventListener("click", function () {
      inputField.focus();
    });
  }

  // Clear input when clear button is clicked
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      if (inputField) {
        inputField.textContent = "";
        inputField.focus();
      }
    });

    // Hide clear button when input is empty
    var toggleClearButton = function () {
      if (inputField && clearButton) {
        if (inputField.textContent && inputField.textContent.trim() !== "") {
          clearButton.style.display = "block";
        } else {
          clearButton.style.display = "none";
        }
      }
    };

    // Initially hide the clear button
    toggleClearButton();

    // Show/hide clear button based on input content
    if (inputField) {
      inputField.addEventListener("input", toggleClearButton);
    }
  }

  // Handle next button click
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      var location = (
        inputField === null || inputField === void 0
          ? void 0
          : inputField.textContent
      )
        ? inputField.textContent.trim()
        : "";
      if (location) {
        console.log("Searching for jobs in:", location);
        // Here you would typically submit the form or navigate to the next step
        alert("Searching for jobs in: ".concat(location));
      } else {
        alert("Please enter a location");
        if (inputField) {
          inputField.focus();
        }
      }
    });
  }
});
