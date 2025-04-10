/**
 * TypeScript functionality for the Resume/CV page
 */
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  var pdfSaveButton = document.querySelector(".pdf-save-btn");
  var createResumeButton = document.querySelector(".create-resume-btn");
  var navItems = document.querySelectorAll(".nav-item");
  // Add event listeners
  if (pdfSaveButton) {
    pdfSaveButton.addEventListener("click", handlePdfSave);
  }
  if (createResumeButton) {
    createResumeButton.addEventListener("click", handleCreateResume);
  }
  // Add event listeners to navigation items
  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      return handleNavigation(e, item);
    });
  });
});
/**
 * Handle PDF save button click
 */
function handlePdfSave(event) {
  event.preventDefault();
  console.log("PDF 저장 버튼이 클릭되었습니다.");
  // Implement PDF generation and download functionality here
  alert("PDF 저장 기능이 구현될 예정입니다.");
}
/**
 * Handle create resume button click
 */
function handleCreateResume(event) {
  event.preventDefault();
  console.log("간편 이력서 생성 버튼이 클릭되었습니다.");
  // Implement resume creation functionality here
  alert("간편 이력서 생성 기능이 구현될 예정입니다.");
}
/**
 * Handle navigation item click
 */
function handleNavigation(event, item) {
  var _a;
  event.preventDefault();
  // Get all nav items and remove active class
  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function (navItem) {
    navItem.classList.remove("active");
  });
  // Add active class to clicked item
  item.classList.add("active");
  // Get the text content of the navigation item
  var navText =
    (_a = item.querySelector(".nav-text")) === null || _a === void 0
      ? void 0
      : _a.textContent;
  console.log(
    "".concat(
      navText,
      " \uBA54\uB274\uAC00 \uD074\uB9AD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
    )
  );
  // Implement navigation functionality here
  // This would typically navigate to different pages or show different content
}
/**
 * Compile TypeScript to JavaScript
 * Run: tsc script.ts
 */
