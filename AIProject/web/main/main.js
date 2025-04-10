/**
 * TypeScript functionality for Navi landing page
 */
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the start button element
  var startButton = document.getElementById("startButton");
  // Add click event listener to the start button
  if (startButton) {
    startButton.addEventListener("click", handleStartButtonClick);
  }
  /**
   * Handle the start button click event
   * @param event - The click event
   */
  function handleStartButtonClick(event) {
    event.preventDefault();
    // In a real application, this would navigate to the resume creation page
    // or open a registration/login modal
    alert("이력서 작성을 시작합니다!");
    // Example of what might happen in a real application:
    // window.location.href = '/resume-builder';
  }
});
// Compile this TypeScript file to JavaScript using:
// tsc script.ts
