import newsService from '../services/news.service.js';

// 2. Use the pool in your controller functions
export const getAllNews = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await newsService.getAllNews();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'An error occurred while fetching news.' });
  }
};