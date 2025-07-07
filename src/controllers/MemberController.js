import jwt from 'jsonwebtoken';
let dbPool;
let SecretKey;

const MemberController = {
    init: (pool, secretKey) => {
        dbPool = pool;
        SecretKey = secretKey;
    },

    getUsers: async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            jwt.verify(token, SecretKey, async (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden' });
                }

                // Token is valid, proceed with fetching users
                const [rows] = await dbPool.query(`
            SELECT U.Id, U.Username, U.Name, U.Identity, U.Phone, U.Email, U.Area, U.CodeRefferal, R.Name AS RoleName
            FROM users U
            INNER JOIN roles R ON R.Id = U.RoleId

        `);
                res.status(200).json({ data: rows });
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default MemberController;
