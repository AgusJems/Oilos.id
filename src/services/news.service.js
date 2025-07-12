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

    getActiveNews: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in newsService.");
        }

        try {
            const query = 'SELECT * FROM news WHERE status = 1';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
    
    insertDetailNews: async (title, description, image) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
                INSERT INTO news
                (title, description, image, created_by)
                VALUES
                (?,?,?,?)
            `;
            await pool.query(query, 
                [title, description, image, 'Developer'] // Assuming 'Developer' is the creator
            );
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    updateNews: async (id, updateData) => {
        try {
            // Build the SET part of the SQL query dynamically based on updateData
            const setClauses = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);
            values.push(id); // Add id to the end of values for the WHERE clause

            await pool.query(`UPDATE news SET ${setClauses} WHERE Id = ?`, values);
            return true; // Indicate success
        } catch (error) {
            console.error(`Error updating news with ID ${id}:`, error);
            throw error;
        }
    },

    deleteNews: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in authenticationService.");
        }

        try {
            const query = `
                DELETE FROM news
                WHERE Id = ?
            `;
            await pool.query(query, [id]);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default newsService;
