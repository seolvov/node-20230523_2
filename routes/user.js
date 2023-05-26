import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt" //암호화해주는 라이브러리
import jwt from "jsonwebtoken"

const router = express.Router()

//회원가입
router.post("/signup", async (req, res) => {
    const { email, password, userName, address, phone } = req.body

    //1. 이메일 유무 체크 - 유니크값
    const user = await userModel.findOne({ email }) //email : email 인데 값이 같아서 email 만 작성
    if(user) {
        return res.json({
            msg: "this email existed"
        })
    }
    //2. 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10) //salt: 암호화된 키값 보통 10
    //3. return
    const newUser = new userModel({
        email, password: hashedPassword, userName, address, phone
    })
    const createdUser = await newUser.save()
    res.json({
        msg: "created ID",
        user: createdUser
    })
})
//로그인
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    //1. 이메일 유무체크
    const user = await userModel.findOne({ email })
    if(!user) {
        return res.json({
            msg: "please check your email"
        })
    }
    // console.log(user)
    //2. 패스워드 체크
    const isMatched = await bcrypt.compare(password, user.password) //암호화된 비밀번호를 매칭하는 것
    if(!isMatched) {
        return res.json({
            msg: "password check"
        })
    }
    //3. return jwt
    const token = await jwt.sign(
        { userId: user._id },
        //2. 암호화 키값 / 이건 꼭 알고 있어야 함
        // "privateKey", //이것또한 들어나면 안되기 때문에 .env에 설정
        process.env.ACCESS_TOKEN_KEY,
        //3. 만료 시간
        {expiresIn: "10m"}
        //return 된 token 을 https://jwt.io/ 여기서 확인하면 시간이 나옴
    )
    res.json({
        msg: "success",
        token
    })
})
//정보가져오기
router.get("/", async (req, res) => {
    res.json( {
        msg: "get all"
    })
})

export default router