// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on a link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active') && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation for menu
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });
    }

    // Project Carousel functionality
    const carousel = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    if (carousel && slides.length > 0) {
        // Function to update carousel
        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });

            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentSlide) {
                    indicator.classList.add('active');
                }
            });

            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Initialize carousel
        updateCarousel();

        // Next slide
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }

        // Previous slide
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Keyboard navigation for carousel
        document.addEventListener('keydown', function(e) {
            if (document.querySelector('.projects-section') && 
                document.querySelector('.projects-section').contains(document.activeElement)) {
                if (e.key === 'ArrowLeft' && prevBtn) {
                    e.preventDefault();
                    prevBtn.click();
                } else if (e.key === 'ArrowRight' && nextBtn) {
                    e.preventDefault();
                    nextBtn.click();
                }
            }
        });

        // Auto-play carousel (optional - can be disabled)
        // let autoPlayInterval = setInterval(() => {
        //     currentSlide = (currentSlide + 1) % slides.length;
        //     updateCarousel();
        // }, 5000);

        // Pause on hover
        // const carouselContainer = document.querySelector('.project-carousel');
        // if (carouselContainer) {
        //     carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        //     carouselContainer.addEventListener('mouseleave', () => {
        //         autoPlayInterval = setInterval(() => {
        //             currentSlide = (currentSlide + 1) % slides.length;
        //             updateCarousel();
        //         }, 5000);
        //     });
        // }
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('form-success');

        // Validation functions
        function validateName(name) {
            return name.trim().length >= 2;
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateSubject(subject) {
            return subject.trim().length >= 3;
        }

        function validateMessage(message) {
            return message.trim().length >= 10;
        }

        // Show error function
        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // Clear error function
        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                if (!validateName(this.value)) {
                    showError(this, document.getElementById('name-error'), 'Name must be at least 2 characters long');
                } else {
                    clearError(this, document.getElementById('name-error'));
                }
            });

            nameInput.addEventListener('input', function() {
                if (this.value.trim().length >= 2) {
                    clearError(this, document.getElementById('name-error'));
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (!validateEmail(this.value)) {
                    showError(this, document.getElementById('email-error'), 'Please enter a valid email address');
                } else {
                    clearError(this, document.getElementById('email-error'));
                }
            });

            emailInput.addEventListener('input', function() {
                if (validateEmail(this.value)) {
                    clearError(this, document.getElementById('email-error'));
                }
            });
        }

        if (subjectInput) {
            subjectInput.addEventListener('blur', function() {
                if (!validateSubject(this.value)) {
                    showError(this, document.getElementById('subject-error'), 'Subject must be at least 3 characters long');
                } else {
                    clearError(this, document.getElementById('subject-error'));
                }
            });

            subjectInput.addEventListener('input', function() {
                if (this.value.trim().length >= 3) {
                    clearError(this, document.getElementById('subject-error'));
                }
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                if (!validateMessage(this.value)) {
                    showError(this, document.getElementById('message-error'), 'Message must be at least 10 characters long');
                } else {
                    clearError(this, document.getElementById('message-error'));
                }
            });

            messageInput.addEventListener('input', function() {
                if (this.value.trim().length >= 10) {
                    clearError(this, document.getElementById('message-error'));
                }
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Validate all fields
            if (!validateName(nameInput.value)) {
                showError(nameInput, document.getElementById('name-error'), 'Name must be at least 2 characters long');
                isValid = false;
            }

            if (!validateEmail(emailInput.value)) {
                showError(emailInput, document.getElementById('email-error'), 'Please enter a valid email address');
                isValid = false;
            }

            if (!validateSubject(subjectInput.value)) {
                showError(subjectInput, document.getElementById('subject-error'), 'Subject must be at least 3 characters long');
                isValid = false;
            }

            if (!validateMessage(messageInput.value)) {
                showError(messageInput, document.getElementById('message-error'), 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission (in a real application, you would send data to a server)
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Clear all errors
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    if (input) {
                        clearError(input, document.getElementById(input.id + '-error'));
                    }
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Focus on first error field
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll (Intersection Observer)
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .project-card, .skill-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation for skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});

// Add active nav link highlighting based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
