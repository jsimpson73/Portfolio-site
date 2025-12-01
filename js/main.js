// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollReveal();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initTypewriter();
});

/**
 * Initialize Navbar functionality
 */
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add scrolled class to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Scroll Reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Check on initial load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Initialize Portfolio Filter functionality
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Add animation
                setTimeout(() => {
                    item.classList.add('filtered');
                }, 100);
            });
        });
    });
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // Set first dot as active
    if (sliderDots.length > 0) {
        sliderDots[0].classList.add('active');
    }
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Remove active class from all dots
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show testimonial at current index
        testimonialItems[index].style.display = 'block';
        
        // Add active class to current dot
        sliderDots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Add click event to dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Add click event to prev button
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialItems.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Add click event to next button
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialItems.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Auto slide every 5 seconds
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialItems.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
}

/**
 * Initialize Contact Form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate form fields
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this example, we'll just show a success message
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        input.classList.add('error');
        
        // Add error message after input
        formGroup.appendChild(errorMessage);
    }
    
    // Helper function to remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.classList.remove('error');
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/**
 * Initialize Typewriter effect for hero section
 */
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove a character
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                // Add a character
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typeSpeed = 1000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex++;
                
                // Reset to first word if we've reached the end
                if (wordIndex === words.length) {
                    wordIndex = 0;
                }
                
                // Pause before typing next word
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the typewriter effect
        setTimeout(type, 1000);
    }
}

/**
 * Initialize project modal functionality
 */
function initProjectModals() {
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Lazy load images
 */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.scrollY;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});

/**
 * Theme switcher
 */
function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.classList.add(savedTheme);
        
        if (savedTheme === 'dark-theme') {
            themeSwitcher.checked = true;
        }
    }
    
    // Toggle theme when switcher is clicked
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light-theme');
            }
        });
    }
}

// Call theme switcher initialization
document.addEventListener('DOMContentLoaded', initThemeSwitcher);