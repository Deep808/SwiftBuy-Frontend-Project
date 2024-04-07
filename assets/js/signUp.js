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
        const currentInputs = steps[currentStep].querySelectorAll("input[required]");
        for (let input of currentInputs) {
            if (!input.value.trim()) {
                alert("Please fill in all required fields.");
                return false;
            }
        }
        return true;
    }
    
    
});
