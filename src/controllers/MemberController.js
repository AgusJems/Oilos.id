let dbPool;

const MemberController = {
  init: (pool) => {
    dbPool = pool;
  },

  getUsers: async (req, res) => {
    try {
      const [rows] = await dbPool.query(`
            SELECT U.Id, U.Username, U.Name, U.Identity, U.Phone, U.Email, U.Area, U.CodeRefferal, R.Name AS RoleName
            FROM users U
            INNER JOIN roles R ON R.Id = U.RoleId
        `);
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default MemberController;
