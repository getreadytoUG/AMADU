import * as userRepository from "../data/join.js";
import bcrypt from "bcrypt";
import { config } from "../config.js"
import jwt from "jsonwebtoken";

// 함수
function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn:config.jwt.expiresInSec});
 }


 // 회원가입
export async function signup(req, res) {
    const {id, local, password, phone, name} = req.body;
    // 아이디 중복 검사
    const found = await userRepository.findById(id);

    if(found){
        return res.status(409).json({message:`${id}이 이미 가입 되었음`})
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        id, local, hashed, phone, name
    });
    const token = createJwtToken(userId);
    res.status(201).json({id});
}

// jwt
export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message:'사용자를 찾을 수 없음'})
    }
    res.status(200).json({token:req.token, id:user.id});
}

// login
export async function login(req, res) {
    // 아이디 비번 받기
    const {id, password} = req.body;

    // 아이디 검사
    const found = await userRepository.findById(id);

    // 아이디가 없을 경우
    if(!found){
        return res.status(401).json({message:'로그인에 실패했습니다. 입력한 정보가 정확한지 확인해주세요.'})
    }

    // 입력한 비밀번호와 db에 있는 비밀번호 검사
    let pwCheck = await bcrypt.compare(password, found.password)
    if(!pwCheck){
        return res.status(401).json({message:'로그인에 실패했습니다. 입력한 정보가 정확한지 확인해주세요.'})   
    }
    const token = createJwtToken(found.id);
    res.status(201).json({
        token,
        id,
        local: found.local,
        phone: found.phone,
        name: found.name
    });
}