document
    .getElementById("signupForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (data.message === "User created successfully") {
            alert("Signup successful!");
            window.location.href = "login.html";
        } else {
            alert("Signup failed: " + data.message);
        }
    });
