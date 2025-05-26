document.getElementById("leadForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please fill out required fields correctly.");
      return;
    }
  
    const data = {
      name,
      email,
      company: document.getElementById("company").value,
      message: document.getElementById("message").value
    };
  
    try {
      const res = await fetch("http://localhost:5000/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const response = await res.json();
      alert(response.message);
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  });
  