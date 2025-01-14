
const bcrypt = require('bcrypt');
const userDao = require('../dao/userDao');

exports.login = async (email, password) => {

    const user = await userDao.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};

exports.createUser = async (name, email, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        name,
        email,
        password: hashedPassword,
    };
    await userDao.saveUser(user);
    
};

exports.readUserData = async (id) => {
    return await userDao.readUserData(id);
}
