const express = require('express');
const profileRouter = express.Router();
const { User } = require('../models/user');
const { userAuth } = require('../middleware/authmiddle');

profileRouter.get('/getuser', userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'Error fetching user', message: error.message });
    }
})

profileRouter.get('/getallusers', userAuth, async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            console.error('No users found');
            throw new Error("Error fetching users");
        }
        else {
            res.status(200).send(users);
        }
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send({ error: 'Error fetching all users', message: error.message });
    }
})


module.exports = {
    profileRouter
}