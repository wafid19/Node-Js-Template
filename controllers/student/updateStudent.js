const { TABLE } = require('../../util/constant');
const dao = require('../../util/dao');
const Joi = require('joi');
const schema = Joi.object().keys({
    name: Joi.string().trim().min(2).required(),
    roll: Joi.string().trim().min(6).required(),
    reg: Joi.string().trim().min(10).required(),
})

const updateStudentApi = async (req, res) => {
    const isValidate = schema.validate(req.body);
    if (isValidate.error) {
        return res.status(400).json({ error: isValidate.error })
    }
    try {
        const students = await updateStudent(req);
        if (students.rowCount > 0) {
            return res.status(200).json({ message: "successful updated data" });
        }
        return res.status(401).send("Something went wrong");

    } catch (error) {
        res.status(500).send("Internal server error");
        throw error;
    }
}


const updateStudent = async (req) => {
    const { name, roll, reg } = req.body;
    const { id } = req.params;
    try {
        sql = {
            text: `update ${TABLE.STUDENT} set name = $1, roll = $2, reg = $3 where id = $4`,
            values: [name, roll, reg, id]
        }
        const data = await dao.execute_value(sql)
        return data;
    } catch (error) {
        throw error;
    }
}







module.exports = updateStudentApi;