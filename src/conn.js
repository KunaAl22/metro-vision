// conn.js

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Replace <password> with your actual MongoDB password
const uri = "mongodb+srv://opencv:opencv@cluster0.nssa9cv.mongodb.net/test?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Define a Mongoose model
const Item = mongoose.model('Item', {
  username: String,
  emailid: String,
  phoneNumber: String,
  image: Buffer,
  balance: Number,
  entryLocation: String,
  entryTime: Date,
  exitLocation: String,
  exitTime: Date,
}, 'userdata'); // Specify the collection name

connection.once('open', async () => {
  try {
    console.log('MongoDB connection established successfully');

    // Fetch all documents from the collection and log them
    const allItems = await Item.find({});
    // console.log('All Items in the Collection:', allItems);
  } catch (error) {
    console.error(error);
  }
});

// API endpoint to get user data by email
app.get('/api/user-data/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Item.findOne({ emailid: email });

    if (user) {
      console.log('User Data:', user.emailid);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
