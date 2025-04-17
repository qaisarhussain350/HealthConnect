// navigation.js
document.addEventListener('DOMContentLoaded', function () {
  // ========== Mobile Menu Toggle ==========
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      // Toggle mobile menu visibility
      mobileMenu.classList.toggle('hidden');

      // Toggle hamburger icon
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);

      // Change icon between hamburger and X
      const menuIcon = mobileMenuButton.querySelector('svg');
      if (!isExpanded) {
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          `;
      } else {
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          `;
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.querySelector('svg').innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          `;
      }
    });
  }

  // ========== Active Page Highlighting ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active-nav-link');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ========== Smooth Scrolling ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          mobileMenuButton.querySelector('svg').innerHTML = `
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            `;
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const appointmentForm = document.getElementById("appointmentForm");
  const submitButton = document.getElementById("submitButton");

  // Function to check if the user is logged in
  function isUserLoggedIn() {
    // You can replace this with your actual login check logic
    // Example: return true if logged in, false otherwise
    return sessionStorage.getItem("userLoggedIn") === "true"; // Placeholder check
  }

  // Handle form submission
  appointmentForm.addEventListener("submit", function (event) {
    if (!isUserLoggedIn()) {
      event.preventDefault(); // Prevent form submission
      alert("You must be logged in to book an appointment.");
      window.location.href = "login.html"; // Redirect to login page
    }
  });
});
