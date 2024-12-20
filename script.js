class CountdownTimer {
  constructor(targetDate, elementId) {
    this.countDownDate = new Date(targetDate).getTime();
    this.elementId = elementId;
    this.start();
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const element = document.getElementById(this.elementId);
    if (distance < 0) {
      clearInterval(this.interval);
      element.innerHTML = "EXPIRED";
    } else {
      element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }
}

class SwiperManager {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;
    this.init();
  }

  init() {
    new Swiper(this.selector, this.options);
  }
}

class ScrollAnimations {
  constructor() {
    this.setupAnimations();
  }

  setupAnimations() {
    ScrollReveal().reveal(".top_nav", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
    });
    ScrollReveal().reveal(".nav", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      delay: 100,
    });
    ScrollReveal().reveal(".header", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      delay: 200,
    });
    ScrollReveal().reveal(".section", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      duration: 1000,
      delay: 100,
    });
    ScrollReveal().reveal(".footer", {
      origin: "bottom",
      distance: "20px",
      opacity: 0,
      duration: 1000,
      delay: 100,
    });
  }
}

class HamburgerMenu {
  constructor(hamburgerSelector, navSelector) {
    this.hamburger = document.querySelector(hamburgerSelector);
    this.nav = document.querySelector(navSelector);
    this.init();
  }

  init() {
    this.hamburger.addEventListener("click", () => {
      this.nav.classList.toggle("mobile_nav_hide");
    });
  }
}

class CartBadge {
  constructor(cartStorage = "cart") {
    this.cartStorage = cartStorage;
    this.cartBadgeElement = document.querySelector(".cart-badge-html");
    this.init();
  }

  init() {
    this.updateBadge();
  }

  updateBadge() {
    const cart = JSON.parse(localStorage.getItem(this.cartStorage)) || [];
    const uniqueProductsCount = cart.length;
    this.cartBadgeElement.textContent = uniqueProductsCount;
    this.cartBadgeElement.style.display = uniqueProductsCount > 0 ? "flex" : "none";
  }

  addItemToCart(item) {
    const cart = JSON.parse(localStorage.getItem(this.cartStorage)) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (!existingItem) {
      cart.push(item);
    }

    localStorage.setItem(this.cartStorage, JSON.stringify(cart));
    this.updateBadge();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CountdownTimer("Jan 5, 2025 15:37:25", "demo");

  new SwiperManager(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 10 },
      768: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 4, spaceBetween: 10 },
    },
  });

  new ScrollAnimations();

  new HamburgerMenu(".hamburger", ".mobile_nav");

  const cartBadge = new CartBadge();

  // Example of dynamically adding items to the cart
  document.querySelector(".add-to-cart-button").addEventListener("click", () => {
    const newItem = { id: 1, name: "Product Name", quantity: 1 };
    cartBadge.addItemToCart(newItem);
  });
});
