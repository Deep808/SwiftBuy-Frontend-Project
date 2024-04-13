function addToCart(button) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   /*  if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    */

   
    const cardElement = button.closest('.discover-card');

  
    const itemName = cardElement.querySelector('h3 a').textContent;
    const imageElement = cardElement.querySelector('.card-banner img');
    const imageUrl = imageElement ? imageElement.src : '';
    const creatorElement = cardElement.querySelector('.card-profile a');
    const creator = creatorElement ? creatorElement.textContent : '';
    const priceElement = cardElement.querySelector('.card-meta .card-price span');
    const price = priceElement ? priceElement.textContent.replace(' ETH', '') : '';

    
    const item = {
        name: itemName,
        image: imageUrl,
        creator: creator,
        price: price
    };

    // Fetch the current user's cart from local storage
    /* let userCartKey = currentUser.id + '_cart'; */
    let userCartKey = 1 + '_cart'; 
    let userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    // Check if the item is already in the cart
    const isItemInCart = userCart.some(cartItem => cartItem.name === itemName);

    if (isItemInCart) {
        alert('Item is already in your cart!');
    } else {
        // Add the new item to the cart array
        userCart.push(item);

        // Save the updated cart back to local storage
        localStorage.setItem(userCartKey, JSON.stringify(userCart));

        alert('Item added to cart!');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const userCartKey = 1 + '_cart'; 
    displayCartItems();

    function displayCartItems() {
        const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        cartItemsContainer.innerHTML = ''; 
        const totalPriceElement = document.getElementById('totalPrice');

        if (cartItems.length === 0) {
            cartItemsContainer.textContent = 'Your cart is empty.';
            document.getElementById('emptyCartButton').style.display = 'none';
            document.querySelector('.hidecheckout').style.display = 'none';
            totalPriceElement.textContent = 'Total: 0 ETH';
            return;
        }

        let total = 0;

        cartItems.forEach((item, index) => {
            // Constructing the cart item element
            const itemDiv = createCartItemElement(item, index);
            cartItemsContainer.appendChild(itemDiv);
            total += parseFloat(item.price);
        });

        // Update the total price
        totalPriceElement.textContent = `Total: ${total.toFixed(2)} ETH`;
    }

    function createCartItemElement(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center my-10 w-full md:w-[90%] md:mx-auto mx-auto';

        // Populate itemDiv with image, details, and delete button
        // Image
        const imageDiv = document.createElement('div');
        const img = document.createElement('img');
        img.className = 'w-32 h-36 min-[375px]:w-24 min-[375px]:h-28 sm:w-52 sm:h-52 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-80 xl:h-80 rounded-md object-cover';
        img.src = item.image;
        img.alt = item.name;
        imageDiv.appendChild(img);

        // Details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'relative min-[375px]:w-[60%] w-[55%] md:w-[50%] space-y-2';

        const nameP = document.createElement('p');
        nameP.className = 'lg:text-2xl min-[375px]:text-[0.9em]';
        nameP.textContent = item.name;
        detailsDiv.appendChild(nameP);

        const creatorP = document.createElement('p');
        creatorP.className = 'text-sm text-gray-400';
        creatorP.textContent = item.creator;
        detailsDiv.appendChild(creatorP);

        const priceDiv = document.createElement('div');
        priceDiv.className = 'text-sm flex justify-between min-[375px]:w-[85%] w-[70%] lg:w-[50%]';
        const priceP = document.createElement('p');
        priceP.innerHTML = `Price: <span class="text-green-500">${item.price} ETH</span>`;
        priceDiv.appendChild(priceP);
        detailsDiv.appendChild(priceDiv);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'text-red-500';
        deleteButton.onclick = () => deleteCartItem(index);
        detailsDiv.appendChild(deleteButton);

        itemDiv.appendChild(imageDiv);
        itemDiv.appendChild(detailsDiv);

        return itemDiv;
    }

    function deleteCartItem(index) {
        let cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
        cartItems.splice(index, 1);
        localStorage.setItem(userCartKey, JSON.stringify(cartItems));
        displayCartItems(); // Refresh the cart display
    }
});

//clear item user wise
document.addEventListener('DOMContentLoaded', () => {
    const emptyCartButton = document.getElementById('emptyCartButton');
  
    emptyCartButton.addEventListener('click', () => {
      /* const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        console.log('No user is currently logged in.');
        return;
      } */
      /* let userCartKey = currentUser.id + '_cart'; */
      let userCartKey = 1 + '_cart';
      localStorage.removeItem(userCartKey);
  
      alert('Your cart has been emptied.');
  
      location.reload();
    });
  });
  