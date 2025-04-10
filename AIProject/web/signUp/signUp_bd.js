/**
 * JavaScript functionality for the birth date input page
 */

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  var nextButton = document.querySelector(".next-button");
  if (nextButton) {
    nextButton.addEventListener("click", handleNextButtonClick);
  }
  // Add event listeners for future form inputs
  setupInputListeners();
});

/**
 * Sets up listeners for input fields when they're implemented
 */
function setupInputListeners() {
  // This would be used when actual input fields are implemented
  // For now, this is a placeholder for future functionality
  // Example implementation:
  // const birthdateInput = document.querySelector('.birthdate-input');
  // if (birthdateInput) {
  //   birthdateInput.addEventListener('input', validateBirthDate);
  // }
}

/**
 * Validates a birth date input
 * @param {string} birthdate - The birth date string in YYYYMMDD format
 * @returns {Object} Validation result with status and optional message
 */
function validateBirthDate(birthdate) {
  // Remove any non-digit characters
  var cleanBirthdate = birthdate.replace(/\D/g, "");

  // Check if the input has the correct length
  if (cleanBirthdate.length !== 8) {
    return {
      isValid: false,
      message: "생년월일은 8자리로 입력해주세요 (YYYYMMDD)",
    };
  }

  // Extract year, month, and day
  var year = parseInt(cleanBirthdate.substring(0, 4), 10);
  var month = parseInt(cleanBirthdate.substring(4, 6), 10);
  var day = parseInt(cleanBirthdate.substring(6, 8), 10);

  // Check if the date is valid
  var date = new Date(year, month - 1, day);
  var isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValidDate) {
    return {
      isValid: false,
      message: "유효하지 않은 날짜입니다",
    };
  }

  // Check if the date is in the past
  var today = new Date();
  if (date > today) {
    return {
      isValid: false,
      message: "미래 날짜는 입력할 수 없습니다",
    };
  }

  return { isValid: true };
}

/**
 * Validates the verification digit (first digit of the second part of Korean ID)
 * @param {string} digit - The verification digit
 * @returns {boolean} Whether the digit is valid
 */
function validateVerificationDigit(digit) {
  // In Korean ID system, this digit represents gender and century of birth
  // 1: Male born in 1900s, 2: Female born in 1900s
  // 3: Male born in 2000s, 4: Female born in 2000s
  var validDigits = ["1", "2", "3", "4"];
  return validDigits.includes(digit);
}

/**
 * Handles the click event on the next button
 */
function handleNextButtonClick() {
  // This would validate the input and proceed to the next step
  // For now, just log a message
  console.log("Next button clicked");

  // Example implementation for when actual form is in place:
  // const birthdateInput = document.querySelector('.birthdate-input');
  // const verificationInput = document.querySelector('.verification-input');
  //
  // if (birthdateInput && verificationInput) {
  //   const birthdateValidation = validateBirthDate(birthdateInput.value);
  //   const isVerificationValid = validateVerificationDigit(verificationInput.value);
  //
  //   if (birthdateValidation.isValid && isVerificationValid) {
  //     // Proceed to next step
  //     window.location.href = 'next-page.html';
  //   } else {
  //     // Show error message
  //     alert(birthdateValidation.message || '입력 정보를 확인해주세요');
  //   }
  // }
}
