// Sample data (in a real application, this would come from an API or database)
const userProfile = {
  name: "김현숙",
  gender: "female",
  birthDate: "1963.02.03",
  phoneNumber: "010-1234-5678",
  email: "hskim63@naver.com",
};

const jobPreferences = {
  position: "바리스타",
  location: "서울시",
  availableTime: "평일 가능",
  salary: "월 210 만원",
};

// Function to handle radio button selection
function handleRadioSelection(event) {
  const target = event.target;
  const radioButton = target.closest(".radio-button");

  if (radioButton) {
    // Remove selection from all radio buttons
    document.querySelectorAll(".radio-button").forEach((button) => {
      button.classList.remove("selected");
      button.innerHTML = "";
    });

    // Add selection to clicked radio button
    radioButton.classList.add("selected");
    radioButton.innerHTML = '<div class="radio-dot"></div>';

    // Update gender in the data model
    const label = radioButton.nextElementSibling?.textContent;
    if (label === "남자") {
      userProfile.gender = "male";
    } else if (label === "여자") {
      userProfile.gender = "female";
    }
  }
}

// Function to initialize event listeners
function initEventListeners() {
  // Add event listeners to radio buttons
  document.querySelectorAll(".radio-button").forEach((button) => {
    button.addEventListener("click", handleRadioSelection);
  });

  // Add event listeners to edit icons
  const editIcons = document.querySelectorAll(".edit-icon, .edit-job-icon");
  editIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Edit functionality would be implemented here");
    });
  });

  // Add event listeners to navigation items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove active class from all nav items
      document.querySelectorAll(".nav-item").forEach((navItem) => {
        navItem.classList.remove("active");
      });

      // Add active class to clicked nav item
      event.currentTarget.classList.add("active");

      // In a real application, this would navigate to the corresponding page
      const navLabel =
        event.currentTarget.querySelector(".nav-label")?.textContent;
      console.log(`Navigating to: ${navLabel}`);
    });
  });
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  console.log("User Profile Page initialized");
});
