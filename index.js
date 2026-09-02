/* ============================================================
   DAY / NIGHT MODE
   Day is the default; the choice is remembered between visits.
   ============================================================ */

(function () {
    const body = document.body;
    const saved = localStorage.getItem("theme");

    // light is the default; only a saved choice of "dark" switches it
    if (saved === "dark") {
        body.classList.add("dark-mode");
    }

    document.addEventListener("DOMContentLoaded", function () {
        const themeBtn = document.getElementById("themeToggle");
        if (!themeBtn) return;

        const themeIcon = themeBtn.querySelector("i");

        function syncButton() {
            const isDark = body.classList.contains("dark-mode");
            // a sun while it is night (click for day), a moon while it is day
            themeIcon.className = isDark ? "bi bi-brightness-high" : "bi bi-moon";
            const label = isDark ? "Switch to day mode" : "Switch to night mode";
            themeBtn.setAttribute("title", label);
            themeBtn.setAttribute("aria-label", label);
        }

        themeBtn.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
            syncButton();
        });

        syncButton();
    });
})();


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");
    if (!navToggle || !siteNav) return;

    function setOpen(open) {
        siteNav.classList.toggle("open", open);
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        navToggle.querySelector("i").className = open ? "bi bi-x" : "bi bi-list";
    }

    navToggle.addEventListener("click", function () {
        setOpen(!siteNav.classList.contains("open"));
    });

    // close the menu once a section has been chosen
    siteNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setOpen(false);
        });
    });
});


/* ============================================================
   EXPANDABLE PROJECT DESCRIPTIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".more-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const moreText = this.previousElementSibling;
            if (!moreText) return;

            const isOpen = moreText.style.display === "inline";
            moreText.style.display = isOpen ? "none" : "inline";
            this.textContent = isOpen ? "More" : "Less";
        });
    });
});


/* ============================================================
   PROJECT SCREENSHOT VIEWER
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("galleryOverlay");
    const galleryImage = document.getElementById("gallery-image");
    if (!overlay || !galleryImage) return;

    const prevBtn = overlay.querySelector(".gallery-prev");
    const nextBtn = overlay.querySelector(".gallery-next");
    const closeBtn = overlay.querySelector(".gallery-close");

    let currentImages = [];
    let currentIndex = 0;

    function showImage() {
        if (currentImages.length === 0) return;
        galleryImage.src = currentImages[currentIndex];
        // the arrows are only useful when there is more than one screenshot
        const many = currentImages.length > 1;
        prevBtn.style.display = many ? "inline-flex" : "none";
        nextBtn.style.display = many ? "inline-flex" : "none";
    }

    function closeGallery() {
        overlay.style.display = "none";
    }

    document.querySelectorAll(".open-gallery").forEach(function (button) {
        button.addEventListener("click", function () {
            currentImages = this.getAttribute("data-images").split(",");
            currentIndex = 0;
            showImage();
            overlay.style.display = "flex";
        });
    });

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            showImage();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            showImage();
        }
    });

    closeBtn.addEventListener("click", closeGallery);

    // click outside the image, or press Escape, to dismiss
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) closeGallery();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeGallery();
    });
});
