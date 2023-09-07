const { Router } = require('express');

const studentRouter = Router();
const { API } = require('../util/constant');
const authMiddleware = require('../middlewares/auth_middleware');
const getStudentListController = require('../controllers/student/getStudent');
const createStudentController = require('../controllers/student/createStudent');
const updateStudentController = require('../controllers/student/updateStudent');
const deleteStudentController = require('../controllers/student/deleteStudent');

studentRouter.get(API.API_CONTEXT + API.STUDENT_LIST, authMiddleware, getStudentListController);
studentRouter.post(API.API_CONTEXT + API.CREATE_STUDENT, authMiddleware, createStudentController)
studentRouter.put(API.API_CONTEXT + API.UPDATE_STUDENT + "/:id", authMiddleware, updateStudentController)
studentRouter.delete(API.API_CONTEXT + API.DELETE_STUDENT + "/:id", authMiddleware, deleteStudentController)

module.exports = studentRouter;