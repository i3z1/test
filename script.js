document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById("constellations").appendChild(canvas);
  
    const stars = [];
  
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#ffffff";
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.speedX;
        star.y += star.speedY;
  
        if (star.x < 0 || star.x > canvas.width) star.speedX = -star.speedX;
        if (star.y < 0 || star.y > canvas.height) star.speedY = -star.speedY;
      });
  
      for (let i = 0; i < stars.length; i++) {
        const star1 = stars[i];
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          if (Math.abs(star1.x - star2.x) < 100 && Math.abs(star1.y - star2.y) < 100) {
            ctx.lineTo(star2.x, star2.y);
          }
        }
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  });
  