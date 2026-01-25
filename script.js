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

// 1. Preloader Exit & Text Scramble Trigger
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger Scramble Text after preloader is gone
                initScrambleText();
            }, 800);
        }, 1500); // Wait 1.5s reading time
    } else {
        initScrambleText();
    }
});

// 2. Mouse Spotlight Effect
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});


// 3. "Hacker" Text Scramble Effect
function initScrambleText() {
    const elements = document.querySelectorAll('[data-scramble]');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

    elements.forEach(element => {
        let iteration = 0;
        const originalText = element.dataset.value || element.innerText; // Use data-value if available, else innerText
        element.dataset.value = originalText; // Store for valid resets if needed

        let interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Speed of decoding
        }, 20);
    });
}


// 4. Command Palette (Cmd+K)
const cmdPalette = document.getElementById('cmd-palette');
const cmdBackdrop = document.getElementById('cmd-backdrop');
const cmdModal = document.getElementById('cmd-modal');
const cmdInput = document.getElementById('cmd-input');
const cmdResults = document.getElementById('cmd-results');

const commands = [
    { name: 'Go to About', icon: 'User', action: () => window.location.href = '#about' },
    { name: 'View Projects', icon: 'Grid', action: () => window.location.href = '#portfolio' },
    { name: 'Check Skills', icon: 'Cpu', action: () => window.location.href = '#skills' },
    { name: 'Contact Me', icon: 'Mail', action: () => window.location.href = '#contact' },
    { name: 'View Resume', icon: 'FileText', action: () => window.open('/assets/mirza-resume.pdf', '_blank') },
    { name: 'GitHub Profile', icon: 'Github', action: () => window.open('https://github.com/v9mirza', '_blank') },
    {
        name: 'Copy Email', icon: 'Copy', action: () => {
            navigator.clipboard.writeText('v9mirza@proton.me');
            alert('Email copied to clipboard!');
        }
    },
];

function toggleCmdPalette() {
    if (cmdPalette.classList.contains('hidden')) {
        // Open
        cmdPalette.classList.remove('hidden');
        // Animate in
        requestAnimationFrame(() => {
            cmdBackdrop.classList.remove('opacity-0');
            cmdModal.classList.remove('scale-95', 'opacity-0');
            cmdModal.classList.add('scale-100', 'opacity-100');
        });
        cmdInput.value = '';
        cmdInput.focus();
        renderCommands(commands);
    } else {
        // Close
        cmdBackdrop.classList.add('opacity-0');
        cmdModal.classList.remove('scale-100', 'opacity-100');
        cmdModal.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            cmdPalette.classList.add('hidden');
        }, 200); // Wait for transition
    }
}

function renderCommands(filterCommands) {
    if (!cmdResults) return;

    if (filterCommands.length === 0) {
        cmdResults.innerHTML = `
            <div class="px-5 py-4 text-sm text-zinc-500 font-mono text-center">
                No commands found.
            </div>
        `;
        return;
    }

    const html = filterCommands.map((cmd, index) => `
        <button onclick="handleCommand(${index})" class="cmd-item w-full text-left px-4 py-3 mx-2 rounded-lg text-[#c9d1d9] hover:bg-white/5 hover:text-white flex items-center gap-3 transition-colors group">
            <span class="text-zinc-600 group-hover:text-[#58a6ff] transition-colors">
                ${getIcon(cmd.icon)}
            </span>
            <span class="font-mono text-sm">${cmd.name}</span>
        </button>
    `).join('');

    cmdResults.innerHTML = `
        <div class="px-2">
            <div class="text-xs font-mono text-zinc-600 px-3 py-2 uppercase tracking-wider mb-1">Commands</div>
            ${html}
        </div>
    `;

    // Attach click handlers dynamically if needed, or relying on onclick attribute for simplicity in vanilla JS
    window.handleCommand = (index) => {
        filterCommands[index].action();
        toggleCmdPalette();
    };
}

function getIcon(name) {
    // Simple SVG icons
    const icons = {
        User: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        Grid: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
        Cpu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
        Mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        FileText: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        Github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
        Copy: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
    };
    return icons[name] || icons['Grid'];
}


// Event Listeners for Command Palette
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCmdPalette();
    }
    if (e.key === 'Escape' && !cmdPalette.classList.contains('hidden')) {
        toggleCmdPalette();
    }
});

cmdBackdrop.addEventListener('click', toggleCmdPalette);

cmdInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = commands.filter(cmd => cmd.name.toLowerCase().includes(value));
    renderCommands(filtered);
});


// 5. Magnetic Buttons
const magneticButtons = document.querySelectorAll('nav a, #portfolio a, #contact a, button');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});
