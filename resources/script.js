/* =========================================================
   NEURO SPICY OREGON
   COMMUNITY RESOURCES
   resources/script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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


        mainNavigation
            .querySelectorAll("a")
            .forEach((link) => {

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


    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    document
        .querySelectorAll("[data-ga-content-id]")
        .forEach((link) => {

            link.addEventListener("click", () => {

                if (typeof window.gtag !== "function") {
                    return;
                }

                window.gtag("event", "select_content", {
                    content_type: "research_source",
                    item_id: link.dataset.gaContentId,
                    source_topic: link.dataset.gaContentId,
                    content_title:
                        link.dataset.gaContentTitle ||
                        link.textContent.trim()
                });
            });
        });


    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
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


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mainNavigation &&
            mainNavigation.classList.contains("is-open")
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

            menuToggle.focus();
        }
    });


    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

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
                    document.querySelector(".site-header");

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    14;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        });
});
