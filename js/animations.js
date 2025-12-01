// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initParticles();
    initSkillBars();
    initCounters();
    initParallax();
    initCursorEffect();
});

/**
 * Initialize particles background effect
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

/**
 * Initialize animated skill bars
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barRect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (barRect.top < windowHeight) {
                const percentage = bar.getAttribute('data-percentage');
                bar.querySelector('.skill-progress-bar').style.width = percentage + '%';
            }
        });
    }
    
    // Animate on initial load
    animateSkillBars();
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Initialize animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    function animateCounters() {
        counters.forEach(counter => {
            const counterRect = counter.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (counterRect.top < windowHeight && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 16ms per frame (approx 60fps)
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    
                    if (current >= target) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = current;
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
            }
        });
    }
    
    // Animate on initial load
    animateCounters();
    
    // Animate on scroll
    window.addEventListener('scroll', animateCounters);
}

/**
 * Initialize parallax effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const speed = element.getAttribute('data-speed') || 0.5;
            
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
    
    // Update on initial load
    updateParallax();
    
    // Update on scroll
    window.addEventListener('scroll', updateParallax);
}

/**
 * Initialize custom cursor effect
 */
function initCursorEffect() {
    const cursor = document.querySelector('.cursor');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (cursor && cursorInner) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorInner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
        
        document.addEventListener('mousedown', function() {
            cursor.classList.add('click');
            cursorInner.classList.add('click');
            
            setTimeout(() => {
                cursor.classList.remove('click');
                cursorInner.classList.remove('click');
            }, 500);
        });
        
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('click');
            cursorInner.classList.remove('click');
        });
        
        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, .btn, .hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                cursorInner.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                cursorInner.classList.remove('hover');
            });
        });
    }
}

/**
 * Initialize text scramble effect
 */
function initTextScramble() {
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    const phrases = [
        'Web Developer',
        'UI/UX Designer',
        'Frontend Engineer',
        'JavaScript Expert',
        'React Developer'
    ];
    
    const el = document.querySelector('.text-scramble');
    
    if (el) {
        const fx = new TextScramble(el);
        
        let counter = 0;
        
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    }
}

/**
 * Initialize tilt effect for cards
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        let rect = element.getBoundingClientRect();
        let x = 0;
        let y = 0;
        let height = rect.height;
        let width = rect.width;
        
        element.addEventListener('mousemove', function(e) {
            // Get mouse position relative to element
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            
            // Calculate rotation values
            const rotateX = ((y - height / 2) / height) * 20; // Max 20deg
            const rotateY = ((width / 2 - x) / width) * 20; // Max 20deg
            
            // Apply transform
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Update rect on window resize
        window.addEventListener('resize', function() {
            rect = element.getBoundingClientRect();
            height = rect.height;
            width = rect.width;
        });
    });
}

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
}

/**
 * Initialize animated background gradient
 */
function initAnimatedGradient() {
    const gradientElement = document.querySelector('.animated-gradient');
    
    if (gradientElement) {
        let hue = 0;
        
        function updateGradient() {
            hue = (hue + 1) % 360;
            
            const color1 = `hsl(${hue}, 80%, 60%)`;
            const color2 = `hsl(${(hue + 60) % 360}, 80%, 60%)`;
            const color3 = `hsl(${(hue + 180) % 360}, 80%, 60%)`;
            
            gradientElement.style.backgroundImage = `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`;
            
            requestAnimationFrame(updateGradient);
        }
        
        updateGradient();
    }
}

// Call additional animation initializations
document.addEventListener('DOMContentLoaded', function() {
    initTextScramble();
    initTiltEffect();
    initScrollProgress();
    initAnimatedGradient();
});

/**
 * Initialize 3D card hover effect
 */
function init3DCardEffect() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 8;
            const angleY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            // Add highlight effect
            const glare = card.querySelector('.card-glare');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        });
    });
}

// Call 3D card effect initialization
document.addEventListener('DOMContentLoaded', init3DCardEffect);