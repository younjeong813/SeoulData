// This is the compiled JavaScript from the TypeScript file
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  var passwordForm = document.querySelector(".password-form");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");
  var clearButtons = document.querySelectorAll(".clear-button");
  var submitButton = document.querySelector(".submit-button");
  // Minimum password length
  var MIN_PASSWORD_LENGTH = 4;
  // Add event listeners to clear buttons
  clearButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var inputField = index === 0 ? passwordInput : confirmPasswordInput;
      inputField.value = "";
      inputField.focus();
    });
  });
  // Validate password
  function validatePassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
  }
  // Check if passwords match
  function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword && password !== "";
  }
  // Show validation error
  function showError(input, message) {
    var _a, _b;
    // Remove any existing error message
    var existingError =
      (_a = input.parentElement) === null || _a === void 0
        ? void 0
        : _a.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    // Create and append error message
    var errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
    errorElement.style.position = "absolute";
    errorElement.style.bottom = "-20px";
    errorElement.style.left = "0";
    errorElement.textContent = message;
    (_b = input.parentElement) === null || _b === void 0
      ? void 0
      : _b.appendChild(errorElement);
    input.style.borderColor = "red";
  }
  // Clear validation error
  function clearError(input) {
    var _a;
    var errorElement =
      (_a = input.parentElement) === null || _a === void 0
        ? void 0
        : _a.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
    input.style.borderColor = "#ffe376";
  }
  // Handle form submission
  passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    // Clear previous errors
    clearError(passwordInput);
    clearError(confirmPasswordInput);
    // Validate password length
    if (!validatePassword(password)) {
      showError(passwordInput, "비밀번호는 4자리 이상으로 해주세요.");
      return;
    }
    // Validate password match
    if (!passwordsMatch(password, confirmPassword)) {
      showError(confirmPasswordInput, "비밀번호가 일치하지 않습니다.");
      return;
    }
    // If validation passes, proceed with form submission
    console.log("Password validation successful!");
    // Here you would typically submit the form or navigate to the next page
    alert("비밀번호가 성공적으로 생성되었습니다!");
  });
  // Add input event listeners to clear errors when user types
  passwordInput.addEventListener("input", function () {
    clearError(passwordInput);
  });
  confirmPasswordInput.addEventListener("input", function () {
    clearError(confirmPasswordInput);
  });
});
