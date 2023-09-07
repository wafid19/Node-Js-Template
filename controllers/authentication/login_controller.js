const dao = require('../../util/dao')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TABLE } = require('../../util/constant');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).max(15).required(),
})

const loginController = async (req, res) => {
    const isValidate = schema.validate(req.body);
    if (isValidate.error) {
        return res.status(400).json({ error: isValidate.error })
    }
    let data = [];
    try {
        const { email, password } = req.body;
        sql = {
            text: `select * from ${TABLE.USERS} where email = $1`,
            values: [email]
        }
        data = await dao.get_data(sql);
        if (data.length > 0) {
            if (bcrypt.compare(data[0].password, password)) {
                const token = generateToken(data);
                return res.status(200).json({
                    message: "Login success",
                    token: token
                })
            }
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        return res.status(401).json({
            message: "Invalid credentials"
        })

    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}



const generateToken = (data) => {
    const newData = data[0];
    const dataForSign = {
        user: {
            name: newData.name,
            username: newData.username,
            email: newData.email
        }
    }
    const token = jwt.sign(dataForSign, process.env.JWT_SECRET);
    return token;
}

module.exports = loginController;