import ProvinceService from '/home/user/Oilos.id/src/services/ProvinceService.js';

const ProvinceController = { 
    init: (pool) => {
        ProvinceService.init(pool);
    },

    getAllProvinces: async (req, res) => {
        try {
            const provinces = await ProvinceService.getAllProvinces();
            res.status(200).json(provinces);
        } catch (error) {
            console.error('Error getting all provinces:', error);
            res.status(500).json({ error: 'Failed to retrieve provinces' });
        }
    },
};

export default ProvinceController;