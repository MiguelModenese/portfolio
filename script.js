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


  // --- NOVO: ANIMAÇÃO 3: ONDA SVG APÓS O CARROSSEL ---

        // Caminhos para a animação de "morph" do SVG Path:
        // flatPath (Caminho inicial): Uma linha reta na base (y=100)
        const flatPath = "M0,100 C150,100 280,100 500,100 C720,100 850,100 1000,100 L1000,100 L0,100 Z";
        // wavePath (Caminho final): Uma onda com picos em y=50 e vales em y=150 (dentro do viewBox)
        const wavePath = "M0,100 C150,50 280,150 500,100 C720,50 850,150 1000,100 L1000,100 L0,100 Z";


        // 1. Define o caminho inicial (já feito no HTML, mas para garantir)
        gsap.set("#wave-path", { attr: { d: flatPath } });

        // 2. Cria a animação de onda
        gsap.to("#wave-path", {
            attr: { d: wavePath },
            ease: "power1.inOut", 
            scrollTrigger: {
                trigger: ".horizontal-scroll-section", // O final do carrossel é o gatilho
                start: "bottom top", // Começa quando a parte inferior do carrossel toca o topo da viewport
                end: "bottom -=300", // Termina após rolar mais 300px
                scrub: 1, // Liga o progresso da animação ao scroll
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
