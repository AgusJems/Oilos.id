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

export const getActiveNews = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await newsService.getActiveNews();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'An error occurred while fetching news.' });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await newsService.getNewsById(id);
    if (rows && rows.length > 0) {
        res.status(200).json({ data: rows[0] });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const insertDetailNews = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    await newsService.insertDetailNews(title, description, image);
    res.status(201).json({ message: 'News created successfully' });
  } catch (error) {
    console.error('Error inserting news:', error);
    res.status(500).json({ message: 'An error occurred while inserting news.' });
  }
};

export const updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await newsService.updateNews(id, updateData);

    if (result) {
        res.status(200).json({ message: 'News updated successfully' });
    } else {
        res.status(404).json({ message: 'News not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    await newsService.deleteNews(id);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleted news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}