const User = require('../models/user');
const MagazinePost = require('../models/magazine');

exports.getDashboard = async (req, res) => {
    try {
        const users = await User.find({});
        const pendingPosts = await MagazinePost.find({ status: 'pending' });
        res.status(200).json({ users, pendingPosts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin data', error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};
