let dbPool; // Use a variable to hold the connection pool

const AuthenticationController = {
    init: (pool) => {
        dbPool = pool;
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            // Use the connection pool to acquire a client
            const client = await dbPool.getConnection();

            // Example query (replace with your actual query)
            const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

            // Release the client back to the pool
            client.release();

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = result.rows[0];

            // In a real application, you would compare the hashed password
            if (password === user.password) {
                // Successful login
                // You might generate a token here and send it back
                res.status(200).json({ message: 'Login successful', data: user });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

}

export default AuthenticationController;