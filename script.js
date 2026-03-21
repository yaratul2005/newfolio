// =========================================
// Custom Cursor Logic
// =========================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .bento-box, .project-card');

document.addEventListener('mousemove', (e) => {
    // Update cursor position directly for the small dot
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Smoothly follow the cursor with the larger circle
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        follower.classList.add('cursor-hover');
    });

    link.addEventListener('mouseleave', () => {
        follower.classList.remove('cursor-hover');
    });
});

// =========================================
// Navigation Bar Scroll Effect
// =========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// Mobile Menu Toggle
// =========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// =========================================
// Intersection Observer for Scroll Animations
// =========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: you can unobserve to trigger animation only once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements to animate
const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right, .slide-in-bottom, .scale-in');

animatedElements.forEach(el => {
    observer.observe(el);
});

// Trigger immediate animation for hero elements if already in view or not waiting for observer
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});

// =========================================
// Smooth Scroll offset for fixed navbar
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// Image Lightbox Modal
// =========================================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal-close");
const galleryImages = document.querySelectorAll(".term-img, .edu-img, .profile-img");

galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener("click", function () {
        if (modal) {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });
});

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
