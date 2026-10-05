import express from "express"
import { faker } from '@faker-js/faker';

const route = express.Router()

const user = {
    name:"Ahmeng",
    email:"ahmeng123@email.com",
    hp:"+62 98655706126",
    address:"Jl. Mangga Enak 1"
}

const notification = (date) => {
  return [{
    id: faker.string.uuid(),
    title: 'Pesanan Telah Tiba',
    message: `Hore! Pesanan dari resto telah sampai di tujuan. Jangan lupa beri ulasan ya!`,
    type: 'ORDER_DELIVERED',
    createdAt:date
  },{
    id: faker.string.uuid(),
    title: 'Pesanan Sedang Dikirim',
    message: `Pesanan sudah diserahkan ke kurir dan dalam perjalanan.`,
    type: 'ORDER_SHIPPED',
    createdAt:date
  },{
    id: faker.string.uuid(),
    title: 'Pesanan Sedang Dibuat',
    message: `Pesanan kamu sedang disiapkan oleh resto.`,
    type: 'ORDER_CREATED',
    createdAt:date
  }]
}

route.get("/user",(req,res) => {
  res.status(200).json({status:200,data:user,message:"Get user data successfully"})
})

route.get("/notification",(req,res) => {
  const dummyDate = faker.date.between({ from: '2026-10-01', to: Date.now() });
  res.status(200).json({status:200,data:notification(dummyDate),message:"Get notification data successfully"})
})

export default route