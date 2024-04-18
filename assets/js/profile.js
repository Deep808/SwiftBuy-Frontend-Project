document.addEventListener("DOMContentLoaded", function () {
    // Fetch user details from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userDetails = users.find(user => user.userId === currentUser.userId);

    // Display user details on the profile page
    const userDetailsContainer = document.getElementById('user-details');
    if (userDetailsContainer) {
        userDetailsContainer.innerHTML = `
            <h2 class="heading2">Your personal info:</h2>
            <p class="info"><strong>Email:</strong> ${userDetails.email}</p>
            <p class="info"><strong>First Name:</strong> ${userDetails.firstName}</p>
            <p class="info"><strong>Last Name:</strong> ${userDetails.lastName}</p>
            
        `;
    }

    
    const welcomeMessage = document.querySelector('.hero h1');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userDetails.firstName} ${userDetails.lastName}!`;
    }

    // Fetch cart details from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDetailsContainer = document.getElementById('cart-details');
    if (cartDetailsContainer) {
        cartDetailsContainer.innerHTML = `
            
            <h2 class="heading2">Cart Details</h2>
           
            <p class="info"><strong>Number of items in cart:</strong> <span id="cart-count">${cart.length}</span><span>&#x1F6D2;</span>
            </p>
        `;
    }
});
