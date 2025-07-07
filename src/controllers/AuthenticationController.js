import jwt from 'jsonwebtoken';
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
        'SELECT * FROM users WHERE Username = ? AND Status = 1',
        [username]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = rows[0];

      if (password === user.Password) {
        const token = jwt.sign(
            {
                Username: user.Username,
                RoleId: user.RoleId,
                Name: user.Name,
                Identity: user.Identity,
                Phone: user.Phone,
                Email: user.Email,
                Area: user.Area,
                CodeRefferal: user.CodeRefferal
            },
            'your_secret_key' // Replace with a strong, secret key
        );
        return res.status(200).json({ message: 'Login successful', token: token });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  register: async (req, res) => {
    try {
      const { username, password, name, identity, phone, email, area, codeRefferal  } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const [existingUsers] = await dbPool.query(
        'SELECT * FROM users WHERE Username = ? OR Identity = ?',
        [username, identity]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Username OR Identity already exists' });
      }

      await dbPool.query(
        'INSERT INTO users (Username, Password, RoleId, Name, Identity, Phone, Email, Area, CodeRefferal, Status, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [username, password, 2, name, identity, phone, email, area, codeRefferal, 1, username ]
      );
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default AuthenticationController;
