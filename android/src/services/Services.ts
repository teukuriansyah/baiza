import axios from "axios"
//import "dotenv/config"

const api = axios.create({
  baseURL:"https://estrogen-verbally-caution.ngrok-free.dev"
})

export async function getData() {
  const { data } = await api.get("/menu")
  return data
}

export async function getDataBySearch(search:any) {
  const { data } = await api.get("/menu")
  return data.data.menuItems.filter((item:any) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
}

export async function getDataById(id:any) {
  const { data } = await api.get("/menu/" + id)
  return data
}