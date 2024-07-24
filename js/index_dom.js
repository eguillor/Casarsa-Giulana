import scrollSpy from "./dom/scroll_espia.js";


const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    scrollSpy();

    window.addEventListener('scroll', (ev1) => {
        // y a todos los elementos con la clase paused...
        document.querySelectorAll(".paused").forEach(elm => {
            if (isVisible(elm)) // que sean visibles...
                elm.classList.remove("paused"); // les quitamos la clase paused
        })
    });
})