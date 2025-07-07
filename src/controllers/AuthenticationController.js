let dbPool;

const AuthenticationController = {
  init: (pool) => {
    dbPool = pool;
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      // Gunakan pool langsung (tanpa getConnection)
      const [rows] = await dbPool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = rows[0];

      if (password === user.Password) {
        return res.status(200).json({ message: 'Login successful', data: user });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default AuthenticationController;
