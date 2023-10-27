document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.getElementById("constellations").appendChild(canvas);

    // Initialize modal elements
    const modal = document.getElementById("termsModal");
    const btn = document.getElementById("termsLink");
    const span = document.getElementsByClassName("close")[0];
    const modalContent = document.querySelector(".modal-content p");

    let numberOfStars = 300;
    let maxLineDistance = 100;

    // Function to set responsive values
    function setResponsiveValues() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if(window.innerWidth < 768) {
            numberOfStars = 100;
            maxLineDistance = 50;
        } else {
            numberOfStars = 300;
            maxLineDistance = 100;
        }
    }

    setResponsiveValues();

    // Listen for resize events to make it responsive
    window.addEventListener('resize', setResponsiveValues);

    const stars = Array.from({ length: numberOfStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        twinkleSpeed: Math.random() * 0.1,
        maxTwinkle: 2.5,
        minTwinkle: 0.5,
        twinkling: false
    }));

    const mouse = { x: undefined, y: undefined };
    window.addEventListener('mousemove', e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        
        stars.forEach(star => {
            // Twinkle logic
            star.twinkling ? star.radius -= star.twinkleSpeed : star.radius += star.twinkleSpeed;
            star.twinkling = star.radius <= star.minTwinkle ? false : star.radius >= star.maxTwinkle ? true : star.twinkling;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Mouse interaction
            const dx = star.x - mouse.x;
            const dy = star.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                star.x += Math.cos(angle) * 1.2;
                star.y += Math.sin(angle) * 1.2;
            } else {
                star.x += star.speedX;
                star.y += star.speedY;
            }

            // Boundary checks
            if (star.x < 0 || star.x > canvas.width) star.speedX = -star.speedX;
            if (star.y < 0 || star.y > canvas.height) star.speedY = -star.speedY;
        });

        // Draw constellations
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 0.3;

        stars.forEach((star1, i) => {
            stars.slice(i + 1).forEach(star2 => {
                const dx = star1.x - star2.x;
                const dy = star1.y - star2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxLineDistance) {
                    ctx.beginPath();
                    ctx.moveTo(star1.x, star1.y);
                    ctx.lineTo(star2.x, star2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(draw);
    }

    draw();
});
