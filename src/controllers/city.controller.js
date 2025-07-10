import cityService from '../services/city.service.js';

// 2. Use the pool in your controller functions
export const getAllCities = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await cityService.getAllCities();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'An error occurred while fetching cities.' });
  }
};

export const getCityByProvinceId = async (req, res) => {
    const { id } = req.params;
    try {
        // Validate the ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid city ID.' });
        }

        // Get the city by ID
        const [rows] = await cityService.getCityByProvinceId(id);
        console.log(`City with ID ${id} found:`, rows);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'City not found.' });
        }
        res.status(200).json({data: rows}); // Return the city found
    } catch (error) {
        console.error(`Error fetching city with id ${id}:`, error);
        res.status(500).json({ message: 'An error occurred while fetching the city.' });
    }
};
