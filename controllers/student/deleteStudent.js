const { TABLE } = require('../../util/constant');
const dao = require('../../util/dao');
const Joi = require('joi');


const deleteStudentApi = async (req, res) => {
    try {
        const students = await deleteStudent(req);
        if (students.rowCount > 0) {
            return res.status(200).json({ message: "successful deleted data" });
        }
        return res.status(401).send("Something went wrong");

    } catch (error) {
        res.status(500).send("Internal server error");
        throw error;
    }
}


const deleteStudent = async (req) => {
    const { id } = req.params;
    try {
        sql = {
            text: `delete from ${TABLE.STUDENT} where id = $1`,
            values: [id]
        }
        const data = await dao.execute_value(sql)
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = deleteStudentApi;