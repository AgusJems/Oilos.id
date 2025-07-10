import jwt from 'jsonwebtoken';

const AuthGuardService = {
    AuthGuardMember: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401); // if there's no token, return 401
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // if token is not valid, return 403
            }
            req.user = user;
            next(); // proceed to the next middleware or route handler
        });
    },
    AuthGuardAdmin: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401); // if there's no token, return 401
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // if token is not valid, return 403
            }
            req.user = user;
            next(); // proceed to the next middleware or route handler
        });
    },
}
export default AuthGuardService;