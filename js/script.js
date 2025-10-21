gsap.registerPlugin(ScrollTrigger);

// --- ANIMAÇÃO 1: ZOOM DO TEXTO ---
gsap.to(".zoom-section h1", {
    scale: 50,
    ease: "none",
    scrollTrigger: {
        trigger: ".zoom-section",
        start: "top top",
        end: "+=1500",
        scrub: 1.5,
        pin: true,
    }
});

// --- ANIMAÇÃO 2: CARROSSEL HORIZONTAL ---
const cardsContainer = document.querySelector(".cards-container");
const lastCard = document.querySelector(".card:last-child");

const calculateEndX = () => {
    const screenCenter = window.innerWidth / 2;
    const lastCardCenter = lastCard.offsetLeft + (lastCard.offsetWidth / 2);
    return screenCenter - lastCardCenter;
};

gsap.to(cardsContainer, {
    x: calculateEndX,
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-scroll-section",
        start: "top top",
        end: "+=3000",
        scrub: 1.5,
        pin: true,
        invalidateOnRefresh: true
    }
});

// --- SCROLL SUAVE COM GSAP (extra, para mais controle) ---
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        gsap.to(window, {duration: 1, scrollTo: target, ease: "power2.inOut"});
    });
});