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
      
});
