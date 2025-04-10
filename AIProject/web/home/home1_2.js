// Sample data
const jobListings = [
  {
    id: "1",
    category: "🔍 최근 올라온 공공 일자리 정보",
    title: "서울특별시어린이병원 기간제 노동자 채용 공고",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0d15098566cb190c266210b9ed4b29b4fbc8528b",
  },
  {
    id: "2",
    category: "🎈 파트 타임 모집 공고",
    title: "서울북부교육청 학습비타민 지원가 모집 (주 3회)",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/af7462bc608ebdda31fb77f7512f012d8e32f2a5",
  },
];

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchBar = document.querySelector(".search-bar");
  if (searchBar) {
    searchBar.addEventListener("click", () => {
      alert("검색 기능이 구현될 예정입니다.");
    });
  }

  // Category tabs
  const categoryTabs = document.querySelectorAll(".category-tab");
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Here you would typically filter job listings based on the selected category
      alert("카테고리 필터링 기능이 구현될 예정입니다.");
    });
  });

  // Navigation items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all nav items and their text
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
        const navText = navItem.querySelector(".nav-text");
        if (navText) navText.classList.remove("active");
      });

      // Add active class to clicked nav item and its text
      item.classList.add("active");
      const navText = item.querySelector(".nav-text");
      if (navText) navText.classList.add("active");

      // Here you would typically navigate to the corresponding page
      const navTextContent = navText?.textContent;
      alert(`${navTextContent} 페이지로 이동할 예정입니다.`);
    });
  });

  // Job card click handler
  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => {
    card.addEventListener("click", () => {
      const jobTitle = card.querySelector(".job-title")?.textContent;
      alert(`${jobTitle} 상세 정보 페이지로 이동할 예정입니다.`);
    });
  });
});
