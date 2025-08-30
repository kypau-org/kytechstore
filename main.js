// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Terima kasih! Pesan Anda telah dikirim. Kami akan merespons dalam 1x24 jam."
  );
  this.reset();
});

// Newsletter subscription
document
  .querySelector(".newsletter-btn")
  .addEventListener("click", function () {
    const email = document.querySelector(".newsletter-input").value;
    if (email) {
      alert("Terima kasih telah berlangganan newsletter kami!");
      document.querySelector(".newsletter-input").value = "";
    }
  });

// Add to cart functionality
document.querySelectorAll(".btn-primary.btn-sm").forEach((btn) => {
  if (btn.textContent.trim() === "Beli") {
    btn.addEventListener("click", function () {
      const productName =
        this.closest(".card").querySelector(".card-title").textContent;
      alert(`${productName} telah ditambahkan ke keranjang!`);

      // Update cart badge
      const badge = document.querySelector(".badge");
      let count = parseInt(badge.textContent);
      badge.textContent = count + 1;
    });
  }
});

// Search functionality
document.querySelector(".search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = this.querySelector("input").value;
  if (query) {
    alert(`Mencari: "${query}". Fitur pencarian akan segera tersedia!`);
  }
});

// Category card click functionality
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", function () {
    const categoryName = this.querySelector("h5").textContent;
    alert(`Navigasi ke kategori: ${categoryName}`);
  });
});

// Add loading animation on page load
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
