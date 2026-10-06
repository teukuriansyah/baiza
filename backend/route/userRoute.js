import express from "express";
import { faker } from '@faker-js/faker';
import Wishlist, { sequelize } from "../model/Sequelize.js";

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

route.get("/notification", (req, res) => {
  const dummyDate = faker.date.between({ from: '2026-10-01', to: Date.now() });
  res.status(200).json({ status: 200, data: notification(dummyDate), message: "Get notification data successfully" });
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

export default route;