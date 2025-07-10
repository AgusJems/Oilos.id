import JwtService from './../services/JwtService.js';
import MemberService from './../services/MemberService.js';

const MemberController = { 

    getAllUsers: async (req, res) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const userData = JwtService.getDataFromToken(token);
            if (!userData || userData.rolecode !== 1) {
                return res.status(403).json({ message: 'Forbidden: Admins only' });
            }
        }
        try {
            const rows = await MemberService.getAllUsers();
            res.status(200).json({ data: rows });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const rows = await MemberService.getUserById(id);
            if (rows && rows.length > 0) {
                res.status(200).json({ data: rows[0] });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updateData = req.body;
            const result = await MemberService.updateUser(userId, updateData);

            if (result && result.affectedRows > 0) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found or no changes made' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default MemberController;
