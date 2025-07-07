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

    getUserById: async (userId) => {
        try {
            const [rows] = await dbPool.query('SELECT * FROM users WHERE Id = ?', [userId]);
            return rows[0]; // Assuming user ID is unique, return the first row
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw error;
        }
    },

    // Add other member-related database interaction functions here as needed
    // For example:
    updateUser: async (userId, updateData) => {
        try {
            // Build the SET part of the SQL query dynamically based on updateData
            const setClauses = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);
            values.push(userId); // Add userId to the end of values for the WHERE clause

            await dbPool.query(`UPDATE users SET ${setClauses} WHERE Id = ?`, values);
            return true; // Indicate success
        } catch (error) {
            console.error(`Error updating user with ID ${userId}:`, error);
            throw error;
        }
    },
    // deleteUser: async (userId) => { ... },
};

export default MemberService;