import { faker } from '@faker-js/faker';
import express from "express";
import { sequelize, Wishlist, Cart, OrderHistory, Notification } from "../model/Sequelize.js";

const route = express.Router();

const user = {
  name: "Ahmeng",
  email: "ahmeng123@email.com",
  hp: "+62 98655706126",
  address: "Jl. Mangga Enak 1"
};

const notification = (date) => {
  return [
    {
      id: faker.string.uuid(),
      title: 'Pesanan Telah Tiba',
      message: `Hore! Pesanan dari resto telah sampai di tujuan. Jangan lupa beri ulasan ya!`,
      type: 'ORDER_DELIVERED',
      createdAt: date
    },
    {
      id: faker.string.uuid(),
      title: 'Pesanan Sedang Dikirim',
      message: `Pesanan sudah diserahkan ke kurir dan dalam perjalanan.`,
      type: 'ORDER_SHIPPED',
      createdAt: date
    },
    {
      id: faker.string.uuid(),
      title: 'Pesanan Sedang Dibuat',
      message: `Pesanan kamu sedang disiapkan oleh resto.`,
      type: 'ORDER_CREATED',
      createdAt: date
    }
  ];
};

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke MySQL berhasil.');

    await sequelize.sync(); 
    console.log('Semua tabel berhasil dibuat/disinkronkan.');
  } catch (error) {
    console.error('Gagal terkoneksi atau membuat tabel:', error);
  }
}

initDB();

route.get("/user", (req, res) => {
  res.status(200).json({ status: 200, data: user, message: "Get user data successfully" });
});

route.get("/notification",async (req, res) => {
  const data = await Notification.findAll()
  const dummyDate = faker.date.between({ from: '2026-10-01', to: Date.now() });
  res.status(200).json({ status: 200, data: [...data.reverse(),...notification(dummyDate)], message: "Get notification data successfully" });
});

route.post("/notification", async(req, res) => {
  const payload = req.body
  await Notification.create(payload)
  res.status(200).json({status:200,message:"Post notification successful"})
});

route.get("/wishlist", async (req, res) => {
  try {
    const datas = await Wishlist.findAll();
    res.status(200).json({ status: 200, data: datas, message: "Get wishlist data successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

route.post("/wishlist", async (req, res) => {
  try {
    const payload = req.body;
    const datas = await Wishlist.create(payload);
    res.status(200).json({ status: 200, data: datas, message: "Add wishlist data successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

route.delete("/wishlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datas = await Wishlist.destroy({
      where:{
        idMenu:id
      }
    });
    res.status(200).json({ status: 200, data: datas, message: `${id} produk berhasil dihapus` });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

route.get("/orderHistory", async(req, res) => {
  const data = await OrderHistory.findAll()
  res.status(200).json({
    status: 200,
    message: "Get history order successful",
    items: [...data.reverse(),
      {
        menuId: "MENU_01",
        name: "Salmon Aburi Roll",
        japaneseName: "サーモンあぶりロール",
        category: "Sushi",
        unitPrice: 45000,
        quantity: 2,
        price: 90000,
        createdAt:"2026-10-06T18:30:15.000Z",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
      }
    ]
  });
});

route.post("/orderHistory",async(req,res) => {
  const payload = req.body
  await OrderHistory.create(payload)
  res.status(200).json({status:200,message:"Post order history successfull"})
})

route.get("/cart", async(req,res) => {
  const data = await Cart.findAll()
  res.status(200).json({status:200,message:"Get cart data successfull", data})
})

route.post("/cart", async(req,res) => {
  try{
    const payload = req.body
    await Cart.create(payload)
    res.status(200).json({status:200,message:"Post cart data successfull"})
  }
  catch(err){
    res.status(500).json({status:500,message:err})
  }
})

route.put("/cart/:id", async(req,res) => {
  try{
    const { quantity } = req.body
    const { id } = req.params
    await Cart.update({quantity},{where:{idMenu: id}})
    res.status(200).json({status:200,message:`Update cart data with id ${id} successfull`})
  }
  catch(err){
    res.status(500).json({status:500,message:err})
  }
})

route.delete("/cart/:id", async(req,res) => {
  try{
    const { id } = req.params
    await Cart.destroy({where:{idMenu: id}})
    res.status(200).json({status:200,message:`Delete cart data with id ${id} successfull`})
  }
  catch(err){
    res.status(500).json({status:500,message:err})
  }
})

export default route;