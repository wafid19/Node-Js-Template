const dao = require('../../util/dao');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { TABLE } = require('../../util/constant');

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).max(15).required(),
})

const registerController = async (req, res) => {
    const isValidate = schema.validate(req.body);
    if (isValidate.error) {
        return res.status(400).json({ error: isValidate.error })
    }
    try {
        const isDuplicate = await duplicateEntryCheck(req);
        if (isDuplicate) {
            return res.status(400).json({ message: "duplicate entry of username or password" });
        }
        const register = await registerUser(req);
        if (register.rowCount > 0) {
            return res.status(200).json({ message: "Registration successful" });
        } else {
            res.status(401).send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
        throw error;
    }
}


const registerUser = async (req) => {
    const { name, username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        sql = {
            text: `INSERT INTO ${TABLE.USERS}(name, username, email, password) VALUES($1, $2, $3, $4)`,
            values: [name, username, email, hashedPassword]
        }
        const register = await dao.execute_value(sql);
        return register;
    } catch (error) {
        throw error;
    }
}


const duplicateEntryCheck = async (req) => {
    const { username, email } = req.body;

    try {
        sql = {
            text: `select * from ${TABLE.USERS} where email = $1 or username = $2`,
            values: [email, username]
        }
        const data = await dao.get_data(sql);
        return data.length > 0 ? true : false;
    } catch (error) {
        throw error;
    }
}




module.exports = registerController;