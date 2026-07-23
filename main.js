document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 0. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 0.5 Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if(cursor && cursorFollower) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        gsap.to({}, 0.016, {
            repeat: -1,
            onRepeat: function() {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;
                
                gsap.set(cursorFollower, {
                    css: {
                        left: posX - 20,
                        top: posY - 20
                    }
                });
                gsap.set(cursor, {
                    css: {
                        left: mouseX - 4,
                        top: mouseY - 4
                    }
                });
            }
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Add hover effect to links and interactive elements
        const hoverElements = document.querySelectorAll('a, button, .comp-card, .product-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('active');
            });
        });
    }

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

    // 4. GSAP Scroll Animations for Sections & Text Reveal
    gsap.utils.toArray('section').forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Simple Text Reveal for Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Parallax effect for product images
    gsap.utils.toArray('.product-img-wrap img').forEach(img => {
        gsap.to(img, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Performant GSAP Parallax for Background Banners
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
            yPercent: 20, // Move down smoothly as you scroll
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
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

    // 6. Auto-scrolling Reviews
    const reviewSlider = document.querySelector('.reviews-slider');
    if (reviewSlider) {
        let isHovered = false;
        let isDown = false;
        let startX;
        let scrollLeft;

        // Auto-scroll loop
        const autoScroll = () => {
            if (!isHovered && !isDown) {
                reviewSlider.scrollLeft += 1;
                if (reviewSlider.scrollLeft >= (reviewSlider.scrollWidth - reviewSlider.clientWidth)) {
                    reviewSlider.scrollLeft = 0; // Loop back
                }
            }
            requestAnimationFrame(autoScroll);
        };
        requestAnimationFrame(autoScroll);

        // Events to pause auto-scroll
        reviewSlider.addEventListener('mouseenter', () => isHovered = true);
        reviewSlider.addEventListener('mouseleave', () => isHovered = false);
        reviewSlider.addEventListener('touchstart', () => isHovered = true);
        reviewSlider.addEventListener('touchend', () => isHovered = false);

        // Manual dragging logic
        reviewSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            isHovered = true; // Pause auto scroll
            reviewSlider.style.cursor = 'grabbing';
            startX = e.pageX - reviewSlider.offsetLeft;
            scrollLeft = reviewSlider.scrollLeft;
        });
        reviewSlider.addEventListener('mouseleave', () => {
            isDown = false;
            reviewSlider.style.cursor = 'grab';
        });
        reviewSlider.addEventListener('mouseup', () => {
            isDown = false;
            reviewSlider.style.cursor = 'grab';
        });
        reviewSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            reviewSlider.scrollLeft = scrollLeft - walk;
        });
    }
});
