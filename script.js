document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const toastElement = document.getElementById('toast');

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Your cart is empty.</p>';
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="https://picsum.photos/seed/${item.id}/70/70" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name} (${item.quantity})</div>
                    <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                </div>
            `;
            cartItemsElement.appendChild(cartItemDiv);
        });

        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    function addToCart(name, price, id) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, id, quantity: 1 });
        }

        updateCart();
        showToast(`${name} added to cart!`);
    }

    function showToast(message) {
        toastElement.textContent = message;
        toastElement.classList.add('show');
        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000);
    }

    // Make addToCart function globally accessible
    window.addToCart = addToCart;

    // Initial cart load
    updateCart();

    // Handle form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            showToast('Thank you for your message! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add to cart button animation
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
});