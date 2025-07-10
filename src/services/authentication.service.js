import pool from '../../config/db.js';

const authenticationService = {
    getDetailUser: async (username) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
                SELECT u.username, u.password, u.name, u.identity, u.phone, u.email, u.code, u.code_referral, u.status, r.code roles_code, r.name roles_name, c.name cities_name, p.name provinces_name
                FROM users u
                JOIN roles r ON r.id = u.roles_id
                JOIN cities c ON c.id = u.cities_id
                JOIN provinces p ON p.id = c.provinces_id
                WHERE u.username = ? AND u.status = 1
            `;
            const result = await pool.query(query, [username]);
            return result;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default authenticationService;
