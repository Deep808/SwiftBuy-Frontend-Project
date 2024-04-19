document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('job-application-form');
    var thankYouMessage = document.getElementById('thank-you-message');
    var submitButton = document.getElementById('submit-application'); 
    var formTitle = document.getElementById('form-title'); 

    submitButton.addEventListener('click', function(event) {
        // Prevents the default form submission
        event.preventDefault(); 

        var formData = new FormData(form);

        fetch('https://formspree.io/f/xwkgaonk', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if(response.ok) {
                //hiding form and form title
                form.style.display = 'none'; 
                formTitle.style.display = 'none';
                thankYouMessage.style.display = 'block'; 
            } else {
                throw new Error('Form submission error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again later.');
        });
    });
});
