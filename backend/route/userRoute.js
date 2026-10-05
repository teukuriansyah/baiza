import express from "express"

const route = express.Router()

const user = {
    name:"Ahmeng",
    email:"ahmeng123@email.com",
    hp:"+62 98655706126",
    address:"Jl. Mangga Enak 1"
}

route.get("/user",(req,res) => {
    res.status(200).json({status:200,data:user,message:"Get user data successfully"})
})

export default route