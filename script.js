document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById("constellations").appendChild(canvas);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 500 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5),
        speedY: (Math.random() - 0.5),
        color: `rgba(${255}, ${255}, ${255}, ${Math.random()})` // random opacity
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
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            const dx = star.x - mouse.x;
            const dy = star.y - mouse.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                star.x += Math.cos(angle) * 3;
                star.y += Math.sin(angle) * 3;
            } else {
                star.x += star.speedX;
                star.y += star.speedY;
            }

            if (star.x < 0 || star.x > canvas.width) star.speedX = -star.speedX;
            if (star.y < 0 || star.y > canvas.height) star.speedY = -star.speedY;
        });

        ctx.strokeStyle = "#35333f";
        ctx.lineWidth = 0.2;

        stars.forEach((star1, i) => {
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);

            stars.slice(i + 1).forEach(star2 => {
                const dx = star1.x - star2.x;
                const dy = star1.y - star2.y;
                const distance = Math.sqrt(dx ** 2 + dy ** 2);

                if (distance < 100) {  // Reduced this distance to make smaller constellations
                    ctx.lineTo(star2.x, star2.y);
                }
            });

            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }

    draw();
});
