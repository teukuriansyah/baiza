import axios from "axios"
//import "dotenv/config"

const api = axios.create({
  baseURL:""
})

export async function getData() {
  const { data } = await api.get("/menu")
  return data
}