(function () {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
            if (!window.chatbase.q) {
                window.chatbase.q = [];
            }
            window.chatbase.q.push(args);
        };

        window.chatbase = new Proxy(window.chatbase, {
            get(target, property) {
                if (property === "q") {
                    return target.q;
                }
                return (...args) => target(property, ...args);
            },
        });
    }

    const loadChatbase = () => {
        if (document.getElementById("icclEzczW9Cv63zBtbYMS")) {
            return;
        }

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "icclEzczW9Cv63zBtbYMS";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
        loadChatbase();
    } else {
        window.addEventListener("load", loadChatbase, { once: true });
    }
})();
