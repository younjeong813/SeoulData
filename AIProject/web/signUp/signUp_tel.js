document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  var phoneInput = document.querySelector(".phone-input");
  var clearButton = document.querySelector(".clear-button");
  var nextButton = document.querySelector(".next-button");
  // Initially hide the clear button
  clearButton.style.display = "none";
  // Show/hide clear button based on input content
  phoneInput.addEventListener("input", function () {
    clearButton.style.display = phoneInput.value.length > 0 ? "flex" : "none";
    // Format phone number if needed
    // This is a simple example - you might want to implement more sophisticated formatting
    formatPhoneNumber();
  });
  // Clear input when clear button is clicked
  clearButton.addEventListener("click", function () {
    phoneInput.value = "";
    clearButton.style.display = "none";
    phoneInput.focus();
  });
  // Handle next button click
  nextButton.addEventListener("click", function () {
    if (validatePhoneNumber()) {
      // Submit form or navigate to next page
      console.log("Phone number submitted:", phoneInput.value);
      // Here you would typically submit the form or navigate to the next page
    } else {
      // Show validation error
      alert("유효한 전화번호를 입력해주세요.");
    }
  });
  // Format phone number as user types
  function formatPhoneNumber() {
    // This is a simple implementation
    // You might want to implement a more sophisticated formatting based on Korean phone number patterns
    var value = phoneInput.value.replace(/\D/g, ""); // Remove non-digits
    // Format as XXX-XXXX-XXXX
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else if (value.length > 7) {
      value =
        value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
    }
    // Update the input value if it's different
    if (value !== phoneInput.value) {
      phoneInput.value = value;
    }
  }
  // Validate phone number
  function validatePhoneNumber() {
    // Basic validation for Korean phone numbers
    // This is a simple implementation - you might want to use a more sophisticated validation
    var phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phoneInput.value.replace(/-/g, ""));
  }
});
