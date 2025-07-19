import pool from '../../config/db.js';

const itemService = {
    getAllItems: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in getAllItems.");
        }

        try {
            const query = 'SELECT * FROM items';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    getActiveItems: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in getActiveItems.");
        }

        try {
            const query = 'SELECT * FROM items WHERE status = 1';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
    
    insertDetailItems: async (code, name, description, image, price) => {
        if (!pool) {
            throw new Error("Database pool not initialized in insertDetailItems.");
        }

        try {
            const query = `
            INSERT INTO items
            (code, name, description, image, price, created_by)
            VALUES
            (?,?,?,?,?,?)
            `;
            await pool.query(query, 
                [code, name, description, image, price, 'Developer'] // Assuming 'Developer' is the creator
            );
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    updateItems: async (id, updateData) => {
        if (!pool) {
            throw new Error("Database pool not initialized in updateItems.");
        }
        try {
            // Build the SET part of the SQL query dynamically based on updateData
            const setClauses = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);
            values.push(id); // Add id to the end of values for the WHERE clause

            await pool.query(`UPDATE items SET ${setClauses} WHERE Id = ?`, values);
            return true; // Indicate success
        } catch (error) {
            console.error(`Error updating items with ID ${id}:`, error);
            throw error;
        }
    },

    deleteItems: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in deleteItems.");
        }

        try {
            const query = `
                DELETE FROM items
                WHERE Id = ?
            `;
            await pool.query(query, [id]);
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
    
    getItemsById: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in getItemsById.");
        }

        try {
            const query = 'SELECT * FROM items WHERE Id = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default itemService;
