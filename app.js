// DOM Elements
const authModal = document.getElementById("authModal");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const showSignUpLink = document.getElementById("showSignUp");
const showSignInLink = document.getElementById("showSignIn");
const closeBtn = document.querySelector(".close");
const investorDashboard = document.getElementById("investorDashboard");
const smeDashboard = document.getElementById("smeDashboard");
const investmentForm = document.getElementById("investmentForm");
const investmentFormFields = document.getElementById("investmentFormFields");

// Show/Hide Modal Functions
function showModal() {
    authModal.style.display = "flex";
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");
}

function hideModal() {
    authModal.style.display = "none";
}

// Toggle between Sign In and Sign Up forms
function showSignUp() {
    signInForm.classList.add("hidden");
    signUpForm.classList.remove("hidden");
}

function showSignIn() {
    signUpForm.classList.add("hidden");
    signInForm.classList.remove("hidden");
}

// Form Submission Handlers
// function handleSignIn(e) {
//     e.preventDefault();
//     const email = signInForm.querySelector('input[type="email"]').value;
//     const password = signInForm.querySelector('input[type="password"]').value;

//     const userData = JSON.parse(localStorage.getItem("userData"));

//     if (userData && userData.email === email && userData.password === password) {
//         alert("Sign In successful!");
//         localStorage.setItem("isAuthenticated", true);
//         window.location.href = "pages/investor-dashboard.html";
//     } else {
//         alert("Invalid email or password.");
//     }
// }

// function handleSignIn(e) {
//     e.preventDefault();
//     const email = signInForm.querySelector('input[type="email"]').value;
//     const password = signInForm.querySelector('input[type="password"]').value;

//     const userData = JSON.parse(localStorage.getItem("userData"));

//     if (userData && userData.email === email && userData.password === password) {
        
//         localStorage.setItem("isAuthenticated", "true"); // Store authentication status

//         // Redirect to the correct dashboard based on user type (Modify as needed)
//         window.location.href = "pages/investor-dashboard.html"; 
//     } else {
//         alert("Invalid email or password.");
//     }
// }


// function handleSignUp(e) {
//     e.preventDefault();
//     const name = signUpForm.querySelector('input[type="text"]').value;
//     const email = signUpForm.querySelector('input[type="email"]').value;
//     const password = signUpForm.querySelector('input[type="password"]').value;

//     const userData = { name, email, password };
//     localStorage.setItem("userData", JSON.stringify(userData));

//     alert("Sign Up successful! Please sign in.");
//     hideModal();
// }

function handleSignUp(e) {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    const selectedRole = document.querySelector('input[name="role"]:checked')?.value;

    const userData = { name, email, password, selectedRole};
    
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Sign Up successful! Please sign in.");
    hideModal();
}


function handleSignIn(e) {
    e.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.email === email && userData.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        alert("Sign In successful!");

        // Redirect based on user role
        if (userData.selectedRole === "investor") {
            window.location.href = "pages/investor-dashboard.html";
        } else if (userData.selectedRole === "sme") {
            window.location.href = "pages/sme-dashboard.html";
        }
    } else {
        alert("Invalid email or password.");
    }
}


// Event Listeners
investorDashboard?.addEventListener("click", function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (isAuthenticated && userData?.role === "investor") {
        window.location.href = "pages/investor-dashboard.html";
    } else {
        // alert("Please sign in as an Investor to access this dashboard.");
        showModal(); // Show login/signup modal
    }
});

smeDashboard?.addEventListener("click", function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (isAuthenticated && userData?.role === "sme") {
        window.location.href = "pages/sme-dashboard.html";
    } else {
        // alert("Please sign in as an SME to access this dashboard.");
        showModal(); // Show login/signup modal
    }
});

// Function to check authentication before accessing dashboards
// Event listeners for dashboard access buttons

investorDashboard?.addEventListener("click", function () {
    accessDashboard("investor");
});

smeDashboard?.addEventListener("click", function () {
    accessDashboard("sme");
});

function logout() {
    // localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("userData");
    alert("You have been logged out.");
    window.location.href = "../index.html"; // Redirect to home/login page
}

// Attach event listener
document.getElementById("logoutButton")?.addEventListener("click", logout);




closeBtn?.addEventListener("click", hideModal);
showSignUpLink?.addEventListener("click", showSignUp);
showSignInLink?.addEventListener("click", showSignIn);
signInForm?.addEventListener("submit", handleSignIn);
signUpForm?.addEventListener("submit", handleSignUp);

window.addEventListener("click", (e) => {
    if (e.target === authModal) hideModal();
});

// Sample startup data
const startups = [
    {
        id: 1,
        name: "AgriTech Solutions",
        description: "AI-powered farming solutions.",
        longDescription:
            "AgriTech Solutions integrates AI and IoT to improve farming productivity and sustainability, offering predictive analytics and real-time monitoring for better agricultural practices.",
    },
    {
        id: 2,
        name: "GreenKart",
        description: "Eco-friendly e-commerce platform.",
        longDescription:
            "GreenKart connects consumers with eco-friendly brands, making sustainable shopping more accessible through a curated selection of environmentally responsible products.",
    },
    {
        id: 3,
        name: "SkillHive",
        description: "Microlearning for blue-collar workers.",
        longDescription:
            "SkillHive empowers blue-collar workers with accessible mobile learning modules, helping them gain practical skills for better job opportunities.",
    },
];

// Display startups dynamically
function displayStartups() {
    const startupList = document.querySelector(".startup-list");
    startupList.innerHTML = "";

    startups.forEach((startup) => {
        const startupItem = document.createElement("div");
        startupItem.className = "startup-item";
        startupItem.innerHTML = `
            <h3>${startup.name}</h3>
            <p class="short-description">${startup.description}</p>
            <button class="description-btn" data-id="${startup.id}">Read More</button>
            <button class="invest-btn" data-id="${startup.id}">Invest</button>
            <div class="expanded-description hidden">
                <p>${startup.longDescription}</p>
            </div>
        `;
        startupList.appendChild(startupItem);
    });
}

// Ensure user is welcomed
document.addEventListener("DOMContentLoaded", () => {
    displayStartups();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        document.querySelector(".welcome-message").innerHTML = `<h2>Welcome, ${userData.name}!</h2>`;
    }
});

// Toggle description visibility
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("description-btn")) {
        const startupItem = e.target.closest(".startup-item");
        const description = startupItem.querySelector(".expanded-description");

        if (description.classList.contains("active")) {
            description.classList.remove("active");
            e.target.textContent = "Read More";
        } else {
            document.querySelectorAll(".expanded-description").forEach((desc) =>
                desc.classList.remove("active")
            );
            document.querySelectorAll(".description-btn").forEach((btn) =>
                (btn.textContent = "Read More")
            );

            description.classList.add("active");
            e.target.textContent = "Read Less";
        }
    }
});

// document.querySelector(".startup-list").addEventListener("click", function (e) {
//     if (e.target.classList.contains("invest-btn")) {
//         const startupId = e.target.getAttribute("data-id");
//         const startupName = e.target.closest(".startup-item").querySelector("h3").innerText;
//         openInvestmentForm(startupId, startupName);
//     }
// });

// Open investment form
function openInvestmentForm(id, name) {
    const modal = document.querySelector("#investmentForm");
    if (modal) {
        modal.style.display = "flex"; // Show the modal
    } else {
        console.error("Investment form modal not found in the DOM.");
    }

    // Populate the form with startup details
    document.querySelector(".modal-content h2").innerText = `Invest in ${name}`;
    const investmentFormFields = document.querySelector("#investmentFormFields");
    if (investmentFormFields) {
        investmentFormFields.setAttribute("data-id", id); // Set the startup ID
    } else {
        console.error("Investment form fields not found in the DOM.");
    }
}

// Close investment form
function closeInvestmentForm() {
    const modal = document.querySelector("#investmentForm");
    if (modal) {
        modal.style.display = "none"; // Hide the modal
    }
}

// Handle investment
investmentFormFields.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = document.getElementById("investmentAmount").value;
    if (amount <= 0) return alert("Investment amount must be greater than 0.");

    const startupId = investmentFormFields.getAttribute("data-id");
    const selectedStartup = startups.find((s) => s.id == startupId);

    alert(`Successfully invested ₹${amount} in ${selectedStartup.name}!`);

    // Close the investment form modal
    closeInvestmentForm(); // Call the function to close the modal

    // Show success tick animation
    const successTick = document.createElement("div");
    successTick.classList.add("success-tick");
    successTick.innerHTML = "✔"; // Green tick
    document.body.appendChild(successTick);

    successTick.style.position = "fixed";
    successTick.style.top = "50%";
    successTick.style.left = "50%";
    successTick.style.transform = "translate(-50%, -50%)";
    successTick.style.fontSize = "50px";
    successTick.style.color = "green";
    successTick.style.animation = "fadeOut 2s ease-in-out";

    setTimeout(() => {
        successTick.remove();
    }, 2000);
});

// Open investment form when clicking Invest button
document.querySelector(".startup-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("invest-btn")) {
        const startupId = e.target.getAttribute("data-id");
        const startupName = e.target.closest(".startup-item").querySelector("h3").innerText;
        openInvestmentForm(startupId, startupName);
    }
});

// Close modal when clicking outside of it
document.addEventListener("click", function (e) {
    if (e.target === investmentForm) closeInvestmentForm();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded");
    const investButtons = document.querySelectorAll(".invest-btn");
    console.log("Invest Buttons Found:", investButtons.length);
});


