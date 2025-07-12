import pool from '../../config/db.js';

const newsService = {
    getAllNews: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in newsService.");
        }

        try {
            const query = 'SELECT * FROM news';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default newsService;
