// Add smooth scroll behavior to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Add animation classes on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-title, .hero-text, .hero-buttons, .hero-image').forEach((el) => {
    observer.observe(el);
});

// Also observe feature and testimonial cards to reveal them on scroll
document.querySelectorAll('.feature-card, .testimonial-card').forEach((el) => {
    observer.observe(el);
});

// Also observe event cards for scroll reveal
document.querySelectorAll('.event-card').forEach((el) => {
    observer.observe(el);
});

// Also observe story sections on the about page and two-column blocks
document.querySelectorAll('.story-section, .two-columns').forEach((el) => {
    observer.observe(el);
});

// Observe blog article cards for reveal
document.querySelectorAll('.article-card').forEach((el) => {
    observer.observe(el);
});
