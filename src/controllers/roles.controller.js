import rolesService from '../services/roles.service.js';

// 2. Use the pool in your controller functions
export const getAllRoles = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await rolesService.getAllRoles();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'An error occurred while fetching cities.' });
  }
};