// Main Application JavaScript

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Setup navigation and animations
    setupSmoothScroll();
    setupActiveNavigation();
    setupMobileNav();
    setupScrollAnimations();

    // Animate hero stats
    animateHeroStats();

    // Animate metric cards when they come into view
    setupMetricAnimations();
}

// Animate hero statistics
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        animateCounter(stat, target, 2000);
    });
}

// Setup metric card animations
function setupMetricAnimations() {
    const metricValues = document.querySelectorAll('.metric-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.dataset.target);
                const suffix = entry.target.textContent.includes('%') ? '%' : '';

                animateCounter(entry.target, target, 1500, suffix);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    metricValues.forEach(value => observer.observe(value));
}

// Handle window resize for all visualizations
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        // Visualizations will handle their own resize via debounced listeners
        console.log('Window resized - visualizations updating...');
    }, 250);
});

// Log initialization
console.log('%c🎬 Netflix Data Visualization Portfolio', 'color: #E50914; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with D3.js, JavaScript, and CSS3', 'color: #b3b3b3; font-size: 12px;');
console.log('%cFor Netflix Job Application', 'color: #46D369; font-size: 12px;');
