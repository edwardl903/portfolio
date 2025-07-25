// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add grid background
document.body.insertAdjacentHTML('afterbegin', '<div class="grid-bg"></div>');

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Make sure the first section is visible immediately
const firstSection = document.querySelector('section');
if (firstSection) {
    firstSection.classList.add('visible');
}

// Typing effect for hero description
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Typewriter effect for hero roles
function typewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;
    
    const roles = [
        "I am a Data Enthusiast",
        "I am a Data Explorer", 
        "I am a Data Storyteller",
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            currentText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.textContent = currentText;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.hero-text p');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typeWriter(typingElement, originalText, 30);
        
        // Calculate when the main text will finish typing
        const typingDuration = originalText.length * 30; // 30ms per character
        const delayBeforeTypewriter = typingDuration + 1000; // Add 1 second pause
        
        // Start typewriter effect after main text finishes
        setTimeout(() => {
            typewriterEffect();
        }, delayBeforeTypewriter);
    } else {
        // If no main text to type, start typewriter immediately
        typewriterEffect();
    }
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.grid-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Active navigation highlighting (for single page sections if needed)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced navigation functionality
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize active navigation
setActiveNavigation();

// Initialize cursor effect
createCursorEffect();

// Initialize click ripple effect
createClickRipple();

// Particle effect for background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            z-index: -1;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Custom cursor trail effect
function createCursorEffect() {
    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create multiple cursor trails
    const trail1 = document.createElement('div');
    trail1.className = 'cursor-trail';
    document.body.appendChild(trail1);
    
    const trail2 = document.createElement('div');
    trail2.className = 'cursor-trail-2';
    document.body.appendChild(trail2);
    
    const trail3 = document.createElement('div');
    trail3.className = 'cursor-trail-3';
    document.body.appendChild(trail3);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trail1X = 0, trail1Y = 0;
    let trail2X = 0, trail2Y = 0;
    let trail3X = 0, trail3Y = 0;
    let isOverIframe = false;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Handle iframe interactions
    function handleIframeInteraction() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            // Show default cursor when hovering over iframe
            iframe.addEventListener('mouseenter', () => {
                isOverIframe = true;
                cursor.style.display = 'none';
                trail1.style.display = 'none';
                trail2.style.display = 'none';
                trail3.style.display = 'none';
                document.body.style.cursor = 'auto';
            });
            
            iframe.addEventListener('mouseleave', () => {
                isOverIframe = false;
                cursor.style.display = 'block';
                trail1.style.display = 'block';
                trail2.style.display = 'block';
                trail3.style.display = 'block';
                document.body.style.cursor = 'none';
            });
        });
    }
    
    // Handle PDF viewer interactions
    function handlePDFInteraction() {
        const pdfViewers = document.querySelectorAll('embed[type="application/pdf"], object[type="application/pdf"]');
        pdfViewers.forEach(pdf => {
            pdf.addEventListener('mouseenter', () => {
                isOverIframe = true;
                cursor.style.display = 'none';
                trail1.style.display = 'none';
                trail2.style.display = 'none';
                trail3.style.display = 'none';
                document.body.style.cursor = 'auto';
            });
            
            pdf.addEventListener('mouseleave', () => {
                isOverIframe = false;
                cursor.style.display = 'block';
                trail1.style.display = 'block';
                trail2.style.display = 'block';
                trail3.style.display = 'block';
                document.body.style.cursor = 'none';
            });
        });
    }
    
    // Animate cursor and trails
    function animateCursor() {
        // Only animate if not over iframe
        if (!isOverIframe) {
            // Direct cursor movement (no smoothing for main cursor)
            cursorX = mouseX;
            cursorY = mouseY;
            
            // Smooth trail movements with different speeds
            trail1X += (mouseX - trail1X) * 0.08;
            trail1Y += (mouseY - trail1Y) * 0.08;
            
            trail2X += (mouseX - trail2X) * 0.05;
            trail2Y += (mouseY - trail2Y) * 0.05;
            
            trail3X += (mouseX - trail3X) * 0.03;
            trail3Y += (mouseY - trail3Y) * 0.03;
            
            // Update positions
            cursor.style.left = cursorX - 8 + 'px';
            cursor.style.top = cursorY - 8 + 'px';
            
            trail1.style.left = trail1X - 3 + 'px';
            trail1.style.top = trail1Y - 3 + 'px';
            
            trail2.style.left = trail2X - 2 + 'px';
            trail2.style.top = trail2Y - 2 + 'px';
            
            trail3.style.left = trail3X - 1.5 + 'px';
            trail3.style.top = trail3Y - 1.5 + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Initialize iframe and PDF handlers
    handleIframeInteraction();
    handlePDFInteraction();
    
    // Enhanced interactive effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .btn, .nav-menu a, .hamburger');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isOverIframe) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(139, 92, 246, 1)';
                cursor.style.boxShadow = '0 0 25px rgba(139, 92, 246, 1), inset 0 0 8px rgba(255, 255, 255, 0.6)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (!isOverIframe) {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(139, 92, 246, 1)';
                cursor.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.8), inset 0 0 5px rgba(255, 255, 255, 0.3)';
            }
        });
    });
}

// Click ripple effect
function createClickRipple() {
    document.addEventListener('click', (e) => {
        // Don't create ripple on interactive elements
        if (e.target.closest('a, button, input, textarea, select, .btn, .nav-menu, .hamburger')) {
            return;
        }
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
}

// Add particle animation CSS
const particleCSS = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validate form
            if (!validateForm(name, email, message)) {
                e.preventDefault(); // Prevent submission if validation fails
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Let the form submit to Formspree
            // Formspree will handle the email sending
            // Show success message immediately
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form
                contactForm.reset();
                clearErrors();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 500);
        });
    }
    
    // Form validation
    function validateForm(name, email, message) {
        let isValid = true;
        clearErrors();
        
        // Name validation
        if (!name || name.trim().length < 2) {
            showError('nameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (!message || message.trim().length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const errorId = field.id + 'Error';
        
        switch (field.id) {
            case 'name':
                if (!value || value.length < 2) {
                    showError(errorId, 'Please enter a valid name (at least 2 characters)');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    showError(errorId, 'Please enter a valid email address');
                }
                break;
            case 'subject':
                if (!value) {
                    showError(errorId, 'Please select a subject');
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    showError(errorId, 'Please enter a message (at least 10 characters)');
                }
                break;
        }
    }
});

// Glitch effect for hero title
function addGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px rgba(139, 92, 246, 0.8),
                0 0 20px rgba(139, 92, 246, 0.5)
            `;
            setTimeout(() => {
                heroTitle.style.textShadow = '0 0 20px rgba(139, 92, 246, 0.5)';
            }, 100);
        }, 3000);
    }
}

// Initialize glitch effect
addGlitchEffect();

// Skill tags animation
document.querySelectorAll('.skill-tags span').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
    observer.observe(tag);
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Hobby cards hover effect enhancement
document.querySelectorAll('.hobby-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.color = '#0056b3';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.color = '#007bff';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log(`
%cWelcome to Edward Lai's Portfolio! 🚀
%c
%cData Engineer & Data Analyst | Tufts University Graduate
%cBuilt with modern web technologies and lots of ☕
`, 
'color: #007bff; font-size: 20px; font-weight: bold;',
'color: #ffffff; font-size: 14px;',
'color: #cccccc; font-size: 12px;',
'color: #888888; font-size: 10px;'
); 