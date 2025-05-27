document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Basic client-side validation
  if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
    alert("Please fill out required fields correctly.");
    return;
  }

  const data = {
    name,
    email
  };

  try {
    const res = await fetch("http://localhost:3000/submit-lead", { // This is correct
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const response = await res.json();
    alert(response.message);
    // Optional: Clear the form after successful submission
    document.getElementById("leadForm").reset();
  } catch (err) {
    alert("Error submitting form. Please check your network and try again.");
    console.error("Fetch error:", err);
  }
});
