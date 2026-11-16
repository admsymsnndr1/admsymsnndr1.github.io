(function () {
    var root = document.documentElement;

    function read(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    /* ---------- language ---------- */
    function setLang(lang) {
        root.setAttribute("data-lang", lang);
        root.setAttribute("lang", lang);
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            btn.textContent = lang === "id" ? "EN" : "ID";
            btn.setAttribute("aria-label", lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia");
        });
        var title = document.querySelector("meta[name='title-" + lang + "']");
        if (title) document.title = title.content;
    }

    var savedLang = read("lang");
    var browserLang = (navigator.language || "en").toLowerCase().indexOf("id") === 0 ? "id" : "en";
    setLang(savedLang || browserLang);

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var next = root.getAttribute("data-lang") === "id" ? "en" : "id";
            setLang(next);
            write("lang", next);
        });
    });

    /* ---------- theme ---------- */
    var savedTheme = read("theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            write("theme", next);
        });
    });

    /* ---------- footer year ---------- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
