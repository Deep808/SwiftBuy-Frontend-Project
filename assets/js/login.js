document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("step-form");
    
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Retrieving user input
      const emailInput = document.getElementById('email').value.trim();
      const passwordInput = document.getElementById('password').value.trim();
      
      // Retrieving stored user info from local storage
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      // Validating credentials
      if (storedUserInfo && emailInput === storedUserInfo.email && passwordInput === storedUserInfo.password) {
        alert("Login successful!");
        window.location.href = "index.html"; 
      } else {
        alert("Invalid email or password.");
        form.reset();
    }
    });
    
});
