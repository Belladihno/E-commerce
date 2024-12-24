class Product {
  constructor(title, image, price) {
    this.id = Math.random().toString(16).slice(2);
    this.title = title;
    this.image = image;
    this.price = parseFloat(price);
    this.quantity = 1;
  }
}

class Cart {
  constructor() {
    this.cart = this.loadCart();
    this.cartItemsElement = document.querySelector(".cart-items");
    this.totalPriceElement = document.querySelector(".total-price");
    this.cartBadgeElement = document.querySelectorAll("#cart-badge");
    this.initAddToCartButtons();
    this.refreshCartDisplay();
    this.initHamburgerMenu(".hamburger", ".mobile_nav");
  }

  initHamburgerMenu(hamburgerSelector, navSelector) {
    const hamburger = document.querySelector(hamburgerSelector);
    const nav = document.querySelector(navSelector);
    
    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("mobile_nav_hide");
      });
    }
  }
  
  initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll(".add_to_cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title");
        const image = button.getAttribute("data-image");
        const price = button.getAttribute("data-price");

        const product = new Product(title, image, price);
        this.addToCart(product);
      });
    });
  }

  addToCart(product) {
    const existingProduct = this.cart.find((item) => item.title === product.title);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push(product);
    }

    this.showPopup(`${product.title} has been added to the cart!`);
    this.saveCart();
    this.refreshCartDisplay();
    this.updateCartBadge();
  }
  
  addProductToCart(product) {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push(product);
    }
    this.saveCart();
    this.refreshCartDisplay();
  }

  showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
  
  refreshCartDisplay() {
    if (this.cartItemsElement) {
      this.cartItemsElement.innerHTML = "";
      this.cart.forEach((product, index) => {
        this.displayCartItem(product, index);
      });
    }

    if (this.totalPriceElement) {
      const totalPrice = this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
      this.totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    this.updateCartBadge();
  }
  
  displayCartItem(item, index) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";

    cartItem.innerHTML = `
      <p class="cart_id">${index + 1}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <div class="cart_quantity">
        <button class="quantity-decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-increase" data-id="${item.id}">+</button>
      </div>
      <p class="cart_price">$${(item.price * item.quantity).toFixed(2)}</p>
      <button class="cart_delete" data-id="${item.id}">Remove</button>
    `;

    this.cartItemsElement.appendChild(cartItem);

    const decreaseButton = cartItem.querySelector(".quantity-decrease");
    const increaseButton = cartItem.querySelector(".quantity-increase");
    const deleteButton = cartItem.querySelector(".cart_delete");

    decreaseButton.addEventListener("click", () => this.decreaseQuantity(item.id));
    increaseButton.addEventListener("click", () => this.increaseQuantity(item.id));
    deleteButton.addEventListener("click", () => this.removeItem(item.id));
  }
    
  decreaseQuantity(id) {
    const product = this.cart.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.saveCart();
      this.refreshCartDisplay();
    }
  }

  increaseQuantity(id) {
    const product = this.cart.find((item) => item.id === id);
    if (product) {
      product.quantity += 1;
      this.saveCart();
      this.refreshCartDisplay();
    }
  }

  updateTotalPrice() {
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalPriceElement.innerHTML = `Total: $${total.toFixed(2)}`;
  }
  
  updateCartBadge() {
    const totalProducts = this.cart.length;
    this.cartBadgeElement.forEach(badgeElement => {
      if (badgeElement) {
        badgeElement.textContent = totalProducts;
        badgeElement.style.display = totalProducts >= 0 ? "flex" : "none";
      }
    });
  }

  deleteButtons() {
    const deleteButtons = document.querySelectorAll(".cart_delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        this.removeItem(itemId);
      });
    });
  }

  removeItem(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.saveCart();
    this.refreshCartDisplay();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
}

const myCart = new Cart();
