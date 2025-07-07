let dbPool;

const MemberService = {
    init: (pool) => {
        dbPool = pool;
    },

    getAllUsers: async () => {
        try {
            const [rows] = await dbPool.query(`
                SELECT U.Id, U.Username, U.Name, U.Identity, U.Phone, U.Email, U.Area, U.CodeRefferal, R.Code AS RoleCode
                FROM users U
                INNER JOIN roles R ON R.Id = U.RoleId
            `);
            return rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    // Add other member-related database interaction functions here as needed
    // For example:
    // getUserById: async (userId) => { ... },
    // createUser: async (userData) => { ... },
    // updateUser: async (userId, updateData) => { ... },
    // deleteUser: async (userId) => { ... },
};

export default MemberService;