document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("step-form");
    const steps = Array.from(document.querySelectorAll(".step"));
    const progressBar = document.getElementById("progress-bar");
    const progressBarWidth = 100 / (steps.length - 1);
    let currentStep = 0;

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
                alert("Please enter a valid email address.");
                isValid = false;
            }
        }
    
    
        return isValid;
    }
    

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Extracting user info from form fields
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const password = document.getElementById('password').value; 
        const confirmPassword = document.getElementById('confirm-password').value;
    
        // Check password match right before form submission
        if (password.trim() !== confirmPassword.trim()) {
            alert("Passwords do not match.");
            return; // Preventing form submission
        }
    
        // Storing user info in Local Storage
        const userInfo = { email, firstName, lastName, password }; // Not secure for real applications
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
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
