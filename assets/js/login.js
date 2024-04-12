document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("step-form");
   
    function loginUser(email, password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ userId: user.userId }));
        return true; // Login successful
      }
      return false; // Login failed
    }

    function getCurrentUserDetails() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users')) || [];
      return users.find(u => u.userId === currentUser.userId);
    }
    
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Retrieving user input
      const emailInput = document.getElementById('email').value.trim();
      const passwordInput = document.getElementById('password').value.trim();
      
      // Retrieving stored user info from local storage
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      // Validating credentials
      if (loginUser(emailInput, passwordInput)) {
        alert("Login successful!");
        window.location.href = "index.html"; 
      } else {
        alert("Invalid email or password.");
        form.reset();
    }
    });
    
});
