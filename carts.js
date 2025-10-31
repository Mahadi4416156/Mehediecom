// নিশ্চিত করুন যে সম্পূর্ণ HTML ডকুমেন্ট লোড হওয়ার পরই এই কোডটি কার্যকর হবে
document.addEventListener('DOMContentLoaded', (event) => {

    // ১. প্রাথমিক ডেটা এবং কনস্ট্যান্টস
    const cartItems = [
        {
            id: 1,
            name: "প্রোডাক্ট ১",
            price: 500,
            quantity: 2,
            image: "",
            details: "সাইজ: L, রং: লাল"
        },
        {
            id: 2,
            name: "প্রোডাক্ট ২",
            price: 1200,
            quantity: 1,
            image: "",
            details: "সাইজ: NA, রং: নীল"
        }
    ];

    const SHIPPING_FEE = 100;

    // ২. ডম উপাদানগুলো নির্বাচন করা (এখন এগুলি null হবে না)
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal-value');
    const grandTotalElement = document.getElementById('grand-total-value');
    
    // ৩. কার্টের HTML উপাদান তৈরি করার ফাংশন
    function renderCart() {
        // কন্টেইনার খালি করা হলো যাতে নতুন করে লোড করা যায়
        if (!cartContainer) return; // অতিরিক্ত সেফটি চেক
        cartContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p style="text-align: center; padding: 30px; font-size: 1.1rem; color: #555;">আপনার কার্ট বর্তমানে খালি।</p>';
            updateTotal();
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            // প্রোডাক্টের উপাদানের HTML তৈরি করা
            itemElement.innerHTML = `
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <div class="item-name">${item.name}</div>
                        <small>${item.details}</small>
                    </div>
                </div>
                <div class="item-price">৳ ${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <input type="number" value="${item.quantity}" min="1" 
                           data-id="${item.id}" onchange="updateQuantity(this)">
                </div>
                <div class="item-subtotal">৳ ${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-button" onclick="removeCartItem(${item.id})">❌</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        updateTotal();
    }

    // ৪. পরিমাণ (Quantity) পরিবর্তন করার ফাংশন
    window.updateQuantity = function(inputElement) {
        const itemId = parseInt(inputElement.getAttribute('data-id'));
        let newQuantity = parseInt(inputElement.value);

        if (newQuantity < 1 || isNaN(newQuantity)) {
            newQuantity = 1;
            inputElement.value = 1;
        }
        
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
        
        renderCart();
    }

    // ৫. প্রোডাক্ট বাদ (Remove) দেওয়ার ফাংশন
    window.removeCartItem = function(itemId) {
        const itemIndex = cartItems.findIndex(i => i.id === itemId);
        
        if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1); 
        }
        
        renderCart();
    }

    // ৬. মোট হিসাব (Total) আপডেট করার ফাংশন
    function updateTotal() {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const grandTotal = subtotal + SHIPPING_FEE;
        
        // HTML এ মানগুলো সেট করা
        if (subtotalElement) subtotalElement.textContent = `৳ ${subtotal.toFixed(2)}`;
        if (grandTotalElement) grandTotalElement.textContent = `৳ ${grandTotal.toFixed(2)}`;
    }

    // পেজ লোড হওয়ার সাথে সাথে কার্ট লোড করা
    renderCart();
});
