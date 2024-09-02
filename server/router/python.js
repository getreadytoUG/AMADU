import express from "express";
import * as pythonController from "../controller/python.js"

const router = express.Router();

// python서버랑 연동
router.get("/", pythonController.get_model)

export default router;