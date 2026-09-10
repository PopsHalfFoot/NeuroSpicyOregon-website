const newsJump = document.getElementById("newsJump");
const newsJumpButton = document.getElementById("newsJumpButton");

if (newsJump && newsJumpButton) {
    newsJump.addEventListener("change", () => {
        newsJumpButton.disabled = !newsJump.value;
    });

    newsJumpButton.addEventListener("click", () => {
        const storyId = newsJump.value;
        const story = storyId ? document.getElementById(storyId) : null;

        if (!story) {
            return;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        history.pushState(null, "", `#${storyId}`);
        story.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
        });

        story.setAttribute("tabindex", "-1");
        story.focus({ preventScroll: true });
        story.addEventListener("blur", () => story.removeAttribute("tabindex"), { once: true });

        if (typeof window.gtag === "function") {
            window.gtag("event", "select_content", {
                content_type: "news_story",
                item_id: storyId,
                news_title: newsJump.options[newsJump.selectedIndex].text
            });
        }
    });
}
