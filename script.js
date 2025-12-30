// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

function toggleMenu() {
    menu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

btn.addEventListener('click', toggleMenu);

// Close menu when clicking selection
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (!menu.classList.contains('hidden')) {
            toggleMenu();
        }
    });
});

// Intersection Observer for Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we can stop observing this specific element
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Scrollspy (Active Navigation)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav .space-x-8 a, nav #mobile-menu a');

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-neutral-500');
            });

            // Add active class to corresponding link
            const id = entry.target.getAttribute('id');
            // We select all links pointing to this id (both desktop and mobile)
            const activeLinks = document.querySelectorAll(`nav a[href="#${id}"]`);
            activeLinks.forEach(link => {
                link.classList.remove('text-neutral-500');
                link.classList.add('text-white');
            });
        }
    });
}, {
    threshold: 0.1, // Even more permissive
    rootMargin: "-5% 0px -5% 0px" // Almost full screen
});

sections.forEach(section => {
    scrollSpyObserver.observe(section);
});

// Fix for Contact section (Bottom of page detection)
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        // We are at the bottom, force Contact active
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-neutral-500');
        });

        const contactLinks = document.querySelectorAll('nav a[href="#contact"]');
        contactLinks.forEach(link => {
            link.classList.remove('text-neutral-500');
            link.classList.add('text-white');
        });
    }
});

// --- Modern Aesthetic Features ---

// 1. Preloader Exit
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500); // Wait 1.5s reading time
    }
});
