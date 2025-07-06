// src/controllers/messageController.js
let dbPool; // Use a variable to hold the connection pool

const messageController = {
  // Method to initialize the controller with the database pool
  init: (pool) => {
    dbPool = pool;
  },

  getMessage: (req, res) => {
    // This method doesn't need database access currently,
    // so it remains the same.
    res.json({ message: 'Hello from the controller!' });
  },

  getUserMessage: async (req, res) => {
    const { userId } = req.params;

    // Now you can use dbPool to interact with the database
    try {
      // Example: Fetch user details from the database using the userId
      const [rows, fields] = await dbPool.query('SELECT * FROM users WHERE id = ?', [userId]);

      if (rows.length > 0) {
        const user = rows[0];
        res.json({ message: 'This is a user message', user: user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }

    } catch (err) {
      console.error('Error fetching user message:', err);
      res.status(500).json({ error: 'Failed to fetch user message' });
    }
  }
};

export default messageController;
