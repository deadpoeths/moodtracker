$(document).ready(function() {
    // For the index.html (Landing Page)
    if (window.location.pathname === '/index.html') {
        // Show login form when Login button is clicked
        $('#login-btn').click(function() {
            $('#welcome-message').hide(); // Hide welcome message
            $('#login-form').show(); // Show login form
            $('#signup-form').hide(); // Hide signup form if it's visible
        });

        // Show signup form when Sign Up button is clicked
        $('#signup-btn').click(function() {
            $('#welcome-message').hide(); // Hide welcome message
            $('#signup-form').show(); // Show signup form
            $('#login-form').hide(); // Hide login form if it's visible
        });

        // Go to signup form from login form
        $('#go-to-signup').click(function() {
            $('#login-form').hide(); // Hide login form
            $('#signup-form').show(); // Show signup form
        });

        // Go to login form from signup form
        $('#go-to-login').click(function() {
            $('#signup-form').hide(); // Hide signup form
            $('#login-form').show(); // Show login form
        });
    }

    // For the signup.html (Signup Page)
    if (window.location.pathname === '/signup.html') {
        // Handle Signup Form submission
        $('#signup-form-content').submit(function(event) {
            event.preventDefault();

            const username = $('#signup-username').val();
            const email = $('#signup-email').val();
            const password = $('#signup-password').val();
            const confirmPassword = $('#signup-confirm-password').val();

            // Send signup request to backend
            fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "User created successfully") {
                    alert("Signup successful! You can now login.");
                    window.location.href = 'login.html';  // Redirect to login page
                    // Reset the form fields after successful signup
                    $('#signup-form-content').trigger('reset');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // For the login.html (Login Page)
    if (window.location.pathname === '/login.html') {
        // Handle Login Form submission
        $('#login-form-content').submit(function(event) {
            event.preventDefault();

            const username = $('#login-username').val();
            const password = $('#login-password').val();

            // Send login request to backend
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Login successful") {
                    alert("Login successful!");
                    // Redirect to the next page (e.g., dashboard)
                    window.location.href = "/dashboard";  // Update with the actual route
                    // Reset the form fields after successful login
                    $('#login-form-content').trigger('reset');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
