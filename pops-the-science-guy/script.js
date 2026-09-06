document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNavigation = document.getElementById("mainNavigation");

    if (menuToggle && mainNavigation) {
        const closeMenu = () => {
            mainNavigation.classList.remove("is-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = mainNavigation.classList.toggle("is-open");
            menuToggle.classList.toggle("is-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });

        mainNavigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mainNavigation.classList.contains("is-open")) {
                closeMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) closeMenu();
        });
    }

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const previousButton = carousel.querySelector("[data-carousel-previous]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const pauseButton = carousel.querySelector("[data-carousel-pause]");
    const pauseIcon = carousel.querySelector("[data-pause-icon]");
    const pauseLabel = carousel.querySelector("[data-pause-label]");
    const status = carousel.querySelector("[data-carousel-status]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let isPaused = reduceMotion.matches;
    let rotationTimer = null;
    let pointerStartX = null;

    const reportSelection = (index, method) => {
        if (typeof window.gtag === "function") {
            window.gtag("event", "select_content", {
                content_type: "pops_science_carousel",
                item_id: `volume_1_card_${index + 1}`,
                selection_method: method
            });
        }
    };

    const render = (announce = false) => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, index) => {
            const isCurrent = index === currentIndex;
            slide.setAttribute("aria-hidden", String(!isCurrent));
            slide.querySelectorAll("a, button").forEach((control) => {
                control.tabIndex = isCurrent ? 0 : -1;
            });
        });

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        if (announce) status.textContent = `Card ${currentIndex + 1} of ${slides.length}`;
    };

    const stopRotation = () => {
        window.clearInterval(rotationTimer);
        rotationTimer = null;
    };

    const startRotation = () => {
        stopRotation();
        if (!isPaused && !document.hidden) {
            rotationTimer = window.setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                render(false);
            }, 7000);
        }
    };

    const goTo = (index, method) => {
        currentIndex = (index + slides.length) % slides.length;
        render(true);
        reportSelection(currentIndex, method);
        startRotation();
    };

    const updatePauseButton = () => {
        pauseButton.setAttribute("aria-pressed", String(isPaused));
        pauseIcon.textContent = isPaused ? "▶" : "Ⅱ";
        pauseLabel.textContent = isPaused ? "Play" : "Pause";
    };

    previousButton.addEventListener("click", () => goTo(currentIndex - 1, "previous_button"));
    nextButton.addEventListener("click", () => goTo(currentIndex + 1, "next_button"));
    dots.forEach((dot, index) => dot.addEventListener("click", () => goTo(index, "dot")));

    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        updatePauseButton();
        startRotation();
    });

    carousel.addEventListener("pointerdown", (event) => {
        pointerStartX = event.clientX;
    });

    carousel.addEventListener("pointerup", (event) => {
        if (pointerStartX === null) return;
        const distance = event.clientX - pointerStartX;
        pointerStartX = null;
        if (Math.abs(distance) < 45) return;
        goTo(currentIndex + (distance < 0 ? 1 : -1), "swipe");
    });

    carousel.addEventListener("pointercancel", () => {
        pointerStartX = null;
    });

    document.addEventListener("visibilitychange", startRotation);

    reduceMotion.addEventListener("change", (event) => {
        isPaused = event.matches;
        updatePauseButton();
        startRotation();
    });

    render(false);
    updatePauseButton();
    startRotation();
});
