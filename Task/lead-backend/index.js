const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

// Route to test server
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// POST route to receive lead data
app.post('/submit-lead', async (req, res) => {
  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Send the data to n8n webhook (replace with your actual URL)
    await axios.post('https://n8n-instance/webhook/lead-webhook', {
      name, email, company, message
    });

    res.status(200).json({ message: 'Lead forwarded to n8n successfully!' });
  } catch (error) {
    console.error('Error forwarding to n8n:', error.message);
    res.status(500).json({ error: 'Failed to forward lead to n8n.' });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
