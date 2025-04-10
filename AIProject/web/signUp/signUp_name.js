/**
 * JavaScript implementation for the Korean Onboarding Form
 * (Compiled from TypeScript)
 */

// Class to handle the onboarding form functionality
class OnboardingForm {
  constructor() {
    this.hasText = false;
    // Initialize elements
    this.elements = {
      form: document.getElementById("nameForm"),
      inputContainer: document.querySelector(".input-container"),
      inputPlaceholder: document.querySelector(".input-placeholder"),
      clearButton: document.getElementById("clearButton"),
      submitButton: document.getElementById("submitButton"),
    };
    // Create and append the actual input element
    this.nameInput = document.createElement("input");
    this.nameInput.type = "text";
    this.nameInput.id = "nameInput";
    this.nameInput.name = "name";
    this.elements.inputContainer.appendChild(this.nameInput);
    // Initialize event listeners
    this.initEventListeners();
  }

  initEventListeners() {
    // Input placeholder click event
    this.elements.inputPlaceholder.addEventListener("click", () => {
      this.focusInput();
    });
    // Input container click event
    this.elements.inputContainer.addEventListener("click", () => {
      this.focusInput();
    });
    // Input focus event
    this.nameInput.addEventListener("focus", () => {
      this.elements.inputContainer.classList.add("active");
    });
    // Input blur event
    this.nameInput.addEventListener("blur", () => {
      this.elements.inputContainer.classList.remove("active");
      this.updateInputState();
    });
    // Input change event
    this.nameInput.addEventListener("input", () => {
      this.updateInputState();
    });
    // Clear button click event
    this.elements.clearButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.clearInput();
    });
    // Form submit event
    this.elements.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }

  focusInput() {
    this.nameInput.focus();
  }

  updateInputState() {
    const hasValue = this.nameInput.value.trim() !== "";
    this.hasText = hasValue;

    if (hasValue) {
      this.elements.inputContainer.classList.add("has-text");
      this.elements.inputPlaceholder.style.display = "none";
    } else {
      this.elements.inputContainer.classList.remove("has-text");
      this.elements.inputPlaceholder.style.display = "block";
    }
  }

  clearInput() {
    this.nameInput.value = "";
    this.updateInputState();
    this.focusInput();
  }

  submitForm() {
    if (!this.hasText) {
      // If no text, focus the input
      this.focusInput();
      return;
    }
    // Here you would typically send the data to a server
    const userName = this.nameInput.value.trim();
    console.log("Form submitted with name:", userName);

    // For demonstration purposes, show an alert
    alert(`안녕하세요, ${userName}님! Navi에 오신 것을 환영합니다.`);

    // You could redirect to the next page or perform other actions here
  }
}

// Initialize the form when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new OnboardingForm();
});
