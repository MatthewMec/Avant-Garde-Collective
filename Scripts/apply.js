document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const applicationData = {};
    
    // Get all form fields
    for (let [key, value] of formData.entries()) {
        if (applicationData[key]) {
            // Handle multiple checkboxes
            if (Array.isArray(applicationData[key])) {
                applicationData[key].push(value);
            } else {
                applicationData[key] = [applicationData[key], value];
            }
        } else {
            applicationData[key] = value;
        }
    }
    
    // Add timestamp
    applicationData.timestamp = new Date().toISOString();
    
    // Log the data (in production, you'd send this to your backend/Google Sheets)
    console.log('Application Data:', applicationData);
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Reset form after 3 seconds (optional)
    setTimeout(() => {
        if (confirm('Would you like to submit another application?')) {
            this.reset();
            document.getElementById('successMessage').style.display = 'none';
        }
    }, 3000);
    
    sendToGoogleSheets(applicationData);
});

function sendToGoogleSheets(data) {
    const SCRIPT_URL = 'https://script.google.com/a/macros/nightenterprises.com/s/AKfycbyt7wfwdqQ-OQ853VYHsQPznFSUG6YhE__BTzdochJDHdZNdh-YAnblOZD_up7y92ZOcA/exec';
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Data sent to Google Sheets successfully');
    })
    .catch(error => {
        console.error('Error sending data to Google Sheets:', error);
        // You could show an error message to the user here
    });
}