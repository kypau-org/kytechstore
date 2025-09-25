let cartItems = [];
const cartBadge = document.querySelector(".badge");

function updateCart(product) {
  cartItems.push(product);
  cartBadge.textContent = cartItems.length;
  localStorage.setItem("cart", JSON.stringify(cartItems));
  showNotification(
    `${product.name} telah ditambahkan ke keranjang!`,
    "success"
  );
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    cartBadge.textContent = cartItems.length;
  }
}

loadCart();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }, 100);
}

function validateForm(formData) {
  const email = formData.get("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Email tidak valid");
  }

  const name = formData.get("name");
  if (name.length < 3) {
    throw new Error("Nama harus minimal 3 karakter");
  }

  const message = formData.get("message");
  if (message.length < 10) {
    throw new Error("Pesan harus minimal 10 karakter");
  }
}

document
  .querySelector("#contact form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    try {
      validateForm(formData);
      showNotification(
        "Terima kasih! Pesan Anda telah dikirim. Kami akan merespons dalam 1x24 jam.",
        "success"
      );
      this.reset();
    } catch (error) {
      showNotification(error.message, "error");
    }
  });

document
  .querySelector(".newsletter-btn")
  .addEventListener("click", function () {
    const email = document.querySelector(".newsletter-input").value;
    if (email) {
      alert("Terima kasih telah berlangganan newsletter kami!");
      document.querySelector(".newsletter-input").value = "";
    }
  });

document.querySelectorAll(".btn-primary.btn-sm").forEach((btn) => {
  if (btn.textContent.trim() === "Beli") {
    btn.addEventListener("click", function () {
      const productName =
        this.closest(".card").querySelector(".card-title").textContent;
      alert(`${productName} telah ditambahkan ke keranjang!`);

      const badge = document.querySelector(".badge");
      let count = parseInt(badge.textContent);
      badge.textContent = count + 1;
    });
  }
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const performSearch = debounce((query) => {
  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach((product) => {
    const title = product
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const description = product
      .querySelector(".text-muted")
      .textContent.toLowerCase();

    if (
      title.includes(query.toLowerCase()) ||
      description.includes(query.toLowerCase())
    ) {
      product.style.display = "";
      found = true;
    } else {
      product.style.display = "none";
    }
  });

  if (query.length > 0) {
    if (!found) {
      showNotification(
        "Tidak ada produk yang sesuai dengan pencarian Anda",
        "info"
      );
    }
  }
}, 300);

document.querySelector(".search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = this.querySelector("input").value;
  performSearch(query);
});

document
  .querySelector(".search-form input")
  .addEventListener("input", function (e) {
    performSearch(this.value);
  });

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", function () {
    const categoryName = this.querySelector("h5").textContent;
    alert(`Navigasi ke kategori: ${categoryName}`);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".product-image");
  const imageOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  }, imageOptions);

  images.forEach((img) => {
    if (img.src) {
      img.dataset.src = img.src;
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; // Placeholder
      imageObserver.observe(img);
    }
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

