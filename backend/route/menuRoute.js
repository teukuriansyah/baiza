import express from "express"

const route = express.Router()

const rawPayload = {
  status: "success",
  statusCode: 200,
  message: "Baiza Sushi Halal Menu Items Retrieved Successfully",
  data: {
    restaurant: {
      name: "Baiza Sushi",
      tagline: "Modern Halal Japanese Dining",
      halalCertificationNo: "ID31110000421890922",
      isHalalCertified: true,
    },
    categories: [
      {
        id: "cat_sushi",
        name: "Sushi",
        icon: "🍣",
        itemCount: 6,
      },
      {
        id: "cat_ramen",
        name: "Ramen",
        icon: "🍜",
        itemCount: 3,
      },
      {
        id: "cat_donburi",
        name: "Donburi",
        icon: "🍚",
        itemCount: 3,
      },
      {
        id: "cat_appetizer",
        name: "Appetizer",
        icon: "🥟",
        itemCount: 4,
      },
      {
        id: "cat_drinks",
        name: "Drinks",
        icon: "🥤",
        itemCount: 2,
      },
      {
        id: "cat_dessert",
        name: "Dessert",
        icon: "🍰",
        itemCount: 2,
      },
    ],
    menuItems: [
      {
        id: "MENU_01",
        name: "Salmon Aburi Roll",
        japaneseName: "サーモンあぶりロール",
        category: "Sushi",
        price: 45000,
        rating: 4.8,
        reviewCount: 342,
        description:
          "Roll isi kani dan mentimun dengan topping irisan salmon segar dibakar lembut (aburi), saus mentai halal, dan tobiko.",
        preparationTime: "12-15 min",
        imageUrl:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Fish", "Egg", "Soy"],
      },

      {
        id: "MENU_02",
        name: "Spicy Salmon Roll",
        japaneseName: "スパイシーサーモンロール",
        category: "Sushi",
        price: 42000,
        rating: 4.7,
        reviewCount: 215,
        description:
          "Sushi roll isi cincangan salmon segar dipadukan dengan saus mayo pedas khas Baiza, renyah tanuki, dan wijen panggang.",
        preparationTime: "10-12 min",
        imageUrl:
          "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Fish", "Egg", "Sesame"],
      },

      {
        id: "MENU_03",
        name: "California Cheese Roll",
        japaneseName: "カリフォルニアチーズロール",
        category: "Sushi",
        price: 38000,
        rating: 4.6,
        reviewCount: 180,
        description:
          "Kani stick, alpukat, mentimun renyah dibalut dengan lelehan keju mozarella bakar dan mayonnaise halal.",
        preparationTime: "10-12 min",
        imageUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Crustacean", "Dairy", "Egg"],
      },

      {
        id: "MENU_04",
        name: "Dragon Beef Roll",
        japaneseName: "ドラゴンビーフロール",
        category: "Sushi",
        price: 52000,
        rating: 4.9,
        reviewCount: 412,
        description:
          "Speciality roll dengan isian udang teriyaki crispy, diselimuti topping irisan daging sapi US Shortplate bakar dan saus teriyaki halal.",
        preparationTime: "15-18 min",
        imageUrl:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Beef", "Shrimp", "Soy"],
      },

      {
        id: "MENU_05",
        name: "Salmon Nigiri (2pcs)",
        japaneseName: "サーモン握り",
        category: "Sushi",
        price: 28000,
        rating: 4.8,
        reviewCount: 156,
        description:
          "Dua buah kepalan nasi sushi pilihan dipadu irisan salmon norwegia segar mentah kelas sashimi.",
        preparationTime: "8-10 min",
        imageUrl:
          "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Fish"],
      },

      {
        id: "MENU_06",
        name: "Maguro Tuna Nigiri (2pcs)",
        japaneseName: "マグロ握り",
        category: "Sushi",
        price: 26000,
        rating: 4.6,
        reviewCount: 98,
        description:
          "Kepalan nasi sushi dengan irisan daging ikan tuna merah segar bebas pengawet.",
        preparationTime: "8-10 min",
        imageUrl:
          "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Fish"],
      },

      {
        id: "MENU_07",
        name: "Tori Paitan Collagen Ramen",
        japaneseName: "鶏白湯ラーメン",
        category: "Ramen",
        price: 58000,
        rating: 4.9,
        reviewCount: 520,
        description:
          "Mie ramen kenyal disajikan dalam kuah kaldu ayam kental gurih (Tori Paitan) slow-cooked 8 jam, topping chashu ayam, ajitama egg, & nori.",
        preparationTime: "15-20 min",
        imageUrl:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Wheat", "Egg", "Chicken"],
      },

      {
        id: "MENU_08",
        name: "Spicy Beef Ramen",
        japaneseName: "スパイシー牛肉ラーメン",
        category: "Ramen",
        price: 52000,
        rating: 4.7,
        reviewCount: 289,
        description:
          "Ramen kuah kaldu sapi pedas menggugah selera dengan topping irisan daging sapi tipis gurih, jamur kikurage, dan daun bawang segar.",
        preparationTime: "12-15 min",
        imageUrl:
          "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Wheat", "Egg", "Beef"],
      },

      {
        id: "MENU_09",
        name: "Shoyu Chicken Ramen",
        japaneseName: "醤油鶏ラーメン",
        category: "Ramen",
        price: 42000,
        rating: 4.5,
        reviewCount: 140,
        description:
          "Ramen klasik dengan kuah kaldu ayam jernih berbasis kecap Jepang (Shoyu Halal), rasa ringan dan khas otentik.",
        preparationTime: "12-15 min",
        imageUrl:
          "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Wheat", "Egg", "Soy", "Chicken"],
      },

      {
        id: "MENU_10",
        name: "Beef Gyudon Bowl",
        japaneseName: "牛丼",
        category: "Donburi",
        price: 45000,
        rating: 4.8,
        reviewCount: 310,
        description:
          "Nasi hangat bertabur irisan tipis daging sapi US Slice bermutu dan bawang bombay dimasak dalam saus shoyu manis gurih khas Donburi.",
        preparationTime: "10-12 min",
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Beef", "Soy", "Wheat"],
      },

      {
        id: "MENU_11",
        name: "Chicken Katsu Don",
        japaneseName: "チキンカツ丼",
        category: "Donburi",
        price: 38000,
        rating: 4.6,
        reviewCount: 195,
        description:
          "Fillet dada ayam goreng tepung renyah (katsu) dimasak bersama kocokan telur manis gurih di atas mangkuk nasi hangat.",
        preparationTime: "12-15 min",
        imageUrl:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Chicken", "Egg", "Wheat", "Soy"],
      },

      {
        id: "MENU_12",
        name: "Salmon Teriyaki Don",
        japaneseName: "サーモン照り焼き丼",
        category: "Donburi",
        price: 55000,
        rating: 4.9,
        reviewCount: 260,
        description:
          "Potongan fillet salmon panggang dengan lumuran saus teriyaki racikan halal Baiza, disajikan dengan topping biji wijen.",
        preparationTime: "12-15 min",
        imageUrl:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Fish", "Soy", "Sesame"],
      },

      {
        id: "MENU_13",
        name: "Chicken Gyoza Pan-Fried (5pcs)",
        japaneseName: "焼き餃子",
        category: "Appetizer",
        price: 25000,
        rating: 4.7,
        reviewCount: 380,
        description:
          "Dumpling isi cincangan daging ayam dan daun kucai, dipanggang crispy di bagian bawah dan lembut di atas. Lengkap dengan dipping sauce.",
        preparationTime: "8-10 min",
        imageUrl:
          "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Chicken", "Wheat", "Soy"],
      },

      {
        id: "MENU_14",
        name: "Edamame Salted",
        japaneseName: "枝豆",
        category: "Appetizer",
        price: 18000,
        rating: 4.4,
        reviewCount: 110,
        description:
          "Kacang kedelai Jepang rebus kaya protein disajikan hangat bertabur garam laut alami.",
        preparationTime: "5 min",
        imageUrl:
          "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Soy"],
      },

      {
        id: "MENU_15",
        name: "Takoyaki Seafood (6pcs)",
        japaneseName: "たこ焼き",
        category: "Appetizer",
        price: 28000,
        rating: 4.6,
        reviewCount: 240,
        description:
          "Bola-bola adonan panggang gurih berisi potongan gurita (tako) & udang, disiram saus takoyaki halal, mayo, & katsuobushi (serutan cakalang).",
        preparationTime: "10 min",
        imageUrl:
          "https://images.unsplash.com/photo-1581781870027-04212e2311ac?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Mollusc", "Shrimp", "Egg", "Wheat", "Fish"],
      },

      {
        id: "MENU_16",
        name: "Miso Soup",
        japaneseName: "味噌汁",
        category: "Appetizer",
        price: 15000,
        rating: 4.5,
        reviewCount: 130,
        description:
          "Sup pasta kedelai (Miso) hangat isi potongan tahu sutra, rumput laut wakame, dan irisan daun bawang.",
        preparationTime: "5 min",
        imageUrl:
          "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Soy", "Fish"],
      },

      {
        id: "MENU_17",
        name: "Cold Ocha (Refillable)",
        japaneseName: "冷たいお茶",
        category: "Drinks",
        price: 8000,
        rating: 4.8,
        reviewCount: 600,
        description:
          "Teh hijau otentik Jepang dingin yang menyegarkan dahaga dan menetralkan rasa manis/gurih di lidah.",
        preparationTime: "2 min",
        imageUrl:
          "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: [],
      },

      {
        id: "MENU_18",
        name: "Matcha Latte Ice",
        japaneseName: "抹茶ラテ",
        category: "Drinks",
        price: 22000,
        rating: 4.7,
        reviewCount: 275,
        description:
          "Minuman serbuk bubuk teh hijau premium Kyoto Matcha diseduh segar dipadukan dengan susu sapi pasteurisasi.",
        preparationTime: "5 min",
        imageUrl:
          "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: true,
        isHalal: true,
        allergens: ["Dairy"],
      },

      {
        id: "MENU_19",
        name: "Matcha Ice Cream Mochi (3pcs)",
        japaneseName: "抹茶餅アイス",
        category: "Dessert",
        price: 20000,
        rating: 4.6,
        reviewCount: 190,
        description:
          "Kue mochi kenyal khas Jepang berisi es krim rasa Matcha lezat di dalamnya.",
        preparationTime: "5 min",
        imageUrl:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Dairy"],
      },

      {
        id: "MENU_20",
        name: "Dorayaki Red Bean",
        japaneseName: "どら焼き",
        category: "Dessert",
        price: 18000,
        rating: 4.5,
        reviewCount: 145,
        description:
          "Kue pancake ganda bulat lembut khas Jepang dengan isian pasta kacang merah manis alami (Azuki).",
        preparationTime: "5 min",
        imageUrl:
          "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&auto=format&fit=crop&q=80",
        isAvailable: true,
        isPopular: false,
        isHalal: true,
        allergens: ["Egg", "Wheat"],
      },
    ],
  },
};

route.get("/menu",(req,res) => {
  res.status(200).json(rawPayload)
})

route.get("/menu/categories",(req,res) => {
  const payload = {
    status:rawPayload.status,
    code:rawPayload.code,
    message:rawPayload.message,
    data:rawPayload.data.categories
  }
  res.status(200).json(payload)
})

route.get("/menu/:id",(req,res) => {
  const id = req.params.id
  const payload = {
    status:rawPayload.status,
    code:rawPayload.code,
    message:rawPayload.message,
    data:rawPayload.data.menuItems[id-1]
  }
  res.status(200).json(payload)
})

export default route