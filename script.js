/**
 * SABBIR HOSEN AKASH - PORTFOLIO CORE JS
 * Features: Typing Effect, Particles, Swiper, AOS, Silent AJAX Form
 */

// --- 1. Typing Effect Logic ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Full Stack Developer", "SEO Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;

    const currentText = textArray[textIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex < currentText.length) {
        typingElement.textContent += currentText.charAt(charIndex);
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % textArray.length;
        }
        // Pause at the end of a word
        setTimeout(typeEffect, isDeleting ? 2000 : 500);
        return;
    }

    setTimeout(typeEffect, typingSpeed);
}

// --- 2. Silent Form Submission (No Redirects) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.innerHTML = '<span style="color: var(--primary)">Sending message...</span>';
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerHTML = '<span style="color: var(--primary)">✓ Message sent successfully!</span>';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '<span style="color: #ff4d4d">Oops! There was a problem.</span>';
            }
        } catch (error) {
            formStatus.innerHTML = '<span style="color: #ff4d4d">Error connecting to server.</span>';
        }
    });
}

// --- 3. Mobile Menu Toggle ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('open');
}

// Close menu on link click (Mobile)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

// --- 4. Initialize AOS & Swiper ---
document.addEventListener('DOMContentLoaded', () => {
    // Start Typing Effect
    setTimeout(typeEffect, 1000);

    // AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Swiper Slider
    const swiper = new Swiper('.project-slider', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        effect: 'fade',
        fadeEffect: { crossFade: true }
    });

    // --- 5. Particles.js Configuration ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff88" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ff88",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } }
            },
            "retina_detect": true
        });
    }
});
