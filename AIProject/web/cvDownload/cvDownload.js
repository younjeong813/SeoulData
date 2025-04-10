/**
 * CV Download Component JavaScript
 * Compiled from TypeScript for browser compatibility
 */

class CvDownloadComponent {
  constructor(options = {}) {
    this.options = options;

    // Get DOM elements
    this.editButton = document.querySelector(".edit-button");
    this.saveButton = document.querySelector(".save-button");
    this.prevButton = document.querySelector(".nav-button:first-child");
    this.nextButton = document.querySelector(".nav-button:last-child");

    // Initialize event listeners
    this.initEventListeners();
  }

  initEventListeners() {
    // Edit button click handler
    if (this.editButton) {
      this.editButton.addEventListener("click", () => {
        console.log("Edit button clicked");
        if (this.options.onEdit) {
          this.options.onEdit();
        } else {
          this.handleEdit();
        }
      });
    }

    // Save button click handler
    if (this.saveButton) {
      this.saveButton.addEventListener("click", () => {
        console.log("Save button clicked");
        if (this.options.onSave) {
          this.options.onSave();
        } else {
          this.handleSave();
        }
      });
    }

    // Navigation buttons click handlers
    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => {
        console.log("Previous button clicked");
        if (this.options.onNavigate) {
          this.options.onNavigate("prev");
        } else {
          this.handleNavigate("prev");
        }
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => {
        console.log("Next button clicked");
        if (this.options.onNavigate) {
          this.options.onNavigate("next");
        } else {
          this.handleNavigate("next");
        }
      });
    }
  }

  handleEdit() {
    // Default edit functionality
    alert("편집 기능이 활성화되었습니다.");
    // Here you would typically redirect to an edit page or open an edit modal
  }

  handleSave() {
    // Default save functionality
    alert("PDF로 저장 중입니다...");
    // Here you would typically trigger a PDF generation and download

    // Simulate PDF download after a short delay
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "#"; // In a real implementation, this would be the PDF URL
      link.download = "이력서.pdf";
      link.click();
    }, 1000);
  }

  handleNavigate(direction) {
    // Default navigation functionality
    if (direction === "prev") {
      alert("이전 템플릿으로 이동합니다.");
    } else {
      alert("다음 템플릿으로 이동합니다.");
    }
    // Here you would typically load a different CV template
  }

  // Public method to update the preview text
  updatePreviewText(text) {
    const highlightText = document.querySelector(".highlight-text");
    if (highlightText) {
      highlightText.textContent = text;
    }
  }

  // Public method to update the info text
  updateInfoText(text) {
    const infoText = document.querySelector(".info-text");
    if (infoText) {
      infoText.textContent = text;
    }
  }
}

// Initialize the component when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create an instance of the CV Download component
  const cvDownload = new CvDownloadComponent({
    onEdit: () => {
      console.log("Custom edit handler");
      // Custom edit functionality can be implemented here
    },
    onSave: () => {
      console.log("Custom save handler");
      // Custom save functionality can be implemented here
    },
    onNavigate: (direction) => {
      console.log(`Custom navigate handler: ${direction}`);
      // Custom navigation functionality can be implemented here
    },
  });

  // Example of updating the preview text programmatically
  // Uncomment to test
  // setTimeout(() => {
  //   cvDownload.updatePreviewText('업데이트된 텍스트 예시');
  //   cvDownload.updateInfoText('파일이 성공적으로 생성되었습니다');
  // }, 3000);
});
