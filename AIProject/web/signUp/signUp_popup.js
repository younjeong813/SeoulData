/**
 * Password Creation Screen JavaScript
 */

// DOM Elements
var passwordFields = document.querySelectorAll(".password-field");
var clearPasswordBtn = document.getElementById("clearPassword");
var clearConfirmPasswordBtn = document.getElementById("clearConfirmPassword");
var submitButton = document.getElementById("submitButton");
var errorModal = document.getElementById("errorModal");
var confirmButton = document.getElementById("confirmButton");

// Add password input fields programmatically
passwordFields.forEach(function (field, index) {
  var input = document.createElement("input");
  input.type = "password";
  input.className = "password-input";
  input.id = index === 0 ? "passwordInput" : "confirmPasswordInput";
  input.placeholder = index === 0 ? "비밀번호 입력" : "비밀번호 다시 입력";
  input.style.position = "absolute";
  input.style.top = "19px";
  input.style.left = "27px";
  input.style.width = "calc(100% - 80px)";
  input.style.height = "30px";
  input.style.border = "none";
  input.style.background = "transparent";
  input.style.fontSize = "18px";
  input.style.color = "#212121";
  input.style.outline = "none";
  input.style.zIndex = "1";

  // Add the input after the label
  var label = field.querySelector(".password-label");
  if (label) {
    // Hide label when input is focused
    input.addEventListener("focus", function () {
      label.style.opacity = "0";
    });

    input.addEventListener("blur", function () {
      if (!input.value) {
        label.style.opacity = "1";
      }
    });

    field.appendChild(input);
  }
});

// Get the password inputs after they've been created
var passwordInput = document.getElementById("passwordInput");
var confirmPasswordInput = document.getElementById("confirmPasswordInput");

// Clear button functionality
clearPasswordBtn.addEventListener("click", function () {
  passwordInput.value = "";
  var label = passwordInput.previousElementSibling;
  label.style.opacity = "1";
  passwordInput.focus();
});

clearConfirmPasswordBtn.addEventListener("click", function () {
  confirmPasswordInput.value = "";
  var label = confirmPasswordInput.previousElementSibling;
  label.style.opacity = "1";
  confirmPasswordInput.focus();
});

// Hide clear buttons initially
clearPasswordBtn.style.display = "none";
clearConfirmPasswordBtn.style.display = "none";

// Show/hide clear buttons based on input content
passwordInput.addEventListener("input", function () {
  clearPasswordBtn.style.display = passwordInput.value ? "block" : "none";
});

confirmPasswordInput.addEventListener("input", function () {
  clearConfirmPasswordBtn.style.display = confirmPasswordInput.value
    ? "block"
    : "none";
});

// Submit button functionality
submitButton.addEventListener("click", function () {
  validatePasswords();
});

// Confirm button in error modal
confirmButton.addEventListener("click", function () {
  errorModal.classList.add("hidden");
});

// Hide error modal initially
errorModal.classList.add("hidden");

// Password validation function
function validatePasswords() {
  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  // Check if passwords are at least 4 characters
  if (password.length < 4) {
    showError();
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    showError();
    return;
  }

  // If validation passes, proceed with form submission
  // This would typically involve an API call or form submission
  console.log("Password validation successful");
  // Example: form.submit();
}

// Show error modal
function showError() {
  errorModal.classList.remove("hidden");
}

// Allow pressing Enter to submit
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validatePasswords();
  }
});
