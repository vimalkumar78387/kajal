/* ==========================================
   KAJAL MISHRA - PORTFOLIO
   Modern Animations & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => preloader.classList.add('hidden');
    window.addEventListener('load', () => setTimeout(hidePreloader, 600));
    setTimeout(hidePreloader, 2500); // fallback

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;

    function onScroll() {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 40);
        backToTop.classList.toggle('visible', y > 500);
        updateActiveNav();
        lastScroll = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Back to top
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ========== MOBILE NAV ==========
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Create overlay element for mobile nav
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMobileNav() {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // ========== ACTIVE NAV LINK ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    // Assign animation classes to elements
    const animationMap = [
        { selector: '.section-header', anim: 'anim-fade-up' },
        { selector: '.about-content', anim: 'anim-fade-left' },
        { selector: '.about-sidebar', anim: 'anim-fade-right' },
        { selector: '.timeline-item', anim: 'anim-fade-up' },
        { selector: '.service-card', anim: 'anim-scale-up' },
        { selector: '.case-card', anim: 'anim-scale-up' },
        { selector: '.skills-column', anim: 'anim-fade-up' },
        { selector: '.edu-card', anim: 'anim-scale-up' },
        { selector: '.award-card', anim: 'anim-scale-up' },
        { selector: '.contact-card', anim: 'anim-fade-left' },
        { selector: '.contact-form-wrapper', anim: 'anim-fade-right' },
        { selector: '.highlight-item', anim: 'anim-fade-up' },
        { selector: '.relocation-banner', anim: 'anim-fade-up' },
        { selector: '.impact-metrics', anim: 'anim-fade-up' },
    ];

    const allAnimElements = [];
    animationMap.forEach(({ selector, anim }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add(anim);
            allAnimElements.push(el);
        });
    });

    // Add stagger class to grid parents
    document.querySelectorAll('.services-grid, .cases-grid, .awards-grid, .about-highlights, .education-grid').forEach(grid => {
        grid.classList.add('stagger-children');
    });

    // Intersection Observer for scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Don't unobserve - keep for re-entry if needed
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    allAnimElements.forEach(el => revealObserver.observe(el));

    // ========== ANIMATED COUNTERS ==========
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
            const target = parseInt(counter.dataset.count, 10);
            const duration = 2200;
            const startTime = performance.now();

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quart for snappy feel
                const eased = 1 - Math.pow(1 - progress, 4);
                counter.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(tick);
                else counter.textContent = target;
            }
            requestAnimationFrame(tick);
        });
    }

    // Trigger counters when hero stats come into view
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const counterObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) animateCounters();
        }, { threshold: 0.5 });
        counterObserver.observe(heroStats);
    }

    // ========== SKILL BAR ANIMATION ==========
    let skillsAnimated = false;
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                document.querySelectorAll('.skill-fill').forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = fill.dataset.width + '%';
                    }, i * 100); // stagger each bar
                });
            }
        }, { threshold: 0.2 });
        skillObserver.observe(skillsSection);
    }

    // ========== FLOATING CARDS REVEAL ==========
    setTimeout(() => {
        document.querySelectorAll('.floating-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('is-visible'), 1200 + i * 400);
        });
    }, 0);

    // ========== PARALLAX BACKGROUND SHAPES ==========
    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    function parallaxShapes() {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.5) { // only in hero area
            shapes.forEach((shape, i) => {
                const speed = (i + 1) * 0.03;
                shape.style.transform = `translate(${Math.sin(y * 0.002 + i) * 10}px, ${y * speed}px)`;
            });
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(parallaxShapes); ticking = true; }
    }, { passive: true });

    // ========== BUTTON HOVER RIPPLE EFFECT ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--x', x + '%');
            btn.style.setProperty('--y', y + '%');
        });
    });

    // ========== TILT EFFECT ON CARDS (desktop only) ==========
    if (window.matchMedia('(hover: hover) and (min-width: 769px)').matches) {
        const tiltCards = document.querySelectorAll('.service-card, .case-card, .award-card, .edu-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fd = new FormData(contactForm);
            const name = fd.get('name');
            const email = fd.get('email');
            const subject = fd.get('subject');
            const message = fd.get('message');

            const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject} - from ${name}`);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
            );
            window.location.href = `mailto:kajalmi61@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            const btn = contactForm.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<span>Opening Email Client...</span>';
            btn.style.background = '#52B788';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; contactForm.reset(); }, 3000);
        });
    }

    // ========== TYPED TEXT EFFECT ON HERO TITLE ==========
    const highlightEl = document.querySelector('.hero-title .highlight');
    if (highlightEl) {
        const originalText = highlightEl.textContent;
        highlightEl.textContent = '';
        let charIndex = 0;

        function typeChar() {
            if (charIndex < originalText.length) {
                highlightEl.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeChar, 60 + Math.random() * 40);
            }
        }
        // Start typing after hero animation plays
        setTimeout(typeChar, 1000);
    }

});
