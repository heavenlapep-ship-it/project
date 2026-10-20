// Data Array for Part 2
let people = [
    { name: "Ahmed Hassan", age: 25, city: "Cairo" },
    { name: "Sara Ali", age: 22, city: "Alexandria" },
    { name: "Mohamed Omar", age: 30, city: "Giza" },
    { name: "Mona Zakaria", age: 19, city: "Mansoura" },
    { name: "Khaled Saeed", age: 28, city: "Aswan" }
];

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // PART 1: FORM VALIDATION (index.html)
    // ==========================================
    const regForm = document.getElementById("regForm");

    if (regForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const ageInput = document.getElementById("age");

        function showError(input, errorEl, message) {
            input.classList.add("invalid");
            errorEl.textContent = message;
        }

        function clearError(input, errorEl) {
            input.classList.remove("invalid");
            errorEl.textContent = "";
        }

        function validateForm() {
            let isValid = true;

            // Name
            if (nameInput.value.trim() === "") {
                showError(nameInput, document.getElementById("nameError"), "Name is required.");
                isValid = false;
            } else {
                clearError(nameInput, document.getElementById("nameError"));
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, document.getElementById("emailError"), "Please enter a valid email address.");
                isValid = false;
            } else {
                clearError(emailInput, document.getElementById("emailError"));
            }

            // Password
            if (passwordInput.value.length < 8) {
                showError(passwordInput, document.getElementById("passwordError"), "Password must be at least 8 characters.");
                isValid = false;
            } else {
                clearError(passwordInput, document.getElementById("passwordError"));
            }

            // Confirm Password
            if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === "") {
                showError(confirmPasswordInput, document.getElementById("confirmPasswordError"), "Passwords do not match.");
                isValid = false;
            } else {
                clearError(confirmPasswordInput, document.getElementById("confirmPasswordError"));
            }

            // Age
            const ageVal = parseInt(ageInput.value, 10);
            if (isNaN(ageVal) || ageVal < 18) {
                showError(ageInput, document.getElementById("ageError"), "Age must be 18 or older.");
                isValid = false;
            } else {
                clearError(ageInput, document.getElementById("ageError"));
            }

            return isValid;
        }

        regForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validateForm()) {
                alert("Form submitted successfully!");
                regForm.reset();
            }
        });
    }

    // ==========================================
    // PART 2: DATA TABLE (data.html)
    // ==========================================
    const tableBody = document.getElementById("tableBody");

    if (tableBody) {
        const searchInput = document.getElementById("searchInput");
        const sortNameBtn = document.getElementById("sortNameBtn");
        const sortAgeBtn = document.getElementById("sortAgeBtn");

        function renderTable(data) {
            tableBody.innerHTML = "";
            if (data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No matching results</td></tr>`;
                return;
            }

            data.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.city}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Search Filter
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = people.filter((person) =>
                person.name.toLowerCase().includes(query) ||
                person.city.toLowerCase().includes(query)
            );
            renderTable(filtered);
        });

        // Sort by Name
        sortNameBtn.addEventListener("click", () => {
            people.sort((a, b) => a.name.localeCompare(b.name));
            renderTable(people);
        });

        // Sort by Age
        sortAgeBtn.addEventListener("click", () => {
            people.sort((a, b) => a.age - b.age);
            renderTable(people);
        });

        // Initial Load
        renderTable(people);
    }
});
