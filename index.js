let currentHighestZIndex = 25; // Initialize the highest z-index value

function adjustTitleHeight(section) {
  const sectionContent = section.querySelector(".section-content");
  const sectionTitle = section.querySelector(".section-title");
  if (sectionContent && sectionTitle) {
    sectionTitle.style.height = `${sectionContent.offsetHeight}px`;
  }
}

function adjustElementHeight(section) {
  const max = 12;
  const min = -2;
  const topAdjust = (Math.random() * (max - min) + min) * 20;
  section.style.top = `${topAdjust}px`;
}

function adjustAllTitleHeights() {
  const sections = document.querySelectorAll(".article-section");
  sections.forEach((section) => {
    adjustTitleHeight(section);
  });
}

function bringToFront(section) {
  if (window.innerWidth > 1051) {
    // Increment the highest z-index and set it to the clicked section
    currentHighestZIndex += 1;
    section.style.zIndex = currentHighestZIndex;

    // Adjust the height of the section title
    adjustTitleHeight(section);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");
  let isFooterOpen = false;

  footer.addEventListener("click", () => {
    if (isFooterOpen) {
      footer.style.transform = "translateY(calc(100% - 30px))"; // Hide footer
    } else {
      footer.style.transform = "translateY(0)"; // Show footer
    }
    isFooterOpen = !isFooterOpen; // Toggle state
  });

  const aboutEdit = document.querySelector(".about-edit");

  aboutEdit.addEventListener("scroll", () => {
    if (
      aboutEdit.scrollTop + aboutEdit.clientHeight >=
      aboutEdit.scrollHeight
    ) {
      if (!isFooterOpen) {
        footer.style.transform = "translateY(0)"; // Show footer
        isFooterOpen = true;
      }
    }
  });

  const sourceElements = document.querySelectorAll(".source-div");
  sourceElements.forEach((sourceElement) => {
    sourceElement.addEventListener("mouseenter", bringBibToFront);
    sourceElement.addEventListener("mouseleave", resetBibZIndex);
  });
});

function adjustAllSections() {
  const minWidth = 1051;
  const sections = document.querySelectorAll(".article-section");
  sections.forEach((section) => {
    adjustTitleHeight(section);
    if (window.innerWidth >= minWidth) {
      adjustElementHeight(section);
    }
  });
}

// Initial adjustment for all sections
document.addEventListener("DOMContentLoaded", () => {
  adjustAllSections();
  positionDepartments();
});

// Add event listener for window resize
window.addEventListener("resize", () => {
  const minWidth = 391;

  const sections = document.querySelectorAll(".article-section");
  sections.forEach((section) => {
    adjustTitleHeight(section);
    if (window.innerWidth >= minWidth) {
      adjustElementHeight(section);
    }
  });
  positionDepartments();
});

function randomPosition(element, containerWidth, containerHeight) {
  const maxX = containerWidth - element.offsetWidth - 10; // Adjust for 10px threshold
  const maxY = containerHeight - element.offsetHeight - 10; // Adjust for 10px threshold

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  element.style.left = `${randomX}px`;
  element.style.top = `${randomY}px`;
}

function isOverlapping(element1, element2, threshold = 10) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right + threshold < rect2.left ||
    rect1.left - threshold > rect2.right ||
    rect1.bottom + threshold < rect2.top ||
    rect1.top - threshold > rect2.bottom
  );
}

function randomRotation() {
  const rotations = [-30, -20, -10, 10, 20, 30];
  const randomIndex = Math.floor(Math.random() * rotations.length);
  return rotations[randomIndex] + "deg";
}

function positionDepartments() {
  const container = document.querySelector(".all-departments");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const departments = document.querySelectorAll(".department-container");
  departments.forEach((department) => {
    let attempts = 0;
    let overlapping;

    do {
      randomPosition(department, containerWidth, containerHeight);
      overlapping = false;

      for (let i = 0; i < departments.length; i++) {
        if (
          departments[i] !== department &&
          isOverlapping(department, departments[i])
        ) {
          overlapping = true;
          break;
        }
      }

      attempts++;
    } while (overlapping && attempts < 100); // Limit attempts to prevent infinite loop

    // Set a random rotation angle for hover effect
    department.style.setProperty("--rotate-angle", randomRotation());
  });
}

// // Initial positioning
// document.addEventListener("DOMContentLoaded", () => {
//   positionDepartments();
// });

// // Reposition on window resize
// window.addEventListener("resize", () => {
//   positionDepartments();
// });
