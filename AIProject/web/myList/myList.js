/**
 * JavaScript functionality for the job listings page
 * Compiled from TypeScript
 */

// DOM Elements
var filterTags = document.querySelectorAll(".filter-tag");
var refreshIcon = document.querySelector(".refresh-icon");
var sortArrows = document.querySelector(".sort-arrows");
var jobCards = document.querySelectorAll(".job-card");

// Sample data (in a real app, this would come from an API)
var jobListings = [
  {
    id: "1",
    title: "방문간호사 모집 공고 (파트 타임)",
    company: "주식회사웰케어스테이션",
    aiMatch: 84,
    deadlineDays: 2,
    deadlineDate: "~4/3(목)",
  },
  {
    id: "2",
    title: "방문간호사 모집 공고 (파트 타임)",
    company: "주식회사웰케어스테이션",
    aiMatch: 84,
    deadlineDays: 2,
    deadlineDate: "~4/3(목)",
  },
];

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Filter tag click handler
  filterTags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      // Toggle active state
      tag.classList.toggle("active");

      // In a real app, this would filter the job listings
      console.log("Filter by: " + tag.textContent);
    });
  });

  // Refresh icon click handler
  if (refreshIcon) {
    refreshIcon.addEventListener("click", function () {
      console.log("Refreshing filters");
      // Reset all filters
      filterTags.forEach(function (tag) {
        return tag.classList.remove("active");
      });
    });
  }

  // Sort arrows click handler
  if (sortArrows) {
    sortArrows.addEventListener("click", function () {
      console.log("Toggling sort order");
      // In a real app, this would toggle between ascending and descending sort
      sortArrows.classList.toggle("desc");
    });
  }

  // Job card click handler
  jobCards.forEach(function (card) {
    card.addEventListener("click", function () {
      // In a real app, this would navigate to the job details page
      var jobTitle = card.querySelector(".job-title")?.textContent;
      console.log("Viewing job: " + jobTitle);
    });
  });
});

// Add active class to filter tags when clicked
function toggleFilterTag(event) {
  var target = event.target;
  if (target.classList.contains("filter-tag")) {
    target.classList.toggle("active");
  }
}
