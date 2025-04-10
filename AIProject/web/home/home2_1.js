// DOM Elements
var searchBar = document.querySelector(".search-bar");
var searchPlaceholder = document.querySelector(".search-placeholder");
var recommendedTab = document.querySelector(".recommended-tab");
var allJobsTab = document.querySelector(".all-jobs-tab");
var jobFilter = document.querySelector(".job-filter");
var regionFilter = document.querySelector(".region-filter");
var navItems = document.querySelectorAll(".nav-item");
// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Search bar functionality
  searchBar.addEventListener("click", function () {
    searchPlaceholder.style.display = "none";
    // Create and append input element
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "공고를 검색해주세요.";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.fontSize = "20px";
    input.style.width = "100%";
    input.style.fontFamily = "inherit";
    searchBar.appendChild(input);
    input.focus();
    // Restore placeholder when input loses focus and is empty
    input.addEventListener("blur", function () {
      if (!input.value) {
        searchPlaceholder.style.display = "block";
        input.remove();
      }
    });
  });
  // Tab switching functionality
  recommendedTab.addEventListener("click", function () {
    recommendedTab.classList.add("active");
    allJobsTab.classList.remove("active");
    // Style changes
    recommendedTab.style.backgroundColor = "#4b9ff8";
    recommendedTab.style.color = "#fff";
    allJobsTab.style.backgroundColor = "#fff";
    allJobsTab.style.color = "#5a5a5a";
    allJobsTab.style.border = "2px solid #d9d9d9";
    // Here you would typically fetch and display recommended jobs
    console.log("Showing recommended jobs");
  });
  allJobsTab.addEventListener("click", function () {
    allJobsTab.classList.add("active");
    recommendedTab.classList.remove("active");
    // Style changes
    allJobsTab.style.backgroundColor = "#4b9ff8";
    allJobsTab.style.color = "#fff";
    recommendedTab.style.backgroundColor = "#fff";
    recommendedTab.style.color = "#5a5a5a";
    recommendedTab.style.border = "2px solid #d9d9d9";
    // Here you would typically fetch and display all jobs
    console.log("Showing all jobs");
  });
  // Filter functionality
  jobFilter.addEventListener("click", function () {
    console.log("Job filter clicked");
    // Here you would typically show a job selection dropdown/modal
  });
  regionFilter.addEventListener("click", function () {
    console.log("Region filter clicked");
    // Here you would typically show a region selection dropdown/modal
  });
  // Bottom navigation functionality
  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var _a;
      e.preventDefault();
      // Remove active class from all items
      navItems.forEach(function (navItem) {
        navItem.classList.remove("active");
      });
      // Add active class to clicked item
      item.classList.add("active");
      // Here you would typically navigate to the corresponding page
      console.log(
        "Navigating to: ".concat(
          (_a = item.querySelector(".nav-text")) === null || _a === void 0
            ? void 0
            : _a.textContent
        )
      );
    });
  });
});
// Sample job data
var sampleJobs = [
  {
    id: 1,
    title: "방문간호사 모집 공고 (파트 타임)",
    company: "주식회사웰케어스테이션",
    deadline: "2023-04-03",
    isOngoing: false,
    daysLeft: 2,
  },
  {
    id: 2,
    title: "[서울금연지원센터]입원환자 금연지원서비스",
    company: "이화여자대학교 산학협력단",
    deadline: "2023-04-06",
    isOngoing: false,
    daysLeft: 7,
  },
  {
    id: 3,
    title: "[압구정] 치료 및 케어실 정규직",
    company: "에이트성형외과의원",
    deadline: "",
    isOngoing: true,
  },
];
// Function to render job cards (would be called after fetching data)
function renderJobs(jobs) {
  var jobsContainer = document.querySelector(".main-content");
  var viewMoreLink = document.querySelector(".view-more-link");
  // Remove existing job cards
  var existingCards = document.querySelectorAll(".job-card");
  existingCards.forEach(function (card) {
    return card.remove();
  });
  // Insert new job cards before the bottom navigation
  jobs.forEach(function (job) {
    var jobCard = document.createElement("article");
    jobCard.className = "job-card";
    // Create job card content
    var cardContent = "";
    if (!job.isOngoing) {
      cardContent += '<span class="deadline-badge">D-'.concat(
        job.daysLeft,
        "</span>"
      );
    }
    cardContent += '\n      <h3 class="job-title">'
      .concat(
        job.title,
        '</h3>\n      <div class="job-details">\n        <div class="job-date-wrapper">\n          <img src="'
      )
      .concat(
        job.isOngoing
          ? "https://cdn.builder.io/api/v1/image/assets/TEMP/c0ac50f2daec74a121c64712c39b20f10a33cd84?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
          : "https://cdn.builder.io/api/v1/image/assets/TEMP/3ee6b191871ede5c111c3eb01f2e4427b51fb69b?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822",
        '" class="calendar-icon" alt="Calendar icon" />\n          <span class="job-date '
      )
      .concat(job.isOngoing ? "ongoing" : "", '">')
      .concat(
        job.isOngoing
          ? "상시채용"
          : "~"
              .concat(new Date(job.deadline).getMonth() + 1, "/")
              .concat(new Date(job.deadline).getDate(), "(")
              .concat(getDayOfWeek(new Date(job.deadline)), ")"),
        '</span>\n        </div>\n      </div>\n      <p class="company-name">'
      )
      .concat(job.company, "</p>\n    ");
    jobCard.innerHTML = cardContent;
    // Insert before view more link
    jobsContainer.insertBefore(jobCard, viewMoreLink.nextSibling);
  });
}
// Helper function to get day of week in Korean
function getDayOfWeek(date) {
  var days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}
