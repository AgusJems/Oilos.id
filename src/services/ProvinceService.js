import pool from '../../config/db.js';

const ProvinceService = {
    getAllProvinces: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in ProvinceService.");
        }

        try {
            const query = 'SELECT * FROM provinces';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    }
}

export default ProvinceService;
