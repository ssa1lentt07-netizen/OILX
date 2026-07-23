document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Sticky Navbar Logic
    const navbar = document.getElementById('nav-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Keep it somewhat dark or let CSS handle it
            if(window.scrollY === 0) navbar.classList.remove('scrolled');
        }
    });

    // 2. Falling Golden Drops Animation
    const dropsContainer = document.getElementById('drops-container');
    const createDrop = () => {
        if (!dropsContainer) return;
        const drop = document.createElement('div');
        drop.classList.add('drop-item');
        
        // Randomize drop properties
        const sizeMultiplier = Math.random() * 0.8 + 0.4;
        drop.style.transform = `scale(${sizeMultiplier})`;
        drop.style.left = `${Math.random() * 100}vw`;
        
        // Random fall duration and delay
        const duration = Math.random() * 5 + 5; // 5 to 10 seconds
        const delay = Math.random() * 5;
        
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        
        dropsContainer.appendChild(drop);
        
        // Remove drop after animation to prevent DOM overload
        setTimeout(() => {
            drop.remove();
        }, (duration + delay) * 1000);
    };

    // Create drops continuously
    setInterval(createDrop, 800);
    // Initial batch
    for(let i=0; i<10; i++) {
        setTimeout(createDrop, Math.random() * 2000);
    }

    // 3. Magnetic Buttons (from previous design)
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

    // 4. GSAP Scroll Animations for Sections
    gsap.utils.toArray('section').forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 5. Accordion Logic
    const accHeaders = document.querySelectorAll('.acc-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const body = this.nextElementSibling;
            const isOpen = body.style.display === 'block';
            
            // Close all
            document.querySelectorAll('.acc-body').forEach(b => {
                b.style.display = 'none';
                b.previousElementSibling.style.color = '#fff';
            });
            
            if (!isOpen) {
                body.style.display = 'block';
                this.style.color = 'var(--gold)';
                gsap.from(body, { opacity: 0, y: -10, duration: 0.3 });
            }
        });
    });
});
