// ==========================================================================
// Theme Toggle (Dark/Light Mode)
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // Default to dark theme if no preference
    htmlElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

// ==========================================================================
// Mobile Navigation Toggle
// ==========================================================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navIcon = mobileToggle.querySelector('i');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon between bars and xmark
    if (navMenu.classList.contains('active')) {
        navIcon.className = 'fa-solid fa-xmark';
    } else {
        navIcon.className = 'fa-solid fa-bars';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navIcon.className = 'fa-solid fa-bars';
    });
});

// ==========================================================================
// Active Navigation Link on Scroll
// ==========================================================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Offset for navbar
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================================================
// Typing Animation in Hero Section
// ==========================================================================
const typingText = document.querySelector('.typing-text');
const phrases = [
    "Web Development Intern",
    "Computer Science Student",
    "Frontend Enthusiast",
    "Software Developer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Word completed
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of word
    } 
    // Word fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
        typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if(typingText) setTimeout(typeEffect, 1000);
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

// ==========================================================================
// Scroll Reveal Animations
// ==========================================================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-right');
    const windowHeight = window.innerHeight;
    const revealPoint = 50;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// ==========================================================================
// Back to Top Button
// ==========================================================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================================================
// Form Validation (Frontend Only)
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Basic validation function
        const validateField = (input, condition) => {
            const formGroup = input.parentElement;
            if (condition) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        };
        
        // Validate inputs
        validateField(nameInput, nameInput.value.trim() === '');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, !emailRegex.test(emailInput.value.trim()));
        
        validateField(subjectInput, subjectInput.value.trim() === '');
        validateField(messageInput, messageInput.value.trim() === '');
        
        // If form is valid, simulate submission
        if (isValid) {
            // Simulate sending data
            
            // Show success message
            successMsg.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }
    });
    
    // Clear error states on input focus/type
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('error');
        });
    });
}
