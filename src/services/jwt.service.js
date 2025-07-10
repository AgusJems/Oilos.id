import jwt from 'jsonwebtoken';

const JwtService = {
    getDataToken: async (token) => {
        try {
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          return decoded;
        } catch (error) {
          return null;
        }
    },
};

export default JwtService;