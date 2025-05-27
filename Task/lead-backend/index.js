const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;

app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON bodies

// Route to test server
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// POST route to receive lead data
app.post('/submit-lead', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    // Send the data to n8n webhook (replace with your actual URL)
    // IMPORTANT: Make sure 'company' and 'message' are included in your frontend if you expect them here.
    // If not, remove them from the n8n payload.
    await axios.post('https://accountname.app.n8n.cloud/webhook/fc95109c-a594-4d42-bf00-c357ba2a5294', {
      name,
      email
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
