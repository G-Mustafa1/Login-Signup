const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const validator = require('validator');


authRouter.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname) {
            throw new Error("Name not found !")
        } else if (!validator.isEmail(email)) {
            console.error('Invalid input:', error.message);
            throw new Error("Email not found !")
        } else if (!validator.isStrongPassword(password)) {
            console.error('Invalid input:', error.message);
            throw new Error("Password not found !")

        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_PASS));


        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).send('User signed up successfully')

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Error during signup', error.message);
    }
})


authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found, signup first");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send({ message: 'Login successful', user });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send({ error: 'Error during login', message: error.message });
    }
});

authRouter.post('/logout', (req, res) => {
    try {
        // console.log("Cookies:", req.cookies);
        res.clearCookie("token");
        res.send("logout successful");
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).send({ error: 'Error during logout', message: error.message });
    }
});

module.exports = {
    authRouter
}; 