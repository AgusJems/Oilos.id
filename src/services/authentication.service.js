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

    
    insertDetailUser: async (username, password, name, identity, phone, email, code, codeReferral, verificationToken, cityId) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
                INSERT INTO users
                (username, password, name, identity, phone, email, code, code_referral, token, status, created_by, cities_id, roles_id)
                VALUES
                (?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;
            await pool.query(query, 
                [username, password, name, identity, phone, email, code, codeReferral, verificationToken, 0, name, cityId, 4]
            );
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    getUserByToken: async (token) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
                SELECT *FROM users WHERE token = ?
            `;
            const result = await pool.query(query, [token]);
            return result;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    verifyEmail: async (token) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
            UPDATE users SET Status = 1, token = NULL WHERE token = ?
            `;
            await pool.query(query, 
                [token]
            );
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default authenticationService;
