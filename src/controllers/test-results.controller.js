import testResultsService from '../services/test-results.service.js';

// 2. Use the pool in your controller functions
export const getAllTestResults = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await testResultsService.getAllTestResults();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ message: 'An error occurred while fetching test results.' });
  }
};

export const getActiveTestResults = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await testResultsService.getActiveTestResults();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ message: 'An error occurred while fetching test results.' });
  }
};

export const getTestResultsById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await testResultsService.getTestResultsById(id);
    if (rows && rows.length > 0) {
        res.status(200).json({ data: rows[0] });
    } else {
        res.status(404).json({ message: 'Test results not found' });
    }
  } catch (error) {
    console.error('Error fetching test results by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const insertDetailTestResults = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    await testResultsService.insertDetailTestResults(title, description, image);
    res.status(201).json({ message: 'TestResults created successfully' });
  } catch (error) {
    console.error('Error inserting test results:', error);
    res.status(500).json({ message: 'An error occurred while inserting test results.' });
  }
};

export const updateTestResults = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await testResultsService.updateTestResults(id, updateData);

    if (result) {
        res.status(200).json({ message: 'Test results updated successfully' });
    } else {
        res.status(404).json({ message: 'Test results not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating test results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteTestResults = async (req, res) => {
  try {
    const id = req.params.id;
    await testResultsService.deleteTestResults(id);

    res.status(200).json({ message: 'Test results deleted successfully' });
  } catch (error) {
    console.error('Error deleted test results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}