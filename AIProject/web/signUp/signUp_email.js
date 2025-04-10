/**
 * Email Input Form JavaScript
 * Compiled from TypeScript
 */
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  var emailInputWrapper = document.querySelector(".email-input-wrapper");
  var domainDropdown = document.querySelector(".domain-dropdown");
  var nextButton = document.querySelector(".next-button");
  // Email input field placeholder text
  var emailPlaceholder = "이메일 입력";
  // Common email domains for dropdown
  var emailDomains = [
    "gmail.com",
    "naver.com",
    "daum.net",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
    "icloud.com",
  ];
  // Create actual input field
  var createEmailInput = function () {
    // Create input element
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = emailPlaceholder;
    input.className = "email-input";
    // Style the input
    input.style.border = "none";
    input.style.outline = "none";
    input.style.fontSize = "18px";
    input.style.width = "100%";
    input.style.fontFamily = "NanumGothic";
    input.style.backgroundColor = "transparent";
    input.style.position = "absolute";
    input.style.top = "50%";
    input.style.left = "10px";
    input.style.transform = "translateY(-50%)";
    input.style.zIndex = "10";
    // Position the input over the SVG
    emailInputWrapper.style.position = "relative";
    // Add input to the wrapper
    emailInputWrapper.appendChild(input);
    // Add clear button functionality
    var clearButton = emailInputWrapper.querySelector(
      'path[d="M141 27L129 39M129 27L141 39"]'
    );
    if (clearButton) {
      var _a = clearButton.parentElement;
      _a === null || _a === void 0
        ? void 0
        : _a.addEventListener("click", function (e) {
            e.stopPropagation();
            input.value = "";
            input.focus();
          });
    }
  };
  // Create domain dropdown
  var createDomainDropdown = function () {
    // Create select element
    var select = document.createElement("select");
    select.className = "domain-select";
    // Add empty option
    var emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "선택";
    emptyOption.selected = true;
    select.appendChild(emptyOption);
    // Add domain options
    emailDomains.forEach(function (domain) {
      var option = document.createElement("option");
      option.value = domain;
      option.textContent = domain;
      select.appendChild(option);
    });
    // Style the select
    select.style.border = "none";
    select.style.outline = "none";
    select.style.fontSize = "16px";
    select.style.width = "calc(100% - 30px)";
    select.style.fontFamily = "NanumGothic";
    select.style.backgroundColor = "transparent";
    select.style.appearance = "none";
    select.style.paddingLeft = "10px";
    // Add select to the dropdown
    domainDropdown.insertBefore(select, domainDropdown.firstChild);
    // Handle dropdown click
    select.addEventListener("change", function () {
      validateEmail();
    });
  };
  // Validate email
  var validateEmail = function () {
    var emailInput = document.querySelector(".email-input");
    var domainSelect = document.querySelector(".domain-select");
    var emailUsername = emailInput.value.trim();
    var emailDomain = domainSelect.value;
    var isValid = emailUsername.length > 0 && emailDomain.length > 0;
    // Enable/disable next button
    nextButton.style.opacity = isValid ? "1" : "0.5";
    nextButton.disabled = !isValid;
    return isValid;
  };
  // Handle next button click
  var handleNextButtonClick = function () {
    var emailInput = document.querySelector(".email-input");
    var domainSelect = document.querySelector(".domain-select");
    if (validateEmail()) {
      var fullEmail = ""
        .concat(emailInput.value.trim(), "@")
        .concat(domainSelect.value);
      console.log("Email submitted:", fullEmail);
      // Here you would typically submit the form or navigate to the next step
      alert("Email submitted: ".concat(fullEmail));
    }
  };
  // Initialize the form
  var initForm = function () {
    createEmailInput();
    createDomainDropdown();
    // Add event listeners
    var emailInput = document.querySelector(".email-input");
    emailInput.addEventListener("input", validateEmail);
    nextButton.addEventListener("click", handleNextButtonClick);
    // Initial validation
    validateEmail();
  };
  // Start the initialization
  initForm();
});
