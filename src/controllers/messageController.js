const messageController = {
  getMessage: (req, res) => {
    res.json({ message: 'Hello from the controller!' });
  },
  getUserMessage: (req, res) => {
    const { userId } = req.params;
    res.json({ message: 'This is a user message', user: userId });
  }
};

export default messageController;
