document.addEventListener("DOMContentLoaded", function() {
    initializeCanvas();
    loadTermsFromFile();
    initializeModal();
  });
  
  function initializeCanvas() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById("constellations").appendChild(canvas);
  
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    const stars = createStars(300);
    const mouse = { x: undefined, y: undefined };
  
    window.addEventListener('mousemove', e => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    function draw() {
      updateCanvas(ctx, stars, mouse);
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  function createStars(numStars) {
    return Array.from({ length: numStars }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 3 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      twinkleSpeed: Math.random() * 0.1,
      maxTwinkle: 2.5,
      minTwinkle: 0.5,
      twinkling: false
    }));
  }
  
  function updateCanvas(ctx, stars, mouse) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffffff";
  
    stars.forEach(star => {
      // Twinkling logic
      if (star.twinkling) {
        star.radius -= star.twinkleSpeed;
        if (star.radius <= star.minTwinkle) star.twinkling = false;
      } else {
        star.radius += star.twinkleSpeed;
        if (star.radius >= star.maxTwinkle) star.twinkling = true;
      }
  
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
  
      // Interaction with mouse
      if (mouse.x && mouse.y) {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          star.x += Math.cos(angle) * 1.2;
          star.y += Math.sin(angle) * 1.2;
        }
      }
  
      star.x += star.speedX;
      star.y += star.speedY;
  
      // Boundary conditions
      if (star.x < 0 || star.x > ctx.canvas.width) star.speedX = -star.speedX;
      if (star.y < 0 || star.y > ctx.canvas.height) star.speedY = -star.speedY;
    });
  }
  
  function loadTermsFromFile() {
    const modalContent = document.querySelector(".modal-content p");
    fetch('terms.txt')
      .then(response => response.text())
      .then(data => {
        if (modalContent) {
          modalContent.textContent = data;
        }
      })
      .catch((error) => console.error('Error fetching terms:', error));
  }
  
  function initializeModal() {
    const modal = document.getElementById("termsModal");
    const btn = document.getElementById("termsLink");
    const span = document.getElementsByClassName("close")[0];
  
    btn.onclick = function() {
      modal.style.display = "block";
    }
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }
  