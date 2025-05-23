// script.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Toggle cart function
function toggleCart(button) {
    const product = {
        id: button.getAttribute('data-product-id'),
        name: button.getAttribute('data-product-name'),
        price: parseFloat(button.getAttribute('data-product-price')),
        image: button.getAttribute('data-product-image')
    };

    const index = cart.findIndex(item => item.id === product.id);
    
    if (index === -1) { // Add to cart
        cart.push({ ...product, quantity: 1 });
        button.textContent = "Remove from Cart";
        button.style.backgroundColor = "#dc3545";
        if(button.nextElementSibling) {
            button.nextElementSibling.style.display = "block";
        }
    } else { // Remove from cart
        cart.splice(index, 1);
        button.textContent = "Add to Cart";
        button.style.backgroundColor = "#28a745";
        if(button.nextElementSibling) {
            button.nextElementSibling.style.display = "none";
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Initialize cart buttons
document.addEventListener('DOMContentLoaded', () => {
    // Set initial button states
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        const productId = button.getAttribute('data-product-id');
        if (cart.some(item => item.id === productId)) {
            button.textContent = "Remove from Cart";
            button.style.backgroundColor = "#dc3545";
            if(button.nextElementSibling) {
                button.nextElementSibling.style.display = "block";
            }
        }
    });

    // Update cart count
    updateCartCount();
    
    // Initialize category view
    showAllProducts();
});

// Update cart counter
function updateCartCount() {
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(element => {
        element.textContent = cart.length;
    });
}

// Category switching
function showCategory(categoryId) {
    // Hide all category sections and coming soon
    document.querySelectorAll('.category-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('coming-soon').style.display = 'none';

    // Show selected category
    const selectedSection = document.getElementById(categoryId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function showCategory(categoryId) {
    // Hide all category sections
    const categories = document.querySelectorAll('.category-section');
    categories.forEach(cat => {
        cat.style.display = 'none';
    });

    // Show the selected one
    const selected = document.getElementById(categoryId);
    if (selected) {
        selected.style.display = 'block';
        selected.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideCategories() {
    const categories = document.querySelectorAll('.category-section');
    categories.forEach(cat => cat.style.display = 'none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function changeTextSize(size) {
  document.body.classList.remove('small-text', 'medium-text', 'large-text');
  document.body.classList.add(`${size}-text`);
  localStorage.setItem('textSize', size);
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTextSize = localStorage.getItem('textSize') || 'medium';
  changeTextSize(savedTextSize);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

