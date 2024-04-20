 // This script will handle the scroll animation
 document.addEventListener('DOMContentLoaded', function() {
    const benefits = document.querySelectorAll('.benefits-list li');

    function revealOnScroll() {
        for (let i = 0; i < benefits.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = benefits[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                benefits[i].classList.add("visible");
            } else {
                benefits[i].classList.remove("visible");
            }
        }
    }

    window.addEventListener('scroll', revealOnScroll);
});