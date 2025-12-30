/**
 * Theme Toggle Script
 * Handles theme switching between Claude dark and light modes
 * with localStorage persistence
 */

(function () {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    // Get current theme from html data attribute
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    // Update button emoji based on current theme
    function updateButton() {
        const theme = getCurrentTheme();
        // When in dark mode, show sunrise (🌅) to switch to light
        // When in light mode, show night skyline (🌃) to switch to dark
        button.textContent = theme === 'dark' ? '🌅' : '🌃';
        button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }

        updateButton();
    }

    // Initialize button
    updateButton();

    // Add click listener
    button.addEventListener('click', toggleTheme);
})();
