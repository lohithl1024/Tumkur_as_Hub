// Enhanced Tumkur Investment Hub - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('Tumkur Investment Hub - Enhanced version loading...');

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            
            // Add mobile menu styles dynamically
            if (!document.querySelector('#mobile-nav-styles')) {
                const mobileStyles = document.createElement('style');
                mobileStyles.id = 'mobile-nav-styles';
                mobileStyles.textContent = `
                    .nav__menu--active {
                        display: flex !important;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: var(--color-surface);
                        border: 1px solid var(--color-border);
                        border-radius: var(--radius-base);
                        padding: var(--space-16);
                        box-shadow: var(--shadow-lg);
                        z-index: 1000;
                    }
                    .nav__menu--active .nav__link {
                        padding: var(--space-12);
                        border-bottom: 1px solid var(--color-border);
                    }
                    .nav__menu--active .nav__link:last-child {
                        border-bottom: none;
                    }
                `;
                document.head.appendChild(mobileStyles);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('nav__menu--active');
            }
        });
    }

    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link, .hero__buttons .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('nav__menu--active');
                }
            }
        });
    });

    // Enhanced Cost Calculator Logic
    const calculateBtn = document.getElementById('calculateBtn');
    const businessTypeSelect = document.getElementById('businessType');
    const spaceReqInput = document.getElementById('spaceReq');
    const employeesInput = document.getElementById('employees');
    const timelineSelect = document.getElementById('timeline');
    const calcResults = document.getElementById('calcResults');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            calculateEnhancedSavings();
        });
    }

    function calculateEnhancedSavings() {
        const businessType = businessTypeSelect?.value || '';
        const spaceReq = parseInt(spaceReqInput?.value || '0');
        const employees = parseInt(employeesInput?.value || '0');
        const timeline = parseInt(timelineSelect?.value || '3');

        if (!businessType || spaceReq <= 0 || employees <= 0) {
            showAlert('Please fill in all fields with valid values.', 'warning');
            return;
        }

        // Show loading state
        const originalText = calculateBtn.textContent;
        calculateBtn.textContent = 'Calculating...';
        calculateBtn.disabled = true;

        setTimeout(() => {
            // Enhanced cost calculation logic based on actual market data
            let landCostPerSqFt = 0;
            let operationalSavingsPerEmployee = 0;
            let workforceCostSavingsPerEmployee = 0;
            let additionalSavingsPercentage = 0;

            switch (businessType) {
                case 'manufacturing':
                    landCostPerSqFt = 30; // ₹30 per sq ft annual savings
                    operationalSavingsPerEmployee = 60000; // ₹60K per employee annually
                    workforceCostSavingsPerEmployee = 150000; // ₹1.5L per employee annually
                    additionalSavingsPercentage = 0.05; // 5% additional savings
                    break;
                case 'it':
                    landCostPerSqFt = 35;
                    operationalSavingsPerEmployee = 45000;
                    workforceCostSavingsPerEmployee = 200000;
                    additionalSavingsPercentage = 0.08;
                    break;
                case 'logistics':
                    landCostPerSqFt = 25;
                    operationalSavingsPerEmployee = 40000;
                    workforceCostSavingsPerEmployee = 100000;
                    additionalSavingsPercentage = 0.06;
                    break;
                case 'research':
                    landCostPerSqFt = 40;
                    operationalSavingsPerEmployee = 70000;
                    workforceCostSavingsPerEmployee = 250000;
                    additionalSavingsPercentage = 0.10;
                    break;
                case 'automotive':
                    landCostPerSqFt = 32;
                    operationalSavingsPerEmployee = 55000;
                    workforceCostSavingsPerEmployee = 180000;
                    additionalSavingsPercentage = 0.07;
                    break;
                default:
                    landCostPerSqFt = 30;
                    operationalSavingsPerEmployee = 50000;
                    workforceCostSavingsPerEmployee = 160000;
                    additionalSavingsPercentage = 0.06;
            }

            // Calculate base savings
            const annualLandSaving = spaceReq * landCostPerSqFt;
            const annualOpSaving = employees * operationalSavingsPerEmployee;
            const annualWorkforceSaving = employees * workforceCostSavingsPerEmployee;
            
            // Apply timeline multiplier
            const totalLandSaving = annualLandSaving * timeline;
            const totalOpSaving = annualOpSaving * timeline;
            const totalWorkforceSaving = annualWorkforceSaving * timeline;
            
            // Calculate additional savings (government incentives, etc.)
            const baseSavings = totalLandSaving + totalOpSaving + totalWorkforceSaving;
            const additionalSavings = baseSavings * additionalSavingsPercentage;
            const totalSaving = baseSavings + additionalSavings;

            // Update the results with animation
            updateEnhancedSavingsDisplay(totalLandSaving, totalOpSaving, totalWorkforceSaving, totalSaving, timeline);
            
            // Show results section with enhanced animation
            showCalculatorResults();

            // Reset button
            calculateBtn.textContent = originalText;
            calculateBtn.disabled = false;

        }, 1500); // Simulate calculation time
    }

    function updateEnhancedSavingsDisplay(landSaving, opSaving, workforceSaving, totalSaving, timeline) {
        const formatCurrency = (amount) => {
            if (amount >= 10000000) { // 1 crore
                return (amount / 10000000).toFixed(1) + ' Cr';
            } else if (amount >= 100000) { // 1 lakh
                return (amount / 100000).toFixed(1) + ' L';
            } else {
                return new Intl.NumberFormat('en-IN').format(amount);
            }
        };

        // Animate the numbers
        animateCounter('landSaving', landSaving, formatCurrency);
        animateCounter('opSaving', opSaving, formatCurrency);
        animateCounter('workforceSaving', workforceSaving, formatCurrency);
        animateCounter('totalSaving', totalSaving, formatCurrency);

        // Update timeline context
        const resultsTitle = calcResults.querySelector('h3');
        if (resultsTitle) {
            resultsTitle.textContent = `Your ${timeline}-Year Savings in Tumkur`;
        }
    }

    function animateCounter(elementId, finalValue, formatter) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 1000; // 1 second
        const intervalTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            element.textContent = formatter(Math.floor(currentValue));
        }, intervalTime);
    }

    function showCalculatorResults() {
        if (calcResults) {
            calcResults.style.opacity = '0';
            calcResults.style.transform = 'translateY(30px)';
            calcResults.style.display = 'block';
            
            setTimeout(() => {
                calcResults.style.transition = 'all 0.6s ease';
                calcResults.style.opacity = '1';
                calcResults.style.transform = 'translateY(0)';
            }, 100);

            // Scroll to results
            setTimeout(() => {
                calcResults.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        }
    }

    // Enhanced Form Submissions
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEnhancedContactForm(this);
        });
    }

    function handleEnhancedContactForm(form) {
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]')?.value.trim();
        const email = form.querySelector('input[type="email"]')?.value.trim();
        const phone = form.querySelector('input[type="tel"]')?.value.trim();
        const investmentType = form.querySelector('select[required]')?.value;
        
        // Enhanced validation
        if (!name || name.length < 2) {
            showAlert('Please enter a valid name (at least 2 characters).', 'error');
            return;
        }

        if (!email || !isValidEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }

        if (!investmentType) {
            showAlert('Please select your investment interest.', 'error');
            return;
        }

        // Show enhanced loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;
        
        // Simulate form submission with enhanced feedback
        setTimeout(() => {
            const investmentTypeText = investmentType.charAt(0).toUpperCase() + investmentType.slice(1);
            showAlert(
                `Thank you, ${name}! Your inquiry for ${investmentTypeText} investment has been received. Our specialized team will contact you within 24 hours with detailed information and personalized assistance.`, 
                'success'
            );
            form.reset();
            submitBtn.classList.remove('btn--loading');
            submitBtn.disabled = false;
        }, 2500);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `custom-alert custom-alert--${type}`;
        alert.innerHTML = `
            <div class="custom-alert__content">
                <span class="custom-alert__icon">${getAlertIcon(type)}</span>
                <span class="custom-alert__message">${message}</span>
                <button class="custom-alert__close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;

        // Add alert styles
        if (!document.querySelector('#alert-styles')) {
            const alertStyles = document.createElement('style');
            alertStyles.id = 'alert-styles';
            alertStyles.textContent = `
                .custom-alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    z-index: 10000;
                    border-radius: var(--radius-base);
                    box-shadow: var(--shadow-lg);
                    animation: slideInRight 0.3s ease;
                }
                .custom-alert--success { background: rgba(var(--color-success-rgb), 0.1); border: 1px solid rgba(var(--color-success-rgb), 0.3); }
                .custom-alert--error { background: rgba(var(--color-error-rgb), 0.1); border: 1px solid rgba(var(--color-error-rgb), 0.3); }
                .custom-alert--warning { background: rgba(var(--color-warning-rgb), 0.1); border: 1px solid rgba(var(--color-warning-rgb), 0.3); }
                .custom-alert--info { background: rgba(var(--color-info-rgb), 0.1); border: 1px solid rgba(var(--color-info-rgb), 0.3); }
                .custom-alert__content {
                    display: flex;
                    align-items: flex-start;
                    gap: var(--space-8);
                    padding: var(--space-12) var(--space-16);
                }
                .custom-alert__icon {
                    font-size: var(--font-size-lg);
                    margin-top: var(--space-2);
                }
                .custom-alert__message {
                    flex: 1;
                    font-size: var(--font-size-sm);
                    line-height: var(--line-height-normal);
                    color: var(--color-text);
                }
                .custom-alert__close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    padding: 0;
                    line-height: 1;
                }
                .custom-alert__close:hover {
                    color: var(--color-text);
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(alertStyles);
        }

        document.body.appendChild(alert);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert && alert.parentElement) {
                alert.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }

    function getAlertIcon(type) {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    }

    // Enhanced Button Interactions
    const propertyBtns = document.querySelectorAll('.property-btn');
    propertyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const propertyTitle = this.closest('.property-card').querySelector('h3').textContent;
            showAlert(`Detailed information for "${propertyTitle}" will be sent to your email. Please contact our investment team for immediate assistance.`, 'info');
        });
    });

    const jobPostBtn = document.querySelector('.job-portal .btn');
    if (jobPostBtn) {
        jobPostBtn.addEventListener('click', function() {
            showAlert('Job posting portal launching soon! Contact our talent coordination team at talent@tumkurhub.gov.in for immediate hiring assistance.', 'info');
        });
    }

    const networkBtns = document.querySelectorAll('.network-portal .btn');
    networkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            if (btnText.includes('Join')) {
                showAlert('Business network registration opening soon. Contact us to be added to our priority list and receive early access benefits.', 'info');
            } else if (btnText.includes('Success Stories') || btnText.includes('View')) {
                showAlert('Complete success stories directory available to registered members. Contact our team for detailed case studies.', 'info');
            }
        });
    });

    // Enhanced scroll-based animations with Intersection Observer
    function initializeScrollAnimations() {
        const animateElements = document.querySelectorAll(
            '.property-card, .institution-card, .story-card, .stat-card, .benefit-card, .advantage-item, .talent-stat, .network-stat'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Enhanced Stats Counter Animation
    function initializeCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-card h3, .talent-stat h3, .network-stat h3');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = entry.target;
                    const text = target.textContent;
                    const numberMatch = text.match(/[\d,]+/);
                    
                    if (numberMatch) {
                        const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
                        const suffix = text.replace(numberMatch[0], '');
                        let currentNumber = 0;
                        const increment = Math.ceil(finalNumber / 60);
                        
                        target.classList.add('counted');
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                currentNumber = finalNumber;
                                clearInterval(counter);
                            }
                            
                            const formattedNumber = currentNumber.toLocaleString('en-IN');
                            target.textContent = formattedNumber + suffix;
                        }, 25);
                    }
                    
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.7 });
        
        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }

    // Enhanced Active Navigation Link Highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // Enhanced loading states for all buttons
    function addButtonLoadingStates() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn:not([type="submit"]):not(.property-btn)')) {
                const btn = e.target;
                const originalText = btn.textContent;
                
                if (!btn.classList.contains('btn--loading')) {
                    btn.classList.add('btn--loading');
                    
                    setTimeout(() => {
                        btn.classList.remove('btn--loading');
                    }, 1200);
                }
            }
        });
    }

    // Parallax effect for hero section
    function initializeParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.backgroundPosition = `center ${rate}px`;
            });
        }
    }

    // Enhanced form field validation with real-time feedback
    function addFormValidation() {
        const formFields = document.querySelectorAll('.form-control');
        
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('field-error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error styling
        field.classList.remove('field-error');
        const existingError = field.parentNode.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (field.type === 'tel' && value && !/^[+]?[\d\s\-()]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }

        if (!isValid) {
            field.classList.add('field-error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);

            // Add error styling
            if (!document.querySelector('#field-error-styles')) {
                const errorStyles = document.createElement('style');
                errorStyles.id = 'field-error-styles';
                errorStyles.textContent = `
                    .field-error {
                        border-color: var(--color-error) !important;
                        box-shadow: 0 0 0 2px rgba(var(--color-error-rgb), 0.1) !important;
                    }
                    .field-error-message {
                        color: var(--color-error);
                        font-size: var(--font-size-xs);
                        margin-top: var(--space-4);
                        display: block;
                    }
                `;
                document.head.appendChild(errorStyles);
            }
        }

        return isValid;
    }

    // Initialize all enhanced features
    function initializeEnhancedFeatures() {
        initializeScrollAnimations();
        initializeCounterAnimations();
        addButtonLoadingStates();
        initializeParallaxEffect();
        addFormValidation();
        
        // Update active navigation on scroll
        window.addEventListener('scroll', updateActiveNavigation);
        updateActiveNavigation(); // Initial call

        // Add smooth hover effects
        const hoverElements = document.querySelectorAll('.property-card, .benefit-card, .story-card, .advantage-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Load all enhanced features
    initializeEnhancedFeatures();

    // Enhanced success message
    console.log('✅ Tumkur Investment Hub - Enhanced version loaded successfully!');
    console.log('🚀 Features: Enhanced calculator, improved animations, better forms, mobile-responsive design');
    console.log('📊 Ready for investor interactions and government presentations');
});

// Utility functions for external access
window.TumkurHub = {
    showAlert: function(message, type) {
        const event = new CustomEvent('showAlert', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    },
    
    scrollToSection: function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    calculateSavings: function(businessType, space, employees, timeline) {
        // External API for calculator
        const calculator = document.getElementById('calculateBtn');
        if (calculator) {
            document.getElementById('businessType').value = businessType;
            document.getElementById('spaceReq').value = space;
            document.getElementById('employees').value = employees;
            document.getElementById('timeline').value = timeline;
            calculator.click();
        }
    }
};