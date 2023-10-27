// script.js
document.addEventListener("DOMContentLoaded", function() {
    initializeModal();
    loadTermsFromFile();
  
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
  
    var modalContent = document.querySelector(".modal-content p");
    fetch('terms.txt')
        .then(response => response.text())
        .then(data => {
            if (modalContent) {
                modalContent.innerHTML = data; // Changed from textContent to innerHTML
            }
        })
      .catch((error) => console.error('Error fetching terms:', error));

  });
  