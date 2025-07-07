import jwt from 'jsonwebtoken';
let SecretKey;
import MemberService from '/home/user/Oilos.id/src/services/MemberService.js';

const MemberController = { 
    init: (pool, secretKey) => {
        SecretKey = secretKey;
        MemberService.init(pool);
    },

    getAllUsers: async (req, res) => {
        try {
            const rows = await MemberService.getAllUsers();
            res.status(200).json({ data: rows });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default MemberController;
