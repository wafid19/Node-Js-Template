const dao = require('../../util/dao');
const { TABLE } = require('../../util/constant');

const getStudentList = async (req, res) => {
    try {
        const students = await getStudent(req);
        if (students.length > 0) {
            return res.status(200).json({ message: "successful get data", data: students });
        } else {
            res.status(401).send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
        throw error;
    }
}


const getStudent = async (req) => {
    try {
        sql = {
            text: `select * from ${TABLE.STUDENT}`,
            values: []
        }
        const data = await dao.get_data(sql)
        return data;
    } catch (error) {
        throw error;
    }
}







module.exports = getStudentList;