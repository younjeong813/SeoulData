// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("tab--active"));

      // Add active class to clicked tab
      tab.classList.add("tab--active");

      // If it's the "All Jobs" tab, make it blue
      if (tab.classList.contains("tab--all")) {
        tab.style.backgroundColor = "rgba(75, 159, 248, 1)";
        const tabText = tab.querySelector(".tab-text");
        if (tabText) tabText.style.color = "rgba(255, 255, 255, 1)";
      } else {
        // Reset the "All Jobs" tab
        const allJobsTab = document.querySelector(".tab--all");
        if (allJobsTab) {
          allJobsTab.style.backgroundColor = "rgba(255, 255, 255, 1)";
          const allTabText = allJobsTab.querySelector(".tab-text");
          if (allTabText) allTabText.style.color = "rgba(90, 90, 90, 1)";
        }
      }
    });
  });

  // Filter button functionality
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Toggle active class
      button.classList.toggle("filter-button--active");

      // Update border and text color
      if (button.classList.contains("filter-button--active")) {
        button.style.borderColor = "rgba(75, 159, 248, 1)";
        button.style.color = "rgba(75, 159, 248, 1)";
      } else {
        button.style.borderColor = "rgba(217, 217, 217, 1)";
        button.style.color = "rgba(134, 134, 134, 1)";
      }
    });
  });

  // Category selection functionality
  const categoryItems = document.querySelectorAll(".category-item");

  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Toggle selected state
      item.classList.toggle("category-selected");

      if (item.classList.contains("category-selected")) {
        item.style.color = "rgba(75, 159, 248, 1)";
        item.style.fontWeight = "700";
      } else {
        item.style.color = "rgba(33, 33, 33, 1)";
        item.style.fontWeight = "400";
      }
    });
  });

  // Search functionality
  const searchBar = document.querySelector(".search-bar");
  const searchPlaceholder = document.querySelector(".search-placeholder");

  if (searchBar && searchPlaceholder) {
    searchBar.addEventListener("click", () => {
      // Create input element
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "공고를 검색해주세요.";
      input.style.border = "none";
      input.style.outline = "none";
      input.style.fontSize = "20px";
      input.style.fontWeight = "700";
      input.style.width = "100%";
      input.style.fontFamily =
        "NanumGothic, -apple-system, Roboto, Helvetica, sans-serif";

      // Replace placeholder with input
      searchPlaceholder.replaceWith(input);
      input.focus();

      // Handle blur event
      input.addEventListener("blur", () => {
        if (!input.value) {
          input.replaceWith(searchPlaceholder);
        }
      });
    });
  }

  // Footer navigation functionality
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all items
      navItems.forEach((navItem) =>
        navItem.classList.remove("nav-item--active")
      );

      // Add active class to clicked item
      item.classList.add("nav-item--active");
    });
  });
});
