/**
 * JavaScript for Resume Preview functionality
 */

// Initialize zoom state
const zoomState = {
  currentZoom: 1,
  minZoom: 0.5,
  maxZoom: 2,
  zoomStep: 0.1,
};

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");
  const resumeImage = document.getElementById("resume-image");
  const editButton = document.getElementById("edit-button");
  const saveButton = document.getElementById("save-button");

  // Add event listeners
  if (zoomInButton && zoomOutButton && resumeImage) {
    zoomInButton.addEventListener("click", () => zoomIn(resumeImage));
    zoomOutButton.addEventListener("click", () => zoomOut(resumeImage));
  }

  if (editButton) {
    editButton.addEventListener("click", handleEdit);
  }

  if (saveButton) {
    saveButton.addEventListener("click", handleSavePDF);
  }
});

/**
 * Zoom in the resume image
 * @param {HTMLImageElement} element - The image element to zoom
 */
function zoomIn(element) {
  if (zoomState.currentZoom < zoomState.maxZoom) {
    zoomState.currentZoom += zoomState.zoomStep;
    applyZoom(element);
  }
}

/**
 * Zoom out the resume image
 * @param {HTMLImageElement} element - The image element to zoom
 */
function zoomOut(element) {
  if (zoomState.currentZoom > zoomState.minZoom) {
    zoomState.currentZoom -= zoomState.zoomStep;
    applyZoom(element);
  }
}

/**
 * Apply zoom transformation to the element
 * @param {HTMLImageElement} element - The element to apply zoom to
 */
function applyZoom(element) {
  element.style.transform = `scale(${zoomState.currentZoom})`;
}

/**
 * Handle edit button click
 */
function handleEdit() {
  // In a real application, this would navigate to the edit page
  console.log("Navigate to edit page");
  alert("편집 페이지로 이동합니다.");
}

/**
 * Handle save as PDF button click
 */
function handleSavePDF() {
  // In a real application, this would trigger PDF download
  console.log("Save as PDF");
  alert("PDF로 저장합니다.");
}
