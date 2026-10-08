import axios from "axios"

const api = axios.create({
  baseURL:"https://estrogen-verbally-caution.ngrok-free.dev"
})

interface Payload {
  idMenu:string;
  name:string;
  quantity:number;
  price:number;
  imageUrl:string
}

export async function getDataUser() {
  const { data } = await api.get("/user")
  return data
}

export async function getDataNotification() {
  const { data } = await api.get("/notification")
  return data
}

export async function getWishlist() {
  const { data } = await api.get("/wishlist")
  return data
}

export async function postWishlist(id:string) {
  const { data } = await api.post("/wishlist",{
    idMenu:id
  })
  return data
}

export async function deleteWishlist(id:string) {
  const { data } = await api.delete(`/wishlist/${id}`)
  return data
}

export async function getOrderHistory() {
  const { data } = await api.get(`/orderHistory`)
  return data
}

export async function getCart() {
  const { data } = await api.get(`/cart`)
  return data
}

export async function postCart(payload:Payload) {
  const { data } = await api.post(`/cart`,payload)
  return data
}

export async function putCart(id:string,quantity:number) {
  const { data } = await api.put(`/cart/${id}`,{quantity})
  return data
}

export async function deleteCart(id:string) {
  const { data } = await api.delete(`/cart/${id}`)
  return data
}
