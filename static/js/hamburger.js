// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    const body = document.body;

    function closeMenu() {
        mobileNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        body.style.overflow = '';
    }

    function openMenu() {
        mobileNav.classList.add('open');
        hamburgerBtn.classList.add('open');
        body.style.overflow = 'hidden';
    }

    if (hamburgerBtn && mobileNav) {
        // Hamburger button click
        hamburgerBtn.addEventListener('click', function () {
            if (mobileNav.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close button click
        if (mobileClose) {
            mobileClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking outside (on overlay)
        mobileNav.addEventListener('click', function (e) {
            if (e.target === mobileNav) {
                closeMenu();
            }
        });

        // Close menu when clicking a link
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Sync theme toggle between desktop and mobile
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', function () {
            if (themeToggle) {
                themeToggle.click(); // Trigger the main theme toggle
            }
            closeMenu();
        });
    }
});
