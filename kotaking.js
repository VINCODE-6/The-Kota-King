let cart = JSON.parse(localStorage.getItem('kotaking_cart')) || [];

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById('cart-count-header');
    if (el) el.textContent = total;
}

function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function addToCart(id, name, price) {
    price = Number(price);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('kotaking_cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${name} added to cart!`);
}

function increaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += 1;
    localStorage.setItem('kotaking_cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof renderCart === 'function') renderCart();
}

function decreaseQuantity(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index === -1) return;
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('kotaking_cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof renderCart === 'function') renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('kotaking_cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof renderCart === 'function') renderCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('kotaking_cart');
    updateCartCount();
}

window.addToCart        = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem       = removeItem;
window.clearCart        = clearCart;

document.addEventListener('DOMContentLoaded', updateCartCount);
