const userService = require('../service/userService');

exports.login = async (req, res) => {

    const { email, password } = req.body;
    try {

        const userInfo = await userService.login(email, password);
        res.status(200).json({
            message: 'Successfully logged in',
            userInfo,
        });

    } catch (error) {

        res.status(400).json({
            message: 'Failed to log in',
            error: error.message,
        });

    }
};

exports.createUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {

        await userService.createUser(name, email, password);
        res.status(201).send({
            message: 'User created successfully!',
        });

    } catch (error) {

        res.status(400).json({
            message: 'Failed to create user',
            error: error.message,
        });

    }
};

exports.readUserData = async(req,res) => {

    const id = req.params.id;

    try {
        const userData = await userService.readUserData(id);
        res.status(200).json({
            message: 'Successfully fetched user data',
            userData,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to fetch user data',
            error: error.message,
        });
    }
}
