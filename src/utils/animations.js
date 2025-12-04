// Animation utilities and helper functions

// Animated counter for hero stats and metrics
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format number with commas if it's large
        const displayValue = current >= 1000
            ? Math.floor(current).toLocaleString()
            : current.toFixed(1);

        element.textContent = displayValue + suffix;
    }, 16);
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Trigger counter animations for metric cards
                if (entry.target.classList.contains('metric-card')) {
                    const valueElement = entry.target.querySelector('.metric-value');
                    const target = parseFloat(valueElement.dataset.target);
                    const suffix = valueElement.textContent.includes('%') ? '%' : '';
                    animateCounter(valueElement, target, 1500, suffix);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all visualization cards and metric cards
    document.querySelectorAll('.viz-card, .metric-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add scrolled class to nav
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Mobile navigation toggle
function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// Format large numbers with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Create tooltip element
function createTooltip(className = 'tooltip') {
    const tooltip = document.createElement('div');
    tooltip.className = className;
    document.body.appendChild(tooltip);
    return tooltip;
}

// Show tooltip
function showTooltip(tooltip, content, x, y) {
    tooltip.innerHTML = content;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.classList.add('visible');
}

// Hide tooltip
function hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Color scale for visualizations
const colorScales = {
    netflix: ['#E50914', '#F40612', '#FF6B6B', '#FF8E8E'],
    genre: {
        'Drama': '#E50914',
        'Comedy': '#F40612',
        'Action': '#FF6B6B',
        'Documentary': '#4ECDC4',
        'Thriller': '#A855F7',
        'Romance': '#FF69B4',
        'Sci-Fi': '#0071EB',
        'Horror': '#8B0000',
        'Animation': '#FFD700',
        'Family': '#46D369',
        'Fantasy': '#9B59B6',
        'Adventure': '#FF9500'
    }
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        setupScrollAnimations,
        setupSmoothScroll,
        setupActiveNavigation,
        setupMobileNav,
        formatNumber,
        createTooltip,
        showTooltip,
        hideTooltip,
        debounce,
        colorScales
    };
}
