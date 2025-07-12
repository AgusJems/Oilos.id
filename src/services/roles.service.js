import pool from '../../config/db.js';

const roleService = {
    getAllRoles: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in roleService.");
        }

        try {
            const query = 'SELECT * FROM roles';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default roleService;
