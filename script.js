gsap.registerPlugin(ScrollTrigger);


        // --- ANIMAÇÃO 1: ZOOM DO TEXTO ---
        gsap.to(".zoom-section h1", {
            scale: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".zoom-section",
                start: "top top",
                end: "+=1000",
                scrub: 1.5,
                pin: true,
            }
        });


        // --- ANIMAÇÃO 2: CARROSSEL HORIZONTAL ---
        const cardsContainer = document.querySelector(".cards-container");
        const firstCard = document.querySelector(".card:first-child"); // Pega o primeiro card
        const lastCard = document.querySelector(".card:last-child");


        const calculateStartX = () => {
            const screenCenter = window.innerWidth / 2;
            const firstCardCenter = firstCard.offsetWidth / 2;
            // Calcula o deslocamento X inicial necessário para centralizar o primeiro card
            return screenCenter - firstCardCenter - parseFloat(window.getComputedStyle(cardsContainer).paddingLeft); 
        };

        const calculateEndX = () => {
            const screenCenter = window.innerWidth / 2;
            const lastCardCenter = lastCard.offsetLeft + (lastCard.offsetWidth / 2);
            // O deslocamento final é o mesmo de antes
            return screenCenter - lastCardCenter;
        };


        // Define a posição INICIAL do cardsContainer para centralizar o primeiro card
        gsap.set(cardsContainer, {
            x: calculateStartX
        });
        
        gsap.to(cardsContainer, {
            x: calculateEndX, // Anima até o deslocamento que centraliza o último card
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-section",
                start: "top top ",
                end: "+=3500",
                scrub: 3,
                pin: true,
                invalidateOnRefresh: true
            }
        });


        // --- SCROLL SUAVE COM GSAP (extra, para mais controle) ---
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute("href"));
                gsap.to(window, {duration: 3, scrollTo: target, ease: "power2.inOut"});
            });
        });