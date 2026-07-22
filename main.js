// Инициализация GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    
    // Анимации главного экрана (Hero)
    const tlHero = gsap.timeline();
    
    tlHero.from(".logo-gold", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".jar-mockup", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
          .from(".drop", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, "-=0.5")
          .from(".hero .important-note", { y: 30, opacity: 0, duration: 0.8 }, "-=0.2");

    // Анимация "рождения" формулы при скролле (капли стягиваются к банке)
    gsap.to(".drop", {
        scrollTrigger: {
            trigger: ".hero-visual",
            start: "center center",
            end: "bottom top",
            scrub: 1,
        },
        x: 0,
        y: 0,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.5)",
        opacity: 0,
        duration: 1
    });

    // Анимация секции "Кишечник"
    const tlGut = gsap.timeline({
        scrollTrigger: {
            trigger: "#gut",
            start: "top 70%",
            end: "bottom 80%",
            toggleActions: "play none none reverse"
        }
    });

    tlGut.from("#gut .section-title", { y: 30, opacity: 0, duration: 0.6 })
         .from("#gut .section-subtitle", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
         .from(".body-mockup", { opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.4")
         .from(".info-item", { x: (i) => i % 2 === 0 ? -50 : 50, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.4")
         .from(".glass-note", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2");

    // Анимация секции FAQ (Логика формулы)
    gsap.from(".faq-card", {
        scrollTrigger: {
            trigger: "#faq",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Навигация (смена фона при скролле)
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: {className: "scrolled", targets: ".navbar"}
    });
});
