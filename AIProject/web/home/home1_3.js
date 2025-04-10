// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize tabs functionality
  initTabs();

  // Initialize navigation functionality
  initNavigation();

  // Initialize search bar functionality
  initSearchBar();
});

/**
 * Initialize tabs functionality
 */
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove("tab-active");
        btn.classList.add("tab-inactive");
      });

      // Add active class to clicked tab
      button.classList.remove("tab-inactive");
      button.classList.add("tab-active");
    });
  });
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all navigation items
      navItems.forEach((navItem) => {
        navItem.classList.remove("nav-active");
      });

      // Add active class to clicked navigation item
      item.classList.add("nav-active");
    });
  });
}

/**
 * Initialize search bar functionality
 */
function initSearchBar() {
  const searchBar = document.querySelector(".search-bar");
  const searchPlaceholder = document.querySelector(".search-placeholder");

  // Create input element for search
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "search-input";
  searchInput.style.display = "none";
  searchInput.style.border = "none";
  searchInput.style.outline = "none";
  searchInput.style.fontSize = "20px";
  searchInput.style.fontWeight = "700";
  searchInput.style.width = "100%";
  searchInput.style.backgroundColor = "transparent";

  // Insert input after placeholder
  if (searchPlaceholder && searchPlaceholder.parentNode) {
    searchPlaceholder.parentNode.insertBefore(
      searchInput,
      searchPlaceholder.nextSibling
    );
  }

  // Show input and hide placeholder on click
  if (searchBar) {
    searchBar.addEventListener("click", () => {
      if (searchPlaceholder) searchPlaceholder.style.display = "none";
      searchInput.style.display = "block";
      searchInput.focus();
    });
  }

  // Show placeholder when input is empty and loses focus
  searchInput.addEventListener("blur", () => {
    if (searchInput.value === "") {
      if (searchPlaceholder) searchPlaceholder.style.display = "block";
      searchInput.style.display = "none";
    }
  });
}
