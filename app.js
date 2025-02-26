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
    authModal.style.display = "block";
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
function handleSignIn(e) {
    e.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.email === email && userData.password === password) {
        alert("Sign In successful!");
        localStorage.setItem("isAuthenticated", true);
        window.location.href = "pages/investor-dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
}

function handleSignUp(e) {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    const userData = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Sign Up successful! Please sign in.");
    hideModal();
}

// Event Listeners
investorDashboard?.addEventListener("click", showModal);
smeDashboard?.addEventListener("click", showModal);
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
    console.log("Opening investment form for:", name, "with ID:", id); // Debugging

    // Get modal and show it
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.style.display = "flex";
    } else {
        console.error("Modal not found in the DOM.");
    }

    // Optional: Populate the form with startup details
    document.querySelector(".modal-content h2").innerText = `Invest in ${name}`;
    const investmentFormFields = document.querySelector("#investmentForm"); // Ensure this is correct
    if (investmentFormFields) {
        investmentFormFields.setAttribute("data-id", id);
    } else {
        console.error("Investment form not found in the DOM.");
    }
}


// Close investment form
function closeInvestmentForm() {
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.style.display = "none";
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
    closeInvestmentForm();
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


