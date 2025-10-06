// Smooth scroll function for navigation
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Function to create star rating display
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

// Function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = createStarRating(product.rating.rate);
    const truncatedTitle = truncateText(product.title, 60);
    const truncatedDescription = truncateText(product.description, 120);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-title">${truncatedTitle}</h3>
            <p class="product-description">${truncatedDescription}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${product.rating.count} reviews)</span>
            </div>
            <button class="buy-button" onclick="handleBuyClick('${product.title}', ${product.price})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Function to handle buy button clicks
function handleBuyClick(productTitle, price) {
    alert(`Added "${truncateText(productTitle, 40)}" to cart for $${price}!\n\nThis is a demo - no actual purchase will be made.`);
}

// Function to show error message
function showError(message) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #ff6b6b;">
            <h3>Error Loading Products</h3>
            <p>${message}</p>
            <button onclick="loadProducts()" style="margin-top: 1rem; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

// Main function to load products
async function loadProducts() {
    const loading = document.getElementById('loading');
    const productsGrid = document.getElementById('productsGrid');
    
    try {
        // Show loading state
        loading.style.display = 'block';
        productsGrid.innerHTML = '';
        
        // Fetch products from Fake Store API
        const response = await fetch('https://fakestoreapi.com/products?limit=12');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // Hide loading
        loading.style.display = 'none';
        
        // Check if we got products
        if (!products || products.length === 0) {
            throw new Error('No products found');
        }
        
        // Create and display product cards
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('Error fetching products:', error);
        loading.style.display = 'none';
        showError(error.message || 'Failed to load products. Please check your internet connection and try again.');
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Load products when page loads
    loadProducts();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Handle window scroll for header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});