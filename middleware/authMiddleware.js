const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();
const secret = process.env.JWTKEY;

const authMiddleWare = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['x-access-token'];
        if (!authHeader) {
            return res.send({ message: 'No token' })
        }
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, secret);
            req.user = decoded?.user;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = authMiddleWare;