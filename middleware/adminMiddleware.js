const adminMiddleware = async (req, res, next) => {

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = adminMiddleware;