// Minimal interactivity for the portfolio page
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            event.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    // Light helper for placeholder buttons so they feel responsive now
    const placeholderButtons = document.querySelectorAll(
        "[data-placeholder]"
    );

    placeholderButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const message =
                button.getAttribute("data-placeholder") ||
                "You can wire this up to a real link or page later.";
            alert(message);
        });
    });

    // Dynamic year in the footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }
});
