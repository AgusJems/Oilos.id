import pool from '../../config/db.js';

const MemberService = {
    getAllUsers: async () => {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    u.username, u.name, u.identity, u.phone, u.email, u.code, u.code_referral, u.status, r.code RoleCode, r.name RoleName, c.name CityName, p.name ProvinceName
                FROM users u
                JOIN roles r ON r.id = u.roles_id
                JOIN cities c ON c.id = u.cities_id
                JOIN provinces p ON p.id = c.provinces_id
            `);
            return rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    // getUserById: async (id) => {
    //     if (!pool) {
    //         throw new Error("Database pool not initialized in cityService.");
    //     }
    //     try {
    //         const sql = `SELECT * FROM users WHERE id = 1`;
    //         // Using pool.query or pool.execute is fine, but ensure you use the same method consistently
    //         const [rows] = await pool.execute(sql, [id]);
    //         console.log(id, rows);
    //         return rows[0]; // Assuming user ID is unique, return the first row
    //     } catch (error) {
    //         console.error(`Error fetching user with ID ${id}:`, error);
    //         throw error;
    //     }
    // },
    getUserById: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in cityService.");
        }

        try {
            const query = 'SELECT * FROM users WHERE Id = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
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

            await pool.query(`UPDATE users SET ${setClauses} WHERE Id = ?`, values);
            return true; // Indicate success
        } catch (error) {
            console.error(`Error updating user with ID ${userId}:`, error);
            throw error;
        }
    },
    // deleteUser: async (userId) => { ... },
};

export default MemberService;