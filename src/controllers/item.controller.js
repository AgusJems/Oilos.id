import itemService from '../services/item.service.js';

export const getAllItems = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await itemService.getAllItems();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'An error occurred while fetching items.' });
  }
};

export const getActiveItems = async (req, res) => {
  try {
    // Get a connection from the pool and execute a query
    const [rows] = await itemService.getActiveItems();
    res.status(200).json({data: rows});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'An error occurred while fetching items.' });
  }
};


export const getItemsById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await itemService.getItemsById(id);
    if (rows && rows.length > 0) {
        res.status(200).json({ data: rows[0] });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const insertDetailItems = async (req, res) => {
  const { name, description, image, price } = req.body;

  try {
    const words = username.split(" ");
    let initial = "";
    for (const word of words) {
      if (word.length > 0) {
        initial += word[0].toUpperCase();
      }
    }

    const registrationDateTime = format(new Date(), "ddMMyyyyHm");
    let code = `${initial}-${registrationDateTime}`;

    await itemService.insertDetailItems(code, name, description, image, price);
    res.status(201).json({ message: 'Items created successfully' });
  } catch (error) {
    console.error('Error inserting items:', error);
    res.status(500).json({ message: 'An error occurred while inserting items.' });
  }
};

export const updateItems = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await itemService.updateItems(id, updateData);

    if (result) {
        res.status(200).json({ message: 'Items updated successfully' });
    } else {
        res.status(404).json({ message: 'Items not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteItems = async (req, res) => {
  try {
    const id = req.params.id;
    await itemService.deleteItems(id);

    res.status(200).json({ message: 'Items deleted successfully' });
  } catch (error) {
    console.error('Error deleted items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}