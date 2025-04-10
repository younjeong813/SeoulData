// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const recommendedTab = document.querySelector(".recommended-tab");
  const allJobsTab = document.querySelector(".all-jobs-tab");

  // Filter buttons
  const jobFilter = document.querySelector(".job-filter");
  const regionFilter = document.querySelector(".region-filter");

  // Region selection panel
  const regionPanel = document.querySelector(".region-selection-panel");

  // Region buttons
  const regionButtons = document.querySelectorAll(".region-button");

  // Footer navigation
  const navItems = document.querySelectorAll(".nav-item");

  // Initialize UI state
  let isRegionPanelVisible = true; // Set to true initially as it's shown in the design

  // Event listeners for tabs
  recommendedTab?.addEventListener("click", () => {
    setActiveTab(recommendedTab, allJobsTab);
  });

  allJobsTab?.addEventListener("click", () => {
    setActiveTab(allJobsTab, recommendedTab);
  });

  // Event listeners for filters
  jobFilter?.addEventListener("click", () => {
    setActiveFilter(jobFilter, regionFilter);
    hideRegionPanel();
  });

  regionFilter?.addEventListener("click", () => {
    setActiveFilter(regionFilter, jobFilter);
    toggleRegionPanel();
  });

  // Event listeners for region buttons
  regionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectRegion(button);
    });
  });

  // Event listeners for footer navigation
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveNavItem(item);
    });
  });

  // Functions to handle UI interactions
  function setActiveTab(activeTab, inactiveTab) {
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");

    // Additional logic for tab switching could be added here
  }

  function setActiveFilter(activeFilter, inactiveFilter) {
    activeFilter.classList.add("active");
    inactiveFilter.classList.remove("active");
  }

  function toggleRegionPanel() {
    isRegionPanelVisible = !isRegionPanelVisible;
    regionPanel.style.display = isRegionPanelVisible ? "flex" : "none";
  }

  function hideRegionPanel() {
    isRegionPanelVisible = false;
    regionPanel.style.display = "none";
  }

  function selectRegion(button) {
    // Toggle highlighted state
    regionButtons.forEach((btn) => {
      btn.classList.remove("highlighted");
    });
    button.classList.add("highlighted");

    // Here you could add logic to update the filter text or other UI elements
    regionFilter.querySelector(".filter-text").textContent = button.textContent;

    // Optionally close the panel after selection
    // hideRegionPanel();
  }

  function setActiveNavItem(activeItem) {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    activeItem.classList.add("active");
  }

  // Initialize checkboxes
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      checkbox.style.backgroundColor =
        checkbox.style.backgroundColor === "rgb(75, 159, 248)"
          ? "#fff"
          : "#4b9ff8";
    });
  });
});
