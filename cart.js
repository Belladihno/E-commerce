class Product {
  constructor(title, image, price) {
    this.id = Math.random().toString(16).slice(2);
    this.title = title;
    this.image = image;
    this.price = price;
  }
}


class Cart {
  constructor() {
    this.cart = this.loadCart();
    this.cartItemsElement = document.querySelector(".cart-items");
    this.initAddToCartButtons();
    this.displayAllCartItems();
    this.deleteButtons();
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
    this.cart.push(product);
    alert('Item added to Cart')
    this.saveCart();
    this.displayCartItem(product);
    this.deleteButtons();
  }

  displayAllCartItems() {
    this.cart.forEach((item, i) => {
      this.displayCartItem(item, i);
    });
  }
  
  displayCartItem(item, i) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${i+1}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">${item.price}</p>
      <button class="cart_delete" data-id="${item.id}">Remove</button>
    `;
    this.cartItemsElement.appendChild(cartItem);
  }

  deleteButtons() {
    const deleteButtons = document.querySelectorAll('.cart_delete');
    deleteButtons.forEach((button)=> {
      button.addEventListener('click', (e) => {
        const itemId = button.getAttribute('data-id');
        this.removeItem(itemId);
      })
    })
  }
  
  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
    window.location.reload()
  }
  
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
}

const myCart = new Cart();
