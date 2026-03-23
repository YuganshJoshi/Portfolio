document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(".reveal");
    const pageLoader = document.getElementById("page-loader");

    // Loader
    window.addEventListener("load", () => {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
        }
    });

    // Sticky header styling on scroll
    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll);

    // Mobile menu toggle
    const closeMobileMenu = () => {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove("active");
        hamburger.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    const openMobileMenu = () => {
        if (!navLinks || !hamburger) return;
        navLinks.classList.add("active");
        hamburger.classList.add("is-active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    };

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            const isActive = navLinks.classList.contains("active");

            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close mobile menu after clicking a nav link
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 860) {
            closeMobileMenu();
        }
    });

    // Active nav link highlight on scroll
    const setActiveNav = () => {
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - 160 && window.scrollY < sectionTop + sectionHeight - 160) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active");
            const href = item.getAttribute("href");

            if (href === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });

        // Keep Home active near top
        if (window.scrollY < 120) {
            navItems.forEach((item) => item.classList.remove("active"));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add("active");
            }
        }
    };

    setActiveNav();
    window.addEventListener("scroll", setActiveNav);

    // Reveal on scroll
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    // Close menu if user presses Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
            closeMobileMenu();
        }
    });
});