document.addEventListener("DOMContentLoaded", () => {
    // 1. Инициализация GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Анимация Hero Screen
    const tlHero = gsap.timeline();
    tlHero.from(".badge", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-jar", { scale: 0.8, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "-=0.4")
          .from(".trust-triggers span", { y: 10, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.8");

    // 3. Анимация WOW-секции (Сборка 4 ингредиентов)
    // Размещаем ингредиенты по углам перед анимацией
    gsap.set("#ing-oregano", { top: "10%", left: "10%" });
    gsap.set("#ing-clove", { top: "10%", right: "10%" });
    gsap.set("#ing-lemon", { bottom: "10%", left: "10%" });
    gsap.set("#ing-tmin", { bottom: "10%", right: "10%" });

    const tlWow = gsap.timeline({
        scrollTrigger: {
            trigger: "#wow",
            start: "top center",
            end: "center center",
            scrub: 1 // Привязка к скроллу
        }
    });

    // Ингредиенты летят в центр
    tlWow.to(".ingredient-sphere", {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        xPercent: -50,
        yPercent: -50,
        duration: 2,
        ease: "power2.inOut"
    })
    // Ингредиенты исчезают
    .to(".ingredient-sphere", { opacity: 0, scale: 0, duration: 0.5 })
    // Появляется и пульсирует ядро OILX
    .to("#oilx-core", { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" });

    // 4. Появление карточек (Fade-up)
    const fadeElements = gsap.utils.toArray('.glass-card');
    fadeElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // 5. Логика FAQ (Аккордеон)
    const accHeaders = document.querySelectorAll('.acc-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const body = this.nextElementSibling;
            const isOpen = body.style.display === 'block';
            
            // Закрываем все
            document.querySelectorAll('.acc-body').forEach(b => b.style.display = 'none');
            document.querySelectorAll('.acc-header').forEach(h => h.style.color = 'inherit');
            
            // Открываем кликнутый
            if (!isOpen) {
                body.style.display = 'block';
                this.style.color = 'var(--gold)';
                // Простая анимация появления
                gsap.from(body, { opacity: 0, y: -10, duration: 0.3 });
            }
        });
    });

    // 6. Современная анимация: Magnetic Buttons (Магнитные кнопки)
    const magneticBtns = document.querySelectorAll('.btn-primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
});
