import axios from "axios"

const api = axios.create({
  baseURL:""
})

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
