import express  from "express";
import * as authController from "../controller/join.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import {body, param} from "express-validator";

const router = express.Router();

const vaildateCredential = [
    body('id').trim().notEmpty().withMessage('id를 입력하세요')
]
// 여기다시해야합니다!!
// 여기다시해야합니다!!
// 여기다시해야합니다!!
// 여기다시해야합니다!!
// 여기다시해야합니다!!
// 여기다시해야합니다!!

const validateJoin = [
    ... vaildateCredential,
    body('name').trim().notEmpty().withMessage('이름을 입력해주세요'),
    body('phone').trim().notEmpty().withMessage('전화번호 형식에 맞춰서 입력해주세요.'),
    body('local').trim().notEmpty().withMessage('지역을 입력해 주세요').optional({nullable: true, checkFalsy:true}), validate
]

// 회원가입
router.post("/signup", validateJoin, authController.signup)

// 사용자 아이디
// 이거 어디 쓰는거야?
router.get("/me", isAuth ,authController.me)

// 로그인
router.post("/login",vaildateCredential, authController.login)

export default router;