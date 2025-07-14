import pool from '../../config/db.js';

const testResultsService = {
    getAllTestResults: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in testResultsService.");
        }

        try {
            const query = 'SELECT * FROM test_results';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching test results :', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    getActiveTestResults: async () => {
        if (!pool) {
            throw new Error("Database pool not initialized in getActiveTestResults.");
        }

        try {
            const query = 'SELECT * FROM test_results WHERE status = 1';
            const result = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching test results:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
    
    insertDetailTestResults: async (title, description, image) => {
        if (!pool) {
            throw new Error("Database pool not initialized in insertDetailTestResults.");
        }

        try {
            const query = `
                INSERT INTO test_results
                (title, description, image, created_by)
                VALUES
                (?,?,?,?)
            `;
            await pool.query(query, 
                [title, description, image, 'Developer'] // Assuming 'Developer' is the creator
            );
        } catch (error) {
            console.error('Error fetching test results:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    updateTestResults: async (id, updateData) => {
        try {
            // Build the SET part of the SQL query dynamically based on updateData
            const setClauses = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);
            values.push(id); // Add id to the end of values for the WHERE clause

            await pool.query(`UPDATE test_results SET ${setClauses} WHERE Id = ?`, values);
            return true; // Indicate success
        } catch (error) {
            console.error(`Error updating test results with ID ${id}:`, error);
            throw error;
        }
    },

    deleteTestResults: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in deleteTestResults.");
        }

        try {
            const query = `
                DELETE FROM test_results
                WHERE Id = ?
            `;
            await pool.query(query, [id]);
        } catch (error) {
            console.error('Error fetching test results:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },

    getTestResultsById: async (id) => {
        if (!pool) {
            throw new Error("Database pool not initialized in getTestResultsById.");
        }

        try {
            const query = 'SELECT * FROM test_results WHERE Id = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error('Error fetching test results:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    },
}

export default testResultsService;
