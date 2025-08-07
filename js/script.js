// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Enhanced Navbar scroll effect with theme switching
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    // Configuration for theme switching
    const config = {
        scrollThreshold: 600, // Adjust this value based on your hero section height
        debounceDelay: 10
    };
    
    // Debounce function for performance
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
    
    // Function to update navigation theme based on scroll position
    function updateNavigationTheme() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > config.scrollThreshold) {
            // User has scrolled past the blue hero section - use light theme
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        } else {
            // User is in the blue hero section - use dark theme
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Initialize with correct theme
    updateNavigationTheme();
    
    // Add scroll event listener with debouncing
    const debouncedUpdate = debounce(updateNavigationTheme, config.debounceDelay);
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    
    // Also update on resize (in case viewport changes)
    window.addEventListener('resize', debounce(updateNavigationTheme, 100), { passive: true });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe privacy items
    const privacyItems = document.querySelectorAll('.privacy-item');
    privacyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Download button interactions
    const googlePlayBtn = document.getElementById('google-play-btn');
    const githubBtn = document.getElementById('github-btn');
    
    if (googlePlayBtn) {
        googlePlayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add Google Play Store link when available
            alert('App will be available on Google Play Store soon! Check back for updates.');
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://github.com/godmandevelopment/callscreeningpro', '_blank');
        });
    }
    
    // Add some interactive effects
    const buttons = document.querySelectorAll('.btn, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Feature card hover effects
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroButtons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 600);
    }
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                
                if (finalValue === '100%') {
                    animateCounter(stat, 0, 100, '%');
                } else if (finalValue === '0') {
                    stat.textContent = '0';
                } else if (finalValue === '24/7') {
                    stat.textContent = '24/7';
                }
                
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element, start, end, suffix = '') {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Expose navigation fix configuration for easy adjustment
    window.navigationFix = {
        updateThreshold: function(newThreshold) {
            config.scrollThreshold = newThreshold;
            updateNavigationTheme();
        },
        getCurrentTheme: function() {
            return navbar.classList.contains('navbar-light') ? 'light' : 'dark';
        },
        forceTheme: function(theme) {
            if (theme === 'light') {
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('navbar-light');
            } else if (theme === 'dark') {
                navbar.classList.remove('navbar-light');
                navbar.classList.add('navbar-dark');
            }
        }
    };
    
    console.log('Navigation visibility fix initialized successfully');
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu .nav-link {
            font-size: 1.2rem;
            margin: 15px 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

