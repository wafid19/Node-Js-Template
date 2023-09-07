const { TABLE } = require('../../util/constant');
const dao = require('../../util/dao');
const Joi = require('joi');
const schema = Joi.object().keys({
    name: Joi.string().trim().min(2).required(),
    roll: Joi.string().trim().min(6).required(),
    reg: Joi.string().trim().min(10).required(),
})

const createStudentApi = async (req, res) => {
    const isValidate = schema.validate(req.body);
    if (isValidate.error) {
        return res.status(400).json({ error: isValidate.error })
    }
    try {
        const students = await createStudent(req);
        if (students.rowCount > 0) {
            return res.status(200).json({ message: "successful inserted data" });
        }
        return res.status(401).send("Something went wrong");

    } catch (error) {
        res.status(500).send("Internal server error");
        throw error;
    }
}


const createStudent = async (req) => {
    const { name, roll, reg } = req.body;
    try {
        sql = {
            text: `insert into ${TABLE.STUDENT}(name, roll, reg) values($1, $2, $3)`,
            values: [name, roll, reg]
        }
        const data = await dao.execute_value(sql)
        return data;
    } catch (error) {
        throw error;
    }
}







module.exports = createStudentApi;