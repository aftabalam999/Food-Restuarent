

const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.menu__content`,{
    interval: 200
})
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM Elements
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const closeCart = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addToCartButtons = document.querySelectorAll('.menu__button');
    
    // Toggle cart dropdown
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Add to cart event listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(name, price);
            showAddToCartFeedback(this);
        });
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your order! Total: $' + calculateTotal());
            clearCart();
        } else {
            alert('Your cart is empty!');
        }
    });
    
    // Initialize cart UI
    updateCartUI();
    
    // Functions
    function toggleCart() {
        cartDropdown.style.display = cartDropdown.style.display === 'flex' ? 'none' : 'flex';
    }
    
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
    }
    
    function showAddToCartFeedback(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bx bx-check"></i>';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
        }, 1000);
    }
    
    function updateCartUI() {
        // Clear current items
        cartItemsList.innerHTML = '';
        
        // Add each item to the list
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-name="${item.name}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-name="${item.name}">+</button>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-btn" data-name="${item.name}"><i class='bx bx-trash'></i></button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(li);
        });
        
        // Add event listeners to new buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-name'), -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                updateQuantity(this.getAttribute('data-name'), 1);
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                removeItem(this.getAttribute('data-name'));
            });
        });
        
        // Update total and count
        const total = calculateTotal();
        cartTotal.textContent = total.toFixed(2);
        
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
        
        // Show/hide cart count
        cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
    }
    
    function updateQuantity(name, change) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.name !== name);
            }
            
            saveCart();
            updateCartUI();
        }
    }
    
    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        saveCart();
        updateCartUI();
    }
    
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function clearCart() {
        cart = [];
        saveCart();
        updateCartUI();
        toggleCart();
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(event) {
        if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.style.display = 'none';
        }
    });
});