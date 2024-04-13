document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("step-form");
    const steps = Array.from(document.querySelectorAll(".step"));
    const progressBar = document.getElementById("progress-bar");
    const progressBarWidth = 100 / (steps.length - 1);
    let currentStep = 0;


    // Set the maximum date input to today's date
    const birthDateInput = document.getElementById('birth-date');
    if (birthDateInput) {
        birthDateInput.max = new Date().toISOString().split('T')[0];
    }
    

    function updateProgressBar() {
        const progress = currentStep * progressBarWidth;
        progressBar.style.width = progress + "%";
    }

    function goToNextStep() {
        

        // Performing validation before proceeding to the next step
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
            progressBar.classList.add("fill-animation"); 
        }
    }
    
    function goToPrevStep() {
        currentStep--;
        showStep(currentStep);
    }
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.display = "block";
            } else {
                step.style.display = "none";
            }
        });
        updateProgressBar();
    }

    function isEmailUnique(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return !users.some(user => user.email === email);
    }

    function validateCurrentStep() {
        console.log(currentStep);

        const currentInputs = steps[currentStep].querySelectorAll("input[required]");
        let isValid = true;
    
        for (let input of currentInputs) {
            if (!input.value.trim()) {
                alert("Please fill in all required fields.");
                isValid = false;
                break;
            }
        }
    
        // Email validation for the first step or whenever your email input is present
        if(isValid && currentStep === 0) { 
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                alert("Please enter a valid email address!!");
                isValid = false;
            }

            if (!isEmailUnique(emailInput.value)) {
                alert("This email is already registered.");
                return; // Stop the submission process
            }
            
            // Date of birth validation
            const birthDateInput = document.getElementById('birth-date');
            if (birthDateInput && !isValidAge(birthDateInput.value)) {
                alert("You must be at least 18 years old!!");
                isValid = false;
            }
        }
    
    
        return isValid;
    }

    function isValidAge(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const ageDiffMs = today - dobDate.getTime();
        const ageDate = new Date(ageDiffMs);
        return ageDate.getUTCFullYear() - 1970 >= 18;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    function registerUser(newUser) {
        newUser.userId = `user${users.length + 1}`; 
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Extracting user info from form fields
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const password = document.getElementById('password').value; 
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsCheckbox = document.getElementById('terms-checkbox');

    
        // Check password match right before form submission
        if (password.trim() !== confirmPassword.trim()) {
            alert("Passwords do not match.");
            return; // Preventing form submission
        }
        console.log(termsCheckbox.checked)
        if (!termsCheckbox.checked) {
            alert("You must agree to the terms before proceeding.");
            return;  // Stop the function from proceeding to the next step
        }
    

        // Storing user info in Local Storage
        // Example usage:
        let newUser = {
            email,
            firstName,
            lastName,
            password 
        };

        registerUser(newUser);

    
    
        alert("Signup successful!");
    
        // Redirecting to login page or dashboard page
        window.location.href = 'index.html';
      });
    
    document.querySelectorAll(".next-btn").forEach((button) => {
        button.addEventListener("click", goToNextStep);
    });
    
    document.querySelectorAll(".prev-btn").forEach((button) => {
        button.addEventListener("click", goToPrevStep);
    });
    showStep(currentStep);
});
