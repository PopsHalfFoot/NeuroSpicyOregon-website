/* =========================================================
   NEURO SPICY COLLECTIVE
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. WAIT FOR THE PAGE TO LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       02. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNavigation = document.getElementById("mainNavigation");

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNavigation.classList.toggle("is-open");

            menuToggle.classList.toggle(
                "is-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

        });


        /* Close mobile navigation after clicking a link */

        const navigationLinks =
            mainNavigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

    }


    /* =====================================================
       03. CURRENT YEAR IN FOOTER
       ===================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       04. CLOSE MOBILE MENU WHEN WINDOW RESIZES
       ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 850 &&
            mainNavigation &&
            menuToggle
        ) {

            mainNavigation.classList.remove("is-open");

            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });


    /* =====================================================
       05. ESCAPE KEY CLOSES MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                mainNavigation &&
                mainNavigation.classList.contains("is-open")
            ) {

                mainNavigation.classList.remove(
                    "is-open"
                );

                menuToggle.classList.remove(
                    "is-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.focus();

            }

        }

    });


    /* =====================================================
       06. SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(
                    ".site-header"
                );

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       07. HEADER SHADOW WHILE SCROLLING
       ===================================================== */

    const siteHeader =
        document.querySelector(
            ".site-header"
        );

    const updateHeader =
        () => {

            if (!siteHeader) {
                return;
            }

            if (window.scrollY > 20) {

                siteHeader.classList.add(
                    "is-scrolled"
                );

            } else {

                siteHeader.classList.remove(
                    "is-scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       08. FADE-IN SECTIONS
       ===================================================== */

    /*
        We only add this behavior if the browser supports
        IntersectionObserver.

        This means the site still works normally in older
        browsers.
    */

    if ("IntersectionObserver" in window) {

        const animatedElements =
            document.querySelectorAll(
                ".future-card, " +
                ".interest-card, " +
                ".timeline-item, " +
                ".leader-card, " +
                ".journal-card, " +
                ".blog-card"
            );


        animatedElements.forEach((element) => {

            element.classList.add(
                "scroll-reveal"
            );

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       09. CONSOLE MESSAGE
       ===================================================== */

    /*
        This is intentionally simple.

        It gives us a quick way to confirm that the
        Neuro Spicy JavaScript file loaded correctly.
    */

    console.log(
        "Neuro Spicy Collective website loaded."
    );


});