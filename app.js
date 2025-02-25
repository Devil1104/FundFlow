// DOM Elements
const authModal = document.getElementById('authModal');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const showSignUpLink = document.getElementById('showSignUp');
const showSignInLink = document.getElementById('showSignIn');
const closeBtn = document.querySelector('.close');
const investorDashboard = document.getElementById('investorDashboard');
const smeDashboard = document.getElementById('smeDashboard');

// Show/Hide Modal Functions
function showModal() {
    authModal.style.display = 'block';
}

function hideModal() {
    authModal.style.display = 'none';
}

// Toggle between Sign In and Sign Up forms
function showSignUp() {
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
}

function showSignIn() {
    signUpForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
}

// Form Submission Handlers
function handleSignIn(e) {
    e.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    // Retrieve user data from Local Storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Validate credentials
    if (userData && userData.email === email && userData.password === password) {
        alert("Sign In successful!");
        // Redirect to the Investor Dashboard
        window.location.href = 'pages/investor-dashboard.html';
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

function handleSignUp(e) {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    // Store user data in Local Storage
    const userData = {
        name,
        email,
        password, // In a real application, never store passwords in plain text
        isAuthenticated: true
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to the Sign In form
    alert("Sign Up successful! Please sign in.");
    hideModal();
}

// Event Listeners
investorDashboard.addEventListener('click', showModal);
smeDashboard.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);
showSignUpLink.addEventListener('click', showSignUp);
showSignInLink.addEventListener('click', showSignIn);
signInForm.addEventListener('submit', handleSignIn);
signUpForm.addEventListener('submit', handleSignUp);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        hideModal();
    }
});

// Sample startup data (this would typically come from an API)
const startups = [
    { name: "Startup 1", description: "Innovative tech solution.", id: 1 },
    { name: "Startup 2", description: "Revolutionizing finance.", id: 2 },
    { name: "Startup 3", description: "Sustainable energy solutions.", id: 3 },
];

// Function to display startups
function displayStartups() {
    const startupList = document.querySelector('.startup-list');
    startups.forEach(startup => {
        const startupItem = document.createElement('div');
        startupItem.className = 'startup-item';
        startupItem.innerHTML = `
            <h3>${startup.name}</h3>
            <p>${startup.description}</p>
            <button class="description-btn" data-id="${startup.id}">Description</button>
            <button class="invest-btn" data-id="${startup.id}">Invest</button>
            <div class="expanded-description hidden">
                <p>${startup.description}</p>
            </div>
        `;
        startupList.appendChild(startupItem);
    });
}

// Call the function to display startups
document.addEventListener('DOMContentLoaded', () => {
    displayStartups();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const welcomeMessage = document.querySelector('.welcome-message');
        welcomeMessage.innerHTML = `<h2>Welcome, ${userData.name}!</h2>`;
    }
});

function toggleDescription(button) {
    let description = button.nextElementSibling; // Get the long description element

    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";  // Show the description
        button.textContent = "Read Less";     // Change button text
    } else {
        description.style.display = "none";   // Hide the description
        button.textContent = "Description";     // Change button text back
    }
}


// Event listener for startup buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('invest-btn')) {
        const startupId = e.target.getAttribute('data-id');
        handleInvestment(startupId);
    } else if (e.target.classList.contains('description-btn')) {
        const startupId = e.target.getAttribute('data-id');
        const expandedDescription = e.target.nextElementSibling; // Get the next sibling (the expanded description)
        
        console.log('Description button clicked for startup ID:', startupId); // Debugging line
        
        // Toggle the visibility of the expanded description
        if (expandedDescription.classList.contains('hidden')) {
            expandedDescription.classList.remove('hidden');
            console.log('Expanding description for startup ID:', startupId); // Debugging line
        } else {
            expandedDescription.classList.add('hidden');
            console.log('Collapsing description for startup ID:', startupId); // Debugging line
        }
    }
});

// Function to handle investment
function handleInvestment(startupId) {
    const investmentAmount = prompt("Enter investment amount (must be greater than 0):");
    const phoneNumber = prompt("Enter your phone number:");

    if (investmentAmount > 0 && phoneNumber) {
        alert("Successfully Invested!");
        // Redirect back to the investor dashboard
        window.location.href = 'investor-dashboard.html';
    } else {
        alert("Invalid investment amount or phone number.");
    }
}