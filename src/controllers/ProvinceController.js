import { data } from 'react-router';
import ProvinceService from './../services/ProvinceService.js';

const ProvinceController = { 

    getAllProvinces: async (req, res) => {
        try {
            const provinces = await ProvinceService.getAllProvinces();
            res.status(200).json({data: provinces});
        } catch (error) {
            console.error('Error getting all provinces:', error);
            res.status(500).json({ error: 'Failed to retrieve provinces' });
        }
    },
};

export default ProvinceController;