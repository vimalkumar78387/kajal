/* ==========================================
   KAJAL MISHRA - PORTFOLIO SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback: hide after 3s regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Back to Top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // --- Active Nav Link ---
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // --- Animated Counters ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;

            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(start + (target - start) * eased);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            counter.dataset.animated = 'true';
            requestAnimationFrame(update);
        });
    }

    // --- Skill Bars Animation ---
    function animateSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
            if (fill.dataset.animated) return;
            const width = fill.dataset.width;
            fill.style.width = width + '%';
            fill.dataset.animated = 'true';
        });
    }

    // --- Scroll Reveal ---
    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-content, .about-sidebar, .timeline-item, ' +
            '.service-card, .case-card, .skills-column, .edu-card, .award-card, ' +
            '.contact-card, .contact-form-wrapper, .highlight-item'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Trigger counters when hero stats are visible
                    if (entry.target.closest('.hero') || entry.target.closest('#hero')) {
                        animateCounters();
                    }

                    // Trigger skill bars
                    if (entry.target.closest('.skills') || entry.target.closest('#skills')) {
                        animateSkillBars();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));

        // Observe hero stats and skills section separately
        const heroStats = document.querySelector('.hero-stats');
        const skillsSection = document.querySelector('#skills');

        if (heroStats) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) animateCounters();
                });
            }, { threshold: 0.5 });
            heroObserver.observe(heroStats);
        }

        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) animateSkillBars();
                });
            }, { threshold: 0.2 });
            skillsObserver.observe(skillsSection);
        }
    }

    setupRevealAnimations();

    // --- Staggered Reveal for Grids ---
    const gridContainers = document.querySelectorAll('.services-grid, .cases-grid, .awards-grid');
    gridContainers.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject} - from ${name}`);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
            );
            const mailtoLink = `mailto:kajalmi61@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            window.location.href = mailtoLink;

            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Opening Email Client...</span>';
            btn.style.background = '#52B788';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
