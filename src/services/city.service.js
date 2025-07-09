import pool from '../../config/db.js';

const cityService = {
    getAllCities: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in cityService.");
        }

        try {
            const query = 'SELECT * FROM cities';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    }
}

export default cityService;
