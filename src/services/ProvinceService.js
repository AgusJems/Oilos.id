let dbPool;

const ProvinceService = {
    init: (pool) => {
        dbPool = pool;
    },

    getAllProvinces: async () => {
        if (!dbPool) {
            throw new Error("Database pool not initialized in ProvinceService.");
        }

        try {
            const query = 'SELECT * FROM provinces';
            const result = await dbPool.query(query);
            return result[0];
        } catch (error) {
            console.error('Error fetching provinces:', error);
            throw error; // Re-throw the error for the controller to handle
        }
    }
}

export default ProvinceService;
