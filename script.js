

document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const notification = document.getElementById('notification');

    // Toggle between sign in and sign up forms
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Show notification
    function showNotification(message, isError = false) {
        notification.textContent = message;
        notification.classList.add('show');
        if (isError) {
            notification.classList.add('error');
        } else {
            notification.classList.remove('error');
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Simulate user database
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Validate inputs
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', true);
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters!', true);
            return;
        }
        
        // Check if user already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            showNotification('Email already registered!', true);
            return;
        }
        
        // Add new user
        const newUser = {
            name,
            email,
            password // In a real app, you would hash this password
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Registration successful! You can now login.');
        registerForm.reset();
        container.classList.remove('right-panel-active');
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Find user
        const user = users.find(user => user.email === email);
        
        if (!user) {
            showNotification('Email not found!', true);
            return;
        }
        
        if (user.password !== password) {
            showNotification('Incorrect password!', true);
            return;
        }
        
        // Successful login
        showNotification(`Welcome back, ${user.name}!`);
        loginForm.reset();
        
        // In a real app, you would redirect to dashboard or store session
        console.log('Logged in user:', user);
    });

    // Forgot password link
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email to reset password:');
        
        if (email) {
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                showNotification(`Password reset link sent to ${email} (simulated)`);
            } else {
                showNotification('Email not found!', true);
            }
        }
    });
});